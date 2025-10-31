// src/components/hero/HeroContent.tsx
"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, useReducedMotion, easeInOut } from "framer-motion";
import { HeroContentProps } from "./types";
import Link from "next/link";



export default function HeroContent({
  mode,
  title,
  subtitle,
  ctaText,
  ctaHref,
  isRTL,
}: HeroContentProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeSlide = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: prefersReducedMotion ? 0 : -12 },
    transition: { duration: 0.25, ease: easeInOut },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={mode}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={fadeSlide.transition}
        variants={fadeSlide}
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-neutral-900">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-lg sm:text-xl text-neutral-600">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button
            className="btn-gradient btn-shadow px-6 py-2.5 hover:translate-y-0 transform-none text-sm font-semibold rounded-lg"
            asChild
          >
            <Link href={ctaHref} target="_blank">
              {!isRTL && <ArrowRight className="mr-2 h-4 w-4" />}
              {ctaText}
              {isRTL && <ArrowRight className="ml-2 h-4 w-4 rotate-180" />}
            </Link>
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
