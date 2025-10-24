import { Metadata } from 'next'
import { generateSEOMetadata } from '../utils/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Privacy Policy',
  description: 'Washington Rugby Football Club privacy policy and data protection information.',
  path: '/privacy'
})

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-100 text-center mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-700 dark:text-white mb-4">
                We collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-white space-y-2">
                <li>Register for membership or tournaments</li>
                <li>Contact us through our website or email</li>
                <li>Subscribe to our newsletter or updates</li>
                <li>Participate in club activities and events</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 dark:text-white mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-white space-y-2">
                <li>Process membership applications and tournament registrations</li>
                <li>Communicate about club activities, schedules, and updates</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Information Sharing
              </h2>
              <p className="text-gray-700 dark:text-white mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-white space-y-2">
                <li>With your explicit consent</li>
                <li>To trusted service providers who assist in club operations</li>
                <li>When required by law or to protect our rights</li>
                <li>With rugby governing bodies for official registrations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Data Security
              </h2>
              <p className="text-gray-700 dark:text-white">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of 
                transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Cookies and Tracking
              </h2>
              <p className="text-gray-700 dark:text-white">
                Our website may use cookies and similar tracking technologies to enhance your browsing 
                experience. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Your Rights
              </h2>
              <p className="text-gray-700 dark:text-white mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-white space-y-2">
                <li>Access, update, or delete your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability</li>
                <li>Lodge a complaint with relevant authorities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Contact Information
              </h2>
              <p className="text-gray-700 dark:text-white">
                If you have questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mt-4">
                <p className="text-gray-700 dark:text-white">
                  <strong>Washington Rugby Football Club</strong><br />
                  Email: info@washingtonrugby.org<br />
                  Location: Washington, DC
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Changes to This Policy
              </h2>
              <p className="text-gray-700 dark:text-white">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}