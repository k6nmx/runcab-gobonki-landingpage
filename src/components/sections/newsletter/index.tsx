"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ShieldCheck, CheckCircle2, ArrowRight, Users, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMode } from "@/context/mode-context";

// Mock implementation for the 'subscribe' server action since './actions' is not available.
async function subscribe(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  console.log("Subscribing with:", Object.fromEntries(formData.entries()));
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const email = formData.get('email');
  // Basic validation for demonstration
  if (typeof email === 'string' && email.includes('@')) {
    return { ok: true };
  }
  return { ok: false, error: "Invalid email for mock subscription." };
}


// Mock implementation for 'useTranslations' as 'next-intl' is not available in this environment.
const useTranslations = (namespace: string) => {
    const translations: { [key: string]: { [key: string]: string } } = {
        newsletter: {
            title: "Stay Ahead of the Curve",
            subtitle: "Join our newsletter for exclusive updates, tips, and offers.",
            forCustomers: "For Shoppers",
            forBusinesses: "For Businesses",
            "customer.title": "As a shopper, you'll get:",
            "customer.benefit1": "Exclusive deals and early access to rewards from your favorite local stores.",
            "customer.benefit2": "Tips and tricks to maximize your savings and never miss a freebie.",
            "customer.benefit3": "Notifications about new businesses joining the platform near you.",
            "business.title": "As a business, you'll get:",
            "business.benefit1": "Actionable insights on customer retention from our data analytics.",
            "business.benefit2": "Case studies and growth strategies from successful businesses like yours.",
            "business.benefit3": "Early announcements for new features to help you grow your sales.",
            emailPlaceholder: "Enter your email address",
            cta: "Subscribe",
            disclaimer: "We respect your privacy. No spam.",
            success: "Thanks for subscribing! Please check your email to confirm.",
            error: "Something went wrong. Please try again."
        }
    };
    
    return (key: string) => {
        return translations[namespace]?.[key] || key;
    };
};


// Client-side validation for fast UX
const clientSchema = z.object({ email: z.string().email() });

export default function NewsletterSection({
  className,
}: {
  className?: string;
}) {
  const t = useTranslations("newsletter");
  const { mode } = useMode();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const isBusy = status === 'loading' || isPending;

  // Content tailored to each user type, driven by the global mode
  const content = {
    customer: {
      title: t("customer.title"),
      benefits: [
        t("customer.benefit1"),
        t("customer.benefit2"),
        t("customer.benefit3"),
      ],
    },
    business: {
      title: t("business.title"),
      benefits: [
        t("business.benefit1"),
        t("business.benefit2"),
        t("business.benefit3"),
      ],
    },
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsed = clientSchema.safeParse({ email });
    if (!parsed.success) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      // Add the user type from the global mode for analytics
      formData.set("userType", mode); 
      formData.set("email", email);
      const res = await subscribe(formData);

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    });
  }

  return (
    <section
      id="contact"
      className={cn("relative py-14 sm:py-20 smooth-scroll", className)}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/60 via-white to-white" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-brand-400 to-secondary-400 shadow-[0_18px_50px_-12px_rgba(14,165,233,0.28)]">
          <Card className="rounded-3xl border-none bg-white/80 backdrop-blur overflow-hidden">
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 hover:opacity-100">
              <div
                className="absolute -inset-10 rounded-[2.25rem] blur-2xl"
                style={{
                  background:
                    "radial-gradient(600px 240px at 50% 0%, rgba(14,165,233,.18), transparent 60%)",
                }}
              />
            </div>

            <CardContent className="relative p-6 sm:p-10">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                  {t("title")}
                </h2>
                <p className="mt-2 max-w-2xl mx-auto text-neutral-600">
                  {t("subtitle")}
                </p>
                
                {/* Disabled visual indicator showing current mode */}
                <div className="mt-8 inline-flex rounded-xl bg-neutral-100/80 shadow-sm ring-1 ring-inset ring-neutral-200 p-1">
                  <div
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                      mode === "customer"
                        ? "bg-white text-neutral-900 shadow"
                        : "text-neutral-500"
                    )}
                  >
                    <Users className="h-4 w-4" />
                    {t("forCustomers")}
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                      mode === "business"
                        ? "bg-white text-neutral-900 shadow"
                        : "text-neutral-500"
                    )}
                  >
                    <Building2 className="h-4 w-4" />
                    {t("forBusinesses")}
                  </div>
                </div>
              </div>

              {/* Dynamic Content based on Active Tab */}
              <div className="mt-6 max-w-md mx-auto text-left text-neutral-700">
                <h3 className="font-semibold text-neutral-800">
                  {content[mode].title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {content[mode].benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2.5 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <form onSubmit={onSubmit} className="mt-8 max-w-md mx-auto">
                {/* Honeypot field */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <Input
                      type="email"
                      name="email"
                      inputMode="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("emailPlaceholder")}
                      className="h-12 pl-9 pr-3 rounded-xl bg-white border-neutral-200 focus-visible:ring-brand-400"
                      aria-label="Email"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isBusy}
                    className="h-12 w-full sm:w-auto rounded-xl px-5 font-semibold btn-gradient shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <span className="mr-2">{t("cta")}</span>
                    <ArrowRight className="h-4 w-4"/>
                  </Button>
                </div>

                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-neutral-500">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{t("disclaimer")}</span>
                </div>

                {status === "success" && (
                  <p className="mt-3 text-center text-sm font-medium text-emerald-600">
                    {t("success")}
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-3 text-center text-sm font-medium text-red-600">
                    {t("error")}
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

