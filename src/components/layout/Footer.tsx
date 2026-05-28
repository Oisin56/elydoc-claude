import Link from 'next/link'
import { NAV_SERVICES } from '@/config/services'

const company = [
  { label: 'About', href: '/about' },
  { label: 'Employers', href: '/employers' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

const legal = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Terms of Business', href: '/terms' },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-footer)', color: 'var(--color-footer-text)' }}>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">

        {/* Four-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Column 1 — Brand */}
          <div className="space-y-4">
            <p className="font-headline text-xl tracking-tight">ElyDoc</p>
            <p className="text-sm leading-relaxed" style={{ opacity: 0.6 }}>
              Doctor-led online healthcare for suitable conditions in Ireland.
            </p>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h3
              className="text-xs font-medium uppercase tracking-widest mb-5"
              style={{ opacity: 0.45 }}
            >
              Services
            </h3>
            <ul className="space-y-3">
              {NAV_SERVICES.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm transition-opacity hover:opacity-100"
                    style={{ opacity: 0.65 }}
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h3
              className="text-xs font-medium uppercase tracking-widest mb-5"
              style={{ opacity: 0.45 }}
            >
              Company
            </h3>
            <ul className="space-y-3">
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-sm transition-opacity hover:opacity-100"
                    style={{ opacity: 0.65 }}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Legal */}
          <div>
            <h3
              className="text-xs font-medium uppercase tracking-widest mb-5"
              style={{ opacity: 0.45 }}
            >
              Legal
            </h3>
            <ul className="space-y-3">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-opacity hover:opacity-100"
                    style={{ opacity: 0.65 }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs"
          style={{
            borderTop: '1px solid color-mix(in oklch, var(--color-footer-text) 15%, transparent)',
            opacity: 0.55,
          }}
        >
          <div className="space-y-1">
            <p>© 2025 Ely Health and Wellness Group Ltd trading as ElyDoc</p>
            <p>77 Camden Street Lower, Dublin, Ireland</p>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="mailto:hello@elydoc.ie"
              className="transition-opacity hover:opacity-100"
            >
              hello@elydoc.ie
            </a>
            <a
              href="https://www.linkedin.com/company/elydoc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ElyDoc on LinkedIn"
              className="transition-opacity hover:opacity-100"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}

function LinkedInIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
