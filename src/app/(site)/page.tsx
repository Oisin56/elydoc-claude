import type { Metadata } from 'next'
import { getRecentPosts } from '@/lib/blog'
import HeroSection from '@/components/home/HeroSection'
import ConvenienceSection from '@/components/home/ConvenienceSection'
import ServicesSection from '@/components/home/ServicesSection'
import WhyElyDocSection from '@/components/home/WhyElyDocSection'
import EmployerSection from '@/components/home/EmployerSection'
import BlogPreviewSection from '@/components/home/BlogPreviewSection'
import FinalCTASection from '@/components/home/FinalCTASection'

export const metadata: Metadata = {
  title: 'ElyDoc — Online GP Ireland | Online Doctor Ireland',
  description:
    'Doctor-led online GP consultations in Ireland. Speak with a vocationally trained GP from anywhere in Ireland. Private, confidential, and convenient.',
  keywords: [
    'online GP Ireland',
    'online doctor Ireland',
    'private GP online Ireland',
    'online GP consultation Ireland',
    'online doctor consultation Ireland',
  ],
  openGraph: {
    title: 'ElyDoc — Online GP Ireland | Online Doctor Ireland',
    description:
      'Doctor-led online GP consultations in Ireland. Speak with a vocationally trained GP from anywhere in Ireland.',
    url: 'https://elydoc.ie',
    siteName: 'ElyDoc',
    locale: 'en_IE',
    type: 'website',
  },
}

export default async function HomePage() {
  const posts = await getRecentPosts()

  return (
    <>
      <HeroSection />
      <ConvenienceSection />
      <ServicesSection />
      <WhyElyDocSection />
      <EmployerSection />
      <BlogPreviewSection posts={posts} />
      <FinalCTASection />
    </>
  )
}
