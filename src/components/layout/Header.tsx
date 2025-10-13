'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Menu, Globe, ChevronDown, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import Logo from "../ui/Logo";
import { APP_LOCALES, LOCALE_LABELS } from "@/i18n/constants";
import { SegmentedToggle } from "@/components/ui/segmented-toggle";
import useIsScrolled from "@/lib/use-is-scrolled";
import { useMode } from "@/context/mode-context";

type AppLocale = (typeof APP_LOCALES)[number];

const NAV_ITEMS = [
  { hash: "#features", key: "features" },
  { hash: "#testimonials", key: "testimonials" },
  { hash: "#faq", key: "faq" },
  { hash: "#contact", key: "contact" },
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const t = useTranslations("navigation");
  const router = useRouter();
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const currentLocale = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const isScrolled = useIsScrolled(12);
  const { mode, setMode } = useMode();

  const switchLanguage = (locale: AppLocale) => {
    const params = new URLSearchParams(searchParams.toString());
    const pathWithoutLocale = pathname.replace(/^\/(en|de|tu|ar|ve|zh|hi)/, "");
    router.push(`/${locale}${pathWithoutLocale}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const toHome = (hash: string) => `/${currentLocale}${hash}`;

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div
        className={clsx(
          "mx-auto pointer-events-auto transition-all duration-300 ease-out",
          isScrolled ? "glass-pill w-[min(92vw,64rem)] px-4 sm:px-6 mt-2 rounded-full" : "w-[min(100vw,80rem)] px-6 mt-0"
        )}
      >
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-16">
          {/* Logo */}
          <Link href={toHome("#")} aria-label="Home" prefetch className="inline-flex items-center">
            <Logo src="/gobonki-schriftzug.svg" alt="Gobonki-logo" className="h-8 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex justify-center gap-8">
            {NAV_ITEMS.map(({ hash, key }) => (
              <Link
                key={hash}
                href={toHome(hash)}
                prefetch
                className="relative text-neutral-700 hover:text-brand-600 font-medium transition-colors duration-200 group"
              >
                {t(key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="col-start-3 justify-self-end flex items-center gap-3 sm:gap-4">
            {/* Mini Toggle on Scroll */}
            <div className="hidden md:flex items-center">
              <AnimatePresence>
                {isScrolled && (
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
                        onChange={(v) => setMode(v as "customer" | "business")}
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

            {/* Language Switch */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-white/70 transition-all rounded-full"
                  aria-label="Change language"
                >
                  <Globe className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {APP_LOCALES.map((locale) => (
                  <DropdownMenuItem
                    key={locale}
                    onClick={() => switchLanguage(locale)}
                    className={clsx(
                      "flex items-center justify-between",
                      locale === currentLocale && "font-semibold text-brand-600"
                    )}
                  >
                    {LOCALE_LABELS[locale]}
                    {locale === currentLocale && <ChevronDown size={14} />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Button */}
            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex bg-brand-600 hover:bg-brand-700 text-white"
            >
              <Link href={toHome("#contact")}>{t("contact")}</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden hover:bg-white/70"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[260px] sm:w-[300px] bg-white">
                <nav className="flex flex-col gap-4 mt-8">
                  {NAV_ITEMS.map(({ hash, key }) => (
                    <Link
                      key={hash}
                      href={toHome(hash)}
                      onClick={() => setMobileOpen(false)}
                      className="text-neutral-800 text-lg hover:text-brand-600 transition-colors"
                    >
                      {t(key)}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
