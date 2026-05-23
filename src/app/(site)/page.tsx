import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient } from '@/lib/sanity'
import { images } from '@/config/images'

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'ElyDoc — Online GP Ireland | Online Doctor Ireland',
  description:
    'Doctor-led online GP consultations in Ireland. Speak with a vocationally trained GP from anywhere in Ireland. Private, confidential, and convenient.',
  keywords: [
    'online GP Ireland',
    'online doctor Ireland',
    'private GP online Ireland',
    'online GP consultation Ireland',
    'online doctor consultation Ireland',
  ],
  openGraph: {
    title: 'ElyDoc — Online GP Ireland | Online Doctor Ireland',
    description:
      'Doctor-led online GP consultations in Ireland. Speak with a vocationally trained GP from anywhere in Ireland.',
    url: 'https://elydoc.ie',
    siteName: 'ElyDoc',
    locale: 'en_IE',
    type: 'website',
  },
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Post = {
  title: string
  slug: string
  publishedDate: string
  excerpt: string | null
  category: string | null
}

// ─── Static data ──────────────────────────────────────────────────────────────

const SERVICES = [
  {
    title: 'GP Consultations',
    description: 'Doctor-led consultations for selected non-emergency conditions.',
    href: '/gp-consultations',
  },
  {
    title: 'Weight Management',
    // [DOCTOR REVIEW] Mention of GLP-1 — ensure phrasing aligns with current prescribing policy.
    description: 'Evidence-based, GP-led support including GLP-1 assessment where clinically appropriate.',
    href: '/weight-management',
  },
  {
    title: 'Hair Loss',
    description: 'Discreet assessment and evidence-based management of male pattern hair loss.',
    href: '/hair-loss',
  },
  {
    title: 'Sick Certification',
    description: 'Employer absence notes where clinically appropriate, following GP consultation.',
    href: '/sick-certification',
  },
  {
    title: 'Referrals & Prescriptions',
    description: 'Private referrals and selected prescriptions for suitable conditions.',
    href: '/referrals-prescriptions',
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Book online',
    body: 'Choose a time that suits you and book your consultation online — no GP referral required.',
  },
  {
    number: '02',
    title: 'Consult a specialist GP',
    body: 'Speak with a vocationally trained GP by video or telephone at your scheduled time.',
  },
  {
    number: '03',
    title: 'Receive your care',
    // [DOCTOR REVIEW] Prescription and referral wording — confirm aligns with current service scope.
    body: 'Where appropriate, prescriptions are sent to your chosen pharmacy, or referral letters and certificates issued.',
  },
  {
    number: '04',
    title: 'Follow-up included',
    body: 'A follow-up is included where needed on selected consultation types at no additional charge.',
  },
]

const DIFFERENTIATORS = [
  {
    number: '1',
    body: 'Vocationally trained doctors registered on the Specialist Division for General Practice with the Irish Medical Council.',
  },
  {
    number: '2',
    body: 'Follow-up included on selected consultations — weight management and hair loss consultations include a follow-up at no additional cost.',
  },
  {
    number: '3',
    body: 'Clear clinical boundaries — if you need in-person care, your doctor will tell you honestly and signpost you appropriately.',
  },
  {
    number: '4',
    body: 'Discreet, confidential, private — your consultation and all clinical information remain strictly confidential.',
  },
]

// ─── Placeholder blog posts (shown when Sanity has no published content) ──────
// [DOCTOR REVIEW] Placeholder post titles and excerpts — review before publishing to production.
const PLACEHOLDER_POSTS: Post[] = [
  {
    title: 'What to Expect from Your First Online GP Consultation',
    slug: '',
    publishedDate: '2025-01-10',
    excerpt:
      'A guide to preparing for your first online GP consultation — what to have ready and what the appointment involves.',
    category: 'General Health',
  },
  {
    title: 'GP-Led Weight Management: An Evidence-Based Approach',
    // [DOCTOR REVIEW] Weight management copy — confirm positioning aligns with clinical policy.
    slug: '',
    publishedDate: '2025-01-05',
    excerpt:
      'Understanding what a medically supervised weight management programme involves and who it may be suitable for.',
    category: 'Weight Management',
  },
  {
    title: 'When Is a Sick Certificate Appropriate?',
    slug: '',
    publishedDate: '2024-12-20',
    excerpt:
      'A clear explanation of when an employer absence note may be appropriate following a GP consultation.',
    category: 'General Health',
  },
]

// ─── Sanity query ─────────────────────────────────────────────────────────────

const POSTS_QUERY = `
  *[_type == "blogPost" && defined(publishedDate)] | order(publishedDate desc)[0...3] {
    title,
    "slug": slug.current,
    publishedDate,
    excerpt,
    category
  }
`

async function getRecentPosts(): Promise<Post[]> {
  try {
    const posts = await sanityClient.fetch<Post[]>(POSTS_QUERY)
    return posts?.length ? posts : PLACEHOLDER_POSTS
  } catch {
    return PLACEHOLDER_POSTS
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const posts = await getRecentPosts()

  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <HowItWorksSection />
      <WhyElyDocSection />
      <EmployerSignpost />
      <BlogPreviewSection posts={posts} />
      <FinalCTASection />
      <EmergencyCopy />
    </>
  )
}

// ─── Section 1: Hero ──────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* Text column */}
        <div className="space-y-8 max-w-xl">
          <h1
            className="font-headline text-5xl lg:text-6xl xl:text-[4.5rem] font-light leading-[1.08] tracking-tight"
          >
            Private GP care, when you need it.
          </h1>
          <p className="text-lg leading-relaxed" style={{ opacity: 0.7 }}>
            ElyDoc consultations are delivered by vocationally trained GPs who have completed
            specialist GP training in Ireland and are fully registered with the Irish Medical
            Council — bringing genuine expertise to your online consultation.
          </p>
          <div>
            <Link
              href="#book-consultation"
              className="inline-block px-8 py-4 bg-accent text-background text-sm font-medium rounded transition-colors hover:bg-accent-dark"
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        {/* Image column */}
        <div className="relative w-full aspect-[3/4] rounded overflow-hidden">
          {/* images.hero — Portrait lifestyle image depicting GP consultation context.
              Replace seed placeholder with production photography. */}
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

      </div>
    </section>
  )
}

// ─── Section 2: Trust Signal Bar ──────────────────────────────────────────────

function TrustBar() {
  return (
    <section className="bg-subtle py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <p className="text-sm font-medium tracking-wide" style={{ opacity: 0.7 }}>
          Vocationally trained doctors registered on the Specialist Division for General Practice
          with the Irish Medical Council.
        </p>
      </div>
    </section>
  )
}

// ─── Section 3: Services ──────────────────────────────────────────────────────

function ServicesSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mb-16 max-w-lg">
          <h2 className="font-headline text-3xl lg:text-4xl font-light tracking-tight mb-4">
            Our services
          </h2>
          <p className="text-base leading-relaxed" style={{ opacity: 0.6 }}>
            Doctor-led care for selected conditions, delivered by specialist-trained GPs who are
            registered on the Specialist Division for General Practice.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {SERVICES.map((service) => (
            <article
              key={service.href}
              className="bg-subtle rounded p-8 lg:p-10 space-y-4"
              style={{ border: '1px solid color-mix(in oklch, var(--color-text) 8%, transparent)' }}
            >
              <h3 className="font-headline text-xl font-light">{service.title}</h3>
              <p className="text-sm leading-relaxed" style={{ opacity: 0.62 }}>
                {service.description}
              </p>
              <Link
                href={service.href}
                className="inline-block text-sm text-accent hover:text-accent-dark transition-colors"
                aria-label={`Learn more about ${service.title}`}
              >
                Learn more →
              </Link>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Section 4: How It Works ──────────────────────────────────────────────────

function HowItWorksSection() {
  return (
    <section className="bg-subtle py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <h2 className="font-headline text-3xl lg:text-4xl font-light tracking-tight mb-16 lg:mb-20">
          How it works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {STEPS.map((step) => (
            <div key={step.number} className="space-y-5">
              <p
                className="font-headline text-4xl lg:text-5xl font-light leading-none text-accent"
                aria-hidden="true"
              >
                {step.number}
              </p>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold tracking-wide uppercase" style={{ letterSpacing: '0.06em' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ opacity: 0.65 }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Section 5: Why ElyDoc ────────────────────────────────────────────────────

function WhyElyDocSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <h2 className="font-headline text-3xl lg:text-4xl font-light tracking-tight mb-16 lg:mb-20">
          Why ElyDoc
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-x-20 lg:gap-y-14">
          {DIFFERENTIATORS.map((item) => (
            <div key={item.number} className="flex gap-7 items-start">
              <span
                className="font-headline text-5xl lg:text-6xl font-light text-accent leading-none flex-shrink-0 select-none"
                aria-hidden="true"
              >
                {item.number}
              </span>
              <p className="text-base lg:text-lg leading-relaxed pt-2" style={{ opacity: 0.78 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Section 6: Employer Signpost ─────────────────────────────────────────────

function EmployerSignpost() {
  return (
    <section className="bg-subtle py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

        <div className="space-y-2">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ opacity: 0.45, letterSpacing: '0.1em' }}
          >
            For Employers
          </p>
          <p className="font-headline text-2xl lg:text-3xl font-light tracking-tight">
            Are you an employer?{' '}
            <span style={{ opacity: 0.65 }}>
              Offer your team access to specialist GP care.
            </span>
          </p>
        </div>

        <Link
          href="/employers"
          className="flex-shrink-0 text-sm font-medium text-accent hover:text-accent-dark transition-colors"
          style={{ borderBottom: '1px solid currentColor', paddingBottom: '2px' }}
        >
          Learn more →
        </Link>

      </div>
    </section>
  )
}

// ─── Section 7: Blog Preview ──────────────────────────────────────────────────

function BlogPreviewSection({ posts }: { posts: Post[] }) {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 lg:mb-14">
          <h2 className="font-headline text-3xl lg:text-4xl font-light tracking-tight">
            From the blog
          </h2>
          <Link
            href="/blog"
            className="text-sm text-accent hover:text-accent-dark transition-colors self-start sm:self-auto"
          >
            All articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {posts.map((post, i) => (
            <article
              key={post.slug || `placeholder-${i}`}
              className="rounded p-7 lg:p-8 space-y-5 flex flex-col"
              style={{
                border: '1px solid color-mix(in oklch, var(--color-text) 10%, transparent)',
              }}
            >
              <div className="space-y-1 flex-1">
                {post.category && (
                  <p
                    className="text-xs font-semibold uppercase tracking-widest text-accent"
                    style={{ opacity: 0.85, letterSpacing: '0.08em' }}
                  >
                    {post.category}
                  </p>
                )}
                <h3 className="font-headline text-xl font-light leading-snug pt-1">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm leading-relaxed pt-2" style={{ opacity: 0.62 }}>
                    {post.excerpt}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs" style={{ opacity: 0.42 }}>
                  {formatDate(post.publishedDate)}
                </p>
                {post.slug ? (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-accent hover:text-accent-dark transition-colors"
                    aria-label={`Read: ${post.title}`}
                  >
                    Read →
                  </Link>
                ) : (
                  <span className="text-xs" style={{ opacity: 0.3 }}>
                    Coming soon
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Section 8: Final CTA ─────────────────────────────────────────────────────

function FinalCTASection() {
  return (
    <section id="book-consultation" className="bg-subtle py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center space-y-9">
        <h2 className="font-headline text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight">
          Ready to speak to a GP?
        </h2>
        <div>
          <Link
            href="#book-consultation"
            className="inline-block px-8 py-4 bg-accent text-background text-sm font-medium rounded transition-colors hover:bg-accent-dark"
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Emergency Safety Copy ────────────────────────────────────────────────────

function EmergencyCopy() {
  return (
    <section
      className="py-8"
      style={{ borderTop: '1px solid color-mix(in oklch, var(--color-text) 8%, transparent)' }}
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <p className="text-xs leading-relaxed text-center" style={{ opacity: 0.45 }}>
          If you are experiencing a medical emergency, chest pain, stroke symptoms or severe acute
          illness, please call 999 or attend your nearest Emergency Department immediately. ElyDoc
          is not an emergency service.
        </p>
      </div>
    </section>
  )
}
