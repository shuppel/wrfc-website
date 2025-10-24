import { Metadata } from 'next'
import Link from 'next/link'
import { generateSEOMetadata } from '@/app/utils/seo'
import { Flag, Calendar, Trophy, Users, CaretLeft } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = generateSEOMetadata({
  title: 'USA Eagles Players - Hall of Fame',
  description: 'Washington Rugby Football Club players who have represented the United States national rugby team. Featuring World Cup participants, national team captains, and international sevens players.',
  path: '/about/hall-of-fame/us-eagles'
})

interface EaglesPlayer {
  name: string
  years: string
  position: string
  achievements: string[]
  caps?: string
  specialNote?: string
}

const eaglesPlayers: EaglesPlayer[] = [
  {
    name: "Bill Bernhard",
    years: "1987",
    position: "Fullback",
    achievements: ["USA Eagles representative"]
  },
  {
    name: "Rob Blackmore",
    years: "1988(B), 1989",
    position: "Prop",
    achievements: ["USA Eagles representative"]
  },
  {
    name: "Robinson Bordley",
    years: "1975, 1977-1978",
    position: "Fly-half, Fullback",
    achievements: ["USA Eagles representative"]
  },
  {
    name: "Mike Conroy",
    years: "1977",
    position: "Center",
    achievements: ["USA Eagles representative"]
  },
  {
    name: "Mike Coyner",
    years: "1998-1999",
    position: "Flank",
    achievements: ["USA Eagles representative", "USA 7s representative"]
  },
  {
    name: "Al Dekin",
    years: "1993",
    position: "Various",
    achievements: ["USA 7s representative"]
  },
  {
    name: "Chris Doherty",
    years: "1984, 1987",
    position: "Center",
    achievements: ["USA Eagles representative", "USA 7s representative"]
  },
  {
    name: "Michael Lancaster",
    years: "1978",
    position: "Prop",
    achievements: ["USA Eagles representative"]
  },
  {
    name: "Rory Lewis",
    years: "1990-1991",
    position: "Wing",
    achievements: ["USA Eagles representative", "USA 7s representative"]
  },
  {
    name: "Dan Lyle",
    years: "1993(B), 1993",
    position: "Lock",
    achievements: ["USA Eagles representative", "USA 7s representative", "15s Captain"],
    specialNote: "USA Eagles Captain"
  },
  {
    name: "Gerry McDonald",
    years: "1988(B), 1989, 1995-1996",
    position: "Prop",
    achievements: ["USA Eagles representative", "Scotland U21s representative"]
  },
  {
    name: "John Robbins",
    years: "1988(B)",
    position: "Hooker",
    achievements: ["USA Eagles representative"]
  },
  {
    name: "Paul Sheehy",
    years: "1991-1993",
    position: "Fullback",
    achievements: ["USA Eagles representative", "USA 7s representative", "1991 World Cup Player"],
    specialNote: "1991 Rugby World Cup"
  },
  {
    name: "Tom Smith",
    years: "1978, 1980",
    position: "Wing",
    achievements: ["USA Eagles representative"]
  },
  {
    name: "Scott Stephens",
    years: "1991-1993",
    position: "Flank",
    achievements: ["USA Eagles representative", "USA 7s representative"]
  },
  {
    name: "George Sucher",
    years: "1998",
    position: "Prop",
    achievements: ["USA Eagles representative", "1999 World Cup squad"],
    specialNote: "1999 Rugby World Cup"
  },
  {
    name: "Kevin Swords",
    years: "1985-1986",
    position: "Lock",
    achievements: ["USA Eagles representative"]
  },
  {
    name: "Dan Wack",
    years: "1976-1978, 1980",
    position: "Center",
    achievements: ["USA Eagles representative"]
  },
  {
    name: "Ken Wood",
    years: "1977-1978, 1983",
    position: "Coach/Manager",
    achievements: ["USA Eagles Coach/Manager"]
  },
  {
    name: "James Cassidy",
    years: "2000(B)",
    position: "Prop",
    achievements: ["USA Eagles representative"]
  },
  {
    name: "Francois Viljoen",
    years: "2004-Current",
    position: "Fullback",
    achievements: ["USA Eagles representative"],
    specialNote: "As of 2006"
  },
  {
    name: "Owen Lentz",
    years: "2006",
    position: "Hooker",
    achievements: ["USA Eagles representative"]
  },
  {
    name: "PJ Kosmonogang",
    years: "2006",
    position: "Various",
    achievements: ["USA 7s representative"]
  },
  {
    name: "Andrew 'Tui' Osbourne",
    years: "2006",
    position: "Various",
    achievements: ["USA 7s representative"]
  }
]

export default function USEaglesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-12">
      <div className="container mx-auto px-4">
        {/* Back Link */}
        <Link 
          href="/about/hall-of-fame" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6 transition-colors"
        >
          <CaretLeft className="w-5 h-5 mr-1" />
          Back to Hall of Fame
        </Link>

        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Flag className="w-20 h-20 text-blue-600 dark:text-blue-400" />
              <div className="absolute -bottom-2 -right-2 bg-red-600 rounded-full p-2">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            USA Eagles Players
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-100 max-w-3xl mx-auto">
            Washington Rugby Football Club has proudly contributed over 25 players to the 
            USA Eagles national team, including World Cup participants, national team captains, 
            and international sevens representatives.
          </p>
        </div>

        {/* Note about accuracy */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 mb-8 max-w-4xl mx-auto">
          <p className="text-sm text-gray-700 dark:text-white">
            <strong>Note:</strong> Caps and participation are accurate as of August 3, 2006. 
            This list represents the historical contribution of WRFC to USA Rugby.
          </p>
        </div>

        {/* Special Achievements */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-center">
            <Trophy className="w-12 h-12 text-yellow-600 dark:text-yellow-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">World Cup Players</h3>
            <p className="text-gray-600 dark:text-gray-100">Paul Sheehy (1991)</p>
            <p className="text-gray-600 dark:text-gray-100">George Sucher (1999)</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-center">
            <Users className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">National Captain</h3>
            <p className="text-gray-600 dark:text-gray-100">Dan Lyle</p>
            <p className="text-sm text-gray-500 dark:text-gray-100">15s Captain</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-center">
            <Calendar className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Era Span</h3>
            <p className="text-gray-600 dark:text-gray-100">1975 - 2006+</p>
            <p className="text-sm text-gray-500 dark:text-gray-100">30+ Years</p>
          </div>
        </div>

        {/* Players List */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Complete Roster of USA Eagles Players
          </h2>
          
          <div className="grid gap-4">
            {eaglesPlayers.map((player, index) => (
              <div 
                key={index} 
                className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {player.name}
                    </h3>
                    <div className="flex flex-wrap gap-4 mt-1 text-sm">
                      <span className="text-gray-600 dark:text-gray-100">
                        <strong>Years:</strong> {player.years}
                      </span>
                      <span className="text-gray-600 dark:text-gray-100">
                        <strong>Position:</strong> {player.position}
                      </span>
                    </div>
                    <div className="mt-2">
                      {player.achievements.map((achievement, idx) => (
                        <span 
                          key={idx}
                          className="inline-block text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded mr-2 mb-1"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                  {player.specialNote && (
                    <div className="mt-2 md:mt-0 md:ml-4">
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">
                        ★ {player.specialNote}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legacy Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-red-600 rounded-xl p-8 text-white text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">A Legacy of Excellence</h2>
          <p className="text-lg mb-6">
            For over five decades, Washington Rugby Football Club has been a cornerstone 
            of American rugby, developing players who have competed at the highest international 
            levels and represented their country with distinction.
          </p>
          <Link 
            href="/teams/players"
            className="inline-block bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Meet Our Current Players
          </Link>
        </div>
      </div>
    </div>
  )
}