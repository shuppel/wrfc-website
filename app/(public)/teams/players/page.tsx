import { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase-server'
import { generateSEOMetadata } from '../../utils/seo'
import dynamic from 'next/dynamic'

// Dynamically import the client component to avoid SSR issues
const PlayerRosterClient = dynamic(() => import('@/components/PlayerRosterClient'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )
})

export const metadata: Metadata = generateSEOMetadata({
  title: 'Player Roster',
  description: 'Meet the players of the Washington Renegades RFC. View player profiles, positions, and statistics.',
  path: '/teams/players'
})

export default async function PlayersPage() {
  const supabase = createServerClient()
  
  const { data: players, error } = await supabase
    .from('players')
    .select('*')
    .in('status', ['active', 'injured'])
    .order('last_name', { ascending: true })

  if (error) {
    console.error('Error fetching players:', error)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Unable to Load Players
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              There was an error loading the player roster. Please try again later.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <PlayerRosterClient initialPlayers={players || []} />
}