import { Metadata } from 'next'
import Link from 'next/link'
import { generateSEOMetadata } from '../../utils/seo'
import { getAllPlayerProfiles } from '@/lib/contentful'
import PlayerRosterClient from '@/components/PlayerRosterClient'
import { players } from '@/data/players'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Player Roster',
  description: 'Meet the players of Washington Rugby Football Club. Our diverse roster includes talented athletes from all backgrounds united by their love of rugby.',
  path: '/teams/players'
})

export default async function PlayersPage() {
  // Try to fetch from Contentful, fallback to hardcoded data
  let contentfulPlayers: Awaited<ReturnType<typeof getAllPlayerProfiles>>;
  try {
    contentfulPlayers = await getAllPlayerProfiles();
  } catch (error) {
    console.warn('Failed to fetch players from Contentful:', error);
    contentfulPlayers = [];
  }
  const hasContentfulData = contentfulPlayers.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Player Roster
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet the talented athletes who make up Washington Rugby Football Club. 
            Our players come from diverse backgrounds but share a common passion for rugby excellence.
          </p>
        </div>

        {/* Player Roster with Filtering */}
        <PlayerRosterClient 
          players={players}
          hasContentfulData={hasContentfulData}
          contentfulPlayers={contentfulPlayers}
        />

        {/* Stats Summary */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              50+
            </div>
            <p className="text-gray-600 dark:text-gray-300">Active Players</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              3
            </div>
            <p className="text-gray-600 dark:text-gray-300">Divisions</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              15+
            </div>
            <p className="text-gray-600 dark:text-gray-300">Nationalities</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
              60+
            </div>
            <p className="text-gray-600 dark:text-gray-300">Years of Rugby</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-8 text-white max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="text-lg mb-6">
              Interested in playing rugby? We welcome players of all skill levels. 
              Come to a practice and see what WRFC is all about!
            </p>
            <Link 
              href="/membership"
              className="inline-block bg-white text-red-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Become a Member
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}