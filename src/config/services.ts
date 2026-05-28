import { Stethoscope, Scale, Pill, FileText, ClipboardList } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Flat service list used in the Nav dropdown and Footer links.
 * Combines Referrals & Prescriptions into a single entry for brevity.
 */
export const NAV_SERVICES = [
  { name: 'GP Consultations', href: '/gp-consultations', description: 'Doctor-led consultations for selected non-emergency conditions.' },
  { name: 'Weight Management', href: '/weight-management', description: 'Evidence-based, GP-led support including GLP-1 assessment where clinically appropriate.' },
  { name: 'Hair Loss', href: '/hair-loss', description: 'Discreet assessment and evidence-based management of male pattern hair loss.' },
  { name: 'Sick Certification', href: '/sick-certification', description: 'Employer absence notes where clinically appropriate, following GP consultation.' },
  { name: 'Referrals & Prescriptions', href: '/referrals-prescriptions', description: 'Private referral letters and selected prescriptions following a GP consultation.' },
] as const

/**
 * Full service card data used on the homepage ServicesSection.
 * Referrals and Prescriptions are shown as separate cards here.
 */
export interface ServiceConfig {
  name: string
  href: string
  description: string
  price: string
  note: string | null
  icon: LucideIcon
}

export const SERVICES: ServiceConfig[] = [
  {
    name: 'GP Consultation',
    href: '/gp-consultations',
    description: 'Doctor-led consultations for selected non-emergency conditions.',
    price: 'from €55',
    note: null,
    icon: Stethoscope,
  },
  {
    name: 'Weight Management',
    href: '/weight-management',
    description: 'Evidence-based, GP-led support including GLP-1 assessment where clinically appropriate.',
    price: '€95',
    note: 'Includes follow-up',
    icon: Scale,
  },
  {
    name: 'Hair Loss Clinic',
    href: '/hair-loss',
    description: 'Discreet assessment and evidence-based management of male pattern hair loss.',
    price: '€95',
    note: 'Includes follow-up',
    icon: Pill,
  },
  {
    name: 'Sick Certification',
    href: '/sick-certification',
    description: 'Employer absence notes where clinically appropriate, following GP consultation.',
    price: '€35',
    note: null,
    icon: FileText,
  },
  {
    name: 'Referrals',
    href: '/referrals-prescriptions',
    description: 'Private referral letters to specialists for suitable conditions.',
    price: 'from €75',
    note: null,
    icon: ClipboardList,
  },
  {
    name: 'Prescriptions',
    href: '/referrals-prescriptions',
    description: 'Selected private prescriptions issued following a GP consultation.',
    price: 'from €55',
    note: null,
    icon: Pill,
  },
]
