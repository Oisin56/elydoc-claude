# ElyDoc — Sanity CMS

## What Sanity Manages

- Blog posts
- FAQ items

## Studio Location

Sanity Studio is embedded in the Next.js project at `/studio`. Not linked from any public-facing page.

## Schema Document Types

### BlogPost

- title
- slug (auto-generated from title)
- publishedDate
- excerpt
- mainImage
- body (Portable Text)
- seoTitle
- seoDescription

### FAQItem

- question
- answer (Portable Text)
- category (General / Booking / Safety / Services / Employers)
- serviceCategory (gp-consultations / weight-management / hair-loss / sick-certification / referrals-prescriptions / employers — used to filter FAQ items per service page)
- displayOrder

## Key Implementation Rules

- Sanity read token is server-side only — never exposed to the client bundle
- Slugs must be URL-safe: lowercase, hyphenated, no special characters
- `sitemap.ts` fetches published blog slugs dynamically from Sanity so new posts appear in the sitemap automatically on publish
- Use `next-sanity` and `@sanity/image-url` for all Sanity integration