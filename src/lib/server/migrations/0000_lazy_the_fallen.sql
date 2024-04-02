CREATE TABLE IF NOT EXISTS "usersTest" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"attack" smallint,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
