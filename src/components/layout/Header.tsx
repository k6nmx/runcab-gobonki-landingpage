'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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

import { APP_LOCALES, LOCALE_LABELS } from "@/i18n/constants";


// Define AppLocale type based on APP_LOCALES
type AppLocale = (typeof APP_LOCALES)[number];

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
  const pathname = usePathname() || '/';
  const searchParams = useSearchParams();
  const currentLocale = useLocale();

  // helpers
  const localeHome = `/${currentLocale}`;
  const toHome = (hash = "") => `${localeHome}${hash}`;

  // Build a new path that preserves query string and hash and swaps locale segment
  function switchLanguage(locale: string) {
    // ensure requested locale is supported
    if (!APP_LOCALES.includes(locale as AppLocale)) {
      console.warn('Unsupported locale requested', locale);
      return;
    }

    // Keep the search params (query)
    const search = searchParams ? `?${searchParams.toString()}` : "";

    // Attempt to preserve hash if present in window (client)
    const hash = typeof window !== 'undefined' ? window.location.hash || '' : '';

    // Pathname splitting: leading slash gives first empty element
    const segments = pathname.split("/"); // e.g. ['', 'en', 'about']
    // If second segment is a known locale, replace it
    if (segments.length > 1 && APP_LOCALES.includes(segments[1] as AppLocale)) {
      segments[1] = locale;
    } else {
      // No locale segment yet — insert after leading slash
      segments.splice(1, 0, locale);
    }

    // Ensure we don't accidentally create double slashes
    const newPath = segments.join("/") || `/${locale}`;

    // Replace route without adding to history stack (use replace)
    router.replace(`${newPath}${search}${hash}`);
  }

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
          <Link
            href={toHome("#")}
            aria-label="Home"
            prefetch
            className="inline-flex items-center"
            onClick={(e) => {
              const home = localeHome.replace(/\/$/, "");
              const here = pathname.replace(/\/$/, "");
              if (here === home) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
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
            {/* Language Dropdown (desktop) */}
            <div className="hidden sm:block">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Globe size={16} />
                    { (LOCALE_LABELS as Record<string,string>)[currentLocale] ?? currentLocale.toUpperCase() }
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  {APP_LOCALES.map((lc) => (
                    <DropdownMenuItem
                      key={lc}
                      onClick={() => switchLanguage(lc)}
                      className={currentLocale === lc ? "bg-brand-50 text-brand-600" : ""}
                    >
                      {(LOCALE_LABELS as Record<string,string>)[lc] ?? lc.toUpperCase()}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

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

            {/* Mobile sheet */}
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
                    <h4 className="font-medium text-neutral-900">{t("language") ?? "Language"}</h4>
                    <div className="flex rounded-lg bg-neutral-100 p-1">
                      {APP_LOCALES.map((lc) => (
                        <Button
                          key={lc}
                          variant={currentLocale === lc ? "default" : "ghost"}
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            switchLanguage(lc);
                            setMobileOpen(false);
                          }}
                        >
                          {(LOCALE_LABELS as Record<string,string>)[lc] ?? lc.toUpperCase()}
                        </Button>
                      ))}
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
