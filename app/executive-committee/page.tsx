import { Metadata } from 'next'
import { generateSEOMetadata } from '../utils/seo'
import { Users, EnvelopeSimple, Phone, Crown, Star, CurrencyDollar, FileText, Shield, Heart, Hash, Target, Handshake, Confetti, Camera, Code } from '@phosphor-icons/react/dist/ssr'
import ECAccordion from '@/components/ECAccordion'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Executive Committee',
  description: 'The Washington Rugby Football Club Executive Committee for 2026-2027, the volunteers who run the club, plus an archive of previous committees back to 2024.',
  path: '/executive-committee'
})

interface ECMember {
  position: string
  name: string
  email?: string
  phone?: string
  panel?: string[]
  icon?: React.ComponentType<{ className?: string }>
}

const currentEC: ECMember[] = [
  {
    position: "President",
    name: "Harry Higginbottom",
    icon: Crown
  },
  {
    position: "Vice President",
    name: "Matthew Bainbridge",
    icon: Star
  },
  {
    position: "Secretary",
    name: "Dom Boresta",
    icon: FileText
  },
  {
    position: "Treasurer",
    name: "Thomas Britt",
    icon: CurrencyDollar
  },
  {
    position: "Match Secretary",
    name: "Zach Zuzuelo",
    icon: Shield
  },
  {
    position: "Club Captain",
    name: "Nate Santa-Maria",
    icon: Users
  },
  {
    position: "Alumni/Youth Director",
    name: "Roger Rog",
    icon: Heart
  },
  {
    position: "CBT Chair",
    name: "Josh Quick",
    icon: Hash
  },
  {
    position: "Recruitment Chair",
    name: "Issac Greenspan",
    icon: Target
  },
  {
    position: "Fundraising Chair",
    name: "Ben Goodlet",
    icon: Handshake
  },
  {
    position: "Social Chair",
    name: "Daniel Perez",
    icon: Confetti
  },
  {
    position: "Social Media Chair",
    name: "Dike Ukuani",
    icon: Camera
  },
  {
    position: "Webmaster",
    name: "Erikk Shupp",
    icon: Code
  }
]

// Previous years' EC data for accordion
const previousYears = [
  {
    year: "2025-2026",
    members: [
      { position: "President", name: "Harry Higginbottom" },
      { position: "Vice President", name: "Austin Park" },
      { position: "Treasurer", name: "Erikk Shupp" },
      { position: "Secretary", name: "Dom Boresta" },
      { position: "Match Secretary", name: "Matthew Bainbridge" },
      { position: "Club Captain", name: "Chris Miller" },
      { position: "Alumni/Youth Relations", name: "Jonathan Fuentecilla" },
      { position: "CBT Chair", name: "Andrew Klock" },
      { position: "Recruitment Chair", name: "Noah Davidson" },
      { position: "Fundraising Chair", name: "Nick Cippolone" },
      { position: "Social Chair", name: "Austin 'Ox' Longo" },
      { position: "Social Media Chair", name: "Stephen Okala" }
    ]
  },
  {
    year: "2024-2025",
    members: [
      { position: "President", name: "Harry Higginbottom" },
      { position: "Vice President", name: "Austin Park" },
      { position: "Secretary", name: "Joshua Levine" },
      { position: "Treasurer", name: "Erikk Shupp" },
      { position: "Club Captain", name: "Chris Miller" },
      { position: "Member at Large (Retired after 2025)", name: "Scott H." },
      { position: "Director of Player Operations", name: "Jonathan Fuentecilla" },
      { position: "Youth Outreach (Retired after 2025)", name: "Kwon Dailey" },
      { position: "Alumni Outreach (Retired after 2025)", name: "Casey Ling" },
      { position: "CBT Chair", name: "Doug Muilken" },
      { position: "Social Chair", name: "Austin 'Ox' Longo" },
      { position: "Social Media Chair", name: "Stephen Okala" },
      { position: "Recruitment Chair", name: "Nick Cippolone" },
      { position: "Fundraising Chair", name: "Chris DeVore" }
    ]
  }
]

export default function ExecutiveCommitteePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="display-medium text-gray-900 dark:text-white mb-4">
            Executive Committee
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-100 max-w-3xl mx-auto">
            The WRFC Executive Committee provides leadership and governance for our club, 
            ensuring we maintain our proud traditions while building for the future.
          </p>
        </div>

        {/* Current Year EC */}
        <div className="mb-12">
          <h2 className="section-title text-center mb-8">
            2026-2027 Executive Committee
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {currentEC.map((member, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {member.position}
                    </h3>
                    <p className="text-lg text-blue-600 dark:text-blue-400">
                      {member.name}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    {member.icon ? (
                      <member.icon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                    ) : (
                      <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                    )}
                  </div>
                </div>
                
                {/* Panel Members */}
                {member.panel && member.panel.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-700 dark:text-white mb-2">
                      Panel Members:
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-100 space-y-1">
                      {member.panel.map((panelMember, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {panelMember}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Contact Information (if available) */}
                {(member.email || member.phone) && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <EnvelopeSimple className="w-4 h-4" />
                        {member.email}
                      </a>
                    )}
                    {member.phone && (
                      <a 
                        href={`tel:${member.phone}`}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <Phone className="w-4 h-4" />
                        {member.phone}
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* EC Responsibilities */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-12 max-w-4xl mx-auto">
          <h2 className="section-title text-center mb-6">
            Committee Responsibilities
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Governance</h3>
              <ul className="text-gray-600 dark:text-gray-100 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Setting club policies and strategic direction
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Financial oversight and budget management
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Ensuring compliance with USA Rugby regulations
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Operations</h3>
              <ul className="text-gray-600 dark:text-gray-100 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Coordinating matches and tournaments
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Managing player recruitment and development
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Organizing fundraising and community events
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Previous Years Accordion */}
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center mb-6">
            Previous Executive Committees
          </h2>
          <ECAccordion previousYears={previousYears} />
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
            <p className="text-lg mb-6">
              Interested in contributing to WRFC&apos;s leadership? We welcome members who are 
              passionate about rugby and committed to the club&apos;s success.
            </p>
            <a 
              href="/contact"
              className="inline-block bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}