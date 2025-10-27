// src/components/header/MobileMenu.tsx
import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MobileMenuProps } from "./types";

export function MobileMenu({ items, toHome, t, open, onOpenChange }: MobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
          <Link href='https://app.gobonki.com' className="inline-flex" target="_blank" onClick={() => onOpenChange(false)}>
            <button className="btn-gradient btn-shadow w-full px-6 py-2.5 text-white hover:translate-y-0 transform-none text-sm font-semibold rounded-lg hover:cursor-pointer">
              {t("cta")}
            </button>
          </Link>

          {items.map(({ hash, key }) => (
            <Link
              key={hash}
              href={toHome(hash)}
              onClick={() => onOpenChange(false)}
              className="text-neutral-800 text-lg hover:text-brand-600 transition-colors"
            >
              {t(key)}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;
