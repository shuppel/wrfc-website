import Link from 'next/link'
import { ArrowLeft, Users } from 'lucide-react'
import { generateSEOMetadata } from '../../utils/seo'
import { BreadcrumbJsonLd } from '../../../components/JsonLd'
import JsonLd from '../../../components/JsonLd'
import AlumniSpotlightGrid from '@/components/feature/alumni/AlumniSpotlightGrid'

// Generate metadata for the alumni spotlights page
export const metadata = generateSEOMetadata({
  title: 'Alumni Spotlights',
  description: 'Celebrating WRFC alumni making a difference in their communities through rugby values, leadership, and service.',
  path: '/alumni/spotlights'
});

// Empty array for production - will be replaced with Contentful data
interface AlumniSpotlight {
  id: string
  name: string
  graduationYear: number
  currentRole?: string
  location?: string
  category: 'Community Service' | 'Professional Achievement' | 'Rugby Development' | 'Coaching'
  shortBio: string
  photo?: string
  featured?: boolean
}

const spotlights: AlumniSpotlight[] = []

export default function AlumniSpotlightsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'WRFC Alumni Spotlights',
    description: 'Stories of Washington Rugby Football Club alumni making a difference',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: spotlights.map((spotlight, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Person',
          name: spotlight.name,
          alumniOf: {
            '@type': 'SportsOrganization',
            name: 'Washington Rugby Football Club'
          },
          description: spotlight.shortBio
        }
      }))
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Alumni', item: '/alumni' },
          { name: 'Spotlights', item: '/alumni/spotlights' }
        ]} 
      />
      <JsonLd type="WebPage" data={structuredData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-wrfc-navy to-wrfc-navy/90 text-white py-24">
        <div className="container mx-auto px-4">
          <Link 
            href="/alumni"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 group"
          >
            <ArrowLeft className="mr-2 w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Alumni
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold  mb-6">
            Alumni Spotlights
          </h1>
          <p className="text-xl max-w-3xl text-gray-200">
            Celebrating WRFC alumni who embody our values of excellence, brotherhood, and service. 
            These Old Boys continue to make their mark on the world through rugby and beyond.
          </p>
        </div>
      </section>

      {/* Spotlights Grid */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          {spotlights.length > 0 ? (
            <AlumniSpotlightGrid spotlights={spotlights} showFilters={true} />
          ) : (
            /* Work in Progress Message */
            <div className="max-w-3xl mx-auto">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-16 text-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                <Users className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-300 ">
                  Alumni Spotlights Coming Soon
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  We&apos;re currently collecting and curating stories from our distinguished alumni. 
                  This section will showcase WRFC Old Boys who are making a significant impact in their 
                  communities through leadership, service, and the values they learned on the rugby pitch.
                </p>
                <div className="space-y-4 text-left max-w-md mx-auto">
                  <h3 className="font-bold text-gray-700 dark:text-gray-300">What to expect:</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex items-start">
                      <span className="text-wrfc-red mr-2">•</span>
                      Stories of community service and social impact
                    </li>
                    <li className="flex items-start">
                      <span className="text-wrfc-red mr-2">•</span>
                      Professional achievements and career highlights
                    </li>
                    <li className="flex items-start">
                      <span className="text-wrfc-red mr-2">•</span>
                      Contributions to rugby development
                    </li>
                    <li className="flex items-start">
                      <span className="text-wrfc-red mr-2">•</span>
                      Coaching and mentorship success stories
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 ">
            Know an Alumni Making a Difference?
          </h2>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We&apos;re always looking to celebrate our alumni&apos;s achievements. If you know a WRFC Old Boy 
            who should be featured, please get in touch.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center bg-wrfc-red hover:bg-wrfc-red/90 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 hover:shadow-lg"
          >
            Nominate an Alumni
          </Link>
        </div>
      </section>
    </div>
  )
}