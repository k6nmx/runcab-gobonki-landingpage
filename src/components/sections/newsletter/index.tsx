'use client';

import { useState, useTransition } from "react";
import { useTranslations, useMessages } from "next-intl";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ShieldCheck, CheckCircle2, ArrowRight, Users, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMode } from "@/context/mode-context";
import { subscribe } from "@/components/sections/newsletter/actions";

const clientSchema = z.object({ email: z.string().email() });

export default function NewsletterSection({ className }: { className?: string }) {
  const t = useTranslations("newsletter");
  type NewsletterMessages = {
    newsletter?: {
      customer?: { benefits?: unknown[] };
      business?: { benefits?: unknown[] };
    };
    [key: string]: unknown;
  };
  const messages = useMessages() as NewsletterMessages | undefined;
  const { mode } = useMode();

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const isBusy = status === 'loading' || isPending;

  // Safely read newsletter messages for the current locale:
  // messages may be undefined in some contexts (e.g., during edges of hydration),
  // so provide a defensive fallback shape.
  const newsletterMessages = (messages && messages.newsletter)
    ? messages.newsletter
    : { customer: { benefits: [] }, business: { benefits: [] } };

  // Choose the correct array based on mode and normalize to strings.
  const rawBenefits = mode === 'customer'
    ? newsletterMessages?.customer?.benefits ?? []
    : newsletterMessages?.business?.benefits ?? [];

  const benefits = Array.isArray(rawBenefits)
    ? rawBenefits.map((b) => (typeof b === 'string' ? b : String(b ?? ''))).filter(Boolean).slice(0, 3)
    : [];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsed = clientSchema.safeParse({ email });
    if (!parsed.success) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    startTransition(async () => {
      try {
        const formData = new FormData(e.currentTarget);
        formData.set("userType", mode);
        formData.set("email", email);

        const result = await subscribe(formData);

        if (result.ok) {
          setStatus("success");
          setEmail("");
        } else {
          console.error("subscribe failed:", result);
          setStatus("error");
        }
      } catch (err) {
        console.error("subscribe error:", err);
        setStatus("error");
      }
    });
  }

  return (
    <section id="contact" className={cn("relative py-14 sm:py-20 smooth-scroll", className)}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-brand-400 to-secondary-400 shadow-[0_18px_50px_-12px_rgba(14,165,233,0.28)]">
          <Card className="rounded-3xl border-none bg-white/80 backdrop-blur overflow-hidden">
            <CardContent className="relative p-6 sm:p-10">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                  {t("title")}
                </h2>
                <p className="mt-2 max-w-2xl mx-auto text-neutral-600">
                  {t("subtitle")}
                </p>

                <div className="mt-8 inline-flex rounded-xl bg-neutral-100/80 shadow-sm ring-1 ring-inset ring-neutral-200 p-1">
                  <div className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                    mode === "customer" ? "bg-white text-neutral-900 shadow" : "text-neutral-500"
                  )}>
                    <Users className="h-4 w-4" />
                    {t("forCustomers")}
                  </div>
                  <div className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                    mode === "business" ? "bg-white text-neutral-900 shadow" : "text-neutral-500"
                  )}>
                    <Building2 className="h-4 w-4" />
                    {t("forBusinesses")}
                  </div>
                </div>
              </div>

              <div className="mt-6 max-w-md mx-auto text-left text-neutral-700">
                <h3 className="font-semibold text-neutral-800">
                  {t(`${mode === 'customer' ? 'customer' : 'business'}.title`)}
                </h3>
                <ul className="mt-3 space-y-2">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2.5 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <form onSubmit={onSubmit} className="mt-8 max-w-md mx-auto">
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
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
                    className="h-12 w-full sm:w-auto rounded-xl px-5 font-semibold btn-gradient shadow-md"
                  >
                    <span className="mr-2">{t("cta")}</span>
                    <ArrowRight className="h-4 w-4" />
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
