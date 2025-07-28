import { Metadata } from 'next'
import { generateSEOMetadata } from '../../utils/seo'
import { Trophy, Users, Calendar, Target } from 'lucide-react'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Coaching Staff',
  description: 'Meet the experienced coaching staff of Washington Rugby Football Club. Our coaches bring decades of rugby expertise and passion for developing players.',
  path: '/teams/coaches'
})

interface Coach {
  name: string
  role: string
  image?: string
  bio: string
  experience: string[]
  certifications?: string[]
  email?: string
  wikiLink?: string
}

const coaches: Coach[] = [
  {
    name: "Thretton Palamo",
    role: "Head Coach",
    bio: "A distinguished rugby veteran, Coach Palamo brings elite international experience and deep tactical knowledge to WRFC. His playing career spanned the highest levels of the sport, and he now dedicates his expertise to developing the next generation of rugby talent.",
    experience: [
      "Former USA Rugby National Team player (2012-2019)",
      "Played professionally in Major League Rugby (MLR)",
      "Represented USA in Rugby World Cup 2015",
      "Over 40 international caps for the Eagles",
      "Professional experience in top-tier competitions"
    ],
    certifications: [
      "USA Rugby Certified Coach",
      "World Rugby Level 2 Coach"
    ],
    wikiLink: "https://en.wikipedia.org/wiki/Thretton_Palamo"
  },
  {
    name: "Anou Phaipanya",
    role: "Assistant Coach",
    bio: "Coach Phaipanya brings elite international rugby experience and deep institutional knowledge to WRFC. Having served as Head Coach from 2022-2024, he now contributes his Pacific 7s background, international experience, and intimate understanding of the club's culture and players.",
    experience: [
      "Former WRFC Head Coach (2022-2024)",
      "Pacific 7s international player",
      "International 7s circuit experience",
      "Played men's club rugby in New Zealand",
      "Deep understanding of WRFC culture and player development",
      "Specializes in sevens skills and fast-paced game strategy"
    ],
    certifications: [
      "USA Rugby Certified Coach",
      "International playing credentials",
      "Sevens specialist coaching methods"
    ]
  },
  {
    name: "Doug Muilken",
    role: "D3 Coach",
    bio: "With over 20 years as a player and extensive international experience, Coach Muilken brings unparalleled knowledge of rugby at all levels. His global perspective and deep understanding of the game makes him the perfect leader for our D3 division.",
    experience: [
      "20+ years of playing experience",
      "Played internationally for multiple teams",
      "Professional experience in Glasgow, Scotland",
      "Played rugby in South Africa",
      "Competed at all levels of men's club rugby",
      "Brings global rugby perspective to WRFC"
    ],
    certifications: [
      "International rugby playing credentials",
      "Extensive practical coaching experience"
    ]
  }
]

export default function CoachesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-blue-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Coaching Staff
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our experienced coaches are dedicated to developing players at all levels, 
            from beginners to seasoned veterans. With decades of combined experience, 
            they bring passion, expertise, and a commitment to excellence.
          </p>
        </div>

        {/* Coaching Philosophy */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Our Coaching Philosophy
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Excellence</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Pursuing the highest standards in training and competition
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600 dark:text-green-300" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Teamwork</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Building strong bonds and collective success
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-600 dark:text-purple-300" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Development</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Continuous improvement for every player
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-red-600 dark:text-red-300" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Commitment</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Dedication to the sport and our community
              </p>
            </div>
          </div>
        </div>

        {/* Coaches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coaches.map((coach, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Coach Image Placeholder */}
              <div className="h-64 bg-gradient-to-br from-blue-600 to-blue-800 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {coach.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Coach Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {coach.name}
                  </h3>
                  {coach.wikiLink && (
                    <a 
                      href={coach.wikiLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      title={`View ${coach.name} on Wikipedia`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                </div>
                <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-3">
                  {coach.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {coach.bio}
                </p>

                {/* Experience */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Experience</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {coach.experience.map((exp, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {exp}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Certifications */}
                {coach.certifications && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {coach.certifications.map((cert, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Join Our Coaching Team</h2>
            <p className="text-lg mb-6">
              Are you passionate about rugby and player development? We&apos;re always looking 
              for qualified coaches to join our staff.
            </p>
            <a 
              href="/contact"
              className="inline-block bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}