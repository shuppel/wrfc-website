import Header from './components/Header'
import Hero from './components/Hero'
import MissionStatement from './components/MissionStatement'
import CoreCompetencies from './components/CoreCompetencies'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFF5E6] bg-paper">
      <Header />
      <main className="flex-grow">
        <Hero />
        <MissionStatement />
        <CoreCompetencies />
      </main>
      <Footer />
    </div>
  )
}

