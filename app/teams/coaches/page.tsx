import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata } from '@/app/utils/seo'
import { CaretLeft, Medal, Users, Target } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Coaching Staff - Expert Rugby Coaches',
  description: 'Meet the experienced coaching staff at Washington Rugby Football Club, including former USA Eagles captain Jamason Fa\'anana-Schultz and professional rugby player Thretton Palamo. Our dedicated coaches bring elite-level expertise in player development and rugby excellence.',
  path: '/teams/coaches'
})

interface Coach {
  name: string
  role: string
  title: string
  tier: 'head' | 'assistant' | 'volunteer'
  photo: string
  bio: string
  specialties?: string[]
  email?: string
  wikiUrl?: string
}

const coaches: Coach[] = [
  {
    name: 'Thretton Palamo',
    role: 'Head Coach',
    title: 'Head Coach',
    tier: 'head',
    photo: '/assets/pictures/thretton-coach-headshot.jpg',
    bio: 'Thretton brings exceptional international rugby experience to WRFC as a former USA Eagles player and professional rugby athlete. Having competed at the highest levels of the sport, his leadership and tactical expertise drive our competitive excellence and player development.',
    specialties: ['Backs Development', 'Game Strategy', 'High Performance'],
    wikiUrl: 'https://en.wikipedia.org/wiki/Thretton_Palamo'
  },
  {
    name: 'Jamason Fa\'anana-Schultz',
    role: 'Lead Assistant Coach',
    title: 'Lead Assistant Coach',
    tier: 'head',
    photo: '/assets/pictures/jama-coach-headshot.jpg',
    bio: 'Jama serves as our Lead Assistant Coach, bringing elite-level rugby experience as a former USA Eagles captain and Old Glory DC captain. His deep rugby knowledge, leadership experience, and passion for player development make him instrumental to our success. His expertise in forward play and set pieces is unmatched.',
    specialties: ['Forward Play', 'Set Pieces', 'Team Culture', 'Leadership'],
    wikiUrl: 'https://en.wikipedia.org/wiki/Jamason_Fa%27anana-Schultz'
  },
  {
    name: 'Roger Evans',
    role: 'Assistant Coach',
    title: 'Assistant Coach',
    tier: 'assistant',
    photo: '/assets/art/player_profile_rugby.png',
    bio: 'Roger contributes valuable coaching experience and tactical insight to our program. His dedication to fundamentals and skill development helps players reach their full potential.',
    specialties: ['Skills Development', 'Defense', 'Player Mentoring']
  },
  {
    name: 'Eric Keys',
    role: 'Assistant Coach',
    title: 'Assistant Coach',
    tier: 'assistant',
    photo: '/assets/pictures/eric-coach-headshot.jpg',
    bio: 'Eric brings technical expertise and a focus on continuous improvement to our coaching staff. His analytical approach helps optimize team performance.',
    specialties: ['Technical Analysis', 'Conditioning', 'Match Preparation']
  },
  {
    name: 'Doug Muilken',
    role: 'Volunteer Coach',
    title: 'Volunteer Coach / Player Coach',
    tier: 'volunteer',
    photo: '/assets/pictures/doug-coach-headshot.jpg',
    bio: 'Doug serves as both a player and volunteer coach, offering unique on-field perspective and leadership. His dual role bridges the gap between coaching staff and players.',
    specialties: ['Player Leadership', 'On-Field Coaching', 'Team Dynamics']
  },
  {
    name: 'Trey Kierl',
    role: 'Volunteer Coach',
    title: 'Volunteer Coach / Player Coach',
    tier: 'volunteer',
    photo: '/assets/pictures/trey-coach-headshot.jpg',
    bio: 'Trey contributes as a player coach, bringing energy and hands-on experience to training sessions. His commitment to team development enhances our coaching depth.',
    specialties: ['Hands-on Training', 'Player Development', 'Game Preparation']
  }
]

const tierConfig = {
  head: {
    label: 'Head Coaching Staff',
    description: 'Leading our rugby program with vision and expertise',
    color: 'from-blue-600 to-blue-800',
    icon: Medal
  },
  assistant: {
    label: 'Assistant Coaches',
    description: 'Supporting player development and team success',
    color: 'from-green-600 to-green-800',
    icon: Target
  },
  volunteer: {
    label: 'Volunteer & Player Coaches',
    description: 'Dedicated volunteers enhancing our coaching program',
    color: 'from-purple-600 to-purple-800',
    icon: Users
  }
}

export default function CoachesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12">
      <div className="container mx-auto px-4">
        <Link 
          href="/teams" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6 transition-colors"
        >
          <CaretLeft className="w-5 h-5 mr-1" weight="bold" />
          Back to Teams
        </Link>

        <div className="text-center mb-12">
          <h1 className="display-medium text-gray-900 dark:text-white mb-4">
            Coaching Staff
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-100 max-w-3xl mx-auto">
            Meet the dedicated coaches who guide Washington Rugby Football Club to excellence. 
            Our coaching staff combines professional experience, tactical expertise, and a passion for player development.
          </p>
        </div>

        {(['head', 'assistant', 'volunteer'] as const).map((tier) => {
          const tierCoaches = coaches.filter(coach => coach.tier === tier)
          const config = tierConfig[tier]
          const Icon = config.icon

          return (
            <div key={tier} className="mb-16">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-3">
                  <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <h2 className="section-title">
                    {config.label}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-100">
                  {config.description}
                </p>
              </div>

              <div className={`grid ${tierCoaches.length === 2 ? 'md:grid-cols-2 max-w-5xl' : tierCoaches.length === 1 ? 'max-w-2xl' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8 mx-auto`}>
                {tierCoaches.map((coach) => (
                  <div 
                    key={coach.name}
                    className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={coach.photo}
                        alt={`${coach.name} - ${coach.title} at Washington Rugby Football Club`}
                        title={`${coach.name}, ${coach.role}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={coach.tier === 'head'}
                        quality={90}
                      />
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.color}`} />
                    </div>
                    
                    <div className="p-6">
                      <div className="text-center mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {coach.name}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold">
                          {coach.title}
                        </p>
                      </div>

                      <p className="text-gray-600 dark:text-gray-100 mb-6 text-center">
                        {coach.bio}
                      </p>

                      {coach.specialties && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 text-center">
                            Specialties
                          </h4>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {coach.specialties.map((specialty) => (
                              <span 
                                key={specialty}
                                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {coach.wikiUrl && (
                        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                          <a 
                            href={coach.wikiUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm.1 19.5h-.2c-3.3 0-6-2.7-6-6V12c0-.6.4-1 1-1s1 .4 1 1v1.5c0 2.2 1.8 4 4 4h.1v-3.2l4.4 3.7-4.4 3.7v-2.2z"/>
                            </svg>
                            <span className="text-sm">View Wikipedia</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        <div className="mt-16 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="section-title mb-4 text-center">
            Previous Coaches
          </h2>
          <div className="text-center text-gray-600 dark:text-gray-100 space-y-2">
            <p>
              <span className="font-semibold text-gray-900 dark:text-white">Anou Phaipanya</span> — Head Coach, 2021-2024
            </p>
            <p>
              <span className="font-semibold text-gray-900 dark:text-white">Jovolisi Fotofili</span> — Head Coach, 2016-2022
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="section-title mb-4 text-center">
            Coaching Philosophy
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-100">
            <p>
              Our coaching staff is committed to developing well-rounded players who excel both on and off the field. 
              We emphasize:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Technical excellence and fundamental skill development</li>
              <li>Strategic thinking and tactical awareness</li>
              <li>Physical conditioning and injury prevention</li>
              <li>Leadership, sportsmanship, and team culture</li>
              <li>Continuous learning and personal growth</li>
            </ul>
            <p>
              Whether you&apos;re a seasoned player or new to rugby, our coaches are dedicated to helping you 
              reach your full potential while fostering a supportive and competitive environment.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-xl p-8 text-white max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Train with the Best</h2>
            <p className="text-lg mb-6">
              Join WRFC and learn from experienced coaches committed to your development and success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/membership"
                className="inline-block bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Become a Member
              </Link>
              <Link 
                href="/schedule/practice"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors"
              >
                View Practice Schedule
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
