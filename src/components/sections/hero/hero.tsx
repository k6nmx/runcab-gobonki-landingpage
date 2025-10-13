"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useReducedMotion } from "framer-motion";
import { useMode } from "@/context/mode-context";
import useIsScrolled from "@/lib/use-is-scrolled";

import ModeToggle from "./ModeToggle";
import HeroContent from "./HeroContent";
import HeroImageContainer from "./HeroImageContainer";
import LoadingSkeleton from "./LoadingSkeleton";
import { HeroContentShape } from "./types";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { mode, setMode } = useMode();
  const locale = useLocale();
  const t = useTranslations("hero");
  const nav = useTranslations("navigation");
  const prefersReducedMotion = useReducedMotion();
  const isScrolled = useIsScrolled(12);

  // RTL detection
  const isRTL = locale === "ar";

  useEffect(() => setMounted(true), []);

  const content: HeroContentShape = useMemo(() => {
    return mode === "customer"
      ? {
          title: t("customer.title"),
          subtitle: t("customer.subtitle"),
          ctaText: t("customer.cta"),
          ctaHref: "#directory",
          image: "/hero-image2.jpg",
          imageAlt: "Customers view of participating cafe",
        }
      : {
          title: t("business.title"),
          subtitle: t("business.subtitle"),
          ctaText: t("business.cta"),
          ctaHref: "#get-started",
          image: "/hero-image1.jpg",
          imageAlt: "Business dashboard / cafe interior",
        };
  }, [mode, t]);

  const toggleLabels = useMemo(
    () => ({
      customer: nav("forCustomers"),
      business: nav("forBusinesses"),
    }),
    [nav]
  );

  if (!mounted) {
    return <LoadingSkeleton labels={toggleLabels} />;
  }

  return (
    <section className="hero-bg pb-12" dir={isRTL ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-24 pb-8 sm:pt-28 sm:pb-12 lg:pt-10">
          <div className="flex justify-center">
            {!isScrolled && (
              <ModeToggle
                mode={mode}
                onModeChange={setMode}
                labels={toggleLabels}
                isRTL={isRTL}
              />
            )}
          </div>

          <div className="mt-10 grid items-center gap-10 md:gap-12 lg:gap-16 md:grid-cols-2">
            <HeroContent
              mode={mode}
              title={content.title}
              subtitle={content.subtitle}
              ctaText={content.ctaText}
              ctaHref={content.ctaHref}
              isRTL={isRTL}
            />

            <HeroImageContainer
              image={content.image}
              imageAlt={content.imageAlt}
              prefersReducedMotion={prefersReducedMotion ?? false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
