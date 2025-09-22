"use client";

import { useTranslations } from "next-intl";
import { Users, Building2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMode } from "@/context/mode-context";

type QA = { q: string; a: string };

export default function FAQSection({ className }: { className?: string }) {
  const t = useTranslations("faq");
  const { mode } = useMode();

  // Convert mode to the expected audience format
  const audience = mode === "customer" ? "customers" : "businesses";
  const items = (t.raw(audience) as QA[]) ?? [];

  return (
    <section id="faq" className={cn("relative py-14 sm:py-20", className)}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/60 via-white to-white" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            {t("title")}
          </h2>

          {/* Visual indicator showing current mode - no toggle functionality */}
          <div className="mt-5 inline-flex rounded-xl bg-white shadow-sm ring-1 ring-neutral-200 p-1">
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2",
                mode === "customer"
                  ? "btn-gradient text-white shadow"
                  : "text-neutral-400"
              )}
            >
              <Users className="h-4 w-4" />
              {t("forCustomers")}
            </div>
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2",
                mode === "business"
                  ? "btn-gradient text-white shadow"
                  : "text-neutral-400"
              )}
            >
              <Building2 className="h-4 w-4" />
              {t("forBusinesses")}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl p-[1px] bg-gradient-to-r from-brand-200 to-secondary-200">
          <Card className="rounded-3xl border-none bg-white/80 backdrop-blur">
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 hover:opacity-100">
              <div
                className="absolute -inset-10 rounded-[2.25rem] blur-2xl"
                style={{
                  background:
                    "radial-gradient(600px 240px at 50% 0%, rgba(14,165,233,.14), transparent 60%)",
                }}
              />
            </div>

            <CardContent className="relative p-4 sm:p-8">
              <Accordion
                type="single"
                collapsible
                className="w-full divide-y divide-neutral-200"
              >
                {items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${audience}-${i}`}
                    className="border-0"
                  >
                    <AccordionTrigger className="text-left py-4 text-base sm:text-lg font-semibold text-neutral-900 hover:no-underline">
                      {item.q}
                    </AccordionTrigger>

                    {/* 👉 add the animation + smoothing here */}
                    <AccordionContent
                      className="
          overflow-hidden pb-5 text-neutral-700 leading-7
          data-[state=closed]:animate-accordion-up
          data-[state=open]:animate-accordion-down
          will-change-[height] motion-reduce:animate-none
        "
                    >
                      {/* Optional subtle fade on inner content */}
                      <div className="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out motion-reduce:animate-none">
                        {item.a}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
