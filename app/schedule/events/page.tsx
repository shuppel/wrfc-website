import { Metadata } from 'next'
import { BreadcrumbJsonLd } from '../../../components/JsonLd'
import JsonLd from '../../../components/JsonLd'
import { getStructuredData, generateSEOMetadata } from '../../utils/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Events & Tournaments',
  description: 'Washington Rugby Football Club events, tournaments, and special occasions. Join us for the Cherry Blossom Tournament, 30 Under 30 game, and annual tours.',
  path: '/schedule/events'
})

export default function EventsPage() {
  const structuredData = getStructuredData('events', {
    '@type': 'WebPage',
    name: 'Events Schedule - WRFC',
    description: 'Washington Rugby Football Club annual events, tournaments, and social gatherings.'
  });

  const events = [
    {
      name: "30 Under 30 Game",
      type: "Match",
      description: "Annual showcase match featuring players under 30 years old",
      timing: "Annual",
      icon: "🏉"
    },
    {
      name: "End of Season Banquet",
      type: "Social",
      description: "Annual awards ceremony and celebration dinner",
      timing: "Late May / June",
      icon: "🏆"
    },
    {
      name: "Cherry Blossom Tournament",
      type: "Tournament",
      description: "Participation in the prestigious Cherry Blossom Rugby Tournament",
      timing: "Spring",
      icon: "🌸"
    },
    {
      name: "Turks and Caicos Tour",
      type: "Tour",
      description: "International rugby tour and team bonding experience",
      timing: "Annual Tour",
      icon: "✈️"
    },
    {
      name: "Regular Season",
      type: "Competition",
      description: "EPRU Division matches and league play",
      timing: "Late August - November",
      icon: "📅"
    },
    {
      name: "Playoff Season",
      type: "Competition",
      description: "Championship playoffs and knockout rounds",
      timing: "February - Early May",
      icon: "🥇"
    }
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Schedule', item: '/schedule' },
          { name: 'Events', item: '/schedule/events' }
        ]} 
      />
      <JsonLd type="WebPage" data={structuredData} />

      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-b from-blue-900 to-black text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-nasalization text-center">
            Events & Tournaments
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto font-jetbrains">
            Annual Events, Tours, and Special Occasions
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="w-full py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{event.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 font-nasalization text-blue-900 dark:text-blue-400">
                      {event.name}
                    </h3>
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {event.type}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3 font-jetbrains text-sm">
                      {event.description}
                    </p>
                    <div className="text-sm font-jetbrains">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">When: </span>
                      <span className="text-gray-600 dark:text-gray-400">{event.timing}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Season Calendar Overview */}
          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 font-nasalization text-blue-900 dark:text-blue-400 text-center">
              Season Overview
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="font-semibold font-jetbrains text-gray-900 dark:text-gray-100">Pre-Season Training</span>
                <span className="text-gray-600 dark:text-gray-400 font-jetbrains">July - August</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="font-semibold font-jetbrains text-gray-900 dark:text-gray-100">Fall Regular Season</span>
                <span className="text-gray-600 dark:text-gray-400 font-jetbrains">Late August - November</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="font-semibold font-jetbrains text-gray-900 dark:text-gray-100">Winter Training</span>
                <span className="text-gray-600 dark:text-gray-400 font-jetbrains">December - January</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="font-semibold font-jetbrains text-gray-900 dark:text-gray-100">Spring Playoffs</span>
                <span className="text-gray-600 dark:text-gray-400 font-jetbrains">February - Early May</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="font-semibold font-jetbrains text-gray-900 dark:text-gray-100">Summer 7s & Tours</span>
                <span className="text-gray-600 dark:text-gray-400 font-jetbrains">May - July</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}