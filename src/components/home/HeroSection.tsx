import Image from 'next/image'
import Link from 'next/link'
import { images } from '@/config/images'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ height: '100dvh' }}>

      <Image
        src={images.hero.src}
        alt={images.hero.alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Single gradient overlay — holds 72% opacity from 0% to 30%, fades to transparent by 65% */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            'linear-gradient(to right, ' +
            'color-mix(in oklch, var(--color-background) 72%, transparent) 0%, ' +
            'color-mix(in oklch, var(--color-background) 72%, transparent) 30%, ' +
            'transparent 65%)',
        }}
      />

      <div className="relative flex flex-col h-full">
        <div className="flex-1 flex items-center pt-16 lg:pt-20 px-6 lg:px-12 xl:px-20">
          <div className="w-full max-w-[600px]">

            <h1 className="font-headline text-7xl lg:text-8xl font-[300] leading-[1.04] tracking-tight">
              Online GP care,<br />
              when you{' '}
              <em className="text-accent italic">need</em>
              {' '}it.
            </h1>

            <ul className="mt-6 space-y-4 max-w-[44ch]">
              {[
                'Vocationally trained GPs',
                'Specialist Division — Irish Medical Council',
                'Same day appointments available',
              ].map((point) => (
                <li key={point} className="flex items-center gap-3 text-base lg:text-lg text-text">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden style={{ flexShrink: 0 }}>
                    <circle cx="10" cy="10" r="10" fill="var(--color-accent)" />
                    <path d="M6 10.5l2.5 2.5 5.5-5.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href={process.env.NEXT_PUBLIC_BOOKING_URL ?? '#'}
                className="inline-block px-8 py-4 bg-accent text-background text-sm font-medium rounded transition-colors hover:bg-accent-dark"
              >
                Book a Consultation
              </Link>
              <Link
                href="#services"
                className="text-sm font-medium transition-colors hover:text-accent"
              >
                Our Services →
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
