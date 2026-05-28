import { sanityClient, urlFor } from '@/lib/sanity'

export type Post = {
  title: string
  slug: string
  publishedDate: string
  excerpt: string | null
  category: string | null
  imageUrl: string | null
}

type RawPost = Omit<Post, 'imageUrl'> & { mainImage: unknown | null }

// [DOCTOR REVIEW] Placeholder post titles and excerpts — review before publishing to production.
export const PLACEHOLDER_POSTS: Post[] = [
  {
    title: 'What to Expect from Your First Online GP Consultation',
    slug: '',
    publishedDate: '2025-01-10',
    excerpt:
      'A guide to preparing for your first online GP consultation — what to have ready and what the appointment involves.',
    category: 'General Health',
    imageUrl: 'https://picsum.photos/seed/consultation/600/340',
  },
  {
    // [DOCTOR REVIEW] Weight management copy — confirm positioning aligns with clinical policy.
    title: 'GP-Led Weight Management: An Evidence-Based Approach',
    slug: '',
    publishedDate: '2025-01-05',
    excerpt:
      'Understanding what a medically supervised weight management programme involves and who it may be suitable for.',
    category: 'Weight Management',
    imageUrl: 'https://picsum.photos/seed/weightmanagement/600/340',
  },
  {
    title: 'When Is a Sick Certificate Appropriate?',
    slug: '',
    publishedDate: '2024-12-20',
    excerpt:
      'A clear explanation of when an employer absence note may be appropriate following a GP consultation.',
    category: 'General Health',
    imageUrl: 'https://picsum.photos/seed/sickcertificate/600/340',
  },
]

const POSTS_QUERY = `
  *[_type == "blogPost" && defined(publishedDate)] | order(publishedDate desc)[0...3] {
    title,
    "slug": slug.current,
    publishedDate,
    excerpt,
    category,
    mainImage
  }
`

export async function getRecentPosts(): Promise<Post[]> {
  try {
    const raw = await sanityClient.fetch<RawPost[]>(POSTS_QUERY)
    if (!raw?.length) return PLACEHOLDER_POSTS
    return raw.map((p) => ({
      ...p,
      imageUrl: p.mainImage
        ? urlFor(p.mainImage).width(600).height(340).fit('crop').crop('center').url()
        : null,
    }))
  } catch {
    return PLACEHOLDER_POSTS
  }
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
