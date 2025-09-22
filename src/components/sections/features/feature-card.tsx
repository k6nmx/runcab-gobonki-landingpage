"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Gift, Zap, Globe, ShieldCheck, Bookmark, LucideIcon, MapPin, Bell, TrendingUp, BarChart3, Settings, Users, DollarSign, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"

const ICONS = {
  "credit-card": CreditCard,
  gift: Gift,
  zap: Zap,
  globe: Globe,
  "shield-check": ShieldCheck,
  bookmark: Bookmark,
  "map-pin": MapPin,
  bell: Bell,
  "trending-up": TrendingUp,
  "bar-chart-3": BarChart3,
  settings: Settings,
  users: Users,
  "dollar-sign": DollarSign,
  smartphone: Smartphone,
} as const;

type IconKey = keyof typeof ICONS

type Props = {
  icon: IconKey           
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon, title, description, className }: Props) {
  const Icon: LucideIcon = ICONS[icon]

  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-neutral-200",
        "bg-gradient-to-b from-white to-brand-50/30",
        "shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl",
        className
      )}
    >
      {/* hover glow behind card */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className="absolute -inset-10 rounded-[2rem] blur-2xl"
          style={{
            background:
              "radial-gradient(600px 240px at 50% 0%, rgba(14,165,233,.25), transparent 60%)",
          }}
        />
      </div>

      <CardContent className="relative p-6 sm:p-8">
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 ring-1 ring-brand-100">
          <Icon className="h-5 w-5 text-brand-600" aria-hidden />
        </div>
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>
      </CardContent>
    </Card>
  )
}
