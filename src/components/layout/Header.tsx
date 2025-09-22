"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Menu, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "../ui/Logo";
import clsx from "clsx";

const NAV_ITEMS = [
  { hash: "#features", key: "features" },
  { hash: "#testimonials", key: "testimonials" },
  { hash: "#faq", key: "faq" },
  { hash: "#contact", key: "contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const t = useTranslations("navigation");
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  // Locale-aware home helpers
  const localeHome = `/${currentLocale}`;
  const toHome = (hash = "") => `${localeHome}${hash}`;

  // Language switcher keeps current path but swaps locale segment
  const switchLanguage = (locale: "en" | "de") => {
    const segments = pathname.split("/");
    segments[1] = locale; // locales are first segment: "/en/..."
    const newPath = segments.join("/");
    router.replace(newPath);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div
        className={clsx(
          "mx-auto transition-all duration-300 ease-out pointer-events-auto",
          // Fixed: Use same calculation method for both states
          isScrolled ? "w-[min(92vw,64rem)]" : "w-[min(100vw,80rem)]",
          isScrolled ? "px-3 sm:px-4" : "px-4 sm:px-6 lg:px-8",
          isScrolled ? "mt-2 sm:mt-3" : "mt-0",
          isScrolled ? "glass-pill rounded-full" : ""
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-[auto_1fr_auto] items-center",
            "h-16",
            isScrolled ? "px-3" : ""
          )}
        >
          {/* Logo → localized home */}
          <Link
            href={localeHome}
            aria-label="Home"
            className="inline-flex items-center"
          >
            <Logo
              src="/gobonki-schriftzug.svg"
              alt="Gobonki-logo"
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation (centered) */}
          <nav className="hidden md:flex justify-center gap-8">
            {NAV_ITEMS.map(({ hash, key }) => (
              <Link
                key={hash}
                href={toHome(hash)}
                prefetch
                className="text-neutral-700 hover:text-brand-600 font-medium transition-colors duration-200 relative group"
              >
                {t(key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="col-start-3 justify-self-end flex items-center gap-2 sm:gap-4">
            {/* Language Dropdown */}
            <div className="hidden sm:block">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Globe size={16} />
                    {currentLocale.toUpperCase()}
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => switchLanguage("en")}
                    className={
                      currentLocale === "en" ? "bg-brand-50 text-brand-600" : ""
                    }
                  >
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => switchLanguage("de")}
                    className={
                      currentLocale === "de" ? "bg-brand-50 text-brand-600" : ""
                    }
                  >
                    Deutsch
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* CTA → localized home#contact (adjust if different) */}
            <div className="hidden sm:block">
              <Button
                className="btn-gradient btn-shadow px-5 py-2.5 hover:translate-y-0 transform-none text-sm font-semibold rounded-lg"
                asChild
              >
                <Link
                  href="https://app.gobonki.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  prefetch
                >
                  {t("cta")}
                </Link>
              </Button>
            </div>

            {/* Mobile */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm" aria-label="Open menu">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-96">
                <div className="mt-8 flex flex-col space-y-8">
                  {/* Mobile Nav */}
                  <nav className="flex flex-col space-y-6">
                    {NAV_ITEMS.map(({ hash, key }) => (
                      <Link
                        key={hash}
                        href={toHome(hash)}
                        prefetch
                        className="text-lg font-medium text-neutral-700 hover:text-brand-600 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {t(key)}
                      </Link>
                    ))}
                  </nav>

                  {/* Language quick toggle */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-neutral-900">
                      {t("language") ?? "Language"}
                    </h4>
                    <div className="flex rounded-lg bg-neutral-100 p-1">
                      <Button
                        variant={currentLocale === "en" ? "default" : "ghost"}
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          switchLanguage("en");
                          setMobileOpen(false);
                        }}
                      >
                        English
                      </Button>
                      <Button
                        variant={currentLocale === "de" ? "default" : "ghost"}
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          switchLanguage("de");
                          setMobileOpen(false);
                        }}
                      >
                        Deutsch
                      </Button>
                    </div>
                  </div>

                  {/* Mobile CTA */}
                  <Button
                    className="btn-gradient btn-shadow w-full px-5 py-2.5 text-sm font-semibold rounded-lg"
                    asChild
                  >
                    <Link
                      href="https://app.gobonki.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      prefetch
                      onClick={() => setMobileOpen(false)}
                    >
                      {t("cta")}
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
