import { Metadata } from 'next'
import { BreadcrumbJsonLd, SportEventJsonLd } from '../../../components/JsonLd'
import JsonLd from '../../../components/JsonLd'
import { getStructuredData, generateSEOMetadata } from '../../utils/seo'
import ScheduleView from '../../../components/feature/schedule/ScheduleView'
import { SAMPLE_DATA } from '../../../types/game'
import { getAllMatches } from '../../../lib/contentful'
import { transformMatch } from '../../../lib/contentful'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Match Schedule',
  description: 'Washington Rugby Football Club match schedule, fixtures, and results. Follow WRFC matches in MAC Conference D1 and Capital Conference D3 competitions.',
  path: '/schedule/game'
})

export default async function GameSchedulePage() {
  const structuredData = getStructuredData('game-schedule', {
    '@type': 'WebPage',
    name: 'Match Schedule - WRFC',
    description: 'Washington Rugby Football Club match schedule, fixtures, and match information.'
  });

  // Fetch matches from Contentful, fallback to sample data if not available
  let contentfulMatches: Awaited<ReturnType<typeof getAllMatches>>;
  try {
    contentfulMatches = await getAllMatches();
  } catch (error) {
    console.warn('Failed to fetch matches from Contentful:', error);
    contentfulMatches = [];
  }
  const games = contentfulMatches.length > 0 
    ? contentfulMatches.map(transformMatch) 
    : SAMPLE_DATA.games;

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
      
      {/* Add Event Schema for upcoming games */}
      {games
        .filter(game => new Date(game.date) >= new Date())
        .slice(0, 3) // Show schema for next 3 games
        .map((game, index) => {
          const opponent = game.isHome ? game.awayTeam : game.homeTeam;
          const matchName = game.isHome 
            ? `WRFC vs ${opponent.name}`
            : `${opponent.name} vs WRFC`;
          
          return (
            <SportEventJsonLd
              key={index}
              name={matchName}
              startDate={`${game.date}T${game.time}:00`}
              location={{
                name: game.venue.name,
                address: `${game.venue.address}, ${game.venue.city}, ${game.venue.state}`
              }}
              description={`Washington Rugby Football Club ${game.competition} match`}
              url={`https://washingtonrugby.org/schedule/game`}
              competitor1={{ 
                name: game.homeTeam.name, 
                url: game.homeTeam.id === 'wrfc' ? 'https://washingtonrugby.org' : undefined 
              }}
              competitor2={{ 
                name: game.awayTeam.name,
                url: game.awayTeam.id === 'wrfc' ? 'https://washingtonrugby.org' : undefined
              }}
            />
          );
        })}

      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-b from-blue-900 to-black text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-nasalization text-center">
            Game Schedule
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto font-jetbrains">
            View upcoming fixtures, past results, and season standings
          </p>
        </div>
      </section>

      {/* Schedule Content */}
      <section className="w-full py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScheduleView games={games} />
        </div>
      </section>
    </div>
  )
}