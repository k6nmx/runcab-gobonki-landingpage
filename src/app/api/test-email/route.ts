import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// NOTE: You must set these environment variables in Vercel.
// For testing, you can use a test email address that you have access to.
const TEST_EMAIL_TO = process.env.TEST_EMAIL_TO || "your-email@example.com";
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_EMAIL = process.env.FROM_EMAIL;

// Optional: Set a longer timeout for this specific function
export const maxDuration = 60; 

export async function GET() {
  console.log("[test-email] STARTING");

  // Validate environment variables
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !FROM_EMAIL) {
    console.error("[test-email] ERROR: Missing required SMTP environment variables.");
    return NextResponse.json({ ok: false, message: "Missing SMTP credentials" }, { status: 500 });
  }

  try {
    // 1. Create a transporter with the SMTP configuration
    console.log("[test-email] Creating nodemailer transporter");
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      // Set a connection timeout to avoid hanging indefinitely
      timeout: 30000, // 30 seconds
    });

    // 2. Verify the connection before sending
    console.log("[test-email] Verifying transporter connection...");
    await transporter.verify();
    console.log("[test-email] Connection successful! Attempting to send email.");

    // 3. Send a test email
    const mailResult = await transporter.sendMail({
      from: FROM_EMAIL,
      to: TEST_EMAIL_TO,
      subject: "Vercel Test Email",
      text: "This is a test email sent from a Vercel serverless function. If you received this, the SMTP connection is working!",
      html: "<p>This is a test email sent from a Vercel serverless function.</p><p>If you received this, the SMTP connection is **working**!</p>",
    });

    console.log("[test-email] Email sent successfully:", mailResult);

    return NextResponse.json({ ok: true, message: "Email sent successfully!", mailResult });
  } catch (error) {
    console.error("[test-email] CRITICAL ERROR:", error);

    // If the error is a connection issue, log it
    if (error instanceof Error) {
        if (error.message.includes('timeout')) {
            console.error("[test-email] Connection timed out.");
        }
    }
    
    return NextResponse.json({ ok: false, message: "Failed to send email. Check logs for details." }, { status: 500 });
  }
}
