import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { BreadcrumbJsonLd } from '../../components/JsonLd'
import { generateSEOMetadata } from '../utils/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Rugby in Washington DC Neighborhoods',
  description: 'Find rugby training near you in Washington DC. WRFC serves Capitol Hill, Georgetown, Dupont Circle, and all DC neighborhoods.',
  path: '/local'
})

const neighborhoods = [
  {
    name: 'Capitol Hill',
    slug: 'capitol-hill',
    description: 'Serving Capitol Hill, Navy Yard, and Eastern Market',
    features: ['10 min from Union Station', 'H Street corridor access', 'Young professional community']
  },
  {
    name: 'Georgetown',
    slug: 'georgetown',
    description: 'Serving Georgetown, Foggy Bottom, and West End',
    features: ['Professional network', 'Post-work training', 'Dupont Circle socials']
  }
]

export default function LocalPage() {
  return (
    <div className="flex flex-col w-full">
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Local Rugby', item: '/local' }
        ]} 
      />

      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-b from-wrfc-navy to-black text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-nasalization text-center">
            Rugby in Your DC Neighborhood
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Washington Rugby Football Club serves players from all across the DC metro area. 
            Find information specific to your neighborhood.
          </p>
        </div>
      </section>

      {/* Neighborhoods Grid */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {neighborhoods.map((neighborhood) => (
              <Link
                key={neighborhood.slug}
                href={`/local/${neighborhood.slug}`}
                className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-8 hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-wrfc-red transition-colors">
                      {neighborhood.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {neighborhood.description}
                    </p>
                  </div>
                  <MapPin className="w-8 h-8 text-wrfc-red flex-shrink-0" />
                </div>
                
                <ul className="space-y-2 mb-6">
                  {neighborhood.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="w-1.5 h-1.5 bg-wrfc-red rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center text-wrfc-red font-semibold">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Don&apos;t See Your Neighborhood?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              WRFC welcomes players from all DC neighborhoods including Dupont Circle, 
              Adams Morgan, Columbia Heights, Shaw, and beyond.
            </p>
            <Link 
              href="/contact"
              className="inline-block bg-wrfc-red hover:bg-wrfc-red/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Us for More Info
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}