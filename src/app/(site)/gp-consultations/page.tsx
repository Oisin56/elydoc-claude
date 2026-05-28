import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Droplets, Pill, Brain, Activity, Heart, Shield,
  Wind, Flower2, Bone, Plane,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { sanityClient } from '@/lib/sanity'
import FAQAccordion, { type FAQItem } from '@/components/ui/FAQAccordion'
import FinalCTASection from '@/components/home/FinalCTASection'

// ─── Diagonal texture — shared across all white / subtle sections ──────────────
const DIAGONAL_TEXTURE = {
  zIndex: 0,
  backgroundImage:
    'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.03) 4px, rgba(0,0,0,0.03) 5px)',
} as const

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
  description: 'Doctor-led online GP consultations for suitable conditions in Ireland.',
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

const CONDITIONS: Array<{ label: string; icon: LucideIcon }> = [
  { label: 'Skin conditions',               icon: Droplets },
  { label: 'Medication queries and reviews', icon: Pill     },
  { label: 'Mental health support',          icon: Brain    },
  { label: 'Digestive issues',               icon: Activity },
  { label: "Women's health",                 icon: Heart    },
  { label: "Men's health",                   icon: Shield   },
  { label: 'Respiratory conditions',         icon: Wind     },
  { label: 'Allergies and hay fever',        icon: Flower2  },
  { label: 'Musculoskeletal issues',         icon: Bone     },
  { label: 'Travel health advice',           icon: Plane    },
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
      {/*
        gp-snap: activates scroll-snap-type: y mandatory on <html> at desktop
        via html:has(.gp-snap) in globals.css — same pattern as homepage-snap.
      */}
      <div className="gp-snap">
        <PageHeader />
        <HowItWorksSection />
        <SuitabilitySection />
        <ConditionsSection />
        <FAQSection faqs={faqs} />
        <FinalCTASection />
      </div>
    </>
  )
}

// ─── Section 1: Page header ───────────────────────────────────────────────────

function PriceBadge() {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-full select-none shrink-0"
      style={{
        width: '144px',
        height: '144px',
        backgroundColor: 'var(--color-subtle)',
        boxShadow: '0 6px 24px -4px color-mix(in oklch, var(--color-text) 16%, transparent)',
      }}
    >
      <span
        className="font-headline text-4xl font-[300] leading-none"
        style={{ color: 'var(--color-accent)' }}
      >
        €55
      </span>
      <span
        className="text-xs text-center leading-tight mt-2"
        style={{ color: 'var(--color-accent)', opacity: 0.7, maxWidth: '72px' }}
      >
        per consultation
      </span>
    </div>
  )
}

function PageHeader() {
  return (
    <section className="relative bg-background pt-32 lg:pt-40 snap-section" style={{ paddingBottom: 'var(--section-padding)', minHeight: 'var(--section-min-height)' }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={DIAGONAL_TEXTURE} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:flex lg:items-start lg:gap-16 xl:gap-24">

          {/* Left: headline content */}
          <div className="flex-1 min-w-0">
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

            <div className="mt-10">
              <Link
                href={process.env.NEXT_PUBLIC_BOOKING_URL ?? '#'}
                className="inline-block px-8 py-4 bg-accent text-background text-sm font-medium rounded transition-colors hover:bg-accent-dark"
              >
                Book a Consultation
              </Link>
            </div>
          </div>

          {/* Right: price badge — floats beside headline on desktop, sits below button on mobile */}
          <div className="mt-10 lg:mt-24 flex justify-start lg:justify-center">
            <PriceBadge />
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Section 2: How it works ──────────────────────────────────────────────────

function HowItWorksSection() {
  return (
    <section className="snap-section lg:flex lg:flex-col lg:justify-center" style={{ backgroundColor: 'var(--color-teal-dark)', paddingBlock: 'var(--section-padding)', minHeight: 'var(--section-min-height)' }}>
      <div className="w-full mx-auto max-w-7xl px-6 lg:px-8">
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

// ─── Section 3: Is this right for me ─────────────────────────────────────────

function SuitabilitySection() {
  return (
    <section className="relative snap-section" style={{ minHeight: 'var(--section-min-height)' }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={DIAGONAL_TEXTURE} />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 lg:h-full">

        {/* Left: Suitable for — white background */}
        <div className="bg-background lg:flex lg:flex-col lg:justify-center" style={{ paddingBlock: 'var(--section-padding)' }}>
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
        <div className="lg:flex lg:flex-col lg:justify-center" style={{ backgroundColor: 'var(--color-subtle)', paddingBlock: 'var(--section-padding)' }}>
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

// ─── Section 4: Conditions we can help with ───────────────────────────────────

function ConditionsSection() {
  return (
    <section className="relative bg-background snap-section lg:flex lg:flex-col lg:justify-center" style={{ paddingBlock: 'var(--section-padding)', minHeight: 'var(--section-min-height)' }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={DIAGONAL_TEXTURE} />

      {/* Scoped styles: fixed-height cards with icon circle and lift-on-hover */}
      <style>{`
        .condition-card {
          height: 120px;
          background-color: var(--color-background);
          border: 0.5px solid color-mix(in oklch, var(--color-text) 10%, transparent);
          border-left: 2px solid var(--color-accent);
          border-radius: 8px;
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: transform 200ms ease, box-shadow 200ms ease;
        }
        .condition-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px -4px color-mix(in oklch, var(--color-text) 12%, transparent);
        }
        .condition-icon-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .condition-card-title {
          font-family: var(--font-headline);
          font-size: 13px;
          font-weight: 300;
          line-height: 1.35;
          color: var(--color-text);
        }
      `}</style>

      <div className="relative z-10 w-full mx-auto max-w-7xl px-6 lg:px-8">
        <p
          className="text-xs font-semibold uppercase text-accent mb-4"
          style={{ letterSpacing: '0.1em', opacity: 0.85 }}
        >
          Conditions we can help with
        </p>
        <h2 className="font-headline text-3xl lg:text-4xl font-light tracking-tight mb-12">
          What we can help with
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {CONDITIONS.map(({ label, icon: Icon }) => (
            <div key={label} className="condition-card">
              <div className="condition-icon-circle">
                <Icon size={16} strokeWidth={1.5} color="var(--color-background)" aria-hidden />
              </div>
              <p className="condition-card-title">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 5: FAQ ───────────────────────────────────────────────────────────

function FAQSection({ faqs }: { faqs: FAQItem[] }) {
  return (
    <section className="relative bg-subtle snap-section lg:flex lg:flex-col lg:justify-center" style={{ paddingBlock: 'var(--section-padding)', minHeight: 'var(--section-min-height)' }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={DIAGONAL_TEXTURE} />

      <div className="relative z-10 w-full mx-auto max-w-3xl px-6 lg:px-8">
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
