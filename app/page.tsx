import Hero from '@/app/components/ui/hero'
import MissionStatement from './components/content-blocks/MissionStatement'
import CoreCompetencies from './components/content-blocks/CoreCompetencies'
import QuickNav from './components/ui/QuickNav'
import { Metadata } from 'next'
import { defaultMetadata } from './seo/config'

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Home | Nodetus Integrators LLC',
  description: 'Welcome to Nodetus - Your partner for strategic IT Advisory services. We specialize in Market Research, Technical Writing, and Digital Transformation.',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Home | Nodetus Integrators LLC',
    description: 'Welcome to Nodetus - Your partner for strategic IT Advisory services.',
    type: 'website'
  }
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with gradient overlay */}
      <section id="top" className="relative bg-gradient-to-b from-background via-background to-paper">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <Hero />
      </section>

      {/* Mission Statement with subtle parallax effect */}
      <section id="mission" className="relative bg-paper scroll-mt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/5 pointer-events-none"></div>
        <MissionStatement />
      </section>

      {/* Core Competencies with animated transitions */}
      <section id="competencies" className="relative bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 scroll-mt-16">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,140,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,140,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,140,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,140,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <CoreCompetencies />
      </section>

      {/* Quick Navigation Menu */}
      <QuickNav />
    </div>
  )
}

