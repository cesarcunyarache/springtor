import "server-only";
export const runtime = "nodejs";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  assessments,
  learningSteps,
  lessonCompletions,
  lessons,
  modules,
  roadmaps,
  topicCompletions,
  topics,
} from "../../schema";
import { and, asc, eq } from "drizzle-orm";
import {
  Assessment,
  LearningStep,
  Lesson,
  LessonCompletion,
  Roadmap,
  Topic,
} from "@/type";
import * as schema from "../../schema";
import { db } from "../..";
import { auth } from "@/auth";

export async function getRoadmaps() {
  try {
    return await db.select().from(roadmaps);
  } catch (error) {
    return [];
  }
}

export async function getTopicsByRoadmapId(
  roadmapId: string
): Promise<Topic[]> {
  try {
    return await db.query.topics.findMany({
      where: eq(topics.roadmapId, roadmapId),
      with: {
        learningStep: true,
      },
    });
  } catch (error) {
    return [];
  }
}

export async function getRoadmapById(
  roadmapId: string
): Promise<Roadmap | null> {
  try {
    const found = await db.query.roadmaps.findFirst({
      where: eq(roadmaps.id, roadmapId),
      with: {
        steps: true,
      },
    });

    if (!found) return null;

    return found;
  } catch (error) {
    return null;
  }
}

export async function getStepsByRoadmapBySlug(
  slug: string
): Promise<LearningStep[]> {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) return [];

    return await db.query.learningSteps.findMany({
      where: (steps, { eq }) =>
        eq(
          steps.roadmapId,
          db
            .select({ id: roadmaps.id })
            .from(roadmaps)
            .where(eq(roadmaps.slug, slug))
            .limit(1)
        ),
      with: {
        topics: {
          orderBy: [asc(topics.level)],
          with: {
            topicCompletions: {
              where: eq(topicCompletions.userId, userId),
              limit: 1,
            },
          },
        },
      },
      orderBy: [asc(learningSteps.level)],
    });
  } catch (error) {
    return [];
  }
}

export async function getLearningSteps(): Promise<LearningStep[]> {
  try {
    return await db.select().from(learningSteps);
  } catch (error) {
    return [];
  }
}

export async function getTopicById(topicId: string): Promise<Topic | null> {
  try {
    const topic = await db.query.topics.findFirst({
      where: eq(topics.id, topicId),
      with: {
        learningStep: true,
        assessment: {
          with: {
            questions: true,
            theoryAnswers: true,
          },
        },
        modules: {
          with: {
            lessons: {
              orderBy: [asc(lessons.level)],
            },
          },
          orderBy: [asc(modules.level)],
        },
      },
    });
    if (!topic) return null;
    return topic;
  } catch (error) {
    return null;
  }
}

export async function getLessionById(lessonId: string): Promise<Lesson | null> {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) return null;

    const lesson = await db.query.lessons.findFirst({
      where: eq(lessons.id, lessonId),
      orderBy: [asc(lessons.level)],
      with: {
        module: true,
        lessonCompletions: {
          where: eq(lessonCompletions.userId, userId),
        },
        assessment: {
          with: {
            questions: true,
            theoryLessonAnswers: true,
          },
        },
      },
    });

    if (!lesson) return null;
    return lesson;
  } catch (error) {
    return null;
  }
}

export async function getAssessmentBySlug(
  slug: string
): Promise<Assessment | null> {
  try {
    const assessment = await db.query.assessments.findFirst({
      where: eq(assessments.slug, slug),
      with: {
        questions: true,
      
      },
    });

    if (!assessment) return null;
    return assessment;
  } catch (error) {
    return null;
  }
}

export async function getCompletedLessonsByUserId(
  topicId: string
): Promise<LessonCompletion[]> {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) return [];

    const foundLessons = await db.query.lessonCompletions.findMany({
      where: and(
        eq(lessonCompletions.userId, userId),
        eq(lessonCompletions.topicId, topicId)
      ),
      with: {
        lesson: true,
        module: true,
        topic: true,
      },
    });

    if (!foundLessons) return [];

    return foundLessons;
  } catch (error) {
    return [];
  }
}
