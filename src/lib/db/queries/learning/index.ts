import "server-only";
export const runtime = "nodejs";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { learningSteps, lessons, roadmaps, topics } from "../../schema";
import { eq } from "drizzle-orm";
import { LearningStep, Lesson, Roadmap, Topic } from "@/type";
import * as schema from "../../schema";
import { db } from "../..";

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

export async function getRoadmapById(roadmapId: string): Promise<Roadmap | null> {
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

export async function getStepsByRoadmapId(roadmapId: string): Promise<LearningStep[]> {
  try {
    return await db.query.learningSteps.findMany({
      where: eq(learningSteps.roadmapId, roadmapId),
      with: {
        topics: true,
      },
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
        modules: {
          with: {
            lessons: true,
          }
        }
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
    const lesson = await db.query.lessons.findFirst({
      where: eq(lessons.id, lessonId),
    });

    if (!lesson) return null;
    return lesson;
  } catch (error) {
    return null;
  }
}
