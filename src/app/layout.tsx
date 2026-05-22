import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-headline',
  display: 'swap',
  // Optical size axis enabled for display use at larger sizes
  axes: ['opsz'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ElyDoc — Online GP Consultations Ireland',
  description:
    'Doctor-led online healthcare for suitable conditions in Ireland. Book a consultation with a specialist-trained GP today.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
