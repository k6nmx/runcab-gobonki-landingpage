'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

type Option = { value: string; label: React.ReactNode }
type Props = {
  value: string
  onChange: (v: string) => void
  options: Option[]
  className?: string
  dir?: "ltr" | "rtl"
}

export function SegmentedToggle({ value, dir = "ltr", onChange, options, className }: Props) {
  const [highlightStyle, setHighlightStyle] = React.useState<React.CSSProperties>({})
  const buttonsRef = React.useRef<Map<string, HTMLButtonElement | null>>(new Map())
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Visual order for DOM
  const displayOptions = dir === "rtl" ? [...options].reverse() : options

  // Helper to measure and set highlight; run inside rAF to ensure DOM is ready
  const measureAndSet = React.useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const selectedButton = buttonsRef.current.get(value) || null
    if (!selectedButton) {
      setHighlightStyle({ width: '0px', opacity: 0 })
      return
    }

    const buttonRect = selectedButton.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const width = buttonRect.width

    if (dir === 'ltr') {
      const left = buttonRect.left - containerRect.left
      setHighlightStyle({
        width: `${width}px`,
        left: `${Math.round(left)}px`,
        right: 'auto',
        opacity: 1,
        transform: 'none',
      })
    } else {
      // RTL: position from container's right edge
      const right = containerRect.right - buttonRect.right
      setHighlightStyle({
        width: `${width}px`,
        right: `${Math.round(right)}px`,
        left: 'auto',
        opacity: 1,
        transform: 'none',
      })
    }
  }, [value, dir])

  // Run measurement when value/options/dir changes — but wait a frame so refs update.
  React.useEffect(() => {
    let raf = 0
    raf = requestAnimationFrame(() => {
      // extra rAF in case of multiple microtasks required
      requestAnimationFrame(() => measureAndSet())
    })
    return () => cancelAnimationFrame(raf)
  }, [value, options, dir, measureAndSet])

  // Keep it in sync on resize / element size changes
  React.useEffect(() => {
    function handle() {
      requestAnimationFrame(() => measureAndSet())
    }

    window.addEventListener('resize', handle)
    const ro = new ResizeObserver(handle)
    if (containerRef.current) ro.observe(containerRef.current)

    return () => {
      window.removeEventListener('resize', handle)
      ro.disconnect()
    }
  }, [measureAndSet])

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-flex items-center rounded-full bg-neutral-100 p-1 shadow-sm', className)}
      role="tablist"
      dir={dir}
    >
      {/* highlight: use left for LTR, right for RTL. pointer-events-none so it never blocks clicks */}
      <div
        className="absolute inset-y-1 z-0 rounded-full bg-white shadow-sm transition-all duration-300 ease-out pointer-events-none"
        style={{
          // baseline: occupy no space until measured
          width: highlightStyle.width ?? '0px',
          left: highlightStyle.left,
          right: highlightStyle.right,
          opacity: highlightStyle.opacity ?? 0,
          transform: highlightStyle.transform ?? 'none',
        }}
      />

      {displayOptions.map((opt) => {
        return (
          <button
            key={opt.value}
            ref={(el) => {
              const m = buttonsRef.current
              if (el) m.set(opt.value, el)
              else m.delete(opt.value)
            }}
            type="button"
            role="tab"
            aria-selected={value === opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              'relative z-10 px-4 py-2 text-sm font-medium transition-colors hover:cursor-pointer rounded-full',
              value === opt.value ? 'text-neutral-900' : 'text-neutral-600 hover:text-neutral-800'
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

export default SegmentedToggle
