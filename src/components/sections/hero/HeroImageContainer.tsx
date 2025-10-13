// src/components/hero/HeroImageContainer.tsx
"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroImage from "./hero-image";
import { HeroImageContainerProps } from "./types";

export default function HeroImageContainer({
  image,
  imageAlt,
  prefersReducedMotion,
}: HeroImageContainerProps) {
  return (
    <div className="mx-auto w-full max-w-[720px]">
      <div className="relative h-[420px] w-full rounded-2xl overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={image}
            className="absolute inset-0"
            initial={{
              opacity: 0,
              scale: prefersReducedMotion ? 1 : 0.995,
            }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: prefersReducedMotion ? 1 : 1.005,
            }}
            transition={{ duration: 0.28, ease: [0.2, 0.6, 0.2, 1] }}
          >
            <HeroImage src={image} alt={imageAlt} className="h-full w-full object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
