
"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { APP_LOCALES, LOCALE_LABELS } from "@/i18n/constants";
import { LanguageSwitcherProps } from "./types";


export function LanguageSwitcher({ currentLocale, onSwitch }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const handleOpen = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  const handleCloseWithDelay = useCallback((delay = 120) => {
    clearCloseTimer();
    
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
      closeTimer.current = null;
    }, delay);
  }, [clearCloseTimer]);

  
  const supportsHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {/* Attach mouse events to trigger so entering opens immediately */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-white/70 transition-all rounded-full"
          aria-label="Change language"
          
          onMouseEnter={supportsHover ? handleOpen : undefined}
          onMouseLeave={supportsHover ? () => handleCloseWithDelay() : undefined}
          
        >
          <Globe className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>

      {/* Keep content open while pointer is over it */}
      <DropdownMenuContent
        align="end"
        onMouseEnter={supportsHover ? handleOpen : undefined}
        onMouseLeave={supportsHover ? () => handleCloseWithDelay() : undefined}
      >
        {APP_LOCALES.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onSelect={() => {
              onSwitch(locale);
              setOpen(false);
            }}
            className={clsx(
              "flex items-center justify-between gap-3 cursor-pointer",
              locale === currentLocale && "font-semibold text-brand-600"
            )}
          >
            <span>{LOCALE_LABELS[locale]}</span>
            {locale === currentLocale && <Check size={16} strokeWidth={2.5} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
