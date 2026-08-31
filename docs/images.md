# ElyGP — Image Handling

## Technical Rules

- Always use `next/image` — never a plain `<img>` tag
- All static images imported from `/src/config/images.ts` — no hardcoded `src` values in components
- Blog post headers and regularly updated images managed via Sanity using `@sanity/image-url`

## Placement Philosophy

Use images thoughtfully and sparingly. Each image should earn its place — used to add warmth or break up a long page where genuinely needed, not to fill space. A well-designed empty section is preferable to a forced image.

## Responsive Images

Set the `sizes` prop appropriately on every `next/image` component to reflect the actual rendered width at each breakpoint:

```typescript
// Full width image
sizes="100vw"

// Two column desktop, full width mobile
sizes="(max-width: 768px) 100vw, 50vw"

// Three column desktop, full width mobile
sizes="(max-width: 768px) 100vw, 33vw"
```

This ensures Next.js serves correctly optimised images at every screen size.

## Placeholders During Development

Use `picsum.photos` with named seeds to keep images consistent between page loads:

`https://picsum.photos/seed/elygp-hero/1440/900`

Name seeds descriptively — elygp-hero, elygp-weight, elygp-hair etc. Use realistic dimensions for each intended use case so layouts can be properly evaluated.

## Image Config File

All static images defined in `/src/config/images.ts`. Add a comment above every image component in the JSX noting the config key, display dimensions and a brief description of the intended placement:

```typescript
{/*
  Image: images.hero
  Desktop: full viewport width, 90vh height
  Mobile: full width, 50vh height
*/}
```

This makes every image on the site findable and replaceable with a single line change.

## Logo

- Logo files placed in `/public/images/logo/`
- A light version of the logo is required for the dark footer background
- Until final logo files are received use a typographic placeholder — the word ElyGP set in the heading font
- Logo appears in: navigation bar, footer, Open Graph social share image, favicon

Shall we move on to security.md?