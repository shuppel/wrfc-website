import { BreadcrumbJsonLd } from '../../../components/JsonLd'
import JsonLd from '../../../components/JsonLd'
import { getStructuredData } from '../../utils/seo'

export default function GameSchedulePage() {
  const structuredData = getStructuredData('game-schedule', {
    '@type': 'WebPage',
    name: 'Game Schedule - WRFC',
    description: 'Washington Rugby Football Club game schedule, fixtures, and match information.'
  });

  return (
    <div className="flex flex-col items-center w-full">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Schedule', item: '/schedule' },
          { name: 'Games', item: '/schedule/game' }
        ]} 
      />
      <JsonLd type="WebPage" data={structuredData} />

      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-b from-blue-900 to-black text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-nasalization text-center">
            Game Schedule
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto font-jetbrains">
            Upcoming Matches & Fixtures
          </p>
        </div>
      </section>

      {/* Schedule Content */}
      <section className="w-full py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 font-nasalization text-blue-900 dark:text-blue-400">
              2024 Season Schedule
            </h2>
            <p className="text-gray-700 dark:text-gray-300 font-jetbrains text-lg">
              Game schedule will be updated as fixtures are confirmed.
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-jetbrains mt-4">
              Check back regularly for updates or follow us on social media for the latest match announcements.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}