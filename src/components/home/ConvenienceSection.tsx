import Link from 'next/link'

// May 2026 — Mon-start grid (May 1 = Friday)
const CAL_ROWS: (number | null)[][] = [
  [null, null, null, null, 1, 2, 3],
  [4, 5, 6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29, 30, 31],
]
const CAL_TODAY    = 27
const CAL_SELECTED = 28
const CAL_AVAILABLE = new Set([27, 28, 29, 30, 31])

function PhoneMockup() {
  return (
    <div
      aria-hidden
      className="relative w-[252px] h-[524px] rounded-[44px] bg-footer p-[10px]"
      style={{
        boxShadow:
          '0 28px 60px -10px color-mix(in oklch, var(--color-text) 28%, transparent),' +
          '0 0 0 1px color-mix(in oklch, var(--color-background) 7%, transparent)',
      }}
    >
      {/* Volume up */}
      <div
        className="absolute w-[3px] h-[26px] bg-footer rounded-tl-[2px] rounded-bl-[2px]"
        style={{ left: '-3px', top: '110px' }}
      />
      {/* Volume down */}
      <div
        className="absolute w-[3px] h-[26px] bg-footer rounded-tl-[2px] rounded-bl-[2px]"
        style={{ left: '-3px', top: '146px' }}
      />
      {/* Power button */}
      <div
        className="absolute w-[3px] h-[46px] bg-footer rounded-tr-[2px] rounded-br-[2px]"
        style={{ right: '-3px', top: '130px' }}
      />

      {/* Screen */}
      <div className="rounded-[36px] bg-background overflow-hidden h-full relative flex flex-col">
        {/* Dynamic island */}
        <div
          className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[82px] h-[24px] bg-footer rounded-xl z-10"
        />

        {/* Screen content */}
        <div className="flex-1 pt-[52px] pb-[18px] px-[16px] flex flex-col gap-[10px] overflow-hidden">

          {/* App header */}
          <div className="flex justify-between items-center">
            <span
              className="font-headline text-[15px] font-normal text-text"
              style={{ letterSpacing: '-0.01em' }}
            >
              ElyDoc
            </span>
            <div className="flex gap-[2px] items-end">
              {[5, 8, 11, 14].map((h, i) => (
                <div
                  key={i}
                  className="w-[3px] bg-text rounded-[1px]"
                  style={{
                    height: `${h}px`,
                    opacity: i < 2 ? 0.2 : 0.5,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Next Available card */}
          <div className="bg-subtle rounded-xl px-[14px] py-[12px]">
            <p
              className="text-[8.5px] font-semibold uppercase text-text mb-[3px]"
              style={{ letterSpacing: '0.08em', opacity: 0.4 }}
            >
              Next available
            </p>
            <p className="text-[22px] font-bold text-text leading-[1.1] mb-[3px]">
              Today
            </p>
            <p className="text-[11px] text-accent font-medium">
              Video or phone
            </p>
          </div>

          {/* Calendar */}
          <div className="flex-1">
            {/* Month header */}
            <div className="flex justify-between items-center mb-[8px]">
              <span className="text-[10px] text-text cursor-default" style={{ opacity: 0.25 }}>‹</span>
              <p className="text-[10px] font-semibold text-text">May 2026</p>
              <span className="text-[10px] text-text cursor-default" style={{ opacity: 0.25 }}>›</span>
            </div>

            {/* Day-of-week labels */}
            <div className="grid grid-cols-7 mb-[4px]">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <div
                  key={i}
                  className="text-center text-[8px] font-semibold text-text"
                  style={{ opacity: 0.3 }}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Date grid */}
            {CAL_ROWS.map((row, ri) => (
              <div key={ri} className="grid grid-cols-7 mb-[2px]">
                {row.map((date, di) => {
                  const isSelected  = date === CAL_SELECTED
                  const isToday     = date === CAL_TODAY
                  const isAvailable = date !== null && CAL_AVAILABLE.has(date)
                  const isPast      = date !== null && date < CAL_TODAY
                  return (
                    <div
                      key={di}
                      className={[
                        'flex items-center justify-center size-[22px] mx-auto rounded-full text-[9px]',
                        isSelected || isToday ? 'font-bold' : 'font-normal',
                        isSelected ? 'text-background bg-accent' : 'text-text',
                        isPast ? 'opacity-[0.22]' : date === null ? 'opacity-0' : 'opacity-100',
                      ].join(' ')}
                      style={{
                        ...(isToday && !isSelected ? {
                          backgroundColor: 'color-mix(in oklch, var(--color-accent) 14%, transparent)',
                        } : {}),
                        outline: isAvailable && !isSelected && !isToday
                          ? '1px solid color-mix(in oklch, var(--color-accent) 40%, transparent)'
                          : 'none',
                      }}
                    >
                      {date ?? ''}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Time slots */}
          <div>
            <p
              className="text-[8.5px] font-semibold uppercase text-text mb-[6px]"
              style={{ letterSpacing: '0.08em', opacity: 0.4 }}
            >
              Available times
            </p>
            <div className="flex gap-[6px]">
              {['09:00', '11:30', '14:00'].map((time, i) => (
                <div
                  key={time}
                  className={`flex-1 text-center py-[7px] px-[4px] rounded-[8px] text-[10px] font-semibold ${
                    i === 0 ? 'bg-accent text-background' : 'bg-subtle text-text'
                  }`}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>

          {/* Book CTA */}
          <div className="bg-accent rounded-[10px] p-[12px] text-center text-[11.5px] font-semibold text-background shrink-0">
            Book a Consultation
          </div>

        </div>
      </div>
    </div>
  )
}

export default function ConvenienceSection() {
  return (
    <section className="relative bg-subtle snap-section" style={{ paddingBlock: 'var(--section-padding)', minHeight: 'var(--section-min-height)' }}>
      {/* Diagonal line pattern overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.03) 4px, rgba(0,0,0,0.03) 5px)',
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left: text */}
        <div className="space-y-7 max-w-[480px]">
          <p
            className="text-xs font-semibold uppercase text-accent"
            style={{ letterSpacing: '0.1em', opacity: 0.85 }}
          >
            Built for convenience
          </p>

          <h2 className="font-headline text-5xl font-light tracking-tight">
            Book a consultation in{' '}
            <em className="text-accent italic">minutes</em>
          </h2>

          <p
            className="text-base lg:text-lg leading-relaxed"
            style={{ opacity: 0.68 }}
          >
            Same day appointments available for suitable conditions. Consult by video
            or phone — no waiting rooms, no travel. Specialist GP care when you need it.
          </p>

          <Link
            href={process.env.NEXT_PUBLIC_BOOKING_URL ?? '#'}
            className="inline-block px-8 py-4 bg-accent text-background text-sm font-medium rounded transition-colors hover:bg-accent-dark"
          >
            Book a Consultation
          </Link>
        </div>

        {/* Right: phone mockup */}
        <div className="flex justify-center items-center self-center">
          <div style={{ width: '280px' }}>
            <PhoneMockup />
          </div>
        </div>

      </div>
    </section>
  )
}
