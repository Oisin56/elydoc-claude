/**
 * Central image configuration for ElyGP.
 * All static images are production assets served from /public/images/.
 * Register every next/image asset here and import from this file — never inline src strings.
 * Descriptive alt text is defined here and must be preserved if images are swapped.
 */

export const images = {
  /**
   * Hero — Homepage full-bleed background.
   * Lifestyle photograph of a doctor or patient in a clean, warm consultation setting.
   */
  hero: {
    src: '/images/hero.webp',
    alt: 'ElyGP — professional online GP consultation in a calm, clinical setting',
    width: 1311,
    height: 805,
  },
  /**
   * Chairs Background — Why ElyGP section and Final CTA section.
   * Consultation room seating — adds warmth and depth behind the teal overlay.
   */
  chairsBackground: {
    src: '/images/chairs.webp',
    alt: 'ElyGP consultation room',
    width: 1456,
    height: 816,
  },
  /**
   * Patient Call — GP Consultations header phone mockup, full-bleed screen.
   * Portrait video-call view of a patient during an online consultation.
   */
  patientCall: {
    src: '/images/patient-call.webp',
    alt: 'Patient during an online GP video consultation with ElyGP',
    width: 720,
    height: 1280,
  },
  /**
   * Doctor Call — GP Consultations header phone mockup, picture-in-picture.
   * Square video-call view of an ElyGP GP during an online consultation.
   */
  doctorCall: {
    src: '/images/doctor-call.webp',
    alt: 'ElyGP GP during an online video consultation',
    width: 800,
    height: 800,
  },
} as const
