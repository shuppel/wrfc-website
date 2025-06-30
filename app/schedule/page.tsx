import { generateMetadata, getStructuredData } from '../utils/seo'
import { BreadcrumbJsonLd } from '../../components/JsonLd'
import JsonLd from '../../components/JsonLd'
import ScheduleView from '../../components/feature/schedule/ScheduleView';
import { SAMPLE_DATA } from '../../types/game';

// Generate metadata for the schedule page
export const metadata = generateMetadata('schedule');

export default function Schedule() {
  // Enhanced structured data for the schedule page
  const structuredData = getStructuredData('schedule', {
    '@type': 'SportsEvent',
    name: 'WRFC Rugby Schedule',
    description: 'Washington Rugby Football Club match schedule for the current season',
    startDate: SAMPLE_DATA.games[0]?.date,
    location: {
      '@type': 'Place',
      name: 'Various Rugby Fields',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Washington',
        addressRegion: 'DC',
        addressCountry: 'US'
      }
    },
    organizer: {
      '@type': 'SportsOrganization',
      name: 'Washington Rugby Football Club',
      url: 'https://washingtonrugby.org'
    }
  });

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Schedule', item: '/schedule' }
        ]} 
      />
      <JsonLd type="Event" data={structuredData} />

      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="hero-title mb-6">Match Schedule</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          View upcoming and past matches for Washington Rugby Football Club. 
          Check game times, locations, and results for our Division 1 and Division 3 teams.
        </p>
      </div>

      {/* Schedule View - Client Component */}
      <ScheduleView games={SAMPLE_DATA.games} />
    </div>
  );
} 