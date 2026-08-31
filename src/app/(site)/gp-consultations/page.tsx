import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Droplets, Pill, Brain, Activity, Heart, Shield,
  Wind, Flower2, Bone, Plane, Eye, TestTube, Check,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import FAQTabs from '@/components/ui/FAQTabs'
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
    title: 'Online GP Consultations Ireland — ElyGP',
    description:
      'Book an online GP consultation with a vocationally trained Irish GP. Same day appointments available. Registered with the Irish Medical Council.',
    alternates: {
      canonical: 'https://elygp.ie/gp-consultations',
    },
    openGraph: {
      title: 'Online GP Consultations Ireland — ElyGP',
      description:
        'Book an online GP consultation with a vocationally trained Irish GP. Same day appointments available.',
      url: 'https://elygp.ie/gp-consultations',
      siteName: 'ElyGP',
      locale: 'en_IE',
      type: 'website',
      images: [
        {
          url: '/images/og-default.jpg',
          width: 1200,
          height: 630,
          alt: 'Online GP Consultations Ireland — ElyGP',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Online GP Consultations Ireland — ElyGP',
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
  name: 'Online GP Consultations Ireland — ElyGP',
  url: 'https://elygp.ie/gp-consultations',
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
  { label: 'Skin conditions',                icon: Droplets },
  { label: 'Medication queries and reviews', icon: Pill     },
  { label: 'Mental health support',          icon: Brain    },
  { label: 'Digestive issues',               icon: Activity },
  { label: "Women's health",                 icon: Heart    },
  { label: "Men's health",                   icon: Shield   },
  { label: 'Respiratory conditions',         icon: Wind     },
  { label: 'Allergies and hay fever',        icon: Flower2  },
  { label: 'Musculoskeletal issues',         icon: Bone     },
  { label: 'Travel health advice',           icon: Plane    },
  { label: 'Common eye and ear conditions',  icon: Eye      },
  { label: 'Advice on blood results',        icon: TestTube },
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GPConsultationsPage() {
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
        <ConditionsSection />
        <HowItWorksSection />
        <SuitabilitySection />
        <FAQSection />
        <FinalCTASection />
      </div>
    </>
  )
}

// ─── Section 1: Page header ───────────────────────────────────────────────────

const HEADER_POINTS = [
  'Vocationally trained GPs',
  'Specialist Division — Irish Medical Council',
  'Same day appointments available',
]

// Typographic statements anchored by a teal left border on the header's right side.
const HEADER_STATEMENTS = [
  { label: 'Consult by',    lead: 'Video',         accent: 'or phone.' },
  { label: 'Appointments',  lead: 'On your',       accent: 'schedule.' },
  { label: 'Consultation',  lead: 'Discreet and',  accent: 'private.' },
]

function HeaderStatements() {
  return (
    <div
      className="pl-7"
      style={{ borderLeft: '2px solid color-mix(in oklch, var(--color-accent) 35%, transparent)' }}
    >
      {HEADER_STATEMENTS.map((s, i) => (
        <div
          key={s.label}
          className={i > 0 ? 'pt-7 mt-7' : ''}
          style={
            i > 0
              ? { borderTop: '1px solid color-mix(in oklch, var(--color-text) 10%, transparent)' }
              : undefined
          }
        >
          <p
            className="text-xs font-semibold uppercase mb-3"
            style={{ letterSpacing: '0.1em', color: 'var(--color-accent)', opacity: 0.85 }}
          >
            {s.label}
          </p>
          <p className="font-headline text-4xl lg:text-5xl font-[200] tracking-tight leading-[1.05]">
            {s.lead}{' '}
            <em className="italic" style={{ color: 'var(--color-accent)' }}>{s.accent}</em>
          </p>
        </div>
      ))}
    </div>
  )
}

function PageHeader() {
  return (
    <section className="relative bg-background pt-32 lg:pt-40 snap-section" style={{ paddingBottom: 'var(--section-padding)', minHeight: 'var(--section-min-height)' }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={DIAGONAL_TEXTURE} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:gap-16 xl:gap-24">

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

            <ul className="mt-8 space-y-4 max-w-[44ch]">
              {HEADER_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-3 text-base lg:text-lg text-text">
                  <span
                    className="flex items-center justify-center size-5 rounded-full shrink-0"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    <Check size={12} color="white" strokeWidth={3} aria-hidden />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href={process.env.NEXT_PUBLIC_BOOKING_URL ?? '#'}
                className="inline-block px-8 py-4 bg-accent text-background text-sm font-medium rounded transition-colors hover:bg-accent-dark"
              >
                Book a Consultation
              </Link>
              <Link
                href="#conditions"
                className="text-sm font-medium transition-colors hover:text-accent"
                style={{ color: 'var(--color-accent)' }}
              >
                See what we treat →
              </Link>
            </div>
          </div>

          {/* Right: typographic block — vertically centred on desktop,
              sits below text content on mobile */}
          <div className="mt-14 lg:mt-0 lg:shrink-0">
            <HeaderStatements />
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Section 2: How it works ──────────────────────────────────────────────────

function HowItWorksSection() {
  return (
    <section className="relative snap-section lg:flex lg:flex-col lg:justify-center" style={{ backgroundColor: 'var(--color-teal-dark)', paddingBlock: 'var(--section-padding)', minHeight: 'var(--section-min-height)' }}>
      {/* Diagonal texture — white lines so it reads on the dark teal background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.04) 4px, rgba(255,255,255,0.04) 5px)',
        }}
      />
      <div className="relative z-10 w-full mx-auto max-w-7xl px-6 lg:px-8">
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
                style={{ color: 'var(--color-footer-text)', opacity: 0.9 }}
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
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 lg:h-full">

        {/* Left: Suitable for — white background */}
        <div className="relative bg-background lg:flex lg:flex-col lg:justify-start" style={{ paddingBlock: 'var(--section-padding)' }}>
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={DIAGONAL_TEXTURE} />
          <div className="relative z-10 mx-auto max-w-lg px-6 lg:px-0 lg:ml-auto lg:mr-0 lg:pr-12 xl:pr-20">
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
        <div className="relative lg:flex lg:flex-col lg:justify-start" style={{ backgroundColor: 'var(--color-subtle)', paddingBlock: 'var(--section-padding)' }}>
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={DIAGONAL_TEXTURE} />
          <div className="relative z-10 mx-auto max-w-lg px-6 lg:px-0 lg:mr-auto lg:ml-0 lg:pl-12 xl:pl-20">
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
    <section id="conditions" className="relative bg-subtle snap-section lg:flex lg:flex-col lg:justify-center" style={{ paddingBlock: 'var(--section-padding)', minHeight: 'var(--section-min-height)' }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={DIAGONAL_TEXTURE} />

      {/* Scoped styles: substantial cards that illuminate and lift on hover */}
      <style>{`
        .condition-card {
          min-height: 160px;
          background-color: var(--color-background);
          border: 0.5px solid color-mix(in oklch, var(--color-text) 10%, transparent);
          border-radius: 12px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: background-color 250ms ease, box-shadow 250ms ease, transform 250ms ease;
        }
        .condition-card:hover {
          background-color: var(--color-accent-wash);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }
        .condition-icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--color-accent-wash);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background-color 250ms ease;
        }
        .condition-card:hover .condition-icon-circle {
          background-color: #ffffff;
        }
        .condition-card-title {
          font-family: var(--font-headline);
          font-size: 20px;
          font-weight: 300;
          line-height: 1.3;
          color: var(--color-text);
          transition: color 250ms ease;
        }
        .condition-card:hover .condition-card-title {
          color: #1B6B6B;
        }
        /* Desktop: compact tiles so 12 tiles + headline fit one viewport */
        @media (min-width: 1024px) {
          .condition-card {
            min-height: 112px;
            padding: 20px 24px;
            gap: 12px;
          }
          .condition-icon-circle {
            width: 42px;
            height: 42px;
          }
          .condition-card-title {
            font-size: 18px;
          }
        }
      `}</style>

      <div className="relative z-10 w-full mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="font-headline text-3xl lg:text-4xl font-light tracking-tight mb-12 lg:mb-8">
          What we can <em className="italic text-accent">help</em> with
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-4">
          {CONDITIONS.map(({ label, icon: Icon }) => (
            <div key={label} className="condition-card">
              <div className="condition-icon-circle">
                <Icon size={22} strokeWidth={1.5} color="#1B6B6B" aria-hidden />
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

function FAQSection() {
  return (
    <section className="relative bg-subtle snap-section lg:flex lg:flex-col lg:justify-center" style={{ paddingBlock: 'var(--section-padding)', minHeight: 'var(--section-min-height)' }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={DIAGONAL_TEXTURE} />

      <div className="relative z-10 w-full mx-auto max-w-3xl px-6 lg:px-8">
        <FAQTabs serviceCategory="gp-consultations" title="FAQ" />
      </div>
    </section>
  )
}
