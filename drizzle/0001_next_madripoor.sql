ALTER TABLE "newsletters" ADD COLUMN "language" text;--> statement-breakpoint
ALTER TABLE "newsletters" ADD COLUMN "confirmation_token" text;--> statement-breakpoint
ALTER TABLE "newsletters" ADD COLUMN "confirmation_sent_at" timestamp;--> statement-breakpoint
ALTER TABLE "newsletters" ADD COLUMN "confirmation_expires_at" timestamp;