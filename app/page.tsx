import Hero from '@/app/components/ui/hero'
import MissionStatement from './components/MissionStatement'
import CoreCompetencies from './components/CoreCompetencies'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with gradient overlay */}
      <section className="relative bg-gradient-to-b from-background via-background to-paper">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <Hero />
      </section>

      {/* Mission Statement with subtle parallax effect */}
      <section className="relative bg-paper">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/5 pointer-events-none"></div>
        <MissionStatement />
      </section>

      {/* Core Competencies with animated transitions */}
      <section className="relative bg-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <CoreCompetencies />
      </section>
    </div>
  )
}

