'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

type Option = { value: string; label: React.ReactNode }
type Props = {
  value: string
  onChange: (v: string) => void
  options: Option[]
  className?: string
}

export function SegmentedToggle({ value, onChange, options, className }: Props) {
  const idx = options.findIndex(o => o.value === value)
  return (
    <div
      className={cn('relative inline-flex items-center rounded-full bg-neutral-100 p-1 shadow-sm', className)}
      role="tablist"
    >
      {/* sliding highlight */}
      <div
        className="absolute inset-y-1 z-0 rounded-full bg-white shadow-sm transition-all duration-300"
        style={{
          width: `calc((100% - 0.5rem) / ${options.length})`,
          left: `calc(${idx} * ((100% - 0.5rem) / ${options.length}) + 0.25rem)`,
        }}
      />
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'relative z-10 px-4 py-2 text-sm font-medium transition-colors hover:cursor-pointer',
            value === opt.value ? 'text-neutral-900' : 'text-neutral-600'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
