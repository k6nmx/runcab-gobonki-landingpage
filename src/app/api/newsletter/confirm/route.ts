// src/components/sections/newsletter/confirm/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletters } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(`${process.env.APP_BASE_URL}/newsletter/invalid`);
    }

    const now = new Date();

    // Use select().from() pattern (works even if db schema generic not provided)
    const rows = await db
      .select()
      .from(newsletters)
      .where(eq(newsletters.confirmationToken, token))
      .limit(1);

    const entry = rows[0];

    if (!entry) {
      return NextResponse.redirect(`${process.env.APP_BASE_URL}/newsletter/invalid`);
    }

    // Check expiry if you have the column
    if (entry.confirmationExpiresAt && new Date(entry.confirmationExpiresAt) < now) {
      return NextResponse.redirect(`${process.env.APP_BASE_URL}/newsletter/invalid`);
    }

    // Update to set confirmed and clear token
    await db
      .update(newsletters)
      .set({
        doubleOptInConfirmedAt: now,
        confirmationToken: null,
        confirmationExpiresAt: null,
        updatedAt: now,
      })
      .where(eq(newsletters.id, entry.id));

    return NextResponse.redirect(`${process.env.APP_BASE_URL}/newsletter/success`);
  } catch (err) {
    console.error("[newsletter.confirm][error]", err);
    return NextResponse.redirect(`${process.env.APP_BASE_URL}/newsletter/invalid`);
  }
}
