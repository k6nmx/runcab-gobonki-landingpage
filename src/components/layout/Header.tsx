'use client'
import { useState, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, Globe, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Logo from '../ui/Logo'
import clsx from 'clsx'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('navigation')
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  const basePath = (pathname.replace(/^\/(en|de)(?=\/|$)/, '') || '/') as string
  const switchLanguage = (nextLocale: string) => {
    const target = nextLocale === 'en' ? basePath : `/${nextLocale}${basePath === '/' ? '' : basePath}`
    router.push(target)
  }

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMounted(true), [])

  const navigationItems = [
    { href: '#features', label: t('features') },
    { href: '#pricing', label: t('pricing') },
    { href: '#about', label: t('about') },
    { href: '#contact', label: t('contact') }
  ]

  if(mounted) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div
        className={clsx(
          'mx-auto transition-all duration-300 ease-out pointer-events-auto',
          // Width behavior:
          // - Not scrolled: normal page width
          // - Scrolled: shorter "pill" width (tweak max-w-* if your nav wraps)
          isScrolled ? 'w-[min(92vw,64rem)]' : 'max-w-7xl w-full',
          // Horizontal padding stays on the inner container
          isScrolled ? 'px-3 sm:px-4' : 'px-4 sm:px-6 lg:px-8',
          // Vertical position: sit flush at top normally; float 8–12px when scrolled
          isScrolled ? 'mt-2 sm:mt-3' : 'mt-0',
          // Shape/appearance
          isScrolled ? 'glass-pill rounded-full' : ''
        )}
      >
        <div
          className={clsx(
            'grid grid-cols-[auto_1fr_auto] items-center',
            // Keep height stable to avoid layout jumps
            'h-16',
            // Inner padding is slightly tighter when scrolled to sell the pill
            isScrolled ? 'px-3' : ''
          )}
        >
          {/* Logo */}
          <Logo src="/gobonki-black.svg" alt="Gobonki-logo" className="h-8 w-auto" />

          {/* Desktop Navigation (centered) */}
          <nav className="hidden md:flex justify-center gap-8">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-neutral-700 hover:text-brand-600 font-medium transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Dropdown */}
            <div className="hidden sm:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Globe size={16} />
                    {currentLocale.toUpperCase()}
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => switchLanguage('en')}
                    className={currentLocale === 'en' ? 'bg-brand-50 text-brand-600' : ''}
                  >
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => switchLanguage('de')}
                    className={currentLocale === 'de' ? 'bg-brand-50 text-brand-600' : ''}
                  >
                    Deutsch
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* CTA */}
            <div className="hidden sm:block">
              <Button className="btn-gradient btn-shadow px-5 py-2.5 text-sm font-semibold rounded-lg cursor-pointer">
                Get Started
              </Button>
            </div>

            {/* Mobile */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="mt-8 flex flex-col space-y-8">
                  <nav className="flex flex-col space-y-6">
                    {navigationItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="text-lg font-medium text-neutral-700 hover:text-brand-600 transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                  <div className="space-y-3">
                    <h4 className="font-medium text-neutral-900">Language</h4>
                    <div className="flex rounded-lg bg-neutral-100 p-1">
                      <Button
                        variant={currentLocale === 'en' ? 'default' : 'ghost'}
                        size="sm"
                        className="flex-1"
                        onClick={() => switchLanguage('en')}
                      >
                        English
                      </Button>
                      <Button
                        variant={currentLocale === 'de' ? 'default' : 'ghost'}
                        size="sm"
                        className="flex-1"
                        onClick={() => switchLanguage('de')}
                      >
                        Deutsch
                      </Button>
                    </div>
                  </div>
                  <Button className="btn-gradient btn-shadow w-full px-5 py-2.5 text-sm font-semibold rounded-lg">
                    Get Started
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
}
