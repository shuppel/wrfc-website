'use client'

import { useState, useMemo } from 'react'
import AlumniSpotlightCard from './AlumniSpotlightCard'
import { MagnifyingGlass, Funnel } from '@phosphor-icons/react'

interface AlumniSpotlight {
  id: string
  name: string
  graduationYear: number
  currentRole?: string
  location?: string
  category: 'Community Service' | 'Professional Achievement' | 'Rugby Development' | 'Coaching'
  shortBio: string
  photo?: string
  featured?: boolean
}

interface AlumniSpotlightGridProps {
  spotlights: AlumniSpotlight[]
  showFilters?: boolean
}

export default function AlumniSpotlightGrid({ spotlights, showFilters = true }: AlumniSpotlightGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDecade, setSelectedDecade] = useState<string>('all')

  // Get unique categories and decades
  const categories = useMemo(() => {
    const cats = new Set(spotlights.map(s => s.category))
    return Array.from(cats).sort()
  }, [spotlights])

  const decades = useMemo(() => {
    const decs = new Set(spotlights.map(s => Math.floor(s.graduationYear / 10) * 10))
    return Array.from(decs).sort((a, b) => b - a)
  }, [spotlights])

  // Filter spotlights
  const filteredSpotlights = useMemo(() => {
    return spotlights.filter(spotlight => {
      // Search filter
      if (searchTerm && !spotlight.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !spotlight.shortBio.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (!spotlight.currentRole || !spotlight.currentRole.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false
      }

      // Category filter
      if (selectedCategory !== 'all' && spotlight.category !== selectedCategory) {
        return false
      }

      // Decade filter
      if (selectedDecade !== 'all') {
        const spotlightDecade = Math.floor(spotlight.graduationYear / 10) * 10
        if (spotlightDecade !== parseInt(selectedDecade)) {
          return false
        }
      }

      return true
    })
  }, [spotlights, searchTerm, selectedCategory, selectedDecade])

  if (!showFilters) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {spotlights.map((spotlight) => (
          <AlumniSpotlightCard key={spotlight.id} {...spotlight} />
        ))}
      </div>
    )
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search alumni by name, role, or story..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-wrfc-red focus:border-transparent"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-4">
          {/* Category filter */}
          <div className="flex items-center gap-2">
            <Funnel className="w-5 h-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-wrfc-red focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Decade filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedDecade}
              onChange={(e) => setSelectedDecade(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-wrfc-red focus:border-transparent"
            >
              <option value="all">All Decades</option>
              {decades.map(decade => (
                <option key={decade} value={decade}>{decade}s</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredSpotlights.length} of {spotlights.length} alumni
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSpotlights.map((spotlight) => (
          <AlumniSpotlightCard key={spotlight.id} {...spotlight} />
        ))}
      </div>

      {/* No results */}
      {filteredSpotlights.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No alumni found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}