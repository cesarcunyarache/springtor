ALTER TABLE "lesson" DROP CONSTRAINT "lesson_chatId_chat_id_fk";
--> statement-breakpoint
ALTER TABLE "lessonCompletions" ADD COLUMN "chatId" uuid;--> statement-breakpoint
ALTER TABLE "lessonCompletions" ADD CONSTRAINT "lessonCompletions_chatId_chat_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."chat"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson" DROP COLUMN "chatId";