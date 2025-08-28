import "server-only";
export const runtime = "nodejs";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { learningSteps, lessons, roadmaps, topics } from "../../schema";
import { eq } from "drizzle-orm";
import { LearningStep, Lesson, Topic } from "@/type";
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
