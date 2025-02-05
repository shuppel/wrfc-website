import Hero from './components/Hero'
import MissionStatement from './components/MissionStatement'
import CoreCompetencies from './components/CoreCompetencies'

export default function Home() {
  return (
    <main className="bg-[#FFF5E6] bg-paper">
      <Hero />
      <MissionStatement />
      <CoreCompetencies />
    </main>
  )
}

