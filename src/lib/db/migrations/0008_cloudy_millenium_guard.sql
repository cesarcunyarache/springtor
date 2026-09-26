CREATE TABLE "theoryAnswers" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"question_id" text NOT NULL,
	"selected_option" text,
	"is_correct" boolean NOT NULL,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lesson" ADD COLUMN "assessmentId" text;--> statement-breakpoint
ALTER TABLE "theoryAnswers" ADD CONSTRAINT "theoryAnswers_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson" ADD CONSTRAINT "lesson_assessmentId_assessments_id_fk" FOREIGN KEY ("assessmentId") REFERENCES "public"."assessments"("id") ON DELETE no action ON UPDATE no action;