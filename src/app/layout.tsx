import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-headline',
  display: 'swap',
  axes: ['opsz'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://elygp.ie'),
  /*
    REMOVE BEFORE LAUNCH — this blocks all search engine indexing.
    Paired with the site-wide disallow in src/app/robots.ts. Both must be
    removed together when the site goes live.
  */
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  title: {
    default: 'ElyGP — Online GP Consultations Ireland',
    template: '%s | ElyGP',
  },
  description:
    'Doctor-led online healthcare for suitable conditions in Ireland. Book a consultation with a specialist-trained GP today.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IE" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex flex-col min-h-screen bg-background text-text font-body">
        {children}
      </body>
    </html>
  )
}
