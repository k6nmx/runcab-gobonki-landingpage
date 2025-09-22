'use client'

import { FeatureCard } from "./feature-card"
import { useMode } from "@/context/mode-context"

const CUSTOMER_FEATURES = [
  { 
    icon: "credit-card", 
    title: "All Cards in One Place", 
    description: "Keep track of all your loyalty cards from different businesses in one convenient location." 
  },
  { 
    icon: "gift", 
    title: "Instant Rewards", 
    description: "Collect stamps and redeem rewards instantly. No waiting, no complications." 
  },
  { 
    icon: "zap", 
    title: "No Registration Hassle", 
    description: "Start collecting stamps immediately. No lengthy sign-up processes or personal info required." 
  },
  { 
    icon: "map-pin", 
    title: "Find Participating Places", 
    description: "Discover cafes, restaurants, and shops near you that offer stamp rewards." 
  },
  { 
    icon: "bookmark", 
    title: "Never Lose Progress", 
    description: "Your stamps are saved automatically—no more lost paper cards or forgotten rewards." 
  },
  { 
    icon: "bell", 
    title: "Smart Notifications", 
    description: "Get reminded when you're close to earning a reward or when special offers are available." 
  },
] as const

const BUSINESS_FEATURES = [
  { 
    icon: "trending-up", 
    title: "Increase Customer Retention", 
    description: "Boost repeat visits by up to 40% with engaging digital loyalty programs that customers actually use." 
  },
  { 
    icon: "bar-chart-3", 
    title: "Detailed Analytics", 
    description: "Track customer behavior, reward redemption rates, and ROI with comprehensive dashboards." 
  },
  { 
    icon: "settings", 
    title: "Easy Setup & Management", 
    description: "Launch your loyalty program in minutes. No technical knowledge required, no complex integrations." 
  },
  { 
    icon: "users", 
    title: "Customer Database", 
    description: "Build a valuable customer database with insights into preferences and visit patterns." 
  },
  { 
    icon: "dollar-sign", 
    title: "Increase Revenue", 
    description: "Drive higher average order values and frequency with targeted rewards and promotions." 
  },
  { 
    icon: "smartphone", 
    title: "Mobile-First Experience", 
    description: "Customers love the convenience. No apps to download, no cards to carry—just scan and earn." 
  },
] as const

export default function FeaturesSection() {
  const { mode } = useMode()
  const features = mode === 'customer' ? CUSTOMER_FEATURES : BUSINESS_FEATURES
  const title = mode === 'customer' ? 'Why Choose gobonki?' : 'Why Businesses Choose gobonki?'
  const subtitle = mode === 'customer' 
    ? 'Enjoy rewards from all your favorite places in one simple interface'
    : 'Everything you need to build customer loyalty and drive repeat business'

  return (
    <section id="features" className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              {title}
            </h2>
            <p className="mt-3 text-lg text-neutral-600">
              {subtitle}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map(f => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}