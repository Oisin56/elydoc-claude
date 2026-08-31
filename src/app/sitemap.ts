import type { MetadataRoute } from 'next'
import { sanityClient } from '@/lib/sanity'

const BASE = 'https://elygp.ie'

/*
  Only routes that actually exist belong here — listing unbuilt pages would
  serve 404s to crawlers.

  Re-add each of these as the page is built:
    /services                 changeFrequency: 'monthly', priority: 0.8
    /weight-management        changeFrequency: 'monthly', priority: 0.8
    /hair-loss                changeFrequency: 'monthly', priority: 0.8
    /sick-certification       changeFrequency: 'monthly', priority: 0.8
    /referrals-prescriptions  changeFrequency: 'monthly', priority: 0.8
    /employers                changeFrequency: 'monthly', priority: 0.8
    /about                    changeFrequency: 'monthly', priority: 0.7
    /faq                      changeFrequency: 'monthly', priority: 0.7
    /blog                     changeFrequency: 'weekly',  priority: 0.7
*/
const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: `${BASE}/`,                 changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${BASE}/gp-consultations`, changeFrequency: 'monthly', priority: 0.8 },
]

async function getBlogSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityClient.fetch<string[]>(
      `*[_type == "blogPost" && defined(slug.current) && defined(publishedDate)][].slug.current`
    )
    return slugs ?? []
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogSlugs = await getBlogSlugs()

  // These resolve only once the /blog/[slug] route exists — until then this
  // yields entries for any published Sanity post that the site cannot serve.
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...STATIC_PAGES, ...blogPages]
}
