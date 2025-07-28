import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Heart, Calendar, Users, Trophy, CreditCard, Mail } from 'lucide-react'
import { generateSEOMetadata } from '../utils/seo'
import { BreadcrumbJsonLd } from '../../components/JsonLd'
import JsonLd from '../../components/JsonLd'

// Generate metadata for the alumni page
export const metadata = generateSEOMetadata({
  title: 'Alumni',
  description: 'Welcome back Old Boys! Stay connected with WRFC alumni, pay your dues, and celebrate our legacy of rugby excellence since 1963.',
  path: '/alumni'
});

export default function AlumniPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'WRFC Alumni',
    description: 'Alumni page for Washington Rugby Football Club old boys',
    mainEntity: {
      '@type': 'SportsOrganization',
      name: 'WRFC Alumni Association',
      parentOrganization: {
        '@type': 'SportsOrganization',
        name: 'Washington Rugby Football Club'
      }
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Alumni', item: '/alumni' }
        ]} 
      />
      <JsonLd type="WebPage" data={structuredData} />

      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/pictures/2022_d2_champs.png"
            alt="WRFC Alumni Champions"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-wrfc-navy/95 via-wrfc-navy/85 to-black/90" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold font-nasalization mb-6 animate-fade-in">
              Welcome Back, Old Boys!
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-quantico opacity-90">
              Celebrating Our Legacy Since 1963
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-200">
              Once a member of WRFC, always a member. Stay connected with your rugby brothers, 
              support current players, and keep the tradition alive.
            </p>
            
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.zeffy.com/ticketing/alumni-old-boy-membership"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-wrfc-red hover:bg-wrfc-red/90 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center group"
              >
                <CreditCard className="mr-2 w-5 h-5" />
                Pay 2025 Alumni Dues
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </a>
              <Link 
                href="/alumni/spotlights" 
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 hover:shadow-lg"
              >
                View Alumni Spotlights
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Membership Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-nasalization">
              Alumni Membership
            </h2>
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
              Your continued support helps maintain our club&apos;s excellence and provides opportunities 
              for the next generation of rugby players. Annual alumni dues support:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <Trophy className="w-12 h-12 text-wrfc-red mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">Player Development</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Equipment, coaching resources, and training facilities for current players
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <Users className="w-12 h-12 text-wrfc-navy mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">Alumni Events</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Under 30 Over 30 match, reunions, and exclusive alumni gatherings
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <Heart className="w-12 h-12 text-wrfc-teal mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">Community Impact</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Youth rugby programs and community outreach initiatives
                </p>
              </div>
            </div>

            <a 
              href="https://www.zeffy.com/ticketing/alumni-old-boy-membership"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-wrfc-red hover:bg-wrfc-red/90 text-white px-10 py-5 rounded-lg font-bold text-lg transition-all transform hover:scale-105 hover:shadow-xl group"
            >
              <CreditCard className="mr-3 w-6 h-6" />
              Pay Your Alumni Dues Now
              <ArrowRight className="ml-3 w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Featured Alumni Spotlights */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-nasalization">
            Alumni Making a Difference
          </h2>
          
          {/* Work in Progress Message */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-12 border-2 border-dashed border-gray-300 dark:border-gray-600">
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-700 dark:text-gray-300">
                Alumni Spotlights Coming Soon
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We&apos;re currently gathering stories from our distinguished alumni. 
                Check back soon to read about WRFC Old Boys making an impact in their communities.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Know an alumni with an inspiring story? <Link href="/contact" className="text-wrfc-red hover:underline">Contact us</Link> to nominate them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Support */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-nasalization">
            Ways to Give Back
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SupportCard 
              title="Annual Dues"
              description="Support club operations and alumni programs"
              icon={<CreditCard className="w-8 h-8" />}
              href="https://www.zeffy.com/ticketing/alumni-old-boy-membership"
              external
            />
            <SupportCard 
              title="Donate"
              description="Make a tax-deductible donation to WRFC"
              icon={<Heart className="w-8 h-8" />}
              href="/contact"
            />
            <SupportCard 
              title="Volunteer"
              description="Coach, mentor, or help at events"
              icon={<Users className="w-8 h-8" />}
              href="/contact"
            />
            <SupportCard 
              title="Legacy Giving"
              description="Include WRFC in your estate planning"
              icon={<Trophy className="w-8 h-8" />}
              href="/contact"
            />
          </div>
        </div>
      </section>

      {/* Alumni Events */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-nasalization">
            Alumni Event Ideas
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
            Events we&apos;d love to organize for our Old Boys community
          </p>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <EventCard 
              title="Under 30 Over 30 Match"
              date="June-July (Annual)"
              description="Young alumni vs veteran Old Boys - the highlight of our alumni calendar"
              icon={<Trophy className="w-6 h-6 text-wrfc-red" />}
            />
            <EventCard 
              title="Spring Golf Tournament"
              date="May 2026"
              description="18 holes with prizes, dinner, and rugby camaraderie"
              icon={<Calendar className="w-6 h-6 text-wrfc-navy" />}
            />
            <EventCard 
              title="Summer Reunion BBQ"
              date="Summer 2026"
              description="Family-friendly gathering at the clubhouse"
              icon={<Users className="w-6 h-6 text-wrfc-teal" />}
            />
            <EventCard 
              title="Hall of Fame Dinner"
              date="Fall 2026"
              description="Honoring WRFC legends and celebrating our history"
              icon={<Trophy className="w-6 h-6 text-wrfc-red" />}
            />
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500 italic">
              Interested in helping organize these events? 
              <Link href="/contact" className="text-wrfc-red hover:underline ml-1">Get in touch</Link> to join the planning committee.
            </p>
          </div>
        </div>
      </section>

      {/* Stay Connected */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-nasalization">
              Stay Connected
            </h2>
            <p className="text-lg mb-12 text-gray-600 dark:text-gray-300">
              Keep up with WRFC news, alumni updates, and exclusive events
            </p>
            
            <div className="flex justify-center mb-8">
              <Link 
                href="/contact"
                className="inline-flex items-center bg-wrfc-navy hover:bg-wrfc-navy/90 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 hover:shadow-lg group"
              >
                <Mail className="mr-2 w-5 h-5" />
                Join Alumni Newsletter
              </Link>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300">
              Follow us on social media for the latest updates and throwback photos
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

// Component for Support Cards
function SupportCard({ title, description, icon, href, external = false }: {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  external?: boolean
}) {
  const cardContent = (
    <>
      <div className="text-wrfc-red mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 font-nasalization">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </>
  )

  if (external) {
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-center group"
      >
        {cardContent}
      </a>
    )
  }

  return (
    <Link 
      href={href}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-center group"
    >
      {cardContent}
    </Link>
  )
}

// Component for Event Cards
function EventCard({ title, date, description, icon }: {
  title: string
  date: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1 font-nasalization">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{date}</p>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </div>
    </div>
  )
}