/**
 * Central image configuration for ElyDoc.
 * All static images are production assets served from /public/images/.
 * Register every next/image asset here and import from this file — never inline src strings.
 * Descriptive alt text is defined here and must be preserved if images are swapped.
 */

export const images = {
  /**
   * Hero — Homepage full-bleed background.
   * Lifestyle photograph of a doctor or patient in a clean, warm consultation setting.
   */
  hero: {
    src: '/images/hero.webp',
    alt: 'ElyDoc — professional online GP consultation in a calm, clinical setting',
    width: 1311,
    height: 805,
  },
  /**
   * Chairs Background — Why ElyDoc section and Final CTA section.
   * Consultation room seating — adds warmth and depth behind the teal overlay.
   */
  chairsBackground: {
    src: '/images/chairs.webp',
    alt: 'ElyDoc consultation room',
    width: 1456,
    height: 816,
  },
} as const
