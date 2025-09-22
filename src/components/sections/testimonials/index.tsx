'use client'

import { TestimonialCard } from "./testimonial-card"
import { useMode } from "@/context/mode-context"

const CUSTOMER_TESTIMONIALS = [
  {
    rating: 5,
    quote: "I used to lose my coffee punch cards all the time. Now I never miss out on my free drinks!",
    author: "Sarah M.",
    role: "Regular Customer"
  },
  {
    rating: 5,
    quote: "Love that I can track rewards from all my favorite places in one app. So convenient!",
    author: "Mike R.",
    role: "Food Enthusiast"
  },
  {
    rating: 5,
    quote: "The notifications remind me when I'm close to earning rewards. I actually save money now!",
    author: "Emma L.",
    role: "Busy Professional"
  }
]

const BUSINESS_TESTIMONIALS = [
  {
    rating: 5,
    quote: "We saw a 35% increase in repeat customers within the first month. The setup was incredibly easy.",
    author: "David Chen",
    role: "Cafe Owner, Brew & Bean"
  },
  {
    rating: 5,
    quote: "The analytics help us understand our customers better. We've optimized our rewards and increased sales.",
    author: "Maria Rodriguez",
    role: "Restaurant Manager, Taco Corner"
  },
  {
    rating: 5,
    quote: "Our customers love the convenience. No more paper cards cluttering their wallets!",
    author: "James Wilson",
    role: "Barber Shop Owner"
  }
]

export default function TestimonialsSection() {
  const { mode } = useMode()
  const testimonials = mode === 'customer' ? CUSTOMER_TESTIMONIALS : BUSINESS_TESTIMONIALS
  const title = mode === 'customer' ? 'What Our Users Say' : 'What Business Owners Say'

  return (
    <section id="testimonials" className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-brand-50/70 to-white" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              {title}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((item, i) => (
              <TestimonialCard
                key={i}
                rating={item.rating}
                quote={item.quote}
                author={item.author}
                role={item.role}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}