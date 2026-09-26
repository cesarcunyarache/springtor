CREATE TABLE "postTestPracticeResponses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"answers" jsonb NOT NULL,
	"rubricScore" integer,
	"checklistScore" integer,
	"feedback" text,
	"justification" text,
	CONSTRAINT "postTestPracticeResponses_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "preTestPracticeResponses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"answers" jsonb NOT NULL,
	"rubricScore" integer,
	"checklistScore" integer,
	"feedback" text,
	"justification" text,
	CONSTRAINT "preTestPracticeResponses_user_id_unique" UNIQUE("user_id")
);
