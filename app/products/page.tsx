import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Products() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-[#FFF5E6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#FF8C00] mb-8">Our Products</h1>
          <p className="text-xl text-[#4A4A4A]">
            Discover our range of innovative products designed to streamline your IT operations and enhance your business performance. More details coming soon!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

