"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { subscribe } from "./actions"; // <-- adjust path

// ✅ client-side validation for fast UX
const clientSchema = z.object({ email: z.string().email() });

export default function NewsletterSection({
  className,
}: {
  className?: string;
}) {
  const t = useTranslations("newsletter");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const isBusy = status === 'loading' || isPending;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // client validation (UX)
    const parsed = clientSchema.safeParse({ email });
    if (!parsed.success) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      formData.set("email", email);
      formData.set("source", "landing"); // optional context

      const res = await subscribe(formData);

      if (res.ok) {
        setStatus("success");
        setEmail("");
        // e.currentTarget.reset() // optional
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
          <Card className="rounded-3xl border-none bg-white/80 backdrop-blur">
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
              </div>

              <form onSubmit={onSubmit} className="mt-6 sm:mt-8">
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
                    className="
    h-12 rounded-xl px-6 font-semibold btn-gradient shadow-md
    hover:translate-y-0 transform-none transition-colors
    disabled:opacity-50 disabled:cursor-not-allowed
  "
                  >
                    {t("cta")}
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
