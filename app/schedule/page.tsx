import Link from 'next/link'
import { BreadcrumbJsonLd } from '../../components/JsonLd'
import JsonLd from '../../components/JsonLd'
import { getStructuredData } from '../utils/seo'

export default function SchedulePage() {
  const structuredData = getStructuredData('schedule', {
    '@type': 'WebPage',
    name: 'Schedule - WRFC',
    description: 'Washington Rugby Football Club schedule hub - practice times, game fixtures, and events.'
  });

  const scheduleLinks = [
    {
      href: '/schedule/practice',
      title: 'Practice Schedule',
      description: 'Training times, locations, and session breakdown',
      icon: '🏃'
    },
    {
      href: '/schedule/game',
      title: 'Game Schedule',
      description: 'Match fixtures, results, and upcoming games',
      icon: '🏉'
    },
    {
      href: '/schedule/events',
      title: 'Events & Tournaments',
      description: 'Annual events, tours, and special occasions',
      icon: '📅'
    }
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Schedule', item: '/schedule' }
        ]} 
      />
      <JsonLd type="WebPage" data={structuredData} />

      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-b from-blue-900 to-black text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-nasalization text-center">
            Schedule
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto font-jetbrains">
            Everything you need to know about when and where
          </p>
        </div>
      </section>

      {/* Schedule Links */}
      <section className="w-full py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            {scheduleLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="text-5xl mb-4 text-center">{item.icon}</div>
                <h2 className="text-2xl font-bold mb-3 font-nasalization text-blue-900 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 text-center">
                  {item.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 font-jetbrains text-center">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 