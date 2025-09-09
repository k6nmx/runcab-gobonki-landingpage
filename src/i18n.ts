import { getRequestConfig, GetRequestConfigParams, RequestConfig } from "next-intl/server";

const locales = ["en", "de"] as const;
type Locale = typeof locales[number];

function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export default getRequestConfig(async ({ locale }: GetRequestConfigParams): Promise<RequestConfig> => {
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default
  };
});