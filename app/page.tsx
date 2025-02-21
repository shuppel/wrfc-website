import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Hero Section */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-black text-white p-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Washington Rugby Football Club
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Tradition. Excellence. Community.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/membership" 
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-blue-100 transition-colors"
            >
              Join WRFC
            </Link>
            <Link 
              href="/schedule" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors"
            >
              View Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="w-full py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <QuickLinkCard 
            title="Tournaments"
            description="View upcoming tournaments and register your team"
            href="/tournaments"
          />
          <QuickLinkCard 
            title="Team Roster"
            description="Meet our current squad and coaching staff"
            href="/roster"
          />
          <QuickLinkCard 
            title="Contact Us"
            description="Get in touch with WRFC management"
            href="/contact"
          />
        </div>
      </section>
    </div>
  )
}

function QuickLinkCard({ title, description, href }: { 
  title: string
  description: string
  href: string 
}) {
  return (
    <Link href={href}>
      <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-all cursor-pointer">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </Link>
  )
} 