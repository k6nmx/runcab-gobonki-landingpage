// middleware.ts
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "de"],
  defaultLocale: "en",
  localePrefix: "always"
});

export const config = {
  matcher: ["/", "/(en|de)/:path*"]
};
