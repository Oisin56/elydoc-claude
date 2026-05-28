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
  metadataBase: new URL('https://elydoc.ie'),
  title: {
    default: 'ElyDoc — Online GP Consultations Ireland',
    template: '%s | ElyDoc',
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
