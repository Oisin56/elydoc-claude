'use client'

import { useState, useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { sanityClient } from '@/lib/sanity'

// ─── Types ────────────────────────────────────────────────────────────────────

type TextChild = {
  _key: string
  text: string
  marks?: string[]
}

type MarkDef = {
  _key: string
  _type: string
  href?: string
}

type Block = {
  _type: string
  _key?: string
  children?: TextChild[]
  markDefs?: MarkDef[]
}

export type CategoryKey = 'about' | 'booking-and-pricing' | 'treatment' | 'safety'

export type FAQEntry = {
  _id: string
  question: string
  answer: Block[]
  category: CategoryKey
  displayOrder?: number
}

// ─── Tab config ───────────────────────────────────────────────────────────────

const TABS: Array<{ value: CategoryKey; label: string }> = [
  { value: 'about',               label: 'About' },
  { value: 'booking-and-pricing', label: 'Booking & Pricing' },
  { value: 'treatment',           label: 'Treatment' },
  { value: 'safety',              label: 'Safety & Suitability' },
]

// ─── Placeholder data (shown when Sanity returns no items) ────────────────────

const PLACEHOLDERS: Record<CategoryKey, FAQEntry[]> = {
  about: [
    {
      _id: 'ph-a-1', category: 'about',
      question: 'What conditions can an online GP treat?',
      answer: [{ _type: 'block', children: [{ _key: '1', text: 'ElyGP GPs can help with a wide range of non-emergency primary care concerns — skin conditions, medication queries, mild-to-moderate mental health concerns, digestive issues, women\'s and men\'s health, respiratory conditions, allergies and musculoskeletal issues.' }] }],
    },
    {
      _id: 'ph-a-2', category: 'about',
      question: 'Are your GPs registered with the Irish Medical Council?',
      answer: [{ _type: 'block', children: [{ _key: '1', text: 'Yes. All ElyGP doctors are registered on the Specialist Division for General Practice with the Irish Medical Council, and are full active members of the ICGP.' }] }],
    },
    {
      _id: 'ph-a-3', category: 'about',
      question: 'Is this service available across Ireland?',
      answer: [{ _type: 'block', children: [{ _key: '1', text: 'Yes. ElyGP is available to patients anywhere in the Republic of Ireland by video or phone.' }] }],
    },
  ],
  'booking-and-pricing': [
    {
      _id: 'ph-b-1', category: 'booking-and-pricing',
      question: 'How much does a consultation cost?',
      answer: [{ _type: 'block', children: [{ _key: '1', text: 'Consultations are €55 per session. Payment is taken at the time of booking.' }] }],
    },
    {
      _id: 'ph-b-2', category: 'booking-and-pricing',
      question: 'How do I book an appointment?',
      answer: [{ _type: 'block', children: [{ _key: '1', text: 'You can book online through our booking system. Same-day appointments are often available for suitable conditions.' }] }],
    },
    {
      _id: 'ph-b-3', category: 'booking-and-pricing',
      question: 'Are same-day appointments available?',
      answer: [{ _type: 'block', children: [{ _key: '1', text: 'Yes. We aim to offer same-day video or phone consultations for suitable conditions whenever possible.' }] }],
    },
  ],
  treatment: [
    {
      _id: 'ph-t-1', category: 'treatment',
      question: 'Can I get a prescription from an online GP?',
      answer: [{ _type: 'block', children: [{ _key: '1', text: 'ElyGP can provide bridging prescriptions for established medications and short-term treatments for suitable conditions. We do not generally initiate new long-term medications and do not prescribe controlled drugs.' }] }],
    },
    {
      _id: 'ph-t-2', category: 'treatment',
      question: 'How do I prepare for my consultation?',
      answer: [{ _type: 'block', children: [{ _key: '1', text: 'Have your current medication list ready if relevant. Think about when your symptoms started and what you would like help with. A good internet connection and a quiet, private space make for the best consultation.' }] }],
    },
    {
      _id: 'ph-t-3', category: 'treatment',
      question: 'What happens after my consultation?',
      answer: [{ _type: 'block', children: [{ _key: '1', text: 'Where appropriate, prescriptions are sent directly to your chosen pharmacy. Referral letters, sick certificates, and follow-up advice are also available where clinically indicated.' }] }],
    },
  ],
  safety: [
    {
      _id: 'ph-s-1', category: 'safety',
      question: 'What if I need emergency care?',
      answer: [{ _type: 'block', children: [{ _key: '1', text: 'ElyGP is not an emergency service. If you are experiencing a medical emergency, chest pain, stroke symptoms or severe acute illness, please call 999 or attend your nearest Emergency Department immediately.' }] }],
    },
    {
      _id: 'ph-s-2', category: 'safety',
      question: 'Is this service suitable for children?',
      answer: [{ _type: 'block', children: [{ _key: '1', text: 'ElyGP is for patients aged 12 and over. Patients aged 12–18 are welcome but a parent or guardian must be present throughout the consultation. ElyGP is not suitable for children under 12.' }] }],
    },
    {
      _id: 'ph-s-3', category: 'safety',
      question: 'What conditions are not suitable for online consultation?',
      answer: [{ _type: 'block', children: [{ _key: '1', text: 'Medical emergencies, chest pain, stroke symptoms, severe acute illness, conditions requiring physical examination or blood tests, acute mental health crises, and ADHD assessment or management are not suitable for ElyGP.' }] }],
    },
  ],
}

// ─── Sanity query ─────────────────────────────────────────────────────────────

const QUERY = `
  *[_type == "faqItem" && serviceCategory == $serviceCategory] | order(displayOrder asc) {
    _id, question, answer, category, displayOrder
  }
`

// ─── Portable text renderer ───────────────────────────────────────────────────

function PortableText({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-2">
      {blocks.map((block, bi) => {
        if (block._type !== 'block') return null
        return (
          <p key={block._key ?? bi} className="text-sm leading-relaxed" style={{ opacity: 0.72 }}>
            {block.children?.map((child) => {
              const linkKey = child.marks?.find((m) => m !== 'strong' && m !== 'em')
              const linkDef = linkKey ? block.markDefs?.find((m) => m._key === linkKey) : undefined

              let node: React.ReactNode = child.text
              if (child.marks?.includes('strong')) node = <strong key="b">{node}</strong>
              if (child.marks?.includes('em'))     node = <em key="i">{node}</em>
              if (linkDef?.href)                   node = (
                <a
                  key="a"
                  href={linkDef.href}
                  className="text-accent underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {node}
                </a>
              )
              return <span key={child._key}>{node}</span>
            })}
          </p>
        )
      })}
    </div>
  )
}

// ─── Accordion item ────────────────────────────────────────────────────────────

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQEntry
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      style={{
        borderBottom: '1px solid color-mix(in oklch, var(--color-text) 10%, transparent)',
      }}
    >
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-5 text-left gap-4"
        aria-expanded={isOpen}
      >
        <span className="text-sm lg:text-base font-medium leading-snug">{item.question}</span>
        <span
          aria-hidden
          className="shrink-0 text-xl font-light leading-none select-none"
          style={{
            color: 'var(--color-accent)',
            display: 'inline-block',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 200ms ease',
          }}
        >
          +
        </span>
      </button>

      {/* Grid expand/collapse — 0fr → 1fr */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 300ms ease',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="pb-5">
            <PortableText blocks={item.answer} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── FAQTabs ──────────────────────────────────────────────────────────────────

export default function FAQTabs({
  serviceCategory,
  eyebrow = 'FAQ',
  title = 'Common questions',
}: {
  serviceCategory: string
  eyebrow?: string
  title?: string
}) {
  const [items, setItems]         = useState<FAQEntry[]>([])
  const [loading, setLoading]     = useState(true)
  const [activeTab, setActiveTab] = useState<CategoryKey>('about')
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [fading, setFading]       = useState(false)
  const contentRef                = useRef<HTMLDivElement>(null)

  useEffect(() => {
    sanityClient
      .fetch<FAQEntry[]>(QUERY, { serviceCategory })
      .then((data) => setItems(data ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [serviceCategory])

  // Group fetched items by category
  const grouped = items.reduce<Partial<Record<CategoryKey, FAQEntry[]>>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category]!.push(item)
    return acc
  }, {})

  // Which tabs to show: those with items (or all tabs when using placeholders)
  const usingPlaceholders = !loading && items.length === 0
  const visibleTabs = items.length > 0
    ? TABS.filter((t) => (grouped[t.value]?.length ?? 0) > 0)
    : TABS

  // Current items: live data or placeholders
  const displayItems = items.length > 0
    ? (grouped[activeTab] ?? [])
    : (usingPlaceholders ? PLACEHOLDERS[activeTab] : [])

  const handleTabChange = (tab: CategoryKey) => {
    if (tab === activeTab) return
    setFading(true)
    setTimeout(() => {
      setActiveTab(tab)
      setOpenItems(new Set()) // collapse all on tab change
      setFading(false)
    }, 150)
  }

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <>
      {/*
        Desktop: content area is max-height constrained so it scrolls internally
        within the 100svh snap section without overflowing it.
        160px ≈ eyebrow + title + tab bar + buffer.
      */}
      <style>{`
        .faq-tabs-scroll {
          overflow-y: hidden;
          scrollbar-width: none;
        }
        .faq-tabs-scroll::-webkit-scrollbar { display: none; }
        @media (min-width: 1024px) {
          .faq-tabs-scroll {
            overflow-y: auto;
            /* Reserve room for the eyebrow, headline and tab bar above. */
            max-height: calc(100svh - var(--section-padding) * 2 - 190px);
          }
        }
      `}</style>

      <div className="flex flex-col">

        {/* Heading block — matches the eyebrow + headline pattern used by
            every other section on the page. Left-aligned. */}
        <p
          className="text-xs font-semibold uppercase text-accent mb-4 shrink-0 text-left"
          style={{ letterSpacing: '0.1em', opacity: 0.85 }}
        >
          {eyebrow}
        </p>
        <h2 className="font-headline text-3xl lg:text-4xl font-light tracking-tight mb-8 shrink-0 text-left">
          {title}
        </h2>

        {/* Tab bar */}
        <div
          className="shrink-0 flex overflow-x-auto"
          style={{
            scrollbarWidth: 'none',
            borderBottom: '1px solid color-mix(in oklch, var(--color-text) 10%, transparent)',
          } as CSSProperties}
        >
          {visibleTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className="shrink-0 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap"
              style={{
                color: activeTab === tab.value
                  ? 'var(--color-accent)'
                  : 'color-mix(in oklch, var(--color-text) 42%, transparent)',
                borderBottom: activeTab === tab.value
                  ? '2px solid var(--color-accent)'
                  : '2px solid transparent',
                marginBottom: '-1px',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordion content — scrolls internally on desktop */}
        <div className="faq-tabs-scroll">
          <div
            ref={contentRef}
            style={{
              opacity: fading ? 0 : 1,
              transition: 'opacity 150ms ease',
            }}
          >
            {!loading && displayItems.map((item) => (
              <AccordionItem
                key={item._id}
                item={item}
                isOpen={openItems.has(item._id)}
                onToggle={() => toggleItem(item._id)}
              />
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
