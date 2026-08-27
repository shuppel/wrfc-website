import { Metadata } from 'next'
import { generateSEOMetadata } from '../utils/seo'
import { Users, Crown, Star, CurrencyDollar, FileText, Shield, Heart, Hash, Target, Handshake, Confetti, Camera, Code } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import ECAccordion from '@/components/ECAccordion'
import { currentTerm, pastTerms } from '@/data/roster/committee'
import type { CommitteeMember } from '@/data/roster/committee'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Executive Committee',
  description: 'The Washington Rugby Football Club Executive Committee for 2026-2027, the volunteers who run the club, plus an archive of previous committees back to 2024.',
  path: '/executive-committee'
})

/**
 * Icons are presentation, so they live here rather than in the data. Everything
 * factual — who holds which post, in which term — comes from
 * data/roster/committee.ts, which the player roster reads from too. That is why
 * a committee member's name here links straight to their playing profile.
 */
const POSITION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  President: Crown,
  'Vice President': Star,
  Secretary: FileText,
  Treasurer: CurrencyDollar,
  'Match Secretary': Shield,
  'Club Captain': Users,
  'Alumni/Youth Director': Heart,
  'CBT Chair': Hash,
  'Recruitment Chair': Target,
  'Fundraising Chair': Handshake,
  'Social Chair': Confetti,
  'Social Media Chair': Camera,
  Webmaster: Code,
}

function MemberName({ member }: { member: CommitteeMember }) {
  if (!member.slug) {
    return <span>{member.name}</span>
  }

  return (
    <Link
      href={`/teams/players/${member.slug}`}
      className="underline-offset-4 hover:underline"
    >
      {member.name}
    </Link>
  )
}

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
            {currentTerm?.label} Executive Committee
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {(currentTerm?.members ?? []).map((member, index) => (
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
                      <MemberName member={member} />
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    {(() => {
                      const Icon = POSITION_ICONS[member.position] ?? Users
                      return <Icon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                    })()}
                  </div>
                </div>
                
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
          <ECAccordion terms={pastTerms} />
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