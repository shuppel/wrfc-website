'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface RosterPlayer {
  id: number;
  name: string;
  slug: string;
  position: string;
  number?: number;
  image: string;
  experience?: string;
  division: 'D1' | 'D3' | 'Both';
  height?: string;
  weight?: number;
  d1Caps?: number;
  d3Caps?: number;
  badges?: {
    text: string;
    variant?: "default" | "outline" | "glow";
  }[];
}

interface ContentfulPlayer {
  sys: { id: string }
  fields: {
    name: string
    position: string
    number?: number
    picture?: {
      fields: {
        file: {
          url: string
        }
      }
    }
    hometown?: string
    slug: string
  }
}

interface PlayerRosterClientProps {
  players: RosterPlayer[]
  hasContentfulData: boolean
  contentfulPlayers?: ContentfulPlayer[]
}

type SortField = 'name' | 'position' | 'division'
type SortDirection = 'asc' | 'desc'

export default function PlayerRosterClient({ 
  players, 
  hasContentfulData, 
  contentfulPlayers 
}: PlayerRosterClientProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'D1' | 'D3'>('All')
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Filter and sort players
  const filteredAndSortedPlayers = players
    .filter(player => {
      if (activeFilter === 'All') return true
      if (activeFilter === 'D1') return player.division === 'D1' || player.division === 'Both'
      if (activeFilter === 'D3') return player.division === 'D3' || player.division === 'Both'
      return true
    })
    .sort((a, b) => {
      let comparison = 0
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'position':
          comparison = a.position.localeCompare(b.position)
          break
        case 'division':
          comparison = a.division.localeCompare(b.division)
          break
        default:
          comparison = 0
      }
      
      return sortDirection === 'asc' ? comparison : -comparison
    })

  // Sort indicator component
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <span className="text-gray-400">↕️</span>
    }
    return (
      <span className="text-blue-600 dark:text-blue-400">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    )
  }

  return (
    <>
      {/* Division Filters */}
      <div className="flex justify-center gap-4 mb-8">
        <button 
          onClick={() => setActiveFilter('All')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            activeFilter === 'All'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All Players
        </button>
        <button 
          onClick={() => setActiveFilter('D1')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            activeFilter === 'D1'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          D1 Division
        </button>
        <button 
          onClick={() => setActiveFilter('D3')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            activeFilter === 'D3'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          D3 Division
        </button>
      </div>

      {hasContentfulData ? (
        // Contentful Players Grid
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {contentfulPlayers?.map((player) => (
            <Link
              key={player.sys.id}
              href={`/teams/players/${player.fields.slug}`}
              className="group"
            >
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                <div className="aspect-w-3 aspect-h-4 bg-gradient-to-br from-blue-600 to-blue-800 relative h-64">
                  {player.fields.picture ? (
                    <Image
                      src={`https:${player.fields.picture.fields.file.url}`}
                      alt={player.fields.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">
                          {player.fields.number || player.fields.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {player.fields.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">
                    {player.fields.position}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-100">
                    {player.fields.hometown}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // Real Players Table View
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Name <SortIcon field="name" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort('position')}
                      className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Position <SortIcon field="position" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort('division')}
                      className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Division <SortIcon field="division" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                    Height/Weight
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAndSortedPlayers.map((player, index) => (
                  <tr 
                    key={player.id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-750'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link 
                        href={`/teams/players/${player.slug}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                      >
                        {player.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900 dark:text-white">
                        {player.position}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        player.division === 'D1' 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                          : player.division === 'D3'
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                      }`}>
                        {player.division}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-100">
                      {player.height && player.weight ? `${player.height} / ${player.weight}kg` : player.height || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Player Count */}
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-100">
        Showing {filteredAndSortedPlayers.length} of {players.length} players
        {activeFilter !== 'All' && ` in ${activeFilter} division`}
        {sortField && ` (sorted by ${sortField} ${sortDirection === 'asc' ? '↑' : '↓'})`}
      </div>
    </>
  )
}