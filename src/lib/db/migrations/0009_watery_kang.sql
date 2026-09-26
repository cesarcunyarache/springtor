CREATE TABLE "theoryLessonAnswers" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"assessment_id" text,
	"question_id" text NOT NULL,
	"selected_option" text,
	"is_correct" boolean NOT NULL,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "theoryLessonAnswers" ADD CONSTRAINT "theoryLessonAnswers_assessment_id_assessments_id_fk" FOREIGN KEY ("assessment_id") REFERENCES "public"."assessments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "theoryLessonAnswers" ADD CONSTRAINT "theoryLessonAnswers_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;