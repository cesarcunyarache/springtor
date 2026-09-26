CREATE TABLE "assessments" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" text PRIMARY KEY NOT NULL,
	"assessmentId" text NOT NULL,
	"question" text NOT NULL,
	"options" text[],
	"answer" text NOT NULL,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lesson" ADD COLUMN "level" integer;--> statement-breakpoint
ALTER TABLE "module" ADD COLUMN "level" integer;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_assessmentId_assessments_id_fk" FOREIGN KEY ("assessmentId") REFERENCES "public"."assessments"("id") ON DELETE no action ON UPDATE no action;