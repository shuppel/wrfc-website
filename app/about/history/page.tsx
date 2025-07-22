import { Metadata } from 'next'
import Image from 'next/image'
import { Calendar, Trophy, Users, Globe, Award, School, Building, ExternalLink } from 'lucide-react'
import { generateSEOMetadata } from '../../utils/seo'
import { BreadcrumbJsonLd } from '../../../components/JsonLd'

export const metadata: Metadata = generateSEOMetadata({
  title: 'History of WRFC',
  description: 'Discover the rich 60+ year history of Washington Rugby Football Club, from its founding in 1963 to becoming a pillar of American rugby.',
  path: '/about/history'
})

interface TimelineEvent {
  year: string
  title: string
  description: string
  icon: React.ReactNode
  category: 'founding' | 'championship' | 'community' | 'milestone' | 'tournament'
  imagePlaceholder?: string
  link?: string
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '1963',
    title: 'Foundation of WRFC',
    description: 'Washington RFC established in February as the second rugby club in the Mid-Atlantic region. Founded by diplomatic expatriates from various foreign embassies, becoming a cornerstone of American rugby\'s modern revival.',
    icon: <Building className="w-6 h-6" />,
    category: 'founding',
    imagePlaceholder: 'Early WRFC founding members at practice'
  },
  {
    year: '1966',
    title: 'Cherry Blossom Tournament Founded',
    description: 'WRFC establishes what would become one of America\'s largest rugby tournaments. Starting with modest beginnings, it now attracts over 40 teams including international participants.',
    icon: <Trophy className="w-6 h-6" />,
    category: 'tournament',
    imagePlaceholder: 'First Cherry Blossom Tournament teams'
  },
  {
    year: '1971 & 1974',
    title: 'Early Championship Success',
    description: 'WRFC captures the Blume Trophy twice, demonstrating competitive excellence within the first decade. Club begins producing international-caliber players.',
    icon: <Award className="w-6 h-6" />,
    category: 'championship',
    imagePlaceholder: 'Blume Trophy celebration'
  },
  {
    year: '1985-1993',
    title: 'Nine Consecutive Championships',
    description: 'WRFC\'s golden era - nine consecutive Division 1 Potomac Rugby Union Championships. One of the most remarkable championship runs in American club rugby history.',
    icon: <Trophy className="w-6 h-6" />,
    category: 'championship',
    imagePlaceholder: 'Championship team celebrations'
  },
  {
    year: '1997',
    title: 'USA Rugby Super League Founding Member',
    description: 'WRFC becomes one of 14 founding members of the USA Rugby Super League, competing at the highest level of American club rugby for 12 years.',
    icon: <Globe className="w-6 h-6" />,
    category: 'milestone',
    imagePlaceholder: 'Super League team photo'
  },
  {
    year: '2004',
    title: 'Washington DC Youth Rugby Founded',
    description: 'WRFC pioneers youth rugby development for underserved communities. Starting with 7 participants, the program now reaches over 100 children across all DC quadrants.',
    icon: <School className="w-6 h-6" />,
    category: 'community',
    imagePlaceholder: 'Youth rugby program in action',
    link: 'https://www.washingtondcyouthrugby.org/'
  },
  {
    year: '2021',
    title: 'Division 2 Capital Region Champions',
    description: 'After departing Super League in 2009, WRFC mounts successful resurgence, winning first major championship in 18 years and earning promotion back to Division I.',
    icon: <Trophy className="w-6 h-6" />,
    category: 'championship',
    imagePlaceholder: 'Recent championship celebration'
  },
  {
    year: '2025',
    title: '57th Cherry Blossom Tournament',
    description: 'The tournament continues as WRFC\'s signature event, now held at Liberty Sports Park. Serves as qualifying tournament for Collegiate Rugby Championship.',
    icon: <Calendar className="w-6 h-6" />,
    category: 'tournament',
    imagePlaceholder: 'Modern Cherry Blossom Tournament'
  }
]


export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'About', item: '/about' },
          { name: 'History', item: '/about/history' }
        ]} 
      />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-wrfc-navy/95 to-wrfc-navy/85" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-nasalization">
              The History of WRFC
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-quantico">
              Six decades of rugby excellence in the nation's capital
            </p>
            <div className="flex items-center justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-wrfc-red" />
                <span>Est. 1963</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-wrfc-red" />
                <span>62+ Years</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-wrfc-red" />
                <span>4 Hall of Famers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center font-nasalization text-gray-900 dark:text-white">
              The Enduring Tradition Since 1963
            </h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                The Washington Rugby Football Club stands as the oldest rugby institution in the nation's capital, 
                having shaped American rugby for over six decades. Founded in February 1963, WRFC emerged during 
                the crucial revival period of American rugby, becoming a cornerstone of the sport's modern development. 
                This comprehensive history reveals how a club started by diplomatic expatriates evolved into a 
                nationally significant rugby institution that produced Hall of Fame players, created one of America's 
                largest tournaments, and pioneered youth rugby development in underserved communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 font-nasalization text-gray-900 dark:text-white">
            Timeline of Excellence
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-wrfc-navy dark:bg-blue-400 transform md:-translate-x-px" />
              
              {timelineEvents.map((event, index) => (
                <div key={index} className={`relative flex items-start mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-wrfc-red rounded-full transform md:-translate-x-2 z-10" />
                  
                  {/* Content */}
                  <div className={`flex-1 ml-16 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${getCategoryColor(event.category)}`}>
                          {event.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl font-bold text-wrfc-navy dark:text-blue-400">
                              {event.year}
                            </span>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(event.category)}`}>
                              {event.category.toUpperCase()}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {event.description}
                          </p>
                          
                          {/* External Link */}
                          {event.link && (
                            <div className="mb-4">
                              <a 
                                href={event.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-wrfc-red hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold text-sm transition-colors"
                              >
                                Visit Washington DC Youth Rugby
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          )}
                          
                          {/* Artsy Visual Element */}
                          {event.imagePlaceholder && (
                            <div className={`w-full h-40 rounded-lg relative overflow-hidden ${getGradientStyle(event.category)}`}>
                              <div className="absolute inset-0 bg-black/10" />
                              <div className="absolute bottom-4 left-4 right-4">
                                <div className="h-2 bg-white/20 rounded-full mb-2" />
                                <div className="h-2 bg-white/10 rounded-full w-3/4" />
                              </div>
                              <div className="absolute top-4 right-4">
                                <div className="w-8 h-8 bg-white/20 rounded-full" />
                              </div>
                            </div>
                          )}
                        </div>
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
              A Living Legacy
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              Washington Rugby Football Club's 62-year history represents far more than a single club's journey - 
              it chronicles the development of American rugby itself. As WRFC enters its seventh decade, it remains 
              what it has always been: not just Washington's oldest rugby club, but a foundational pillar of 
              American rugby whose influence extends far beyond any single match or championship.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-wrfc-red" />
                </div>
                <h3 className="text-xl font-bold mb-2">Championships</h3>
                <p className="text-white/80">9 consecutive PRU titles plus numerous regional championships</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-wrfc-red" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Impact</h3>
                <p className="text-white/80">100+ youth served annually through free rugby programs</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-wrfc-red" />
                </div>
                <h3 className="text-xl font-bold mb-2">International Recognition</h3>
                <p className="text-white/80">4 Hall of Fame inductees and 20+ USA Eagles produced</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'founding':
      return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
    case 'championship':
      return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300'
    case 'community':
      return 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300'
    case 'milestone':
      return 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
    case 'tournament':
      return 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300'
    default:
      return 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300'
  }
}

function getCategoryBadge(category: string): string {
  switch (category) {
    case 'founding':
      return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
    case 'championship':
      return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
    case 'community':
      return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
    case 'milestone':
      return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
    case 'tournament':
      return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
    default:
      return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
  }
}

function getGradientStyle(category: string): string {
  switch (category) {
    case 'founding':
      return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600'
    case 'championship':
      return 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500'
    case 'community':
      return 'bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600'
    case 'milestone':
      return 'bg-gradient-to-br from-purple-400 via-violet-500 to-indigo-600'
    case 'tournament':
      return 'bg-gradient-to-br from-red-400 via-pink-500 to-rose-600'
    default:
      return 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600'
  }
}