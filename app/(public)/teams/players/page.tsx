import { Metadata } from 'next'
import Link from 'next/link'
import { generateSEOMetadata } from '../../utils/seo'
import { Card } from '@/components/ui/card'
import { Users, Calendar, Shield, Zap } from 'lucide-react'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Player Portal - Coming Soon',
  description: 'The new WRFC Player Portal is coming soon. Players will be able to manage their profiles, track dues, and access team resources.',
  path: '/teams/players'
})

export default async function PlayersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Player Portal Coming Soon
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We&apos;re building a new self-service portal for WRFC players. Soon you&apos;ll be able to create your profile, 
            manage your information, and access exclusive team resources.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Player Profiles</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create and manage your player profile with stats, photos, and achievements
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Dues Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              View your dues status, make payments, and download receipts
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Access</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your data is protected with secure authentication and privacy controls
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Team Resources</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access exclusive team documents, training materials, and resources
            </p>
          </Card>
        </div>

        {/* Portal Access Section */}
        <div className="max-w-2xl mx-auto text-center">
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
            <h2 className="text-2xl font-bold mb-4">Early Access for Current Players</h2>
            <p className="text-gray-700 dark:text-gray-200 mb-6">
              The portal will launch in early 2025. Current players will receive an email invitation 
              to create their accounts and set up their profiles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/portal/register"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Pre-Register Now
              </Link>
              <Link 
                href="/portal/login"
                className="inline-block bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Player Login
              </Link>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-8 text-white max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">New to WRFC?</h2>
            <p className="text-lg mb-6">
              Interested in playing rugby? We welcome players of all skill levels. 
              Come to a practice and see what WRFC is all about!
            </p>
            <Link 
              href="/membership"
              className="inline-block bg-white text-red-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Learn About Membership
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}