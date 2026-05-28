import Link from 'next/link'
import Tile from '@/components/ui/Tile'

const EMPLOYER_TILES = [
  {
    title: 'Boost employee wellbeing',
    description: 'Give your team fast access to specialist GP care when they need it.',
  },
  {
    title: 'Reduce workplace absence',
    description: 'Early GP intervention means less time off and faster recovery.',
  },
  {
    title: 'A benefit worth having',
    description: 'Confidential, doctor-led care — a modern benefit your team will value.',
  },
]

export default function EmployerSection() {
  return (
    <section id="employers" className="relative bg-subtle snap-section lg:flex lg:flex-col lg:justify-center" style={{ paddingBlock: 'var(--section-padding)', minHeight: 'var(--section-min-height)' }}>
      {/* Diagonal line pattern overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.03) 4px, rgba(0,0,0,0.03) 5px)',
        }}
      />
      <style>{`
        .employer-tile {
          background-color: var(--color-background);
          border: 0.5px solid color-mix(in oklch, var(--color-text) 10%, transparent);
          border-radius: 8px;
          padding: 28px 32px;
          transition: box-shadow 200ms ease;
        }
        .employer-tile:hover {
          box-shadow: 0 8px 24px -4px color-mix(in oklch, var(--color-text) 10%, transparent);
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left: text */}
        <div className="flex flex-col gap-7">
          <h2 className="font-headline text-4xl lg:text-5xl font-light tracking-tight">
            Are you an <em className="italic" style={{ color: 'var(--color-accent)' }}>employer</em>?
          </h2>

          <p className="text-base lg:text-lg leading-relaxed" style={{ opacity: 0.65 }}>
            Offer your team access to specialist GP care — fast, flexible and doctor-led.
          </p>

          <div>
            <Link
              href="/employers"
              className="inline-block px-8 py-4 bg-accent text-background text-sm font-medium rounded transition-colors hover:bg-accent-dark"
            >
              Contact us for pricing
            </Link>
          </div>
        </div>

        {/* Right: benefit tiles */}
        <div className="flex flex-col gap-4">
          {EMPLOYER_TILES.map((tile) => (
            <Tile
              key={tile.title}
              title={tile.title}
              description={tile.description}
              showLeftBorder
              className="employer-tile space-y-2"
              titleClassName="font-headline text-lg font-light"
            />
          ))}
        </div>

      </div>
    </section>
  )
}
