import posthog from "posthog-js";

// lib/posthog.ts
if (typeof window !== "undefined") {
  console.log("🔍 PostHog check:", {
    nodeEnv: process.env.NODE_ENV,
    hasKey: !!process.env.NEXT_PUBLIC_POSTHOG_KEY,
    key: process.env.NEXT_PUBLIC_POSTHOG_KEY?.slice(0, 10),
  });

  if (process.env.NODE_ENV === "production") {
    console.log("✅ Initializing PostHog...");
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST!,
    });
  } else {
    console.log("⚠️ Skipping PostHog (not in production)");
  }
}

export default posthog;
