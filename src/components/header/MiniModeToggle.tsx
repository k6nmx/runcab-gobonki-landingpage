"use client";


import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SegmentedToggle } from "@/components/ui/segmented-toggle";
import { Users, Building2 } from "lucide-react";
import { MiniModeToggleProps } from "./types";

export function MiniModeToggle({ mode, onModeChange, isVisible }: MiniModeToggleProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="hidden md:flex items-center">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="mini-toggle"
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.22, 0.6, 0.2, 1] }}
            className="mr-2"
          >
            <div className="rounded-full bg-white/90 p-1 shadow-sm">
              <SegmentedToggle
                value={mode}
                onChange={(v) => onModeChange(v as "customer" | "business")}
                options={[
                  {
                    value: "customer",
                    label: (
                      <span className="inline-flex items-center gap-1 text-sm">
                        <Users size={14} />
                        <span className="sr-only">Customer</span>
                      </span>
                    ),
                  },
                  {
                    value: "business",
                    label: (
                      <span className="inline-flex items-center gap-1 text-sm">
                        <Building2 size={14} />
                        <span className="sr-only">Business</span>
                      </span>
                    ),
                  },
                ]}
                className="h-8 w-[110px] text-sm"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MiniModeToggle;
