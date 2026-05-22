# ElyDoc — Project Brief

## What We're Building

A premium marketing website for ElyDoc (elydoc.ie), a business name of Ely Health and Wellness Group. ElyDoc is an Irish online GP clinic offering doctor-led consultations for selected non-emergency conditions.

Tech stack: Next.js (App Router), Tailwind CSS, Sanity CMS, deployed on Vercel.

## The One Sentence That Governs Everything

"Doctor-led online healthcare for suitable conditions in Ireland."

Every design decision, every line of copy, every component should be consistent with that sentence.

## Brand Feel

It should feel: calm, modern, premium, trustworthy, minimal, approachable, discreet, evidence-based, warm but authoritative.

It should never feel like: a wellness influencer brand, a pill mill, a generic hospital website, a cold design exercise, or an aggressive DTC pharma site.

Design references:

- Whoop.com — controlled colour, premium health, restrained confidence
- Calm.com — spaciousness, warmth, typographic calm
- Forma.ai — genuine design restraint, intelligent layout
- Stripe.com — specifically how typography conveys trust and intelligence without shouting

## Visual Direction

Typography does the heavy lifting. The site should feel spacious, readable and considered. Clean serif for headlines paired with a neutral sans-serif for body text. Generous line height and white space throughout.

Colour is defined in `/src/styles/tokens.css` — always reference these tokens, never hardcode colour values anywhere in the codebase. The palette intent is warm but clinically confident: an off-white base with a restrained accent that reads as trustworthy.

Components should be flat and minimal. Borders over shadows. No startup-flashy animations — subtle fade-ins are fine. Footer uses a dark background to ground the page.

Build mobile-first. Every component considered at 390px before 1440px.

## Copy Rules — Non-Negotiable

These are clinical and legal guardrails, not stylistic preferences.

Always:

- Irish/UK English spelling (organisation, colour, centre, licence)
- Professional, calm, intelligent tone
- Acknowledge what the service is not suitable for — this builds trust
- Use this credential statement accurately: "Our consultations are provided by vocationally trained GPs who have completed specialist GP training in Ireland and are registered on the Specialist Division for General Practice with the Irish Medical Council."

Never write:

- Guaranteed in relation to any treatment, prescription or certification
- Instant sick cert or anything implying automatic certification
- No questions asked
- Miracle weight loss or aggressive body transformation language
- Hype, urgency or scarcity language of any kind
- Anything implying ElyDoc prescribes opioids, benzodiazepines, sleeping tablets or controlled drugs
- Anything suggesting ElyDoc manages or refers for ADHD

Emergency safety copy — include on all relevant pages:

"If you are experiencing a medical emergency, chest pain, stroke symptoms or severe acute illness, please call 999 or attend your nearest Emergency Department immediately. ElyDoc is not an emergency service."

## Audiences

### Primary — Patients

Adults in Ireland seeking convenient, private, GP-led care for suitable conditions. Health-conscious, time-poor, comfortable with digital services. They want to feel they are in safe, qualified hands.

### Secondary — Employers

HR managers and business owners considering ElyDoc as an employee benefit. Slightly more formal tone. Key messages: specialist GP care, confidential, convenient, modern employee benefit. Primary CTA: contact for demo/pricing.

## Site Structure

| Route | Page |
| --- | --- |
| `/` | Home |
| `/services` | Services overview |
| `/gp-consultations` | Online GP consultations |
| `/weight-management` | Weight management clinic |
| `/hair-loss` | Hair loss clinic |
| `/sick-certification` | Sick certification |
| `/referrals-prescriptions` | Referrals & prescriptions |
| `/employers` | Employer page |
| `/about` | About & credentials |
| `/faq` | FAQ |
| `/blog` | Blog index |
| `/blog/[slug]` | Blog post |
| `/studio` | Sanity Studio (not public-facing) |

## Booking & CTA

Single consistent CTA throughout: "Book a Consultation"

Links to Zanda booking URL stored in Sanity SiteSettings. Do not vary the CTA label. Do not build any booking logic into the site itself.

## Cursor Session Instructions

- Read this brief before beginning any task
- Copy rules are clinical guardrails — apply them without exception
- All colour values must reference CSS tokens from `/src/styles/tokens.css` — never hardcode
- Use `next/image` for all images
- Use `generateMetadata()` on every page
- Build mobile-first
- Flag any conflict between this brief and technical best practice rather than silently overriding
- Don't add unrequested pages
