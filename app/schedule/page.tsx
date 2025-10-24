import Link from 'next/link'
import { Metadata } from 'next'
import { BreadcrumbJsonLd } from '../../components/JsonLd'
import JsonLd from '../../components/JsonLd'
import { getStructuredData, generateSEOMetadata } from '../utils/seo'
import { User, Circle, Calendar } from "lucide-react"

export const metadata: Metadata = generateSEOMetadata({
  title: 'Schedule',
  description: 'Washington Rugby Circle Club schedule hub - practice times, game fixtures, events, and tournaments. Find all upcoming activities and training sessions.',
  path: '/schedule'
})

export default function SchedulePage() {
  const structuredData = getStructuredData('schedule', {
    '@type': 'WebPage',
    name: 'Schedule - WRFC',
    description: 'Washington Rugby Circle Club schedule hub - practice times, game fixtures, and events.'
  });

  const scheduleLinks = [
    {
      href: '/schedule/practice',
      title: 'Practice Schedule',
      description: 'Training times, locations, and session breakdown',
      icon: <User size={64} strokeWidth={3} className="text-wrfc-navy dark:text-white" />
    },
    {
      href: '/schedule/game',
      title: 'Game Schedule',
      description: 'Match fixtures, results, and upcoming games',
      icon: <Circle size={64} strokeWidth={3} className="text-wrfc-navy dark:text-white" />
    },
    {
      href: '/schedule/events',
      title: 'Events & Tournaments',
      description: 'Annual events, tours, and special occasions',
      icon: <Calendar size={64} strokeWidth={3} className="text-wrfc-navy dark:text-white" />
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
          <h1 className="display-large mb-6 text-center">
            Schedule
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto ">
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
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h2 className="text-2xl font-bold mb-3 section-title text-blue-900 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 text-center">
                  {item.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300  text-center">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
          
          {/* Discord CTA */}
          <div className="mt-12 bg-gradient-to-r from-[#5865F2] to-[#4752C4] rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated in Real-Time</h3>
            <p className="text-lg mb-6">
              Get instant notifications about schedule changes, practice updates, and game reminders on Discord!
            </p>
            <a 
              href="https://discord.gg/XPkXVEySsh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-[#5865F2] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .031-.056c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span>Get real-time updates in our Discord</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 