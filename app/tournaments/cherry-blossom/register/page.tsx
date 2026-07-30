import { Metadata } from 'next';
import Link from 'next/link';
import RegistrationForm from '@/components/feature/tournament/RegistrationForm';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { generateSEOMetadata } from '@/app/utils/seo';
import { getCurrentTournament } from '@/data/cherry-blossom-tournaments';

const currentTournament = getCurrentTournament();

export const metadata: Metadata = generateSEOMetadata({
  title: `Register for Cherry Blossom Tournament ${currentTournament.year}`,
  description: `Team registration for the ${currentTournament.edition}th Annual Cherry Blossom Rugby Tournament, hosted by Washington Rugby Football Club. Men's and women's club, college and high school 15s brackets.`,
  path: '/tournaments/cherry-blossom/register'
});

export default function RegisterPage() {
  const tournament = getCurrentTournament();
  
  // Check if registration is open
  const registrationClosed = !tournament.registrationOpen;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Tournaments', item: '/tournaments' },
          { name: 'Cherry Blossom', item: '/tournaments/cherry-blossom' },
          { name: 'Register', item: '/tournaments/cherry-blossom/register' }
        ]} 
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-wrfc-navy to-wrfc-red text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Register for CBT {tournament.year}
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto">
            {tournament.edition}th Annual Cherry Blossom Tournament
          </p>
          <p className="text-center mt-2">
            {tournament.date} {tournament.datePending && '(Date Pending)'}
          </p>
        </div>
      </section>

      {/* Registration Closed Notice */}
      {registrationClosed && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-yellow-800 dark:text-yellow-200">
              Registration Not Yet Open
            </h2>
            <p className="mb-4 text-yellow-900 dark:text-yellow-100">
              Registration for CBT {tournament.year} opens on {tournament.registrationOpens}.
            </p>
            <p className="mb-4 text-yellow-900 dark:text-yellow-100">
              Please check back then or email{' '}
              <a href="mailto:cbt@washingtonrugby.org" className="underline font-semibold">
                cbt@washingtonrugby.org
              </a>{' '}
              with any questions.
            </p>
            <Link
              href="/tournaments/cherry-blossom"
              className="inline-block bg-wrfc-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-wrfc-navy/90"
            >
              Back to Tournament Info
            </Link>
          </div>
        </div>
      )}

      {/* Registration Form */}
      {!registrationClosed && (
        <section className="container mx-auto px-4 py-12">
          <RegistrationForm />
        </section>
      )}

      {/* Important Information */}
      <section className="bg-white dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-wrfc-navy dark:text-white">
              Important Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 text-wrfc-red">Payment Deadline</h3>
                <p className="text-sm">
                  Payment must be received within 14 days of registration to confirm your spot. 
                  You will receive payment instructions via email.
                </p>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 text-wrfc-red">Waitlist Policy</h3>
                <p className="text-sm">
                  If your division is full, you&apos;ll be placed on a waitlist and notified if a spot opens. 
                  No payment required while on waitlist.
                </p>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 text-wrfc-red">Tournament Location</h3>
                <p className="text-sm">
                  {tournament.location.name}<br />
                  {tournament.location.address}
                </p>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 text-wrfc-red">Questions?</h3>
                <p className="text-sm">
                  Email: <a href="mailto:cbt@washingtonrugby.org" className="underline">cbt@washingtonrugby.org</a><br />
                  Tournament Chair: <a href="mailto:cbt-chair@washingtonrugby.org" className="underline">cbt-chair@washingtonrugby.org</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
