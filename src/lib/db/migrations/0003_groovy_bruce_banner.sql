ALTER TABLE "learningStep" ADD COLUMN "level" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "topic" ADD COLUMN "subtitle" varchar(255);--> statement-breakpoint
ALTER TABLE "topic" ADD COLUMN "features" text[];--> statement-breakpoint
ALTER TABLE "topic" ADD COLUMN "color" varchar(255);