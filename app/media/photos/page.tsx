import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Camera } from '@phosphor-icons/react/dist/ssr'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import JsonLd from '@/components/JsonLd'
import { generateSEOMetadata } from '@/app/utils/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Club Photos - Coming Soon',
  description: 'WRFC club photo gallery - coming soon with match day photos, team events, and club activities.',
  path: '/media/photos'
})

export default function ClubPhotosPage() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Media', item: '/media' },
          { name: 'Club Photos', item: '/media/photos' }
        ]} 
      />
      <JsonLd type="WebPage" data={{
        '@type': 'WebPage',
        name: 'Club Photos - WRFC',
        description: 'WRFC club photo gallery - coming soon'
      }} />

      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-b from-blue-900 to-black text-white">
        <div className="container mx-auto px-4">
          <h1 className="display-large mb-6 text-center">
            Club Photos
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Photo gallery coming soon
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link 
          href="/media"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <ArrowLeft className="w-5 h-5" weight="bold" />
          Back to Media Hub
        </Link>

        {/* Coming Soon Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Camera className="w-12 h-12 text-blue-600 dark:text-blue-400" weight="duotone" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Photo Gallery Coming Soon
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-100 mb-8 max-w-2xl mx-auto">
              We&apos;re building a comprehensive photo gallery to showcase our club&apos;s best moments, 
              match day action, team events, and club activities.
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Match Day Photos</h3>
                <p className="text-sm text-gray-600 dark:text-gray-100">
                  Action shots from our games and tournaments
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Team Events</h3>
                <p className="text-sm text-gray-600 dark:text-gray-100">
                  Social gatherings and club celebrations
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Training Sessions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-100">
                  Behind-the-scenes practice and preparation
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-100 mb-4">
                In the meantime, check out our social media for the latest photos:
              </p>
              <Link 
                href="/media/social"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Visit Social Media
                <ArrowLeft className="w-5 h-5 rotate-180" weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
