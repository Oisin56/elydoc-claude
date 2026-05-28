'use client'

import { useState } from 'react'

export type FAQItem = {
  _id: string
  question: string
  answer: string
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div
      style={{
        borderTop: '1px solid color-mix(in oklch, var(--color-text) 10%, transparent)',
        borderBottom: '1px solid color-mix(in oklch, var(--color-text) 10%, transparent)',
      }}
    >
      {items.map((item) => {
        const isOpen = openIds.has(item._id)
        return (
          <div
            key={item._id}
            style={{ borderBottom: '1px solid color-mix(in oklch, var(--color-text) 10%, transparent)' }}
            className="last:border-b-0"
          >
            <button
              onClick={() => toggle(item._id)}
              className="w-full flex justify-between items-center gap-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-headline text-lg font-light leading-snug">
                {item.question}
              </span>
              <span
                className="shrink-0 text-xl leading-none select-none"
                style={{ color: 'var(--color-accent)' }}
                aria-hidden
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>

            {/*
              CSS grid animation: grid-template-rows transitions from 0fr → 1fr
              without requiring a fixed max-height value.
            */}
            <div
              style={{
                display: 'grid',
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transition: 'grid-template-rows 260ms ease',
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <p
                  className="text-sm lg:text-base leading-relaxed pb-6"
                  style={{ opacity: 0.68 }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
