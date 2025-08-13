import { Metadata } from 'next'
import Link from 'next/link'
import { Globe, Trophy, Star, ArrowLeft } from 'lucide-react'
import { generateSEOMetadata } from '../../utils/seo'
import { BreadcrumbJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Players with Commendations',
  description: 'WRFC players who have achieved recognition at elite levels, including USA Eagles, international representatives, Major League Rugby, and Capital Selects.',
  path: '/about/international-players'
})

interface InternationalPlayer {
  name: string
  position: string
  country: 'USA' | 'Australia'
  years: string
  caps?: number
  specialization?: string[]
  worldCup?: boolean
  notes?: string
  wikiLink?: string
}

const usaEagles: InternationalPlayer[] = [
  { name: 'Bill Bernhard', position: 'Fullback', country: 'USA', years: '1987' },
  { name: 'Rob Blackmore', position: 'Prop', country: 'USA', years: '1988(B), 1989' },
  { name: 'Robinson Bordley', position: 'Fly-half, Fullback', country: 'USA', years: '1975, 1977–1978' },
  { name: 'Mike Conroy', position: 'Center', country: 'USA', years: '1977' },
  { name: 'Mike Coyner', position: 'Flank', country: 'USA', years: '1998-1999', specialization: ['7s'] },
  { name: 'Al Dekin', position: 'Various', country: 'USA', years: '1993', specialization: ['7s'] },
  { name: 'Chris Doherty', position: 'Center', country: 'USA', years: '1984, 1987', specialization: ['7s'] },
  { name: 'Michael Lancaster', position: 'Prop', country: 'USA', years: '1978' },
  { name: 'Rory Lewis', position: 'Wing', country: 'USA', years: '1990-1991', specialization: ['7s'] },
  { name: 'Dan Lyle', position: 'Lock', country: 'USA', years: '1993(B) 1993', specialization: ['7s', '15s Captain'], caps: 45, worldCup: true, notes: 'Hall of Fame 2016', wikiLink: 'https://en.wikipedia.org/wiki/Dan_Lyle' },
  { name: 'Gerry McDonald', position: 'Prop', country: 'USA', years: '1988(B) 1989 1995-1996', notes: 'Also Scotland U21s' },
  { name: 'John Robbins', position: 'Hooker', country: 'USA', years: '1988(B)' },
  { name: 'Paul Sheehy', position: 'Fullback', country: 'USA', years: '1991-1993', specialization: ['7s'], worldCup: true, notes: '1991 World Cup Player', wikiLink: 'https://en.wikipedia.org/wiki/Paul_Sheehy' },
  { name: 'Tom Smith', position: 'Wing', country: 'USA', years: '1978, 1980', notes: 'Hall of Fame 2017' },
  { name: 'Scott Stephens', position: 'Flank', country: 'USA', years: '1991-1993', specialization: ['7s'] },
  { name: 'George Sucher', position: 'Prop', country: 'USA', years: '1998', worldCup: true, notes: '1999 World Cup' },
  { name: 'Kevin Swords', position: 'Lock', country: 'USA', years: '1985-1986' },
  { name: 'Dan Wack', position: 'Center', country: 'USA', years: '1976-1978, 1980' },
  { name: 'Ken Wood', position: 'Various', country: 'USA', years: '1977-1978, 1983', notes: 'Coach/Manager' },
  { name: 'James Cassidy', position: 'Prop', country: 'USA', years: '2000(B)' },
  { name: 'Francois Viljoen', position: 'Fullback', country: 'USA', years: '2004-2006' },
  { name: 'Owen Lentz', position: 'Hooker', country: 'USA', years: '2006' },
  { name: 'PJ Komonognam', position: 'Various', country: 'USA', years: '2006', specialization: ['USA 7s'] },
  { name: 'Andrew "Tui" Osbourne', position: 'Various', country: 'USA', years: '2006', specialization: ['USA 7s'] }
]

const otherInternationalPlayers: InternationalPlayer[] = [
  { name: 'Mitchell Cox', position: 'Scrum-half', country: 'Australia', years: 'Unknown', caps: 2, notes: 'Australia Wallabies' }
]

const modernPlayers = [
  {
    name: 'Thomas Demetriou',
    team: 'Major League Rugby',
    year: '2020',
    description: 'Professional rugby player in Major League Rugby'
  }
]

const capitalSelectsPlayers = [
  { name: 'Thomas Demetriou', position: '8-Man', caps: 10, role: 'Captain' },
  { name: 'Austin Park', position: 'Wing', caps: 6 },
  { name: 'Erikk Shupp', position: 'Hooker', caps: 4 },
  { name: 'Leo Fangmeyer', position: 'Flyhalf', caps: 3 },
  { name: 'Stephen Okala', position: 'Flanker/Inside Center', caps: 3 },
  { name: 'Sam Follansbee', position: 'Flanker', caps: 3 },
  { name: 'John Webster', position: 'Flanker', caps: 2 },
  { name: 'Camilo Moraga-Lewy', position: 'Flanker/Outside Center', caps: 2 },
  { name: 'Ray Gajkowski', position: 'Lock', caps: 1 },
  { name: 'Harry Higginbottom', position: 'Prop', caps: 1 }
]

export default function InternationalPlayersPage() {
  const totalUSAEagles = usaEagles.length
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'About', item: '/about' },
          { name: 'Players with Commendations', item: '/about/international-players' }
        ]} 
      />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-wrfc-navy/95 to-wrfc-navy/85" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Star className="w-12 h-12 text-yellow-400" />
              <h1 className="text-5xl md:text-6xl font-bold font-nasalization">
                Players with Commendations
              </h1>
              <Star className="w-12 h-12 text-yellow-400" />
            </div>
            <p className="text-xl md:text-2xl mb-8 font-quantico">
              WRFC players who have achieved recognition at elite levels
            </p>
            <div className="flex items-center justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400" />
                <span>{totalUSAEagles} USA Eagles</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span>10 Capital Selects</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-yellow-400" />
                <span>Multiple Categories</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back Navigation */}
      <section className="py-8 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <Link 
            href="/about/hall-of-fame"
            className="inline-flex items-center gap-2 text-wrfc-navy dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Hall of Fame
          </Link>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 font-nasalization text-gray-900 dark:text-white">
              Excellence Across All Levels
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Beyond our Hall of Fame inductees, WRFC has consistently produced players who have earned recognition 
              at the highest levels of rugby. From USA Eagles representing America internationally, to Capital Selects 
              players competing in elite regional rugby, to professionals in Major League Rugby, WRFC players have 
              achieved distinction across all competitive levels of the sport.
            </p>
          </div>
        </div>
      </section>

      {/* USA Eagles */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-16">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold font-nasalization text-gray-900 dark:text-white">
                USA Eagles & International Players
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {usaEagles.map((player, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {player.name}
                      </h3>
                      {player.wikiLink && (
                        <a 
                          href={player.wikiLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          title={`View ${player.name} on Wikipedia`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                    </div>
                    {player.worldCup && (
                      <Trophy className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    )}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">Position:</span> {player.position}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">Years:</span> {player.years}
                    </p>
                    
                    {player.caps && (
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-semibold">Caps:</span> {player.caps}
                      </p>
                    )}
                    
                    {player.specialization && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {player.specialization.map((spec, specIndex) => (
                          <span key={specIndex} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {player.notes && (
                      <p className="text-gray-500 dark:text-gray-400 text-xs italic mt-2">
                        {player.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Major League Rugby & Other International */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold font-nasalization text-gray-900 dark:text-white">
                Major League Rugby & Other International
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Australia Wallabies */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-yellow-800" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Australia Wallabies</h3>
                </div>
                
                {otherInternationalPlayers.map((player, index) => (
                  <div key={index} className="border-l-4 border-yellow-400 pl-4">
                    <h4 className="font-bold text-gray-900 dark:text-white">{player.name}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{player.position}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{player.caps} international caps</p>
                  </div>
                ))}
              </div>

              {/* Modern Professional Players */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Professional Rugby</h3>
                </div>
                
                {modernPlayers.map((player, index) => (
                  <div key={index} className="border-l-4 border-green-600 pl-4">
                    <h4 className="font-bold text-gray-900 dark:text-white">{player.name}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{player.team} ({player.year})</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{player.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capital Selects Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 bg-wrfc-navy rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold font-nasalization text-gray-900 dark:text-white">
                Capital Selects High Performance
              </h2>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-12">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">High Performance Program</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Since 2018</p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Capital Selects is part of the High Performance Program at Capital Rugby Union. The program helps 
                develop players at all levels in preparation for higher level competition around the world. 
                This semi-professional men&apos;s club select side represents the pinnacle of regional rugby excellence.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              WRFC Capital Selects Caps
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {capitalSelectsPlayers.map((player, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-wrfc-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-wrfc-navy dark:text-blue-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {player.name}
                  </h4>
                  {player.role && (
                    <div className="mb-2">
                      <span className="px-2 py-1 bg-wrfc-red text-white text-xs font-semibold rounded">
                        {player.role}
                      </span>
                    </div>
                  )}
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Position</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                        {player.position}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Caps</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                        {player.caps}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-wrfc-navy to-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-8 font-nasalization">
              Continuing the Legacy of Excellence
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              From the 1970s USA Eagles through today&apos;s Capital Selects and Major League Rugby players, 
              WRFC has consistently developed talent that achieves recognition at elite levels. This tradition 
              of excellence continues today as we develop the next generation of rugby players across all competitive levels. 
              Join WRFC and follow in the footsteps of our distinguished alumni.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/membership"
                className="inline-block bg-wrfc-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Join WRFC
              </Link>
              <Link 
                href="/about/championships"
                className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                View Championships
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}