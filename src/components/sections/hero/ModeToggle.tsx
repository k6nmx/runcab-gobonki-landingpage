
"use client";

import React from "react";
import { Users, Building2 } from "lucide-react";
import { SegmentedToggle } from "@/components/ui/segmented-toggle";
import { ModeToggleProps } from "./types";

export default function ModeToggle({
  mode,
  onModeChange,
  labels,
  isRTL,
}: ModeToggleProps) {
  return (
    <SegmentedToggle
      value={mode}
      onChange={(v) => onModeChange(v as "customer" | "business")}
      options={[
        {
          value: "customer",
          label: (
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <Users size={16} /> {labels.customer}
            </span>
          ),
        },
        {
          value: "business",
          label: (
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <Building2 size={16} /> {labels.business}
            </span>
          ),
        },
      ]}
      className="shadow-md"
      dir={isRTL ? "rtl" : "ltr"}
    />
  );
}
