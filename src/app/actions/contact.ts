'use server';
import sgMail from '@sendgrid/mail';
import { z } from 'zod';
import { validateTurnstileToken } from 'next-turnstile';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// In-memory rate limiter (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email').max(255),
  message: z.string().min(10, 'Message too short').max(2000, 'Message too long'),
  captchaToken: z.string().min(1, 'Captcha required'),
});

type ContactFormData = z.infer<typeof contactSchema>;

async function validateToken(token: string) {
  try {
    const result = await validateTurnstileToken({
      token,
      secretKey: process.env.TURNSTILE_SECRET_KEY!,
    });
    return result.success;
  } catch (error) {
    console.error('Validation failed:', error);
    return false;
  }
}

// Helper: check rate limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  // Clean up old entries (prevent memory leak)
  if (rateLimitStore.size > 1000) {
    for (const [key, val] of rateLimitStore.entries()) {
      if (now > val.resetAt + 3600000) {
        // 1 hour old
        rateLimitStore.delete(key);
      }
    }
  }

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + 60000 }); // 60 sec window
    return true;
  }

  if (entry.count >= 1) {
    return false;
  }

  entry.count++;
  return true;
}

// Helper: sanitize input
function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, '');
}

// Main server action
export async function submitContactForm(
  data: ContactFormData,
  ip: string
): Promise<{ success: boolean; error?: string }> {
  // Step 1: Validate input
  const validation = contactSchema.safeParse(data);
  if (!validation.success) {
    const message = validation.error.issues?.[0]?.message || 'Invalid input';
    return {
      success: false,
      error: message,
    };
  }

  const { name, email, message, captchaToken } = validation.data;

  // Step 2: Verify captcha
  const captchaValid = await validateToken(captchaToken);
  if (!captchaValid) {
    console.error('Captcha failed:', { ip });
    return { success: false, error: 'Security check failed. Please try again.' };
  }

  // Step 3: Check rate limit
  if (!checkRateLimit(ip)) {
    console.error('Rate limit exceeded:', { ip });
    return {
      success: false,
      error: 'Too many requests. Please wait 60 seconds before trying again.',
    };
  }

  // Step 4: Check for email injection attacks
  if (email.includes(',') || email.includes('\n') || email.includes(';')) {
    return { success: false, error: 'Invalid email format' };
  }

  // Step 5: Sanitize message
  const sanitizedMessage = stripHtml(message);

  // Step 6: Send email to support
  sgMail
    .send({
      from: process.env.AUTO_REPLY_FROM!,
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `Contact Form: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${sanitizedMessage}`,
    })
    .catch((error) => {
      console.error('SendGrid failed (support email):', error);
      
    });

  // Step 7: Send auto-reply (NON-BLOCKING)
  sgMail
    .send({
      from: process.env.AUTO_REPLY_FROM!,
      to: email,
      subject: 'We received your message',
      text: `Hi ${name},\n\nThank you for contacting us! We've received your message and will get back to you as soon as possible.\n\nBest regards,\nThe gobonki Team`,
    })
    .catch((error) => {
      console.error('Auto-reply failed (non-critical):', error);
      
    });

  
  return { success: true };
}