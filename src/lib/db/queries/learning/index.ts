import "server-only";
export const runtime = "nodejs";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { learningSteps, roadmaps, topics } from "../../schema";
import { eq } from "drizzle-orm";
import { LearningStep, Topic } from "@/type";
import * as schema  from "../../schema"; 
import { db } from "../..";
/* 
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client, { schema }); */

export async function getRoadmaps() {
  try {
    return await db.select().from(roadmaps);
  } catch (error) {
    return [];
  }
}

export async function getTopicsByRoadmapIdDeprecated(
  roadmapId: string
): Promise<Topic[]> {
  try {
    return await db
      .select()
      .from(topics)
      .where(eq(topics.roadmapId, roadmapId));
  } catch (error) {
    return [];
  }
}

export async function getTopicsByRoadmapId(roadmapId: string) : Promise<Topic[]> {
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
