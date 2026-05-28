import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityClient } from '@/lib/sanity'
import Tile from '@/components/ui/Tile'
import FAQAccordion, { type FAQItem } from '@/components/ui/FAQAccordion'
import FinalCTASection from '@/components/home/FinalCTASection'

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Online GP Consultations Ireland — ElyDoc',
    description:
      'Book an online GP consultation with a vocationally trained Irish GP. Same day appointments available. Registered with the Irish Medical Council.',
    alternates: {
      canonical: 'https://elydoc.ie/gp-consultations',
    },
    openGraph: {
      title: 'Online GP Consultations Ireland — ElyDoc',
      description:
        'Book an online GP consultation with a vocationally trained Irish GP. Same day appointments available.',
      url: 'https://elydoc.ie/gp-consultations',
      siteName: 'ElyDoc',
      locale: 'en_IE',
      type: 'website',
      images: [
        {
          url: '/images/og-default.jpg',
          width: 1200,
          height: 630,
          alt: 'Online GP Consultations Ireland — ElyDoc',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Online GP Consultations Ireland — ElyDoc',
      description:
        'Book an online GP consultation with a vocationally trained Irish GP. Same day appointments available.',
      images: ['/images/og-default.jpg'],
    },
  }
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Online GP Consultations Ireland — ElyDoc',
  url: 'https://elydoc.ie/gp-consultations',
  description:
    'Doctor-led online GP consultations for suitable conditions in Ireland.',
  medicalAudience: {
    '@type': 'MedicalAudience',
    audienceType: 'Patient',
  },
  about: {
    '@type': 'MedicalProcedure',
    name: 'Online GP Consultation',
    description:
      'A video or phone consultation with a vocationally trained GP registered on the Specialist Division for General Practice with the Irish Medical Council.',
  },
  specialty: 'General Practice',
}

// ─── Static data ──────────────────────────────────────────────────────────────

const CONDITIONS = [
  'Skin conditions',
  'Medication queries and reviews',
  'Mental health support',
  'Digestive issues',
  "Women's health",
  "Men's health",
  'Respiratory conditions',
  'Allergies and hay fever',
  'Musculoskeletal issues',
  'Travel health advice',
]

const STEPS = [
  {
    n: '01',
    content: 'Book your consultation online.',
  },
  {
    n: '02',
    content: 'Consult with a specialist GP by video or phone.',
  },
  {
    n: '03',
    content:
      'Where appropriate, prescriptions are sent directly to your chosen pharmacy, or referral letters and certificates issued.',
  },
  {
    n: '04',
    content: 'Follow-up included where clinically needed.',
  },
]

const SUITABLE_FOR = [
  'Common non-emergency conditions',
  'Medication queries and reviews',
  'Sick certification where clinically appropriate',
  'Private referral letters',
  'Follow-up advice for ongoing issues',
  'Second opinion on non-urgent matters',
]

const NOT_SUITABLE_FOR = [
  'Medical emergencies — call 999',
  'Chest pain or stroke symptoms',
  'Severe acute illness',
  'Children under 12 years',
  'Acute mental health crises',
  'Conditions requiring in-person examination or blood tests',
  'ADHD assessment or management',
]

// [DOCTOR REVIEW] Placeholder FAQ answers — review before publishing to production.
const PLACEHOLDER_FAQS: FAQItem[] = [
  {
    _id: 'placeholder-1',
    question: 'What conditions can an online GP treat?',
    answer:
      "ElyDoc GPs can help with a wide range of non-emergency primary care concerns — skin conditions, medication queries, mild-to-moderate mental health concerns, digestive issues, women's and men's health, respiratory conditions, allergies and musculoskeletal issues. If your condition requires physical examination, urgent care or investigation, your doctor will advise you and signpost you to appropriate services.",
  },
  {
    _id: 'placeholder-2',
    question: 'How do I prepare for my consultation?',
    answer:
      "Have your current medication list ready if relevant. Think about your symptoms — when they started, what makes them better or worse and what you'd like help with. A good internet connection and a quiet, private space make for the best consultation. No special equipment is needed.",
  },
  {
    _id: 'placeholder-3',
    question: 'What happens if I need in-person care?',
    answer:
      'Our doctors have clear clinical boundaries. If your condition requires physical examination, urgent assessment or in-person care, your doctor will tell you clearly and advise where to attend. ElyDoc is not an emergency service — if you are experiencing a medical emergency, please call 999 or attend your nearest Emergency Department immediately.',
  },
]

// ─── Sanity data fetch ────────────────────────────────────────────────────────

type RawFAQItem = {
  _id: string
  question: string
  answer: Array<{
    _type: string
    children?: Array<{ text: string }>
  }>
}

function portableTextToString(blocks: RawFAQItem['answer']): string {
  if (!blocks) return ''
  return blocks
    .filter((b) => b._type === 'block')
    .map((b) => b.children?.map((c) => c.text).join('') ?? '')
    .filter(Boolean)
    .join(' ')
}

const FAQ_QUERY = `
  *[_type == "faqItem" && serviceCategory == "gp-consultations"] | order(displayOrder asc) {
    _id,
    question,
    answer
  }
`

async function getFAQs(): Promise<FAQItem[]> {
  try {
    const raw = await sanityClient.fetch<RawFAQItem[]>(FAQ_QUERY)
    if (!raw?.length) return PLACEHOLDER_FAQS
    return raw.map((item) => ({
      _id: item._id,
      question: item.question,
      answer: portableTextToString(item.answer),
    }))
  } catch {
    return PLACEHOLDER_FAQS
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function GPConsultationsPage() {
  const faqs = await getFAQs()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema) }}
      />
      <PageHeader />
      <ConditionsSection />
      <HowItWorksSection />
      <SuitabilitySection />
      <PrescribingNote />
      <FAQSection faqs={faqs} />
      <FinalCTASection />
    </>
  )
}

// ─── Section 1: Page header ───────────────────────────────────────────────────

function PageHeader() {
  return (
    <section className="bg-background pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p
          className="text-xs font-semibold uppercase text-accent mb-6"
          style={{ letterSpacing: '0.1em', opacity: 0.85 }}
        >
          Our Services
        </p>

        <h1 className="font-headline text-5xl lg:text-6xl xl:text-7xl font-[300] tracking-tight leading-[1.04] max-w-3xl">
          Online GP consultations for suitable conditions.
        </h1>

        <p
          className="mt-7 text-lg lg:text-xl leading-relaxed max-w-[56ch]"
          style={{ opacity: 0.7 }}
        >
          Speak with a vocationally trained GP by video or phone — registered on the
          Specialist Division for General Practice with the Irish Medical Council.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href={process.env.NEXT_PUBLIC_BOOKING_URL ?? '#'}
            className="inline-block px-8 py-4 bg-accent text-background text-sm font-medium rounded transition-colors hover:bg-accent-dark"
          >
            Book a Consultation
          </Link>
          <p className="text-base font-medium" style={{ color: 'var(--color-accent)' }}>
            €55 per consultation
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Section 2: What we can help with ────────────────────────────────────────

function ConditionsSection() {
  return (
    <section className="bg-subtle py-20 lg:py-28">
      {/* Scoped hover styles for condition tiles */}
      <style>{`
        .condition-tile {
          background-color: var(--color-background);
          border: 0.5px solid color-mix(in oklch, var(--color-text) 10%, transparent);
          border-radius: 8px;
          padding: 18px 20px;
          transition: background-color 150ms ease;
        }
        .condition-tile:hover {
          background-color: color-mix(in oklch, var(--color-accent) 6%, var(--color-background));
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p
          className="text-xs font-semibold uppercase text-accent mb-4"
          style={{ letterSpacing: '0.1em', opacity: 0.85 }}
        >
          Suitable conditions
        </p>
        <h2 className="font-headline text-3xl lg:text-4xl font-light tracking-tight mb-12">
          What we can help with
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {CONDITIONS.map((condition) => (
            <Tile
              key={condition}
              title={condition}
              showLeftBorder
              className="condition-tile"
              titleClassName="text-sm font-medium leading-snug"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 3: How it works ──────────────────────────────────────────────────

function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: 'var(--color-teal-dark)' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p
          className="text-xs font-semibold uppercase mb-4"
          style={{ letterSpacing: '0.1em', color: 'var(--color-background)', opacity: 0.55 }}
        >
          How it works
        </p>
        <h2
          className="font-headline text-3xl lg:text-4xl font-light tracking-tight mb-16"
          style={{ color: 'var(--color-background)' }}
        >
          Simple, straightforward care
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {STEPS.map((step) => (
            <div key={step.n}>
              {/* Large step number as typographic anchor */}
              <div
                className="font-headline text-7xl lg:text-8xl font-light leading-none select-none mb-5"
                style={{ color: 'var(--color-background)', opacity: 0.13 }}
                aria-hidden
              >
                {step.n}
              </div>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-background)', opacity: 0.88 }}
              >
                {step.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 4: Is this right for me ─────────────────────────────────────────

function SuitabilitySection() {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Left: Suitable for — white background */}
        <div className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-lg px-6 lg:px-0 lg:ml-auto lg:mr-0 lg:pr-12 xl:pr-20">
            <p
              className="text-xs font-semibold uppercase text-accent mb-4"
              style={{ letterSpacing: '0.1em', opacity: 0.85 }}
            >
              Suitable for
            </p>
            <h2 className="font-headline text-2xl lg:text-3xl font-light tracking-tight mb-10">
              This service may be right for you
            </h2>
            <ul className="space-y-4">
              {SUITABLE_FOR.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  {/* Filled circle check — matches hero bullet treatment */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden
                    className="mt-0.5 shrink-0"
                  >
                    <circle cx="10" cy="10" r="10" fill="var(--color-accent)" />
                    <path
                      d="M6 10.5l2.5 2.5 5.5-5.5"
                      stroke="white"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm lg:text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Not suitable for — subtle background */}
        <div className="py-16 lg:py-24" style={{ backgroundColor: 'var(--color-subtle)' }}>
          <div className="mx-auto max-w-lg px-6 lg:px-0 lg:mr-auto lg:ml-0 lg:pl-12 xl:pl-20">
            <p
              className="text-xs font-semibold uppercase mb-4"
              style={{ letterSpacing: '0.1em', opacity: 0.42 }}
            >
              Not suitable for
            </p>
            <h2 className="font-headline text-2xl lg:text-3xl font-light tracking-tight mb-10">
              When to seek other care
            </h2>
            <ul className="space-y-4">
              {NOT_SUITABLE_FOR.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  {/* Muted dash circle */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden
                    className="mt-0.5 shrink-0"
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="10"
                      fill="color-mix(in oklch, var(--color-text) 10%, transparent)"
                    />
                    <path
                      d="M7 10h6"
                      stroke="var(--color-text)"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    className="text-sm lg:text-base leading-relaxed"
                    style={{ opacity: 0.72 }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Note for 12–18 year olds */}
            <p
              className="mt-8 text-xs leading-relaxed pt-6"
              style={{
                opacity: 0.58,
                borderTop: '1px solid color-mix(in oklch, var(--color-text) 12%, transparent)',
              }}
            >
              Patients aged 12 to 18 are welcome but a parent or guardian must be present
              throughout the consultation.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─── Section 5: Prescribing note ─────────────────────────────────────────────

function PrescribingNote() {
  return (
    <section className="bg-background py-14 lg:py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <p
          className="text-sm leading-[1.8]"
          style={{ opacity: 0.52 }}
        >
          ElyDoc can provide bridging prescriptions for established medications and short-term
          treatments for suitable conditions. We do not generally initiate new long-term
          medications — patients requiring ongoing complex medication management are best served
          by their own GP who can provide continuity of care. ElyDoc does not prescribe opioids,
          benzodiazepines, sleeping tablets or controlled drugs.
        </p>
      </div>
    </section>
  )
}

// ─── Section 6: FAQ ───────────────────────────────────────────────────────────

function FAQSection({ faqs }: { faqs: FAQItem[] }) {
  return (
    <section className="bg-subtle py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <p
          className="text-xs font-semibold uppercase text-accent mb-4"
          style={{ letterSpacing: '0.1em', opacity: 0.85 }}
        >
          FAQ
        </p>
        <h2 className="font-headline text-3xl lg:text-4xl font-light tracking-tight mb-12">
          Common questions
        </h2>
        <FAQAccordion items={faqs} />
      </div>
    </section>
  )
}
