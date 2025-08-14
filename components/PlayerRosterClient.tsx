'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/portal-badge'
import { Input } from '@/components/ui/input'
import { Trophy, Star, Users } from 'lucide-react'
import type { Player } from '@/lib/supabase/types'

interface PlayerWithStats extends Player {
  slug: string
  caps: number
  isVeteran: boolean
}

interface PlayerRosterClientProps {
  initialPlayers: Player[]
}



export default function PlayerRosterClient({ initialPlayers }: PlayerRosterClientProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [positionFilter, setPositionFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Process players to add slug and calculate stats
  const playersWithStats: PlayerWithStats[] = useMemo(() => {
    return initialPlayers.map(player => {
      // Generate slug from name
      const slug = `${player.first_name}-${player.last_name}`.toLowerCase().replace(/\s+/g, '-')
      
      // Calculate approximate caps based on member_since and status
      const currentYear = new Date().getFullYear()
      const yearsActive = player.member_since ? currentYear - player.member_since : 0
      const capsPerYear = player.status === 'active' ? 15 : 10 // Approximate games per year
      const caps = Math.floor(yearsActive * capsPerYear * 0.7) // 70% attendance assumption
      
      // Veteran status (5+ years)
      const isVeteran = yearsActive >= 5

      return {
        ...player,
        slug,
        caps,
        isVeteran
      }
    })
  }, [initialPlayers])

  // Filter players
  const filteredPlayers = useMemo(() => {
    return playersWithStats.filter(player => {
      // Status filter
      if (statusFilter !== 'all' && player.status !== statusFilter) return false
      
      // Position filter
      if (positionFilter !== 'all' && player.position !== positionFilter) return false
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const fullName = `${player.first_name} ${player.last_name}`.toLowerCase()
        const displayName = (player.display_name || '').toLowerCase()
        if (!fullName.includes(query) && !displayName.includes(query)) return false
      }
      
      return true
    })
  }, [playersWithStats, statusFilter, positionFilter, searchQuery])

  // Get unique positions from actual data
  const availablePositions = useMemo(() => {
    const positions = new Set(initialPlayers.map(p => p.position).filter(Boolean))
    return Array.from(positions).sort()
  }, [initialPlayers])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Player Roster
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet the men who make up the Washington Renegades RFC
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Players
              </label>
              <Input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Position Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Position
              </label>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Positions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  {availablePositions.map(position => (
                    <SelectItem key={position} value={position || ''}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Players</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="injured">Injured</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="alumni">Alumni</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Players Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <Link
              key={player.id}
              href={`/teams/players/${player.slug}`}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                {/* Player Image */}
                <div className="aspect-w-3 aspect-h-4 bg-gradient-to-br from-wrfc-navy to-wrfc-red relative h-64">
                  {player.profile_image_url ? (
                    <Image
                      src={player.profile_image_url}
                      alt={`${player.first_name} ${player.last_name}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">
                          {player.jersey_number || `${player.first_name[0]}${player.last_name[0]}`}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Jersey Number */}
                  {player.jersey_number && (
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-lg font-bold text-wrfc-navy dark:text-white">
                        {player.jersey_number}
                      </span>
                    </div>
                  )}
                </div>

                {/* Player Info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {player.display_name || `${player.first_name} ${player.last_name}`}
                  </h3>
                  
                  <p className="text-wrfc-red dark:text-wrfc-teal font-semibold mb-2">
                    {player.position || 'Position TBD'}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {player.isVeteran && (
                      <Badge variant="outline" className="text-xs">
                        <Trophy className="w-3 h-3 mr-1" />
                        Veteran
                      </Badge>
                    )}
                    
                    {player.status === 'injured' && (
                      <Badge variant="destructive" className="text-xs">
                        Injured
                      </Badge>
                    )}
                    
                    {player.caps > 50 && (
                      <Badge className="text-xs bg-yellow-600 hover:bg-yellow-700">
                        <Star className="w-3 h-3 mr-1" />
                        {player.caps}+ caps
                      </Badge>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {player.hometown && (
                      <p>📍 {player.hometown}</p>
                    )}
                    {player.height_cm && player.weight_kg && (
                      <p>📏 {Math.floor(player.height_cm / 30.48)}&apos;{Math.round((player.height_cm % 30.48) / 2.54)}&quot; • {Math.round(player.weight_kg * 2.205)} lbs</p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No players found matching your criteria
            </p>
          </div>
        )}

        {/* Results Count */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredPlayers.length} of {initialPlayers.length} players
        </div>
      </div>
    </div>
  )
}