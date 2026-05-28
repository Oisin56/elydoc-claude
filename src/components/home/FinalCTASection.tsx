import Image from 'next/image'
import Link from 'next/link'
import { images } from '@/config/images'

export default function FinalCTASection() {
  return (
    <section id="book-consultation" style={{ backgroundColor: 'var(--color-teal-dark)' }}>
      {/* Stacked grid: image and content share same cell — no cropping */}
      <div className="grid">
        <Image
          src={images.chairsBackground.src}
          alt=""
          width={images.chairsBackground.width}
          height={images.chairsBackground.height}
          sizes="100vw"
          className="w-full h-auto block"
          style={{ gridArea: '1 / 1' }}
          aria-hidden
        />
        <div
          style={{ gridArea: '1 / 1', backgroundColor: 'var(--color-teal-dark)', opacity: 0.85 }}
          aria-hidden
        />
        <div
          className="relative z-10 flex items-center justify-center"
          style={{ gridArea: '1 / 1', paddingTop: '96px', paddingBottom: '64px' }}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center space-y-9">
            <h2
              className="font-headline text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight"
              style={{ color: 'var(--color-background)' }}
            >
              Ready to speak to a GP?
            </h2>
            <div>
              <Link
                href={process.env.NEXT_PUBLIC_BOOKING_URL ?? '#'}
                className="inline-block px-8 py-4 text-sm font-medium rounded transition-colors"
                style={{
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-accent)',
                }}
              >
                Book a Consultation
              </Link>
            </div>
            <p
              className="text-xs leading-relaxed max-w-2xl mx-auto"
              style={{ color: 'color-mix(in oklch, var(--color-background) 60%, transparent)' }}
            >
              If you are experiencing a medical emergency, chest pain, stroke symptoms or severe
              acute illness, please call 999 or attend your nearest Emergency Department
              immediately. ElyDoc is not an emergency service.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
