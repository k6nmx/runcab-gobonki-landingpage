// src/components/header/types.ts
import { APP_LOCALES } from "@/i18n/constants";

export type AppLocale = (typeof APP_LOCALES)[number];

export type NavItem = {
  hash: string;
  key: string;
};

export type LanguageSwitcherProps = {
  currentLocale: string;
  onSwitch: (locale: AppLocale) => void;
};

export type MiniModeToggleProps = {
  mode: string;
  onModeChange: (mode: "customer" | "business") => void;
  isVisible: boolean;
};

export type DesktopNavProps = {
  items: NavItem[];
  toHome: (hash: string) => string;
  t: (key: string) => string;
};

export type MobileMenuProps = {
  items: NavItem[];
  toHome: (hash: string) => string;
  t: (key: string) => string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
