
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";

import Logo from "../ui/Logo";
import useIsScrolled from "@/lib/use-is-scrolled";
import { useMode } from "@/context/mode-context";

import { LanguageSwitcher } from "./LanguageSwitcher";
import MiniModeToggle from "./MiniModeToggle";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";

import { AppLocale, NavItem } from "./types";
import { APP_LOCALES } from "@/i18n/constants";

const NAV_ITEMS: NavItem[] = [
  { hash: "#features", key: "features" },
  { hash: "#testimonials", key: "testimonials" },
  { hash: "#faq", key: "faq" },
  { hash: "#contact", key: "contact" },
];

export default function HeaderClient() {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const t = useTranslations("navigation");
  const router = useRouter();
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const currentLocale = useLocale();
  const isScrolled = useIsScrolled(12);
  const { mode, setMode } = useMode();

  // generate locale regex dynamically so it doesn't go stale
  const localeRegex = new RegExp(`^/(${APP_LOCALES.join("|")})`);

  const switchLanguage = (locale: AppLocale) => {
    const params = new URLSearchParams(searchParams?.toString?.() ?? "");
    const pathWithoutLocale = pathname.replace(localeRegex, "");
    router.push(`/${locale}${pathWithoutLocale}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const toHome = (hash: string) => `/${currentLocale}${hash}`;

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    // <-- THIS wrapper is client-controlled and toggles the glass-pill classes
    <div
      className={clsx(
        "mx-auto pointer-events-auto transition-all duration-300 ease-out",
        isScrolled
          ? "glass-pill w-[min(92vw,64rem)] px-4 sm:px-6 mt-2 rounded-full"
          : "w-[min(100vw,80rem)] px-6 mt-0"
      )}
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-center h-16">
        {/* LOGO - client-rendered now (safe) */}
        <Link href={toHome("#")} aria-label="Home" prefetch className="inline-flex items-center">
          <Logo src="/gobonki-schriftzug.svg" alt="Gobonki-logo" className="h-8 w-auto" />
        </Link>

        <DesktopNav items={NAV_ITEMS} toHome={toHome} t={t} />

        <div className="col-start-3 justify-self-end flex items-center gap-3 sm:gap-4">
          <MiniModeToggle mode={mode} onModeChange={setMode} isVisible={isScrolled} />

          <LanguageSwitcher currentLocale={currentLocale} onSwitch={switchLanguage} />

          <div className="hidden sm:inline-flex">
            <Link href={toHome("#contact")} className="inline-flex">
              <button className="btn bg-brand-600 hover:bg-brand-700 text-white px-3 py-1 rounded">
                {t("contact")}
              </button>
            </Link>
          </div>

          <MobileMenu
            items={NAV_ITEMS}
            toHome={toHome}
            t={t}
            open={mobileOpen}
            onOpenChange={setMobileOpen}
          />
        </div>
      </div>
    </div>
  );
}
