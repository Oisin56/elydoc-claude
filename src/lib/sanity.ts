import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

const projectId = requireEnv('NEXT_PUBLIC_SANITY_PROJECT_ID')
const dataset = requireEnv('NEXT_PUBLIC_SANITY_DATASET')
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
