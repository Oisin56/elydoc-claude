# ElyDoc — SEO Requirements

## Core Principles

Every page is a discrete SEO asset targeting one primary keyword cluster. No two pages compete for the same terms. SEO is built in from day one — not retrofitted.

## Technical Requirements

Every page must have:

- Unique `<title>` via `generateMetadata()` in Next.js App Router
- Unique meta description (150—160 characters)
- Canonical URL
- Open Graph title, description and image
- Relevant JSON-LD structured data
- Semantic HTML with correct heading hierarchy (one H1 per page)
- Mobile-optimised — Google indexes mobile-first
- Images via `next/image` — no render-blocking resources

## Structured Data

Implement as JSON-LD. Schema types by page:

| Page | Schema Type |
| --- | --- |
| All pages | MedicalBusiness |
| Homepage | LocalBusiness |
| About | Physician |
| FAQ | FAQPage |
| Blog posts | Article |
| Service pages | MedicalWebPage |

MedicalBusiness — site-wide:

```json
{
  "@type": "MedicalBusiness",
  "name": "ElyDoc",
  "alternateName": "Ely Health and Wellness Group",
  "url": "https://elydoc.ie",
  "description": "Doctor-led online healthcare for suitable conditions in Ireland.",
  "medicalSpecialty": "General Practice",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IE"
  }
}
```

## Keyword Targets by Page

| Page | Primary | Supporting |
| --- | --- | --- |
| Homepage | online GP Ireland, online doctor Ireland | private GP online Ireland |
| /gp-consultations | online GP consultation Ireland | GP online Ireland, consult a doctor online Ireland |
| /weight-management | weight management clinic Ireland | GLP-1 Ireland, medically supervised weight loss Ireland |
| /hair-loss | hair loss treatment Ireland | finasteride online Ireland, pattern baldness treatment Ireland |
| /sick-certification | sick cert online Ireland | work absence note Ireland, doctor sick cert Ireland |
| /referrals-prescriptions | private GP referral Ireland | private referral letter Ireland, GP prescription online Ireland |
| /employers | employee GP benefit Ireland | corporate healthcare Ireland |
| /about | vocationally trained GP Ireland | Irish Medical Council registered GP |
| /faq | online GP Ireland FAQ | what can online GP treat Ireland |
| /blog | broad informational terms | long-tail per post — determined by doctor |

## Sanity & SEO Integration

- Every Sanity document type mapping to a public page must include `seoTitle` and `seoDescription` fields
- These fields populate `generateMetadata()` directly
- Sanity SiteSettings holds fallback SEO title and description
- Blog post Article schema generated dynamically from Sanity fields
- Slugs must be URL-safe: lowercase, hyphenated, no special characters
- `sitemap.ts` fetches published blog slugs dynamically from Sanity so new posts appear in the sitemap automatically on publish

## Internal Linking

Every service page links to at least two related pages. Blog posts link to the most relevant service page. FAQ links to relevant service pages throughout.

## Analytics & Search Console

- GA4 via Google Tag Manager — GTM container ID as environment variable, never hardcoded
- Analytics fires only after cookie consent via CookieYes
- Submit sitemap to Google Search Console on launch

## Sitemap & Robots

- `/studio` excluded from sitemap and disallowed in `robots.txt`
- All public pages included in sitemap
- Blog slugs fetched dynamically from Sanity