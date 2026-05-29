'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { NAV_SERVICES } from '@/config/services'

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? '#'

function smoothScrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setServicesOpen(false)
    }
    function onClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [])

  function handleServicesClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (isHome) {
      e.preventDefault()
      smoothScrollTo('services')
    }
    setMobileOpen(false)
    setServicesOpen(false)
  }

  function handleAboutClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (isHome) {
      e.preventDefault()
      smoothScrollTo('why-elydoc')
    }
    setMobileOpen(false)
  }

  function handleEmployersClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (isHome) {
      e.preventDefault()
      smoothScrollTo('employers')
    }
    setMobileOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-subtle">
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16 lg:h-20"
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="font-headline text-xl lg:text-2xl text-text tracking-tight"
        >
          ElyDoc
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Services — smart link + dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href={isHome ? '#services' : '/services'}
              onClick={handleServicesClick}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              className="flex items-center gap-1.5 text-sm text-text hover:text-accent transition-colors"
            >
              Services
              <ChevronDown open={servicesOpen} />
            </Link>

            {servicesOpen && (
              // pt-2 (not mt-2) keeps the hover bridge continuous between the
              // trigger and the menu so the pointer can reach the items.
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 pt-2">
                <div
                  role="menu"
                  className="bg-background border border-subtle rounded py-1.5 shadow-sm"
                >
                  {NAV_SERVICES.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      role="menuitem"
                      onClick={() => setServicesOpen(false)}
                      className="block px-4 py-2 text-sm text-text hover:text-accent hover:bg-subtle transition-colors"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* About — smart link */}
          <Link
            href={isHome ? '#why-elydoc' : '/about'}
            onClick={handleAboutClick}
            className="text-sm text-text hover:text-accent transition-colors"
          >
            About
          </Link>

          <Link
            href={isHome ? '#employers' : '/employers'}
            onClick={handleEmployersClick}
            className="text-sm text-text hover:text-accent transition-colors"
          >
            Employers
          </Link>

          <Link href="/blog" className="text-sm text-text hover:text-accent transition-colors">
            Insights
          </Link>

          <Link
            href={BOOKING_URL}
            className="text-sm px-5 py-2.5 rounded bg-accent text-background hover:bg-accent-dark transition-colors"
          >
            Book a Consultation
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          className="lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10 -mr-2"
        >
          <span
            className={`block h-px w-6 bg-text origin-center transition-transform duration-200 ${
              mobileOpen ? 'translate-y-[6px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-px w-6 bg-text transition-opacity duration-200 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-px w-6 bg-text origin-center transition-transform duration-200 ${
              mobileOpen ? '-translate-y-[6px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-subtle bg-background px-6 py-8 space-y-8"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-text mb-4" style={{ opacity: 0.45 }}>
              Services
            </p>
            <ul className="space-y-4">
              {NAV_SERVICES.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm text-text hover:text-accent transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <ul className="space-y-4">
            <li>
              <Link
                href={isHome ? '#why-elydoc' : '/about'}
                onClick={handleAboutClick}
                className="text-sm text-text hover:text-accent transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href={isHome ? '#employers' : '/employers'}
                onClick={handleEmployersClick}
                className="text-sm text-text hover:text-accent transition-colors"
              >
                Employers
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-text hover:text-accent transition-colors"
              >
                Insights
              </Link>
            </li>
          </ul>

          <Link
            href={BOOKING_URL}
            onClick={() => setMobileOpen(false)}
            className="inline-block text-sm px-5 py-2.5 rounded bg-accent text-background hover:bg-accent-dark transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      )}
    </header>
  )
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path
        d="M2 4l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
