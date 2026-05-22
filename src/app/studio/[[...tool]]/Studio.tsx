'use client'

import dynamic from 'next/dynamic'
import config from '../../../sanity.config'

// Sanity Studio uses browser-only APIs — load entirely client-side
const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => ({ default: mod.NextStudio })),
  { ssr: false }
)

export default function Studio() {
  return <NextStudio config={config} />
}
