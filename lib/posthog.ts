import posthog from "posthog-js";

if (typeof window !== "undefined") {
  console.log("🔍 PostHog check:", {
    nodeEnv: process.env.NODE_ENV,
    hasKey: !!process.env.NEXT_PUBLIC_POSTHOG_KEY,
    key: process.env.NEXT_PUBLIC_POSTHOG_KEY?.slice(0, 10),
  });

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    ui_host: "https://eu.posthog.com",
    persistence:
      process.env.NODE_ENV === "production"
        ? "localStorage+cookie"
        : "memory",
  });

  window.posthog = posthog;
}

export default posthog;
