'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

type Option = { value: string; label: React.ReactNode }
type Props = {
  value: string
  onChange: (v: string) => void
  options: Option[]
  className?: string
  dir?: 'ltr' | 'rtl'
  compact?: boolean // NEW: flag for mini version
}

export function SegmentedToggle({
  value,
  dir = 'ltr',
  onChange,
  options,
  className,
  compact = false, // NEW
}: Props) {
  const displayOptions = React.useMemo(
    () => (dir === 'rtl' ? [...options].reverse() : options),
    [options, dir]
  )

  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const buttonsRef = React.useRef<Map<string, HTMLButtonElement | null>>(new Map())
  const [focusedValue, setFocusedValue] = React.useState<string | null>(null)

  const [highlight, setHighlight] = React.useState<{
    width: number
    height: number
    left: number
    top: number
    opacity: number
  }>({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    opacity: 0,
  })

  const rafRef = React.useRef<number | null>(null)
  const resizeTimerRef = React.useRef<number | null>(null)
  const isFirstMeasure = React.useRef(true)

  const activeKey = focusedValue ?? value

  const measureAndSet = React.useCallback((skipTransition = false) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    rafRef.current = requestAnimationFrame(() => {
      const container = containerRef.current
      if (!container) {
        setHighlight((h) => ({ ...h, opacity: 0, width: 0 }))
        return
      }

      const btn = buttonsRef.current.get(activeKey) || null
      if (!btn) {
        setHighlight((h) => ({ ...h, opacity: 0, width: 0 }))
        return
      }

      const left = btn.offsetLeft
      const top = btn.offsetTop
      const width = btn.offsetWidth
      const height = btn.offsetHeight

      const L = Math.round(left)
      const T = Math.round(top)
      const W = Math.round(width)
      const H = Math.round(height)

      setHighlight({
        width: W,
        height: H,
        left: L,
        top: T,
        opacity: 1,
      })

      if (skipTransition && container) {
        const pill = container.querySelector('[aria-hidden="true"]') as HTMLElement
        if (pill) {
          pill.style.transition = 'none'
          requestAnimationFrame(() => {
            pill.style.transition = ''
          })
        }
      }

      if (isFirstMeasure.current) {
        isFirstMeasure.current = false
      }
    })
  }, [activeKey])

  React.useEffect(() => {
    measureAndSet(false)
    const id = requestAnimationFrame(() => measureAndSet(false))
    return () => cancelAnimationFrame(id)
  }, [measureAndSet, options])

  React.useEffect(() => {
    function handleDebounced() {
      if (resizeTimerRef.current) {
        window.clearTimeout(resizeTimerRef.current)
      }
      resizeTimerRef.current = window.setTimeout(() => {
        measureAndSet(true)
      }, 60)
    }

    const ro = new ResizeObserver(handleDebounced)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', handleDebounced)
    window.addEventListener('scroll', handleDebounced, { passive: true })

    return () => {
      if (resizeTimerRef.current) window.clearTimeout(resizeTimerRef.current)
      ro.disconnect()
      window.removeEventListener('resize', handleDebounced)
      window.removeEventListener('scroll', handleDebounced)
    }
  }, [measureAndSet])

  React.useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const onKeyDown: React.KeyboardEventHandler = (e) => {
    const KEY = e.key
    const isLeft = KEY === 'ArrowLeft'
    const isRight = KEY === 'ArrowRight'
    const isHome = KEY === 'Home'
    const isEnd = KEY === 'End'

    if (!(isLeft || isRight || isHome || isEnd)) return

    e.preventDefault()
    e.stopPropagation()

    const currentValue = focusedValue ?? value
    const idx = displayOptions.findIndex((o) => o.value === currentValue)
    if (idx === -1) return

    const leftMeansPrev = dir === 'ltr' ? true : false

    if (isLeft || isRight) {
      const movePrev = isLeft ? leftMeansPrev : !leftMeansPrev
      let nextIdx = movePrev ? idx - 1 : idx + 1
      if (nextIdx < 0) nextIdx = displayOptions.length - 1
      if (nextIdx >= displayOptions.length) nextIdx = 0
      const nextVal = displayOptions[nextIdx].value

      const btn = buttonsRef.current.get(nextVal)
      btn?.focus()
      onChange(nextVal)
    } else if (isHome) {
      const first = displayOptions[0].value
      buttonsRef.current.get(first)?.focus()
      onChange(first)
    } else if (isEnd) {
      const last = displayOptions[displayOptions.length - 1].value
      buttonsRef.current.get(last)?.focus()
      onChange(last)
    }
  }

  function setButtonRef(valueKey: string, el: HTMLButtonElement | null) {
    const m = buttonsRef.current
    if (el) m.set(valueKey, el)
    else m.delete(valueKey)
  }

  const onButtonFocus = (v: string) => {
    setFocusedValue(v)
  }
  
  const onButtonBlur = () => {
    window.setTimeout(() => {
      const activeEl = document.activeElement
      const isInside = activeEl && containerRef.current && containerRef.current.contains(activeEl)
      if (!isInside) setFocusedValue(null)
    }, 0)
  }

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-orientation="horizontal"
      dir={dir}
      onKeyDown={onKeyDown}
      className={cn(
        'relative inline-flex items-center rounded-full bg-neutral-100 p-1 shadow-sm',
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute z-0 rounded-full bg-white shadow-sm transition-[transform,width,height,opacity] duration-200 ease-out pointer-events-none"
        style={{
          left: 0,
          top: `${highlight.top}px`,
          height: `${highlight.height}px`,
          width: `${highlight.width}px`,
          transform: `translateX(${highlight.left}px)`,
          opacity: highlight.opacity,
          willChange: 'transform, width, height, opacity',
        }}
      />

      {displayOptions.map((opt, i) => {
        const selected = value === opt.value
        return (
          <button
            key={opt.value}
            ref={(el) => setButtonRef(opt.value, el)}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`segmented-tab-${i}`}
            tabIndex={selected ? 0 : -1}
            onFocus={() => {
              onButtonFocus(opt.value)
              requestAnimationFrame(() => measureAndSet(false))
            }}
            onBlur={onButtonBlur}
            onClick={() => {
              onChange(opt.value)
            }}
            className={cn(
              'relative z-10 text-sm font-medium transition-colors rounded-full focus:outline-none cursor-pointer',
              // Conditional padding based on compact mode
              compact ? 'px-2.5 py-1.5' : 'px-4 py-2',
              selected ? 'text-neutral-900' : 'text-neutral-600 hover:text-neutral-800'
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