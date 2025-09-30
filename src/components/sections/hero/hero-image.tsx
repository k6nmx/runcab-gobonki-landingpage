import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function HeroImage({
  src, alt, className,
}: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={cn(
        'relative rounded-2xl bg-white p-2 hero-image-card ring-1 ring-neutral-200',
        className
      )}
    >
      <div className="relative overflow-hidden rounded-xl w-full h-[400px]"> {/* set height */}
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(14,165,233,0.10)]" />
    </div>
  )
}