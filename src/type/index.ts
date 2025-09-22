export interface BaseModel {
  createdAt: Date;
  updatedAt: Date | null;
}

export interface User {
  id: string;
  name: string | null;
  password: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  preferences: {
    experienceLevel?: string;
    explanationPreference?: string;
    learningTopics?: string[];
    otherTopic?: string;
  } | unknown;
}

export interface Roadmap extends BaseModel {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  topics?: Topic[];
}

export interface LearningStep extends BaseModel {
  id: string;
  name: string;
  description: string | null;
  level: number;
  roadmapId: string | null;
  topics?: Topic[];
}

export interface Topic extends BaseModel {
  id: string;
  roadmapId: string;
  parentId: string | null;
  slug: string;
  title: string;
  subtitle: string | null;
  features: string[] | null;
  description: string | null;
  content: string | null;
  level: number;
  icon: string | null;
  color: string | null;
  stepId: string | null;
  learningStep?: LearningStep | null;
  modules?: Module[];
  assessment?: Assessment | null;
}

export interface Module extends BaseModel {
  id: string;
  topicId: string;
  title: string;
  description: string | null;
  lessons?: Lesson[];
}

export interface Lesson extends BaseModel {
  id: string;
  moduleId: string;
  title: string;
  slug: string;
  description: string | null;
  videoUrl: string | null;
  loomUrl: string | null;
  content: string | null;
  
  module?: Module | null;
  assessment?: Assessment | null;
  lessonCompletions?: LessonCompletion[];
}

export interface LessonCompletion extends BaseModel {
  id: string;
  moduleId: string;
  lessonId: string;
  topicId: string;
  userId: string | null;
  chatId: string | null;
}

export interface Assessment extends BaseModel {
  id: string;
  title: string;
  description: string | null;
  questions?: Question[];
  theoryLessonAnswers?: TheoryLessonAnswer[];
  theoryAnswers?: TheoryAnswer[];
}
export interface Question extends BaseModel {
  id: string;
  question: string;
  options: string[] | null;
  answer: string;
  assessmentId: string;
  assessment?: Assessment;
}

export interface TheoryLessonAnswer extends BaseModel {
  id: string;
  userId: string;
  assessmentId: string | null;
  questionId: string;
  selectedOption: string | null;
  isCorrect: boolean;
}

export interface TheoryAnswer extends BaseModel {
  id: string;
  userId: string;
  assessmentId: string | null;
  questionId: string;
  selectedOption: string | null;
  isCorrect: boolean;
}

