"use client";

import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import pluginConfig from "../../config/cookie-consent.config";
import "vanilla-cookieconsent/dist/cookieconsent.css";

export default function CookieConsentBanner() {
  useEffect(() => {
    CookieConsent.run(pluginConfig);
  }, []);

  return null;
}