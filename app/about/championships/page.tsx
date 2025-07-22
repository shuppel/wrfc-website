import { Metadata } from 'next'
import Link from 'next/link'
import { Trophy, Award, Crown, Calendar, ArrowLeft, Star } from 'lucide-react'
import { generateSEOMetadata } from '../../utils/seo'
import { BreadcrumbJsonLd } from '../../../components/JsonLd'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Championships & Trophies',
  description: 'A complete record of WRFC\'s championship victories and trophy wins spanning six decades of rugby excellence.',
  path: '/about/championships'
})

interface Championship {
  title: string
  years: string[]
  description: string
  significance: string
  category: 'national' | 'regional' | 'local' | 'consecutive'
  icon: React.ReactNode
}

const championships: Championship[] = [
  {
    title: 'Division 1 PRU Champions',
    years: ['1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993'],
    description: 'Nine consecutive Potomac Rugby Union Division 1 Championships - one of the most remarkable championship runs in American club rugby history.',
    significance: 'This unprecedented nine-year dominance established WRFC as the premier rugby club in the Mid-Atlantic region and demonstrated sustained excellence rarely seen in American rugby.',
    category: 'consecutive',
    icon: <Crown className="w-8 h-8" />
  },
  {
    title: 'Division 1 ERU Champions',
    years: ['1988'],
    description: 'Eastern Rugby Union Division 1 Championship victory during WRFC\'s golden era of dominance.',
    significance: 'Competing against the best clubs from the entire Eastern seaboard, this championship demonstrated WRFC\'s ability to excel beyond regional competition.',
    category: 'national',
    icon: <Trophy className="w-8 h-8" />
  },
  {
    title: 'Division 1 MARFU 15s Champions',
    years: ['1987', '1995'],
    description: 'Mid-Atlantic Rugby Football Union Division 1 Championships in fifteen-a-side rugby.',
    significance: 'MARFU represented the highest level of Mid-Atlantic rugby competition, with victory requiring excellence against top-tier regional clubs.',
    category: 'regional',
    icon: <Award className="w-8 h-8" />
  },
  {
    title: 'Division 1 MARFU Sevens Champions',
    years: ['2003'],
    description: 'Mid-Atlantic Rugby Football Union Division 1 Sevens Championship.',
    significance: 'Demonstrated WRFC\'s versatility and excellence in the fast-paced sevens format, complementing their fifteen-a-side success.',
    category: 'regional',
    icon: <Star className="w-8 h-8" />
  },
  {
    title: 'Blume Trophy',
    years: ['1971', '1974'],
    description: 'Early championship success in the Blume Trophy competition during WRFC\'s first decade.',
    significance: 'These early victories established WRFC as a competitive force and validated the club\'s strong foundation just years after its 1963 founding.',
    category: 'local',
    icon: <Trophy className="w-8 h-8" />
  },
  {
    title: 'Division 2 Capital Region Champions',
    years: ['2021'],
    description: 'First major championship in 18 years, finishing the regular season 7-1 and earning promotion back to Division I.',
    significance: 'This victory marked WRFC\'s successful resurgence after departing the Super League, demonstrating the club\'s enduring competitive spirit and ability to rebuild.',
    category: 'regional',
    icon: <Trophy className="w-8 h-8" />
  }
]

const eras = [
  {
    name: 'Foundation Era',
    period: '1963-1980',
    description: 'Early competitive success establishing WRFC as a rugby force',
    championships: ['Blume Trophy (1971, 1974)'],
    significance: 'Built the foundation for future dominance'
  },
  {
    name: 'Golden Era',
    period: '1985-1995',
    description: 'Unprecedented dominance across multiple competitions',
    championships: [
      '9 Consecutive PRU Division 1 Titles (1985-1993)',
      'ERU Division 1 Champions (1988)',
      'MARFU Division 1 Champions (1987, 1995)'
    ],
    significance: 'Peak period of American club rugby excellence'
  },
  {
    name: 'Super League Era',
    period: '1997-2009',
    description: 'Competing at the highest level of American club rugby',
    championships: ['MARFU Sevens Champions (2003)'],
    significance: 'Maintained elite status in national competition'
  },
  {
    name: 'Modern Resurgence',
    period: '2021-Present',
    description: 'Return to championship form and Division I rugby',
    championships: ['Capital Region Division 2 Champions (2021)'],
    significance: 'Successful rebuild and return to elite competition'
  }
]

export default function ChampionshipsPage() {
  const totalChampionships = championships.reduce((total, champ) => total + champ.years.length, 0)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'About', item: '/about' },
          { name: 'Championships', item: '/about/championships' }
        ]} 
      />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-wrfc-navy/95 to-wrfc-navy/85" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Trophy className="w-12 h-12 text-yellow-400" />
              <h1 className="text-5xl md:text-6xl font-bold font-nasalization">
                Championships
              </h1>
              <Trophy className="w-12 h-12 text-yellow-400" />
            </div>
            <p className="text-xl md:text-2xl mb-8 font-quantico">
              Six decades of rugby excellence and championship victories
            </p>
            <div className="flex items-center justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <Crown className="w-6 h-6 text-yellow-400" />
                <span>{totalChampionships} Championships</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400" />
                <span>9 Consecutive PRU Titles</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-yellow-400" />
                <span>1971-2021</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back Navigation */}
      <section className="py-8 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <Link 
            href="/about/history"
            className="inline-flex items-center gap-2 text-wrfc-navy dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to WRFC History
          </Link>
        </div>
      </section>

      {/* Championship Eras */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16 font-nasalization text-gray-900 dark:text-white">
              Eras of Excellence
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {eras.map((era, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-wrfc-navy dark:text-blue-400 mb-2">
                    {era.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {era.period}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    {era.description}
                  </p>
                  <div className="space-y-1">
                    {era.championships.map((champ, champIndex) => (
                      <p key={champIndex} className="text-xs text-gray-600 dark:text-gray-400">
                        • {champ}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Championships List */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16 font-nasalization text-gray-900 dark:text-white">
              Championship Record
            </h2>
            
            <div className="space-y-8">
              {championships.map((championship, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${getCategoryColor(championship.category)}`}>
                          {championship.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-nasalization">
                            {championship.title}
                          </h3>
                          <span className={`inline-block px-3 py-1 text-sm font-semibold rounded mt-2 ${getCategoryBadge(championship.category)}`}>
                            {championship.category.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Years */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Championship Years</h4>
                      <div className="flex flex-wrap gap-2">
                        {championship.years.map((year, yearIndex) => (
                          <span key={yearIndex} className="px-3 py-1 bg-wrfc-navy text-white text-sm font-bold rounded">
                            {year}
                          </span>
                        ))}
                      </div>
                      {championship.years.length > 1 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          {championship.years.length} total championships
                        </p>
                      )}
                    </div>

                    {/* Description and Significance */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Achievement</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          {championship.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Historical Significance</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          {championship.significance}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-20 bg-gradient-to-r from-wrfc-navy to-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-8 font-nasalization">
              Championship Legacy
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              WRFC&apos;s {totalChampionships} championships across six decades represent sustained excellence rarely 
              achieved in American rugby. From the early Blume Trophy victories through the unprecedented nine 
              consecutive PRU titles to the recent Capital Region championship, WRFC continues to set the standard 
              for competitive excellence in American club rugby.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Consecutive Dominance</h3>
                <p className="text-white/80">9 straight PRU Division 1 titles (1985-1993)</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Multi-Format Excellence</h3>
                <p className="text-white/80">Championships in 15s, 7s, and multiple competitions</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sustained Excellence</h3>
                <p className="text-white/80">Championships spanning 50+ years (1971-2021)</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link 
                href="/membership"
                className="inline-block bg-wrfc-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Join the Champions
              </Link>
              <Link 
                href="/about/hall-of-fame"
                className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                View Hall of Fame
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'national':
      return 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300'
    case 'regional':
      return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
    case 'local':
      return 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300'
    case 'consecutive':
      return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300'
    default:
      return 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300'
  }
}

function getCategoryBadge(category: string): string {
  switch (category) {
    case 'national':
      return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
    case 'regional':
      return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
    case 'local':
      return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
    case 'consecutive':
      return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
    default:
      return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
  }
}