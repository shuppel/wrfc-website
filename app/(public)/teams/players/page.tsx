import { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { generateSEOMetadata } from '../../utils/seo'
import PlayerRosterClient from '@/components/PlayerRosterClient'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Player Roster',
  description: 'Meet the players of the Washington Renegades RFC. View player profiles, positions, and statistics.',
  path: '/teams/players'
})

export default async function PlayersPage() {
  const { data: players, error } = await supabase
    .from('players')
    .select('*')
    .in('status', ['active', 'injured'])
    .order('last_name', { ascending: true })

  if (error) {
    console.error('Error fetching players:', error)
  }

  return <PlayerRosterClient initialPlayers={players || []} />
}