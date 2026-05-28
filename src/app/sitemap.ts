import type { MetadataRoute } from 'next'
import { sanityClient } from '@/lib/sanity'

const BASE = 'https://elydoc.ie'

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: `${BASE}/`,                          changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${BASE}/services`,                  changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/gp-consultations`,          changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/weight-management`,         changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/hair-loss`,                 changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/sick-certification`,        changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/referrals-prescriptions`,   changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/employers`,                 changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/about`,                     changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/faq`,                       changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/blog`,                      changeFrequency: 'weekly',  priority: 0.7 },
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

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...STATIC_PAGES, ...blogPages]
}
