import { Metadata } from 'next'
import { generateSEOMetadata } from '../utils/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Terms of Service',
  description: 'Washington Rugby Football Club terms of service and membership conditions.',
  path: '/terms'
})

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-100 text-center mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 dark:text-white">
                By accessing and using the Washington Rugby Football Club website, participating in club 
                activities, or becoming a member, you accept and agree to be bound by the terms and 
                provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Club Membership
              </h2>
              <div className="text-gray-700 dark:text-white space-y-4">
                <p><strong>Membership Requirements:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Must be 18 years of age or older</li>
                  <li>Complete membership registration and payment</li>
                  <li>Agree to club code of conduct</li>
                  <li>Provide necessary medical and emergency contact information</li>
                </ul>
                
                <p><strong>Membership Benefits:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Participation in practices and matches</li>
                  <li>Access to club facilities and equipment</li>
                  <li>Participation in social events and tournaments</li>
                  <li>Club merchandise and apparel discounts</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Code of Conduct
              </h2>
              <p className="text-gray-700 dark:text-white mb-4">
                All members and participants must adhere to the following standards:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-white space-y-2">
                <li>Respect for teammates, opponents, referees, and spectators</li>
                <li>No tolerance for discrimination, harassment, or abusive behavior</li>
                <li>Compliance with rugby laws and regulations</li>
                <li>Responsible alcohol consumption at club events</li>
                <li>Protection of club reputation and values</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Risk and Liability
              </h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                <p className="text-yellow-800 dark:text-yellow-200 font-semibold">
                  IMPORTANT: Rugby is a contact sport with inherent risks.
                </p>
              </div>
              <div className="text-gray-700 dark:text-white space-y-4">
                <p>By participating, you acknowledge that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Rugby involves physical contact and risk of injury</li>
                  <li>You participate at your own risk</li>
                  <li>You are responsible for your own medical insurance</li>
                  <li>You release the club from liability for injuries sustained during participation</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Payment and Fees
              </h2>
              <div className="text-gray-700 dark:text-white space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Membership fees are non-refundable unless otherwise specified</li>
                  <li>Tournament and event fees are separate from membership dues</li>
                  <li>Payment is required before participation in activities</li>
                  <li>Additional fees may apply for special events or equipment</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Website Usage
              </h2>
              <div className="text-gray-700 dark:text-white space-y-4">
                <p>When using our website, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and current information</li>
                  <li>Not use the site for any unlawful purposes</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not attempt to gain unauthorized access to club systems</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Disciplinary Actions
              </h2>
              <p className="text-gray-700 dark:text-white mb-4">
                The club reserves the right to take disciplinary action, including suspension or 
                termination of membership, for violations of these terms or club policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Privacy
              </h2>
              <p className="text-gray-700 dark:text-white">
                Your privacy is important to us. Please review our Privacy Policy for information 
                about how we collect, use, and protect your personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Changes to Terms
              </h2>
              <p className="text-gray-700 dark:text-white">
                We reserve the right to modify these terms at any time. Changes will be posted on 
                this page and will be effective immediately upon posting.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                10. Contact Information
              </h2>
              <p className="text-gray-700 dark:text-white">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mt-4">
                <p className="text-gray-700 dark:text-white">
                  <strong>Washington Rugby Football Club</strong><br />
                  Email: washingtonrugbyfc1963@gmail.com<br />
                  Location: Washington, DC
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}