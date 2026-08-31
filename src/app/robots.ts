/*
  ============================================================================
  REMOVE BEFORE LAUNCH — this blocks all search engine indexing.
  ============================================================================
  The site is in development, so every crawler is disallowed from every path.

  To restore at launch:
    1. Replace the rule below with: { userAgent: '*', allow: '/', disallow: '/studio/' }
    2. Uncomment the sitemap declaration.
    3. Remove the matching robots block in src/app/layout.tsx.
*/

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
    // REMOVE BEFORE LAUNCH — re-enable when the site goes live:
    // sitemap: 'https://elygp.ie/sitemap.xml',
  }
}
