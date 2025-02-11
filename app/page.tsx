import Hero from '@/app/components/ui/hero'
import MissionStatement from './components/MissionStatement'
import CoreCompetencies from './components/CoreCompetencies'

export default function Home() {
  return (
    <main className="bg-background dark:bg-background transition-colors duration-300 min-h-screen">
      <div className="bg-paper dark:bg-paper">
        <Hero />
        <MissionStatement />
        <CoreCompetencies />
      </div>
    </main>
  )
}

