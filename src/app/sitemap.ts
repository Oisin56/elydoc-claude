import type { MetadataRoute } from 'next'
import { sanityClient } from '@/lib/sanity'

const BASE = 'https://elygp.ie'

/*
  Blog posts are withheld from the sitemap until the /blog/[slug] route is
  built — publishing their URLs now would point crawlers at 404s.

  To restore: build /blog/[slug], then flip this to true. The Sanity fetch
  below is left intact and working, so no other change is needed.
*/
const BLOG_ROUTE_EXISTS: boolean = false

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
  const blogSlugs = BLOG_ROUTE_EXISTS ? await getBlogSlugs() : []

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...STATIC_PAGES, ...blogPages]
}
