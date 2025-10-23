import { Metadata } from 'next'
import Link from 'next/link'
import { generateSEOMetadata } from '../utils/seo'
import { Users, UserCheck, Trophy, Target, GraduationCap, Heart, Calendar, Award } from 'lucide-react'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Teams',
  description: 'Discover the Washington Rugby Football Club teams, coaching staff, and player roster. Learn about our D1, D3, and Social divisions.',
  path: '/teams'
})

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            WRFC Teams
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Washington Rugby Football Club fields competitive teams in multiple divisions, 
            supported by experienced coaches and talented players from around the world.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Coaches Card */}
          <Link href="/teams/coaches" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
              <div className="h-64 bg-gradient-to-br from-blue-600 to-blue-800 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <UserCheck className="w-24 h-24 text-white/30" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-3xl font-bold text-white mb-2">Coaching Staff</h2>
                  <p className="text-blue-100">
                    Meet our experienced coaches dedicated to player development
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:underline">
                    View Coaching Staff
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 transform group-hover:translate-x-2 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Players Card */}
          <Link href="/teams/players" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
              <div className="h-64 bg-gradient-to-br from-red-600 to-red-800 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="w-24 h-24 text-white/30" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-3xl font-bold text-white mb-2">Player Roster</h2>
                  <p className="text-red-100">
                    Explore our talented roster of players across all divisions
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-red-600 dark:text-red-400 font-semibold group-hover:underline">
                    View Player Roster
                  </span>
                  <span className="text-red-600 dark:text-red-400 transform group-hover:translate-x-2 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Core Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Excellence */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Excellence
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Striving for the highest standards in every aspect of the game, from training to match day performance
              </p>
            </div>

            {/* Teamwork */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-green-600 dark:text-green-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Teamwork
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Building unbreakable bonds on and off the field through trust, communication, and mutual support
              </p>
            </div>

            {/* Development */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-purple-600 dark:text-purple-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Development
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Continuous improvement through expert coaching, skill progression, and personal growth
              </p>
            </div>

            {/* Commitment */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-red-600 dark:text-red-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Commitment
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dedication to the club, teammates, and the sport through consistent effort and participation
              </p>
            </div>
          </div>
        </div>

        {/* Division Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Our Divisions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* D1 Division */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Division 1
                </h3>
                <Trophy className="w-8 h-8 text-blue-600 dark:text-blue-300" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our premier competitive division competing at the highest level in the MAC Conference
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Practice Schedule</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">2x weekly training sessions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Competition Level</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">MAC Conference championship contenders</p>
                  </div>
                </div>
              </div>
            </div>

            {/* D3 Division */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Division 3
                </h3>
                <Users className="w-8 h-8 text-green-600 dark:text-green-300" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Competitive rugby with a balanced focus on skill development and team building
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Practice Schedule</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">2x weekly training sessions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Development Focus</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Capital Conference growth pathway</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Division */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Social Rugby
                </h3>
                <Heart className="w-8 h-8 text-purple-600 dark:text-purple-300" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Recreational rugby emphasizing fun, fitness, and friendship for all skill levels
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Flexible Schedule</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Adaptable training times</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Community Focus</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Social events and friendly matches</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Team Statistics
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                60+
              </div>
              <p className="text-gray-600 dark:text-gray-300">Years of History</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                50+
              </div>
              <p className="text-gray-600 dark:text-gray-300">Active Players</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                3
              </div>
              <p className="text-gray-600 dark:text-gray-300">Divisions</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                6
              </div>
              <p className="text-gray-600 dark:text-gray-300">Coaching Staff</p>
            </div>
          </div>
        </div>

        {/* Discord Community Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-[#5865F2] to-[#4752C4] rounded-xl p-8 text-white max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Connect with the Team</h2>
            <p className="text-lg mb-6">
              Chat with teammates, get real-time updates, and stay connected with the WRFC community on Discord!
            </p>
            <a 
              href="https://discord.gg/XPkXVEySsh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-[#5865F2] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .031-.056c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span>Chat with teammates on Discord</span>
            </a>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-xl p-8 text-white max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Join Washington Rugby</h2>
            <p className="text-lg mb-6">
              Whether you&apos;re an experienced player or new to rugby, there&apos;s a place for you at WRFC. 
              Join our legacy of excellence on and off the field.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/membership"
                className="inline-block bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Become a Member
              </Link>
              <a 
                zeffy-form-link="https://www.zeffy.com/embed/ticketing/wrfc-player-dues?modal=true"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors cursor-pointer"
              >
                Pay Dues
              </a>
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