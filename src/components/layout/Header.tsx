'use client'
import { useState, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Globe, Menu, X } from 'lucide-react'
import Logo from '../ui/Logo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations('navigation')
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  //get current locale from pathname
  const currentLocale = useLocale()

  const basePath = (pathname.replace(/^\/(en|de)(?=\/|$)/, '') || '/') as string;

  const switchLanguage = (nextLocale: string) => {
  const target = nextLocale === 'en' ? basePath : `/${nextLocale}${basePath === '/' ? '' : basePath}`;
  router.push(target);
};

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering interactive elements until mounted
  if (!mounted) {
    return (
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Logo src='/gobonki-black.svg' alt='Gobonki-logo' />
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600">Testimonials</a>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-700">
                <Globe size={18} />
                <span>EN</span>
              </div>
              <div className="md:hidden">
                <Menu size={24} />
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo src='/gobonki-black.svg' alt='Gobonki-logo' />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600">
              {t('features')}
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600">
              {t('testimonials')}
            </a>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button 
                onClick={() => switchLanguage('en')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  currentLocale === 'en' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                EN
              </button>
              <button 
                onClick={() => switchLanguage('de')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  currentLocale === 'de' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                DE
              </button>
            </div>
            
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2">
              <a href="#features" className="text-gray-700 hover:text-blue-600 py-2">
                {t('features')}
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 py-2">
                {t('testimonials')}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}