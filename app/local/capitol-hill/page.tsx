import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Calendar, Users, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { BreadcrumbJsonLd } from '../../../components/JsonLd'
import JsonLd from '../../../components/JsonLd'
import { generateSEOMetadata } from '../../utils/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Rugby in Capitol Hill DC',
  description: 'Washington Rugby Football Club practises Tuesday and Thursday evenings at grounds a short ride from Capitol Hill, with matches on Saturdays. Founded 1963, beginners welcome.',
  path: '/local/capitol-hill'
})

export default function CapitolHillPage() {
  const structuredData = {
    '@type': 'LocalBusiness',
    name: 'Washington Rugby Football Club - Capitol Hill',
    description: 'Rugby club founded 1963, training around the District and drawing players from Capitol Hill',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Washington',
      addressRegion: 'DC',
      addressCountry: 'US',
      areaServed: 'Capitol Hill'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.8899,
      longitude: -77.0091
    },
    url: 'https://washingtonrugby.org/local/capitol-hill',
    parentOrganization: {
      '@type': 'SportsOrganization',
      name: 'Washington Rugby Football Club',
      url: 'https://washingtonrugby.org'
    }
  };

  return (
    <div className="flex flex-col w-full">
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Local', item: '/local' },
          { name: 'Capitol Hill', item: '/local/capitol-hill' }
        ]} 
      />
      <JsonLd type="Organization" data={structuredData} />

      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/pictures/huddle_2025_irish.jpg"
            alt="WRFC Rugby Training in Capitol Hill DC"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-wrfc-navy/95 via-wrfc-navy/85 to-black/90" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold  mb-6">
              Rugby in Capitol Hill
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-quantico">
              Rugby Within Reach of Capitol Hill
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-200">
              Join WRFC and train with passionate rugby players from Capitol Hill, 
              Navy Yard, and downtown DC. All skill levels welcome.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/membership" 
                className="bg-wrfc-red hover:bg-wrfc-red/90 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center group"
              >
                Join WRFC Today
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/schedule/practice" 
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold transition-all"
              >
                View Practice Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 ">
            Convenient Training Locations for Capitol Hill Residents
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-wrfc-red" />
                <h3 className="text-2xl font-bold">Primary Training Ground</h3>
              </div>
              <h4 className="text-xl font-semibold mb-2">Rosedale Recreation Center</h4>
              <p className="text-gray-600 dark:text-gray-100 mb-4">
                1701 Gales St NE, Washington, DC 20002
              </p>
              <p className="text-gray-600 dark:text-gray-100 mb-4">
                Just 10 minutes from Capitol Hill via H Street corridor. 
                Easy access from Union Station and Eastern Market Metro.
              </p>
              <a 
                href="https://maps.google.com/maps?q=Rosedale+Recreation+Center+1701+Gales+St+NE+Washington+DC+20002"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wrfc-red hover:underline font-semibold"
              >
                Get Directions →
              </a>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-wrfc-navy" />
                <h3 className="text-2xl font-bold">Summer 7s Location</h3>
              </div>
              <h4 className="text-xl font-semibold mb-2">Wallenberg Field</h4>
              <p className="text-gray-600 dark:text-gray-100 mb-4">
                Raoul Wallenberg Pl SW (behind Holocaust Museum)
              </p>
              <p className="text-gray-600 dark:text-gray-100 mb-4">
                Downtown location perfect for after-work training. 
                Walking distance from Smithsonian Metro.
              </p>
              <a 
                href="https://maps.app.goo.gl/YgkGvG25ZMvrzYWk9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wrfc-red hover:underline font-semibold"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 ">
            Why Capitol Hill Residents Choose WRFC
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <Users className="w-16 h-16 text-wrfc-red mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Diverse Community</h3>
              <p className="text-gray-600 dark:text-gray-100">
                Players from Capitol Hill, Navy Yard, Eastern Market, and H Street. 
                Government workers, consultants, and young professionals.
              </p>
            </div>
            
            <div className="text-center">
              <Calendar className="w-16 h-16 text-wrfc-navy mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Flexible Schedule</h3>
              <p className="text-gray-600 dark:text-gray-100">
                Evening practices perfect for DC professionals. 
                Social events and post-practice gatherings at local Capitol Hill spots.
              </p>
            </div>
            
            <div className="text-center">
              <MapPin className="w-16 h-16 text-wrfc-teal mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Metro Accessible</h3>
              <p className="text-gray-600 dark:text-gray-100">
                Training locations accessible via Union Station, Eastern Market, 
                and Smithsonian Metro stations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-wrfc-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 ">
            Start Your Rugby Journey in Capitol Hill
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Whether you&apos;re new to rugby or an experienced player, WRFC welcomes 
            all Capitol Hill residents. Join us for a practice and experience 
            the camaraderie of a club that has been here since 1963.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/membership"
              className="bg-wrfc-red hover:bg-wrfc-red/90 text-white px-10 py-5 rounded-lg font-bold text-lg transition-all transform hover:scale-105 hover:shadow-xl"
            >
              Join WRFC Now
            </Link>
            <Link 
              href="/contact"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-5 rounded-lg font-bold text-lg transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}