"use client";


import React from "react";
import Link from "next/link";
import { DesktopNavProps } from "./types";

export function DesktopNav({ items, toHome, t }: DesktopNavProps) {
  return (
    <nav className="hidden md:flex justify-center gap-8">
      {items.map(({ hash, key }) => (
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
  );
}

export default DesktopNav;
