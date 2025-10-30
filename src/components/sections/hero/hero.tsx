"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useReducedMotion, AnimatePresence, motion } from "framer-motion";
import { useMode } from "@/context/mode-context";
import { useIsScrolled } from "@/lib/use-is-scrolled";

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
  const isScrolled = useIsScrolled();

  // RTL detection
  const isRTL = locale === "ar";

  useEffect(() => setMounted(true), []);

  const content: HeroContentShape = useMemo(() => {
    return mode === "customer"
      ? {
          title: t("customer.title"),
          subtitle: t("customer.subtitle"),
          ctaText: t("customer.cta"),
          ctaHref: "https://app.gobonki.com/customer",
          image: "/hero-image2.jpg",
          imageAlt: "Customers view of participating cafe",
        }
      : {
          title: t("business.title"),
          subtitle: t("business.subtitle"),
          ctaText: t("business.cta"),
          ctaHref: "https://app.gobonki.com/store",
          image: "/hero-image1.jpg",
          imageAlt: "Business dashboard / cafe interior",
        };
  }, [mode, t]);

  const handleModeChange = (newMode: 'customer' | 'business') => {
    setMode(newMode);
    window.location.hash = newMode;
  };

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
    <section className="hero-bg relative z-0 pb-12" dir={isRTL ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-24 pb-8 sm:pb-12">
          <div className="flex items-center justify-center h-11">
            <AnimatePresence>
              {!isScrolled && (
                <motion.div
                  key="mode-toggle"
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.25,
                    ease: [0.22, 0.6, 0.2, 1],
                  }}
                >
                  <ModeToggle
                    mode={mode}
                    onModeChange={handleModeChange}
                    labels={toggleLabels}
                    isRTL={isRTL}
                  />
                </motion.div>
              )}
            </AnimatePresence>
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
