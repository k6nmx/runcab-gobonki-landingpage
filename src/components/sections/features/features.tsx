// (no "use client" here)
import { FeatureCard } from "./feature-card"

const FEATURES = [
  { icon: "credit-card", title: "All Cards in One Place", description: "Keep track of all your loyalty cards from different businesses in one convenient location." },
  { icon: "gift",         title: "Instant Rewards",       description: "Collect stamps and redeem rewards instantly. No waiting, no complications." },
  { icon: "zap",          title: "No Registration Hassle",description: "Start collecting stamps immediately. No lengthy sign-up processes or personal info required." },
  { icon: "globe",        title: "Works Everywhere",      description: "Restaurants, barbers, cafés—your digital stamp card just works across locations." },
  { icon: "bookmark",     title: "Never Lose Stamps",     description: "Your progress is saved automatically—no more lost paper cards or forgotten stamps." },
  { icon: "shield-check", title: "Privacy Focused",       description: "We keep things minimal. Your data stays safe and only what’s needed is collected." },
] as const

export default function FeaturesSection() {
  return (
    <section id="features" className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              Why Choose gobonki?
            </h2>
            <p className="mt-3 text-lg text-neutral-600">
              Enjoy rewards from all your favorite places in one simple interface
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {FEATURES.map(f => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
