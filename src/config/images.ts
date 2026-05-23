/**
 * Central image configuration for ElyDoc.
 *
 * All images use picsum.photos with named seeds for consistency between
 * page loads. Replace with production assets when they become available.
 * Descriptive alt text is included and should be preserved on replacement.
 */

export const images = {
  /**
   * Hero — Homepage, Section 1.
   * Depicts a professional, clinical consultation context.
   * Portrait orientation to sit alongside the headline text column.
   * Replace: lifestyle photograph of a doctor or patient in a clean, warm setting.
   */
  hero: {
    src: 'https://picsum.photos/seed/elydoc-hero/900/1200',
    alt: 'ElyDoc — professional online GP consultation in a calm, clinical setting',
    width: 900,
    height: 1200,
  },
} as const
