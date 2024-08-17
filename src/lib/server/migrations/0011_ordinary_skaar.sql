CREATE TABLE IF NOT EXISTS "recipe" (
	"id" text PRIMARY KEY NOT NULL,
	"author_id" text NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"instructions" text NOT NULL,
	"ingredients" text NOT NULL,
	"note" text,
	"yield" smallint NOT NULL,
	"imageurl" text,
	"preptime" smallint,
	"cooktime" smallint,
	"calories" smallint,
	"fat" smallint,
	"published" boolean DEFAULT false NOT NULL,
	"publishedAt" timestamp (4) with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" text DEFAULT 'user' NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe" ADD CONSTRAINT "recipe_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
