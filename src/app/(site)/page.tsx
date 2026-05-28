import type { Metadata } from 'next'
import { getRecentPosts } from '@/lib/blog'
import HeroSection from '@/components/home/HeroSection'
import ConvenienceSection from '@/components/home/ConvenienceSection'
import ServicesSection from '@/components/home/ServicesSection'
import WhyElyDocSection from '@/components/home/WhyElyDocSection'
import EmployerSection from '@/components/home/EmployerSection'
import BlogPreviewSection from '@/components/home/BlogPreviewSection'
import FinalCTASection from '@/components/home/FinalCTASection'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ElyDoc — Online GP Consultations Ireland',
    description:
      'Doctor-led online GP consultations for suitable conditions in Ireland. Vocationally trained GPs registered with the Irish Medical Council. Same day appointments available.',
    keywords: [
      'online GP Ireland',
      'online doctor Ireland',
      'private GP online Ireland',
      'online GP consultation Ireland',
      'online doctor consultation Ireland',
    ],
    alternates: {
      canonical: 'https://elydoc.ie',
    },
    openGraph: {
      title: 'ElyDoc — Online GP Consultations Ireland',
      description:
        'Doctor-led online GP consultations for suitable conditions in Ireland. Vocationally trained GPs registered with the Irish Medical Council.',
      url: 'https://elydoc.ie',
      siteName: 'ElyDoc',
      locale: 'en_IE',
      type: 'website',
      images: [
        {
          url: '/images/og-default.jpg',
          width: 1200,
          height: 630,
          alt: 'ElyDoc — Online GP Consultations Ireland',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ElyDoc — Online GP Consultations Ireland',
      description:
        'Doctor-led online GP consultations for suitable conditions in Ireland. Vocationally trained GPs registered with the Irish Medical Council.',
      images: ['/images/og-default.jpg'],
    },
  }
}

const medicalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'ElyDoc',
  alternateName: 'Ely Health and Wellness Group',
  url: 'https://elydoc.ie',
  description: 'Doctor-led online healthcare for suitable conditions in Ireland.',
  medicalSpecialty: 'General Practice',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IE',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ElyDoc',
  alternateName: 'Ely Health and Wellness Group',
  url: 'https://elydoc.ie',
  description: 'Doctor-led online healthcare for suitable conditions in Ireland.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '77 Camden Street Lower',
    addressLocality: 'Dublin',
    addressCountry: 'IE',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@elydoc.ie',
    contactType: 'customer service',
  },
}

export default async function HomePage() {
  const posts = await getRecentPosts()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/*
        homepage-snap: presence of this class activates scroll-snap-type: y mandatory
        on <html> at desktop via the html:has(.homepage-snap) rule in globals.css.
        Sections inside receive snap-align + 100svh height only on desktop.
      */}
      <div className="homepage-snap">
        <HeroSection />
        <ConvenienceSection />
        <ServicesSection />
        <WhyElyDocSection />
        <BlogPreviewSection posts={posts} />
        <EmployerSection />
        <FinalCTASection />
      </div>
    </>
  )
}
