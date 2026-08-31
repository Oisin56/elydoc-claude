# ElyGP — Security Requirements

## Core Principle

ElyGP is a marketing site with no patient portal, no stored health data and no payment processing. The attack surface is small. Security should be implemented cleanly and correctly rather than over-engineered.

## HTTP Security Headers

Configure in `next.config.js`. A security reviewer will check for these immediately:

```javascript
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self';`
  }
]
```

## Environment Variables

- All API keys, tokens and environment-specific values stored as Vercel environment variables
- Never hardcoded in source code
- `.env.local` in `.gitignore` from initialisation
- Sanity read token used server-side only — never exposed to the browser or client bundle

## Forms

- Formspree domain restriction enabled — forms accept submissions from elygp.ie only
- Honeypot spam protection enabled on all Formspree forms

## Sanity Studio

- `/studio` route never linked from any public-facing page
- `/studio` excluded from sitemap and disallowed in `robots.txt`

## Dependencies

- `npm audit` run before launch and periodically thereafter
- Dependabot enabled on GitHub repository for automated security update alerts