import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// NB: these MUST be referenced as literal `process.env.NEXT_PUBLIC_*` keys.
// Turbopack/Next only inlines literal accesses into the browser bundle —
// dynamic access (e.g. process.env[name]) stays undefined client-side.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId) {
  throw new Error('Missing required environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID')
}
if (!dataset) {
  throw new Error('Missing required environment variable: NEXT_PUBLIC_SANITY_DATASET')
}

const apiVersion = '2025-01-01'

// Public read client — safe to use in Server Components and generateMetadata()
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// Image URL builder — used with @sanity/image-url for Sanity-hosted images
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source)
}
