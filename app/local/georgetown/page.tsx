import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react'
import { BreadcrumbJsonLd } from '../../../components/JsonLd'
import JsonLd from '../../../components/JsonLd'
import { generateSEOMetadata } from '../../utils/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Rugby in Georgetown DC',
  description: 'Join Washington Rugby Football Club - serving Georgetown, Foggy Bottom, and West End DC. Convenient training locations and flexible schedule for professionals.',
  path: '/local/georgetown'
})

export default function GeorgetownPage() {
  const structuredData = {
    '@type': 'SportsOrganization',
    name: 'Washington Rugby Football Club - Georgetown',
    description: 'Premier rugby club serving Georgetown, Foggy Bottom, and West End Washington DC',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Washington',
      addressRegion: 'DC',
      addressCountry: 'US',
      areaServed: 'Georgetown'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.9076,
      longitude: -77.0723
    },
    url: 'https://washingtonrugby.org/local/georgetown',
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
          { name: 'Georgetown', item: '/local/georgetown' }
        ]} 
      />
      <JsonLd type="Organization" data={structuredData} />

      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/pictures/2025_irish_ruck.jpg"
            alt="WRFC Rugby Training Georgetown DC"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-wrfc-navy/95 via-wrfc-navy/85 to-black/90" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold font-nasalization mb-6">
              Rugby in Georgetown
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-quantico">
              DC&apos;s Premier Rugby Club for Georgetown Professionals
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-200">
              Perfect for Georgetown, Foggy Bottom, and West End residents. 
              Join fellow professionals in DC&apos;s most established rugby club.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/membership" 
                className="bg-wrfc-red hover:bg-wrfc-red/90 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center group"
              >
                Start Playing Rugby
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/schedule/practice" 
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold transition-all"
              >
                Training Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-nasalization">
            Easy Access from Georgetown & Foggy Bottom
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-wrfc-red" />
                <h3 className="text-2xl font-bold">Summer Training</h3>
              </div>
              <h4 className="text-xl font-semibold mb-2">Wallenberg Field</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Raoul Wallenberg Pl SW (behind Holocaust Museum)
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Just 15 minutes from Georgetown via Foggy Bottom Metro. 
                Perfect for after-work training sessions downtown.
              </p>
              <a 
                href="https://maps.app.goo.gl/YgkGvG25ZMvrzYWk9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wrfc-red hover:underline font-semibold"
              >
                Get Directions from Georgetown →
              </a>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-wrfc-navy" />
                <h3 className="text-2xl font-bold">Regular Season</h3>
              </div>
              <h4 className="text-xl font-semibold mb-2">Rosedale Recreation Center</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                1701 Gales St NE, Washington, DC 20002
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                20-minute drive from Georgetown. Many players carpool 
                from Georgetown and Dupont Circle areas.
              </p>
              <a 
                href="https://maps.google.com/maps?q=Rosedale+Recreation+Center+1701+Gales+St+NE+Washington+DC+20002"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wrfc-red hover:underline font-semibold"
              >
                View Driving Directions →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Georgetown Community */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-nasalization">
            Join Georgetown&apos;s Rugby Community
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <Users className="w-16 h-16 text-wrfc-red mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Professional Network</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with lawyers, consultants, and business professionals 
                from Georgetown, K Street, and downtown DC.
              </p>
            </div>
            
            <div className="text-center">
              <Calendar className="w-16 h-16 text-wrfc-navy mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Work-Life Balance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Evening practices designed for busy professionals. 
                Post-practice socials at Georgetown and Dupont venues.
              </p>
            </div>
            
            <div className="text-center">
              <MapPin className="w-16 h-16 text-wrfc-teal mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Georgetown Tradition</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Many WRFC alumni live in Georgetown and continue supporting 
                the club at matches and social events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-nasalization">
              Perfect for Georgetown Professionals
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-wrfc-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-wrfc-red">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Convenient Schedule</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    8pm practices allow time to commute from Georgetown offices. 
                    No need to rush from work - grab dinner in Georgetown first.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-wrfc-navy/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-wrfc-navy">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Professional Development</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Network with professionals from law firms, consulting companies, 
                    and government agencies. Many business connections made on the pitch.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-wrfc-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-wrfc-teal">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Social Scene</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Post-match socials at popular Georgetown and Dupont Circle venues. 
                    Annual events including the Cherry Blossom Tournament.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-wrfc-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 font-nasalization">
            Start Your Rugby Journey from Georgetown
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Join DC&apos;s premier rugby club and experience the perfect blend of 
            competitive sport and professional networking. New players welcome!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/membership"
              className="bg-wrfc-red hover:bg-wrfc-red/90 text-white px-10 py-5 rounded-lg font-bold text-lg transition-all transform hover:scale-105 hover:shadow-xl"
            >
              Join WRFC Today
            </Link>
            <Link 
              href="/contact"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-5 rounded-lg font-bold text-lg transition-all"
            >
              Get More Information
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}