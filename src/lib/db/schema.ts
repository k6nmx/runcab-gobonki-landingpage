// src/lib/db/schema.ts
import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';

export const newsletters = pgTable('newsletters', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  isActive: boolean('is_active').default(true).notNull(),
  source: text('source').default('landing_page'), // Track where they signed up
  ipAddress: text('ip_address'), // For compliance/fraud detection
  userAgent: text('user_agent'), // For analytics
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  unsubscribedAt: timestamp('unsubscribed_at'),
  doubleOptInConfirmedAt: timestamp('double_opt_in_confirmed_at'), // GDPR compliance
});

export type Newsletter = typeof newsletters.$inferSelect;
export type NewNewsletter = typeof newsletters.$inferInsert;