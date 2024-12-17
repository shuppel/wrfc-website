import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Playground() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-[#FFF5E6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#FF8C00] mb-8">Playground</h1>
          <p className="text-xl text-[#4A4A4A]">
            Welcome to our interactive playground! Experiment with our tools and technologies in a safe, sandbox environment. Stay tuned for exciting features and demos!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

