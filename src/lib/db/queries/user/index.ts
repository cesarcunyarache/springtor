"use server";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  learningSteps,
  lessons,
  modules,
  roadmaps,
  topics,
  preTestResponses,
  users,
  theoryLessonAnswers,
  theoryAnswers,
} from "../../schema";
import { asc, eq, exists, sql } from "drizzle-orm";
import {
  LearningStep,
  Lesson,
  Roadmap,
  TheoryLessonAnswer,
  Topic,
  User,
} from "@/type";
import * as schema from "../../schema";
import { db } from "../..";
import { QuizResult } from "@/components/quizz";
import { auth } from "@/auth";

export async function isUserResponsePreTest(userId: string): Promise<boolean> {
  try {
    const foundUser = await db.query.preTestResponses.findFirst({
      where: eq(preTestResponses.userId, userId),
    });

    if (foundUser) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const foundUser = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
    if (foundUser) {
      return foundUser;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function saveUserResponsePreTest(
  quizzResults: QuizResult[]
): Promise<boolean> {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) return false;

    const prepareDate = quizzResults.map((q) => ({
      ...q,
      userId,
    }));

    const results = await db
      .insert(preTestResponses)
      .values(prepareDate)
      .returning();

    if (results.length > 0) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}

export async function saveUserPreferences(preferences: any): Promise<boolean> {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) return false;

    const foundUser = await db.update(users).set({
      preferences,
    });

    if (foundUser) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}

export async function saveUserResponseLessonAnswers(
  lessonAnswers: QuizResult[],
  assessmentId?: string
): Promise<boolean> {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) return false;

    const preparedDate = lessonAnswers.map((q) => ({
      ...q,
      userId,
      assessmentId,
    }));

    const results = await db
      .insert(theoryLessonAnswers)
      .values(preparedDate)
      .onConflictDoUpdate({
        target: [
          theoryLessonAnswers.userId,
          theoryLessonAnswers.assessmentId,
          theoryLessonAnswers.questionId,
        ],
        set: {
          selectedOption: sql.raw(
            `excluded.${theoryLessonAnswers.selectedOption.name}`
          ),
          isCorrect: sql.raw(`excluded.${theoryLessonAnswers.isCorrect.name}`),
        },
      })
      .returning();

    if (results.length > 0) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}



export async function saveUserResponseTheoryAnswers(
  lessonAnswers: QuizResult[],
  assessmentId?: string
): Promise<boolean> {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) return false;

    const preparedDate = lessonAnswers.map((q) => ({
      ...q,
      userId,
      assessmentId,
    }));

    const results = await db
      .insert(theoryAnswers)
      .values(preparedDate)
      .onConflictDoUpdate({
        target: [
          theoryAnswers.userId,
          theoryAnswers.assessmentId,
          theoryAnswers.questionId,
        ],
        set: {
          selectedOption: sql.raw(
            `excluded.${theoryAnswers.selectedOption.name}`
          ),
          isCorrect: sql.raw(`excluded.${theoryAnswers.isCorrect.name}`),
        },
      })
      .returning();

    if (results.length > 0) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
