import { Metadata } from 'next'
import Link from 'next/link'
import { Award, Star, Trophy, Globe, ArrowLeft } from 'lucide-react'
import { generateSEOMetadata } from '../../utils/seo'
import { BreadcrumbJsonLd } from '../../../components/JsonLd'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Hall of Fame',
  description: 'Celebrating WRFC Hall of Fame inductees - the legendary players who represented Washington Rugby Football Club at the highest international levels.',
  path: '/about/hall-of-fame'
})

const hallOfFameMembers = [
  {
    name: 'Dick Poulson',
    inducted: '2015',
    position: 'Loose Head Prop / Second Row',
    wrfcYears: '1966-1983',
    achievements: [
      'Transformed WRFC from less than one full side to 7 sides with 2 "A" sides',
      'Co-founded the Cherry Blossom Tournament and Washington 7s Tournament',
      'Founded the Potomac Rugby Union and Baltimore-Washington Rugby Association',
      'Two-term club president and match secretary for WRFC'
    ],
    biography: 'Dick Poulson is the architect of modern WRFC and Mid-Atlantic rugby. During his 17-year playing career, he transformed WRFC from a struggling club into one of the East\'s powerhouses. His administrative vision created the tournament and organizational structure that governs regional rugby today. Beyond rugby, Poulson achieved remarkable success in corporate law and business, serving as Senior Executive Vice President at Smithfield Foods and partner at Hogan Lovells.',
    honors: [
      'USA Rugby Hall of Fame (2015)',
      'Founder: Cherry Blossom Tournament',
      'Founder: Potomac Rugby Union',
      'WRFC President (2 terms)'
    ]
  },
  {
    name: 'Dan Lyle',
    inducted: '2016',
    position: 'Back Row',
    wrfcYears: '1993-1995',
    usaCaps: 45,
    captainCaps: 24,
    worldCups: ['1999', '2003'],
    achievements: [
      '45 caps for USA Eagles (24 as captain)',
      'Competed in 1999 and 2003 Rugby World Cups',
      'One of the most capped American rugby players',
      'Leadership both on field for USA and at WRFC'
    ],
    biography: 'Dan Lyle stands as one of American rugby\'s most decorated players. His leadership as USA Eagles captain and his two World Cup appearances represent the pinnacle of international rugby achievement. At WRFC, Lyle exemplified the club\'s tradition of developing world-class talent while maintaining the community spirit that defines Washington rugby.',
    honors: [
      'USA Rugby Hall of Fame (2016)',
      '45 International Caps',
      '2× Rugby World Cup Participant',
      'USA Eagles Captain'
    ],
    wikiLink: 'https://en.wikipedia.org/wiki/Dan_Lyle'
  },
  {
    name: 'Tommy Smith',
    inducted: '2017',
    position: 'Sevens Specialist',
    wrfcYears: '1980s-1990s',
    usaCaps: 'Multiple',
    specialization: 'Sevens Rugby',
    achievements: [
      'Only American to win Hong Kong Sevens Best & Fairest Award',
      'Only Northern Hemisphere player on All-Time All-World Hong Kong 7s team',
      'Pioneered American success in international sevens rugby',
      'Established WRFC as a sevens powerhouse'
    ],
    biography: 'Tommy Smith achieved what no other American rugby player has accomplished in the prestigious Hong Kong Sevens tournament. His Best & Fairest Award and selection to the All-Time All-World team represent unparalleled individual excellence in international sevens rugby. Smith\'s achievements helped establish WRFC\'s reputation as a breeding ground for elite sevens players.',
    honors: [
      'USA Rugby Hall of Fame (2017)',
      'Hong Kong Sevens Best & Fairest Award (Only American)',
      'All-Time All-World Hong Kong 7s Team',
      'International Sevens Legend'
    ]
  },
  {
    name: 'John Decker',
    inducted: '2019',
    position: 'Forward',
    wrfcYears: '1965-1970',
    joinedYear: '1965',
    achievements: [
      'Joined WRFC in 1965, just two years after founding',
      'Led club to four consecutive Washington Sevens Championships',
      'Co-founded the Potomac Rugby Union with Dick Poulson',
      'Foundational player in WRFC\'s early development'
    ],
    biography: 'John Decker represents the foundational era of WRFC excellence. Joining the club just two years after its founding, Decker witnessed and helped shape the transformation from a small diplomatic expatriate group into a regionally competitive rugby institution. His four consecutive Washington Sevens Championships established WRFC\'s early tournament dominance, while his collaboration with Dick Poulson to co-found the Potomac Rugby Union created the administrative structure that governs Mid-Atlantic rugby today.',
    honors: [
      'USA Rugby Hall of Fame (2019)',
      '4× Washington Sevens Champion',
      'Co-founder, Potomac Rugby Union',
      'WRFC Foundational Era Legend'
    ]
  },
]

export default function HallOfFamePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'About', item: '/about' },
          { name: 'Hall of Fame', item: '/about/hall-of-fame' }
        ]} 
      />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-wrfc-navy/95 to-wrfc-navy/85" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Award className="w-12 h-12 text-yellow-400" />
              <h1 className="text-5xl md:text-6xl font-bold font-nasalization">
                Hall of Fame
              </h1>
              <Award className="w-12 h-12 text-yellow-400" />
            </div>
            <p className="text-xl md:text-2xl mb-8 font-quantico">
              Celebrating WRFC&apos;s legendary contributions to American rugby
            </p>
            <div className="flex items-center justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400" />
                <span>4 Inductees</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-yellow-400" />
                <span>70+ USA Caps</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span>3 World Cups</span>
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

      {/* Introduction */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 font-nasalization text-gray-900 dark:text-white">
              Legends of American Rugby
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              The Washington Rugby Football Club has produced four USA Rugby Hall of Fame inductees, 
              representing the highest honor in American rugby. These legendary figures exemplify WRFC&apos;s 
              60+ year tradition of developing world-class talent while maintaining the community spirit 
              and excellence that defines our club. Beyond our Hall of Fame inductees, WRFC has produced 
              over 20 USA Eagles and international players who have represented their countries at the highest levels.
            </p>
          </div>
        </div>
      </section>

      {/* Hall of Fame Members */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            {hallOfFameMembers.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 md:p-12">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white font-nasalization">
                          {member.name}
                        </h3>
                        {member.wikiLink && (
                          <a 
                            href={member.wikiLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            title={`View ${member.name} on Wikipedia`}
                          >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                            </svg>
                          </a>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm font-semibold rounded">
                          {member.inducted}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold rounded">
                          {member.position}
                        </span>
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-semibold rounded">
                          WRFC {member.wrfcYears}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Award className="w-16 h-16 text-yellow-500" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Achievements */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Major Achievements</h4>
                      <ul className="space-y-3">
                        {member.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start gap-3">
                            <Trophy className="w-5 h-5 text-wrfc-red flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Honors */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Honors & Recognition</h4>
                      <ul className="space-y-3">
                        {member.honors.map((honor, honorIndex) => (
                          <li key={honorIndex} className="flex items-start gap-3">
                            <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">{honor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Biography */}
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Legacy</h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {member.biography}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-wrfc-navy to-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-8 font-nasalization">
              Join the Legacy
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              These Hall of Fame legends started their journeys at WRFC. Whether you&apos;re an experienced player 
              or new to rugby, you could be the next WRFC player to represent the USA Eagles on the world stage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/membership"
                className="inline-block bg-wrfc-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Become a Member
              </Link>
              <Link 
                href="/about/international-players"
                className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                View USA Eagles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}