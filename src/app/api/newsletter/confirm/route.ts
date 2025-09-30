// src/app/api/newsletter/confirm/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletters } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const wantsJson = (req.headers.get("accept") || "").includes("application/json");

  if (!token) {
    if (wantsJson) return NextResponse.json({ ok: false, error: "token_missing" }, { status: 400 });
    return NextResponse.redirect(new URL("/newsletter/invalid", url));
  }

  try {
    const now = new Date();

    // Atomic update: update where token matches and not already confirmed
    const res = await db
      .update(newsletters)
      .set({
        doubleOptInConfirmedAt: now,
        confirmationToken: null,
        confirmationExpiresAt: null,
        updatedAt: now,
      })
      .where(
        // only update rows that still have the token (prevents race)
        eq(newsletters.confirmationToken, token)
      )
      .returning({ id: newsletters.id, email: newsletters.email });

    // `res` is an array of updated rows (drizzle returns updated rows with returning)
    if (!res || res.length === 0) {
      // either token invalid/expired or already used
      if (wantsJson) return NextResponse.json({ ok: false, error: "invalid_or_used_token" }, { status: 404 });
      return NextResponse.redirect(new URL("/newsletter/invalid", url));
    }

    // success
    if (wantsJson) return NextResponse.json({ ok: true, message: "confirmed" });
    return NextResponse.redirect(new URL("/newsletter/success", url));
  } catch (err) {
    console.error("[newsletter.confirm][error]", err);
    if (wantsJson) return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
    return NextResponse.redirect(new URL("/newsletter/invalid", url));
  }
}
