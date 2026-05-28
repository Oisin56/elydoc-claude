import Link from 'next/link'
import type { CSSProperties } from 'react'
import type { LucideIcon } from 'lucide-react'

interface TileProps {
  title: string
  description?: string
  /** Optional Lucide icon rendered above the title */
  icon?: LucideIcon
  /** Applies a 2px teal left border — used by Why and Employer tiles */
  showLeftBorder?: boolean
  /** Renders a "Learn more →" link — used by service cards */
  href?: string
  /** Price string — used by service cards */
  price?: string
  /** Sub-price note — used by service cards */
  note?: string
  /** Applied to the root div — controls padding, hover class, layout */
  className?: string
  /** h3 className — defaults to font-headline text-xl font-light */
  titleClassName?: string
  /** Inline style overrides for the description <p> */
  descriptionStyle?: CSSProperties
}

export default function Tile({
  title,
  description,
  icon: Icon,
  showLeftBorder,
  href,
  price,
  note,
  className = '',
  titleClassName = 'font-headline text-xl font-light',
  descriptionStyle,
}: TileProps) {
  const hasPriceSection = !!(price || note)

  return (
    <div
      className={className}
      style={showLeftBorder ? { borderLeft: '2px solid var(--color-accent)' } : undefined}
    >
      {Icon && (
        <Icon size={20} strokeWidth={1.5} style={{ color: 'var(--color-accent)' }} aria-hidden />
      )}

      <div className={hasPriceSection ? 'space-y-2 flex-1' : 'space-y-2'}>
        <h3 className={titleClassName}>{title}</h3>
        {description && (
          <p
            className="text-sm leading-relaxed"
            style={{ opacity: 0.62, ...descriptionStyle }}
          >
            {description}
          </p>
        )}
      </div>

      {hasPriceSection && (
        <div>
          {price && (
            <p className="text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
              {price}
            </p>
          )}
          {note && (
            <p className="text-xs mt-0.5" style={{ opacity: 0.5 }}>
              {note}
            </p>
          )}
        </div>
      )}

      {href && (
        <Link
          href={href}
          className="text-sm font-medium text-accent hover:text-accent-dark transition-colors self-start"
          aria-label={`Learn more about ${title}`}
        >
          Learn more →
        </Link>
      )}
    </div>
  )
}
