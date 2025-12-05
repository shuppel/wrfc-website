import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Trophy, Users, ArrowRight, MapPin, Clock, Star } from '@phosphor-icons/react/dist/ssr'
import { generateSEOMetadata } from '../utils/seo'
import JsonLd from '../../components/JsonLd'

// Generate metadata for the DC Rugby page
export const metadata = generateSEOMetadata({
  title: 'DC Rugby | Join Washington DC\'s Premier Rugby Club - WRFC',
  description: 'Looking for DC rugby? Washington Rugby Football Club is DC\'s premier rugby club since 1963. Join the best DC rugby team for competitive matches, training, and community. All levels welcome.',
  path: '/dc-rugby'
});

export default function DCRugbyPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    name: 'Washington Rugby Football Club',
    alternateName: 'WRFC',
    description: 'DC\'s premier rugby club and top DC rugby team since 1963',
    foundingDate: '1963',
    sport: {
      '@type': 'Sport',
      name: 'Rugby Union'
    },
    location: {
      '@type': 'Place',
      name: 'Washington, DC',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Washington',
        addressRegion: 'DC',
        addressCountry: 'US'
      }
    },
    url: 'https://washingtonrugby.org',
    sameAs: [
      'https://www.facebook.com/WashingtonRFC',
      'https://www.instagram.com/wrfc_dc',
      'https://twitter.com/WRFC_DC'
    ]
  };

  return (
    <div className="flex flex-col w-full">
      {/* Structured Data */}
      <JsonLd type="Organization" data={structuredData} />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/pictures/huddle_2025_irish.jpg"
            alt="DC Rugby Team - WRFC Huddle"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/95 via-blue-900/85 to-black/90" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="relative w-32 h-32">
                <Image
                  src="/logos/wrfc_logo.png"
                  alt="DC Rugby Club Logo - WRFC"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-nasalization mb-6 animate-fade-in">
              DC Rugby
              <span className="block text-wrfc-red">Starts Here</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-quantico opacity-90">
              Washington Rugby Football Club - DC&apos;s Premier Rugby Club Since 1963
              <span className="block text-lg mt-2 text-gray-300">Join the Best DC Rugby Team</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/membership" 
                className="bg-wrfc-red hover:bg-wrfc-red/90 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center group"
              >
                Join DC Rugby
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/schedule" 
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 hover:shadow-lg"
              >
                View DC Rugby Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose DC Rugby with WRFC */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-nasalization">
            Why Choose WRFC for DC Rugby?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <DCRugbyFeature 
              icon={<Trophy className="w-12 h-12 text-wrfc-red" />}
              title="DC Rugby Excellence"
              description="Former D II Capitol Region Champions with a proven track record of success in DC rugby competitions."
              stats="60+ Years of DC Rugby"
            />
            <DCRugbyFeature 
              icon={<Users className="w-12 h-12 text-wrfc-navy" />}
              title="Strongest DC Rugby Community"
              description="Join the most established DC rugby brotherhood with players from all backgrounds and skill levels."
              stats="100+ Active Members"
            />
            <DCRugbyFeature 
              icon={<Calendar className="w-12 h-12 text-wrfc-teal" />}
              title="Year-Round DC Rugby"
              description="Compete in both 15s and 7s seasons with regular matches against top DC rugby clubs."
              stats="30+ Matches Per Year"
            />
          </div>
        </div>
      </section>

      {/* DC Rugby Training & Location */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 font-nasalization">
                DC Rugby Training & Practice
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-wrfc-red mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Prime DC Rugby Location</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Train at premier DC rugby facilities with easy access from all parts of Washington DC and surrounding areas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-wrfc-navy mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Flexible DC Rugby Schedule</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Multiple training sessions per week to accommodate busy DC lifestyles while maintaining competitive edge.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Star className="w-6 h-6 text-wrfc-teal mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Expert DC Rugby Coaching</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Learn from experienced coaches who understand DC rugby and have developed players at all levels.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link 
                  href="/schedule/practice"
                  className="bg-wrfc-red hover:bg-wrfc-red/90 text-white px-6 py-3 rounded-lg font-bold transition-all inline-flex items-center"
                >
                  View DC Rugby Practice Schedule
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/assets/pictures/team_practice.jpg"
                alt="DC Rugby Training - WRFC Practice Session"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DC Rugby FAQ */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-nasalization">
            DC Rugby Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <DCRugbyFAQ 
              question="Is WRFC the best DC rugby club?"
              answer="WRFC is DC's premier rugby club with over 60 years of history, former championship titles, and the strongest DC rugby community. We welcome players of all levels and provide the best DC rugby experience."
            />
            <DCRugbyFAQ 
              question="How do I join DC rugby with WRFC?"
              answer="Joining DC rugby with WRFC is easy! Attend one of our practice sessions, fill out our membership form, or contact us directly. We welcome new players year-round and provide all the support you need to start your DC rugby journey."
            />
            <DCRugbyFAQ 
              question="Do I need experience to play DC rugby?"
              answer="No experience necessary! WRFC welcomes players of all skill levels to DC rugby. Our experienced coaches and veteran players will help you learn the game and develop your skills in a supportive environment."
            />
            <DCRugbyFAQ 
              question="Where does WRFC play DC rugby matches?"
              answer="WRFC plays DC rugby matches at various premier rugby facilities throughout the Washington DC area. We compete against other top DC rugby clubs and regional teams in organized league play."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/pictures/2025_irish_ruck.jpg"
            alt="DC Rugby Action - WRFC Match"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wrfc-navy/95 to-wrfc-navy/90" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-nasalization text-white">
            Ready to Start Your DC Rugby Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            Join Washington Rugby Football Club and become part of DC&apos;s premier rugby community. 
            Experience the best DC rugby has to offer with WRFC.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/membership"
              className="bg-wrfc-red hover:bg-wrfc-red/90 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 hover:shadow-lg inline-flex items-center justify-center"
            >
              Join DC Rugby Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/contact"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 hover:shadow-lg"
            >
              Contact DC Rugby Club
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function DCRugbyFeature({ icon, title, description, stats }: { 
  icon: React.ReactNode
  title: string
  description: string
  stats: string
}) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-6">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-4 font-nasalization">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <div className="text-wrfc-red font-bold text-lg">{stats}</div>
    </div>
  )
}

function DCRugbyFAQ({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
      <h3 className="text-xl font-bold mb-4 text-wrfc-navy dark:text-wrfc-red">{question}</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{answer}</p>
    </div>
  )
}