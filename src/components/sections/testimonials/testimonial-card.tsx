import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  rating: number
  quote: string
  author: string
  role?: string         // optional now
  className?: string
}

export function TestimonialCard({ rating, quote, author, role, className }: Props) {
  const stars = Math.max(0, Math.min(5, rating ?? 0))

  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-neutral-200",
        "bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl",
        className
      )}
    >
      {/* blue glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className="absolute -inset-10 rounded-[2rem] blur-2xl"
          style={{
            background: "radial-gradient(600px 240px at 50% 0%, rgba(14,165,233,.22), transparent 60%)",
          }}
        />
      </div>

      <CardContent className="relative p-6 sm:p-8">
        {/* Stars */}
        <div className="mb-4 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < stars ? "text-brand-500 fill-brand-500" : "text-neutral-300"
              )}
            />
          ))}
        </div>

        {/* Quote */}
        <p className="italic text-neutral-700 leading-7">“{quote}”</p>

        {/* Author */}
        <div className="mt-6">
          <div className="font-semibold text-neutral-900">{author}</div>
          {role ? <div className="text-sm text-neutral-500">{role}</div> : null}
        </div>
      </CardContent>
    </Card>
  )
}
