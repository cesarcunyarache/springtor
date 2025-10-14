import { relations, type InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  varchar,
  timestamp,
  json,
  uuid,
  text,
  primaryKey,
  foreignKey,
  boolean,
  integer,
  jsonb,
  unique,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  password: text("password"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  preferences: json("preferences"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
);

export const chat = pgTable("chat", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("createdAt").notNull(),
  title: text("title").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  visibility: varchar("visibility", { enum: ["public", "private"] })
    .notNull()
    .default("private"),
});

export type Chat = InferSelectModel<typeof chat>;

export const message = pgTable("message", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  chatId: uuid("chatId")
    .notNull()
    .references(() => chat.id),
  role: varchar("role").notNull(),
  parts: json("parts").notNull(),
  attachments: json("attachments").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});

export type DBMessage = InferSelectModel<typeof message>;

export const vote = pgTable(
  "vote",
  {
    chatId: uuid("chatId")
      .notNull()
      .references(() => chat.id),
    messageId: uuid("messageId")
      .notNull()
      .references(() => message.id),
    isUpvoted: boolean("isUpvoted").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.chatId, table.messageId] }),
    };
  }
);

export type Vote = InferSelectModel<typeof vote>;

export const document = pgTable(
  "document",
  {
    id: uuid("id").notNull().defaultRandom(),
    createdAt: timestamp("createdAt").notNull(),
    title: text("title").notNull(),
    content: text("content"),
    kind: varchar("text", { enum: ["text", "code", "image", "sheet"] })
      .notNull()
      .default("text"),
    userId: text("userId")
      .notNull()
      .references(() => users.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.id, table.createdAt] }),
    };
  }
);

export type Document = InferSelectModel<typeof document>;

export const suggestion = pgTable(
  "suggestion",
  {
    id: uuid("id").notNull().defaultRandom(),
    documentId: uuid("documentId").notNull(),
    documentCreatedAt: timestamp("documentCreatedAt").notNull(),
    originalText: text("originalText").notNull(),
    suggestedText: text("suggestedText").notNull(),
    description: text("description"),
    isResolved: boolean("isResolved").notNull().default(false),
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("createdAt").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id] }),
    documentRef: foreignKey({
      columns: [table.documentId, table.documentCreatedAt],
      foreignColumns: [document.id, document.createdAt],
    }),
  })
);

export type Suggestion = InferSelectModel<typeof suggestion>;

export const stream = pgTable(
  "stream",
  {
    id: uuid("id").notNull().defaultRandom(),
    chatId: uuid("chatId").notNull(),
    createdAt: timestamp("createdAt").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id] }),
    chatRef: foreignKey({
      columns: [table.chatId],
      foreignColumns: [chat.id],
    }),
  })
);

export type Stream = InferSelectModel<typeof stream>;

const timestamps = {
  updatedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
};

export const roadmaps = pgTable("roadmap", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  ...timestamps,
});

export type Roadmap = InferSelectModel<typeof roadmaps>;

export const roadmapRelations = relations(roadmaps, ({ one, many }) => ({
  steps: many(learningSteps),
}));

export const learningSteps = pgTable("learningStep", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  level: integer("level").notNull().default(1),
  roadmapId: text("roadmapId").references(() => roadmaps.id),
  ...timestamps,
});

export type LearningStep = InferSelectModel<typeof learningSteps>;

export const learningStepRelations = relations(
  learningSteps,
  ({ one, many }) => ({
    roadmap: one(roadmaps, {
      fields: [learningSteps.roadmapId],
      references: [roadmaps.id],
    }),
    topics: many(topics),
  })
);

export const topics = pgTable("topic", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  roadmapId: text("roadmapId")
    .notNull()
    .references(() => roadmaps.id),
  parentId: text("parentId"),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }),
  description: text("description"),
  content: text("content"),
  features: text("features").array(),
  icon: varchar("icon", { length: 255 }),
  color: varchar("color", { length: 255 }),
  level: integer("level").notNull(),
  stepId: text("stepId").references(() => learningSteps.id),
  assessmentId: text("assessmentId").references(() => assessments.id),
  progress: integer("progress").notNull().default(0),
  ...timestamps,
});

export const topicCompletions = pgTable(
  "topicCompletions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    topicId: text("topicId")
      .notNull()
      .references(() => topics.id),
    progress: integer("progress").notNull().default(0),
    ...timestamps,
  },
  (table) => ({
    uniqueTopicCompletion: uniqueIndex("unique_topic_completion").on(
      table.userId,
      table.topicId
    ),
  })
);

export const topicCompletionRelations = relations(
  topicCompletions,
  ({ one, many }) => ({
    topic: one(topics, {
      fields: [topicCompletions.topicId],
      references: [topics.id],
    }),
  })
);

export type TopicCompletion = InferSelectModel<typeof topicCompletions>;

export type Topic = InferSelectModel<typeof topics>;

export const modules = pgTable("module", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  topicId: text("topicId")
    .notNull()
    .references(() => topics.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  level: integer("level"),
  ...timestamps,
});

export type Module = InferSelectModel<typeof modules>;

export const moduleRelations = relations(modules, ({ one, many }) => ({
  topic: one(topics, {
    fields: [modules.topicId],
    references: [topics.id],
  }),
  lessons: many(lessons),
}));

export const topicRelations = relations(topics, ({ one, many }) => ({
  parent: one(topics, {
    fields: [topics.parentId],
    references: [topics.id],
  }),
  learningStep: one(learningSteps, {
    fields: [topics.stepId],
    references: [learningSteps.id],
  }),
  modules: many(modules),
  assessment: one(assessments, {
    fields: [topics.assessmentId],
    references: [assessments.id],
  }),
  topicCompletions: many(topicCompletions),
}));

export const lessons = pgTable("lesson", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  moduleId: text("moduleId")
    .notNull()
    .references(() => modules.id),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  description: text("description"),
  videoUrl: varchar("videoUrl", { length: 255 }),
  loomUrl: varchar("loomUrl", { length: 255 }),
  content: text("content"),
  level: integer("level"),
  assessmentId: text("assessmentId").references(() => assessments.id),
  ...timestamps,
});
export const lessonRelations = relations(lessons, ({ one, many }) => ({
  module: one(modules, {
    fields: [lessons.moduleId],
    references: [modules.id],
  }),
  assessment: one(assessments, {
    fields: [lessons.assessmentId],
    references: [assessments.id],
  }),
  lessonCompletions: many(lessonCompletions),
  lessonCompletion: one(lessonCompletions, {
    fields: [lessons.id],
    references: [lessonCompletions.id],
  }),
}));

export type Lesson = InferSelectModel<typeof lessons>;

export const lessonCompletions = pgTable(
  "lessonCompletions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId").references(() => users.id),
    lessonId: text("lessonId")
      .notNull()
      .references(() => lessons.id),
    moduleId: text("moduleId")
      .notNull()
      .references(() => modules.id),
    topicId: text("topicId")
      .notNull()
      .references(() => topics.id),
    chatId: uuid("chatId").references(() => chat.id),
    ...timestamps,
  },
  (table) => ({
    uniqueLessonCompletion: uniqueIndex("unique_lesson_completion").on(
      table.userId,
      table.moduleId,
      table.lessonId,
      table.topicId
    ),
  })
);

export type LessonCompletion = InferSelectModel<typeof lessonCompletions>;

export const lessonCompletionsRelations = relations(
  lessonCompletions,
  ({ one, many }) => ({
    lesson: one(lessons, {
      fields: [lessonCompletions.lessonId],
      references: [lessons.id],
    }),
    module: one(modules, {
      fields: [lessonCompletions.moduleId],
      references: [modules.id],
    }),
    topic: one(topics, {
      fields: [lessonCompletions.topicId],
      references: [topics.id],
    }),
  })
);

export const assessments = pgTable("assessments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description"),
  slug: text("slug"),
  ...timestamps,
});

export type Assessment = InferSelectModel<typeof assessments>;

export const assessmentRelations = relations(assessments, ({ one, many }) => ({
  questions: many(questions),
  theoryLessonAnswers: many(theoryLessonAnswers),
  topics: many(topics),
  lessons: many(lessons),
  theoryAnswers: many(theoryAnswers),
}));

export const questions = pgTable("questions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  assessmentId: text("assessmentId")
    .notNull()
    .references(() => assessments.id),
  question: text("question").notNull(),
  options: text("options").notNull().array(),
  answer: text("answer").notNull(),
  ...timestamps,
});

export type Question = InferSelectModel<typeof questions>;

export const questionRelations = relations(questions, ({ one, many }) => ({
  assessment: one(assessments, {
    fields: [questions.assessmentId],
    references: [assessments.id],
  }),
}));

export const preTestResponses = pgTable("preTestResponses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull(),
  questionId: text("question_id")
    .notNull()
    .references(() => questions.id),
  selectedOption: text("selected_option"),
  isCorrect: boolean("is_correct").notNull(),
  ...timestamps,
});

export type PreTestResponse = InferSelectModel<typeof preTestResponses>;

export const postTestResponses = pgTable("postTestResponses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull(),
  questionId: text("question_id")
    .notNull()
    .references(() => questions.id),
  selectedOption: text("selected_option"),
  isCorrect: boolean("is_correct").notNull(),
  ...timestamps,
});

export type PostTestResponse = InferSelectModel<typeof postTestResponses>;

export const theoryLessonAnswers = pgTable(
  "theoryLessonAnswers",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull(),
    assessmentId: text("assessment_id").references(() => assessments.id),
    questionId: text("question_id")
      .notNull()
      .references(() => questions.id),
    selectedOption: text("selected_option"),
    isCorrect: boolean("is_correct").notNull(),
    ...timestamps,
  },
  (table) => {
    return {
      uniqueUserAssessmentQuestion: unique().on(
        table.userId,
        table.assessmentId,
        table.questionId
      ),
    };
  }
);

export type TheoryLessonAnswer = InferSelectModel<typeof theoryLessonAnswers>;

export const theoryLessonAnswerRelations = relations(
  theoryLessonAnswers,
  ({ one, many }) => ({
    question: one(questions, {
      fields: [theoryLessonAnswers.questionId],
      references: [questions.id],
    }),
    assessment: one(assessments, {
      fields: [theoryLessonAnswers.assessmentId],
      references: [assessments.id],
    }),
  })
);

export const theoryAnswers = pgTable(
  "theoryAnswers",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull(),
    assessmentId: text("assessment_id").references(() => assessments.id),
    questionId: text("question_id")
      .notNull()
      .references(() => questions.id),
    selectedOption: text("selected_option"),
    isCorrect: boolean("is_correct").notNull(),
    ...timestamps,
  },
  (table) => {
    return {
      uniqueUserAssessmentQuestion: unique().on(
        table.userId,
        table.assessmentId,
        table.questionId
      ),
    };
  }
);

export type TheoryAnswer = InferSelectModel<typeof theoryAnswers>;

export const theoryQuestionRelations = relations(
  theoryAnswers,
  ({ one, many }) => ({
    question: one(questions, {
      fields: [theoryAnswers.questionId],
      references: [questions.id],
    }),
    assessment: one(assessments, {
      fields: [theoryAnswers.assessmentId],
      references: [assessments.id],
    }),
  })
);

export const preTestPracticeResponses = pgTable(
  "preTestPracticeResponses",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    userId: text("user_id").notNull(),
    answers: jsonb("answers").notNull(),
    rubricScore: integer(), 
    checklistScore: integer(),
    feedback: text("feedback"),
    justification: text("justification")
  },
  (table) => ({
    uniqueUserQuestion: unique().on(table.userId),
  })
);

export type PreTestPracticeResponse = InferSelectModel<
  typeof preTestPracticeResponses
>;

export const postTestPracticeResponses = pgTable(
  "postTestPracticeResponses",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    userId: text("user_id").notNull(),
    answers: jsonb("answers").notNull(),
    rubricScore: integer(), 
    checklistScore: integer(),
    feedback: text("feedback"),
    justification: text("justification")
  },
  (table) => ({
    uniqueUserQuestion: unique().on(table.userId),
  })
);

export type PostTestPracticeResponse = InferSelectModel<
  typeof postTestPracticeResponses
>;
