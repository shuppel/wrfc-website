import { Metadata } from 'next'
import { BreadcrumbJsonLd } from '../../../components/JsonLd'
import JsonLd from '../../../components/JsonLd'
import { getStructuredData, generateSEOMetadata } from '../../utils/seo'
import { Circle, Trophy, Flower, Airplane, Calendar, Medal } from "@phosphor-icons/react/dist/ssr"

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
      icon: <Circle size={48} weight="bold" className="text-wrfc-red" />
    },
    {
      name: "End of Season Banquet",
      type: "Social",
      description: "Annual awards ceremony and celebration dinner",
      timing: "Late May / June",
      icon: <Trophy size={48} weight="bold" className="text-wrfc-red" />
    },
    {
      name: "Cherry Blossom Tournament",
      type: "Tournament",
      description: "The tournament WRFC has hosted every spring since 1968, drawing club, college and high school sides from across the East Coast",
      timing: "Spring",
      icon: <Flower size={48} weight="bold" className="text-wrfc-red" />
    },
    {
      name: "Turks and Caicos Tour",
      type: "Tour",
      description: "International rugby tour and team bonding experience",
      timing: "Annual Tour",
      icon: <Airplane size={48} weight="bold" className="text-wrfc-red" />
    },
    {
      name: "Regular Season",
      type: "Competition",
      description: "EPRU Division matches and league play",
      timing: "Late August - November",
      icon: <Calendar size={48} weight="bold" className="text-wrfc-red" />
    },
    {
      name: "Playoff Season",
      type: "Competition",
      description: "Championship playoffs and knockout rounds",
      timing: "February - Early May",
      icon: <Medal size={48} weight="bold" className="text-wrfc-red" />
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
          <h1 className="display-large mb-6 text-center">
            Events & Tournaments
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto ">
            Annual Events, Tours, and Special Occasions
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="w-full py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">{event.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 section-title text-blue-900 dark:text-blue-400">
                      {event.name}
                    </h3>
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {event.type}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-white mb-3  text-sm">
                      {event.description}
                    </p>
                    <div className="text-sm ">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">When: </span>
                      <span className="text-gray-600 dark:text-gray-100">{event.timing}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Season Calendar Overview */}
          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 section-title text-blue-900 dark:text-blue-400 text-center">
              Season Overview
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="font-semibold  text-gray-900 dark:text-gray-100">Pre-Season Training</span>
                <span className="text-gray-600 dark:text-gray-100 ">July - August</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="font-semibold  text-gray-900 dark:text-gray-100">Fall Regular Season</span>
                <span className="text-gray-600 dark:text-gray-100 ">Late August - November</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="font-semibold  text-gray-900 dark:text-gray-100">Winter Training</span>
                <span className="text-gray-600 dark:text-gray-100 ">December - January</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="font-semibold  text-gray-900 dark:text-gray-100">Spring Playoffs</span>
                <span className="text-gray-600 dark:text-gray-100 ">February - Early May</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="font-semibold  text-gray-900 dark:text-gray-100">Summer 7s & Tours</span>
                <span className="text-gray-600 dark:text-gray-100 ">May - July</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}