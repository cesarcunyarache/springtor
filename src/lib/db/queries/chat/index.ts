"use server";

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
  lessonCompletions,
  chat,
  message,
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
import { ChatSDKError } from "@/lib/errors";



export async function getChatById({ id }: { id: string }) {
  try {
    const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
    return selectedChat;
  } catch (error) {
   /*  throw new ChatSDKError('bad_request:database', 'Failed to get chat by id'); */
  }
}


export async function getMessagesByChatId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(message)
      .where(eq(message.chatId, id))
      .orderBy(asc(message.createdAt));
  } catch (error) {
   /*  throw new ChatSDKError(
      'bad_request:database',
      'Failed to get messages by chat id',
    ); */
  }
}
