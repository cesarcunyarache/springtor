CREATE TABLE "topicCompletions" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"topicId" text NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "topicCompletions" ADD CONSTRAINT "topicCompletions_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "topicCompletions" ADD CONSTRAINT "topicCompletions_topicId_topic_id_fk" FOREIGN KEY ("topicId") REFERENCES "public"."topic"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_topic_completion" ON "topicCompletions" USING btree ("userId","topicId");