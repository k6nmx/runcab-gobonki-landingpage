// app/newsletter/confirm/page.tsx
import { db } from "@/lib/db";
import { newsletters } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { CheckCircle2, XCircle, Mail } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  searchParams: { token?: string };
}

export default async function NewsletterConfirmPage({ searchParams }: Props) {
  const params = await searchParams;
  const token = params?.token;

  if (!token) {
    return <InvalidTokenUI reason="missing" />;
  }

  try {
    const now = new Date();

    // Atomic update: only update if token exists and not already confirmed
    const result = await db
      .update(newsletters)
      .set({
        doubleOptInConfirmedAt: now,
        confirmationToken: null,
        confirmationExpiresAt: null,
        updatedAt: now,
      })
      .where(eq(newsletters.confirmationToken, token))
      .returning({ 
        id: newsletters.id, 
        email: newsletters.email,
        userType: newsletters.userType 
      });

    if (!result || result.length === 0) {
      return <InvalidTokenUI reason="expired" />;
    }

    const subscriber = result[0];
    return <SuccessUI email={subscriber.email} userType={subscriber.userType} />;
    
  } catch (err) {
    console.error("[newsletter.confirm][error]", err);
    return <InvalidTokenUI reason="error" />;
  }
}

function SuccessUI({ email, userType }: { email: string; userType: string | null }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-brand-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-xl border-none bg-white/90 backdrop-blur">
        <CardContent className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            You&apos;re All Set! 🎉
          </h1>
          
          <p className="text-neutral-600 mb-6">
            Thanks for confirming your subscription! You&apos;ll now receive exclusive updates 
            {userType === 'business' ? ' and growth insights' : ' and special offers'} at:
          </p>
          
          <div className="flex items-center justify-center gap-2 bg-neutral-50 rounded-lg px-4 py-3 mb-8">
            <Mail className="h-4 w-4 text-brand-500" />
            <span className="font-medium text-neutral-800">{email}</span>
          </div>
          
          <Link href="/">
            <Button className="w-full btn-gradient">
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

function InvalidTokenUI({ reason }: { reason: 'missing' | 'expired' | 'error' }) {
  const messages = {
    missing: {
      title: "Invalid Link",
      description: "This confirmation link is incomplete. Please check your email and try again.",
    },
    expired: {
      title: "Link Expired or Already Used",
      description: "This confirmation link has expired or has already been used. If you need a new link, please subscribe again.",
    },
    error: {
      title: "Something Went Wrong",
      description: "We encountered an error processing your confirmation. Please try again or contact support.",
    },
  };

  const { title, description } = messages[reason];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-neutral-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-xl border-none bg-white/90 backdrop-blur">
        <CardContent className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            {title}
          </h1>
          
          <p className="text-neutral-600 mb-8">
            {description}
          </p>
          
          <div className="space-y-3">
            <Link href="/#contact">
              <Button className="w-full btn-gradient">
                Subscribe Again
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
