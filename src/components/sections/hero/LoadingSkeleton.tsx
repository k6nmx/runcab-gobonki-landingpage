// src/components/hero/LoadingSkeleton.tsx
"use client";

import React from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { LoadingSkeletonProps } from "./types";

export default function LoadingSkeleton({ labels }: LoadingSkeletonProps) {
  const t = useTranslations("hero");

  return (
    <section className="hero-bg pt-2 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center lg:pt-10">
          <div className="inline-flex rounded-full bg-neutral-100 p-1">
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              <Users size={18} />
              <span>{labels.customer}</span>
            </div>
            <div className="px-4 py-2 text-neutral-600">{labels.business}</div>
          </div>
        </div>
        <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight text-neutral-900 md:text-6xl">
              {t("customer.title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-neutral-600">{t("customer.subtitle")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button className="btn-gradient btn-shadow px-6 py-2.5 text-sm font-semibold rounded-lg">
                {t("customer.cta")}
              </Button>
              <Button variant="outline" className="px-5 py-2.5 text-sm rounded-lg">
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[720px]">
            <div className="h-[420px] w-full rounded-2xl bg-neutral-200" />
          </div>
        </div>
      </div>
    </section>
  );
}
