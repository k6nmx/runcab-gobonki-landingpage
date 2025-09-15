import { useTranslations } from "next-intl"
import { TestimonialCard } from "./testimonial-card"

type Item = { rating: number; quote: string; author: string; role: string }

export default function TestimonialsSection() {
  const t = useTranslations("testimonials")
  const items = t.raw("items") as Item[]

  return (
    <section id="testimonials" className="relative">
      {/* soft section wash like your screenshot */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-brand-50/70 to-white" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              {t("title")}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {items?.map((x, i) => (
              <TestimonialCard
                key={i}
                rating={x.rating}
                quote={x.quote}
                author={x.author}
                role={x.role}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
