import Image from 'next/image'
import { ShieldCheck, GraduationCap, CalendarCheck, HeartHandshake, Lock } from 'lucide-react'
import { images } from '@/config/images'
import Tile from '@/components/ui/Tile'

const WHY_TILES = [
  {
    title: 'Specialist Division — IMC',
    description: 'Our doctors are registered on the Specialist Division for General Practice with the Irish Medical Council.',
    icon: ShieldCheck,
  },
  {
    title: 'ICGP Members',
    description: 'Our doctors are full active members of the Irish College of General Practitioners.',
    icon: GraduationCap,
  },
  {
    title: 'Same day appointments',
    description: 'Fast access to specialist GP care for suitable conditions — available today.',
    icon: CalendarCheck,
  },
  {
    title: 'Clear clinical boundaries',
    description: 'If you need in-person care your doctor will tell you honestly and signpost you appropriately.',
    icon: HeartHandshake,
  },
  {
    title: 'Discreet and GDPR compliant',
    description: 'Your consultation and all clinical information remain strictly confidential and GDPR protected.',
    icon: Lock,
  },
]

export default function WhyElyDocSection() {
  return (
    <section id="why-elydoc" className="snap-section" style={{ backgroundColor: 'var(--color-teal-dark)', minHeight: 'var(--section-min-height)' }}>
      {/* Scoped hover styles */}
      <style>{`
        .why-tile {
          background-color: var(--color-background);
          border: 0.5px solid color-mix(in oklch, var(--color-text) 10%, transparent);
          border-radius: 8px;
          padding: 28px 32px;
          transition: transform 220ms ease, box-shadow 220ms ease;
        }
        .why-tile:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px -4px rgba(0, 0, 0, 0.28);
        }
      `}</style>

      {/*
        Stacked grid: image and content share the same grid cell.
        The taller of the two determines the section height — no cropping.
      */}
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
        <div className="relative z-10 lg:min-h-[100svh] lg:flex lg:flex-col lg:justify-center" style={{ gridArea: '1 / 1', paddingBlock: 'var(--section-padding)' }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="mb-16">
              <h2
                className="font-headline text-3xl lg:text-4xl tracking-tight"
                style={{ fontWeight: 300, color: 'var(--color-background)' }}
              >
                Why choose <em className="italic">ElyDoc</em>
              </h2>
            </div>

            {/* Row 1 — three equal tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mb-4 lg:mb-5">
              {WHY_TILES.slice(0, 3).map((tile) => (
                <Tile
                  key={tile.title}
                  title={tile.title}
                  description={tile.description}
                  icon={tile.icon}
                  showLeftBorder
                  className="why-tile flex flex-col gap-4"
                  titleClassName="font-headline text-[20px] font-light"
                  descriptionStyle={{ fontSize: '13px', lineHeight: 1.6, opacity: 0.58 }}
                />
              ))}
            </div>

            {/* Row 2 — two tiles centred at two-thirds width */}
            <div className="lg:w-2/3 lg:mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              {WHY_TILES.slice(3).map((tile) => (
                <Tile
                  key={tile.title}
                  title={tile.title}
                  description={tile.description}
                  icon={tile.icon}
                  showLeftBorder
                  className="why-tile flex flex-col gap-4"
                  titleClassName="font-headline text-[20px] font-light"
                  descriptionStyle={{ fontSize: '13px', lineHeight: 1.6, opacity: 0.58 }}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
