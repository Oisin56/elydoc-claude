import Tile from '@/components/ui/Tile'
import { SERVICES } from '@/config/services'

export default function ServicesSection() {
  return (
    <section id="services" className="relative bg-background py-16 lg:py-24">
      {/* Diagonal line pattern overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.03) 4px, rgba(0,0,0,0.03) 5px)',
        }}
      />
      {/* Scoped hover styles */}
      <style>{`
        .service-card {
          border: 1px solid color-mix(in oklch, var(--color-text) 8%, transparent);
          transition: background-color 200ms ease, box-shadow 200ms ease;
        }
        .service-card:hover {
          background-color: var(--color-subtle);
          box-shadow:
            inset 0 2px 0 0 var(--color-accent),
            0 8px 28px -6px color-mix(in oklch, var(--color-text) 14%, transparent);
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="font-headline text-3xl lg:text-4xl font-light tracking-tight">
            Our <em className="italic" style={{ color: 'var(--color-accent)' }}>Services</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {SERVICES.map((service) => (
            <Tile
              key={service.name}
              title={service.name}
              description={service.description}
              icon={service.icon}
              href={service.href}
              price={service.price}
              note={service.note ?? undefined}
              className="service-card bg-background rounded p-8 lg:p-10 flex flex-col gap-5"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
