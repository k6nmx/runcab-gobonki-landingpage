
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";

import Logo from "../ui/Logo";
import { useIsScrolled } from "../../lib/use-is-scrolled";
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
  { hash: "#newsletter", key: "newsletter" },
];

export default function HeaderClient() {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const t = useTranslations("navigation");
  const router = useRouter();
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const currentLocale = useLocale();
  const isScrolled = useIsScrolled();
  const { mode, setMode } = useMode();

 
  const localeRegex = new RegExp(`^/(${APP_LOCALES.join("|")})`);

  const switchLanguage = (locale: AppLocale) => {
    const params = new URLSearchParams(searchParams?.toString?.() ?? "");
    const pathWithoutLocale = pathname.replace(localeRegex, "");
    router.push(`/${locale}${pathWithoutLocale}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const toHome = (hash: string) => {
    if (hash === '#contact') {
      return `/${currentLocale}${hash}`;
    }
    const section = hash.substring(1); // remove #
    return `/${currentLocale}#${mode}:${section}`;
  };

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    
    <div
      className={clsx(
        "mx-auto pointer-events-auto transition-all duration-300 ease-out",
        isScrolled
          ? "glass w-[min(92vw,64rem)] px-4 sm:px-6 mt-2 rounded-full"
          : "w-[min(100vw,80rem)] px-6 mt-0"
      )}
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-center h-16">
    
        <Link href={toHome("#")} aria-label="Home" prefetch className="inline-flex items-center">
          <Logo src="/gobonki-schriftzug.svg" alt="gobonki-logo" className="h-8 w-auto" />
        </Link>

        <DesktopNav items={NAV_ITEMS} toHome={toHome} t={t} />

        <div className="col-start-3 justify-self-end flex items-center gap-3 sm:gap-4">
          <MiniModeToggle mode={mode} onModeChange={setMode} isVisible={isScrolled} isRTL={currentLocale === "ar"} />

          <LanguageSwitcher currentLocale={currentLocale} onSwitch={switchLanguage} />

          <div className="hidden sm:inline-flex">
            <Link href='https://app.gobonki.com' target="_blank" className="inline-flex">
              <button className="btn-gradient btn-shadow px-6 py-2.5 text-white hover:translate-y-0 transform-none text-sm font-semibold rounded-lg hover:cursor-pointer">
              {t("cta")}
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
