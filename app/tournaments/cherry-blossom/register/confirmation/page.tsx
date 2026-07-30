'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Clock, Envelope } from '@phosphor-icons/react/dist/ssr';
import { getCurrentTournament } from '@/data/cherry-blossom-tournaments';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [regId, setRegId] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const id = searchParams.get('id');
    const st = searchParams.get('status');
    if (id) setRegId(id);
    if (st) setStatus(st);
  }, [searchParams]);

  const isWaitlist = status === 'waitlist';
  const tournamentYear = getCurrentTournament().year;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            {isWaitlist ? (
              <Clock className="w-24 h-24 mx-auto text-yellow-500 mb-4" weight="duotone" />
            ) : (
              <CheckCircle className="w-24 h-24 mx-auto text-green-500 mb-4" weight="duotone" />
            )}
            <h1 className="text-4xl font-bold text-wrfc-navy dark:text-white mb-2">
              {isWaitlist ? 'Added to Waitlist' : 'Registration Received!'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Thank you for registering for CBT {tournamentYear}
            </p>
          </div>

          {/* Registration Info Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
            {regId && (
              <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Registration ID
                </h2>
                <p className="text-2xl font-mono font-bold text-wrfc-red">{regId}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Save this ID for your records
                </p>
              </div>
            )}

            <div className="space-y-6">
              {isWaitlist ? (
                <>
                  <div className="flex items-start gap-4">
                    <Envelope className="w-6 h-6 text-wrfc-red flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Waitlist Confirmation</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Your division is currently full. You&apos;ve been added to the waitlist and will be notified via 
                        email if a spot becomes available.
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <h3 className="font-bold mb-2 text-yellow-800 dark:text-yellow-200">What Happens Next?</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-yellow-900 dark:text-yellow-100">
                      <li>No payment is required while on the waitlist</li>
                      <li>We&apos;ll email you if a spot opens up</li>
                      <li>You&apos;ll have 48 hours to confirm and pay</li>
                      <li>Waitlist positions are first-come, first-served</li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-4">
                    <Envelope className="w-6 h-6 text-wrfc-red flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Check Your Email</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        We&apos;ve sent a confirmation email with payment instructions and tournament details.
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="font-bold mb-2 text-blue-800 dark:text-blue-200">Next Steps</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-blue-900 dark:text-blue-100">
                      <li>
                        <strong>Complete Payment Within 14 Days</strong>
                        <p className="ml-5 text-xs mt-1">
                          Your spot is reserved, but not confirmed until payment is received. 
                          Payment link and instructions are in your email.
                        </p>
                      </li>
                      <li>
                        <strong>Payment Confirmation</strong>
                        <p className="ml-5 text-xs mt-1">
                          Once payment is processed, you&apos;ll receive a confirmation email with additional 
                          tournament details.
                        </p>
                      </li>
                      <li>
                        <strong>Tournament Information</strong>
                        <p className="ml-5 text-xs mt-1">
                          Schedule, field assignments, and logistics will be sent closer to the tournament date.
                        </p>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <h3 className="font-bold mb-2 text-red-800 dark:text-red-200">⚠️ Important</h3>
                    <p className="text-sm text-red-900 dark:text-red-100">
                      If you don&apos;t receive a confirmation email within 15 minutes, please check your spam folder. 
                      If you still don&apos;t see it, contact us at{' '}
                      <a href="mailto:cbt@washingtonrugby.org" className="underline font-semibold">
                        cbt@washingtonrugby.org
                      </a>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tournaments/cherry-blossom"
              className="inline-block bg-wrfc-navy text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-wrfc-navy/90"
            >
              View Tournament Info
            </Link>
            <Link
              href={`/tournaments/cherry-blossom/${tournamentYear}/teams`}
              className="inline-block bg-white dark:bg-gray-800 border-2 border-wrfc-navy text-wrfc-navy dark:text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              View Registered Teams
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
            <p className="mb-2">Questions about your registration?</p>
            <p>
              Email:{' '}
              <a href="mailto:cbt@washingtonrugby.org" className="text-wrfc-red hover:underline">
                cbt@washingtonrugby.org
              </a>
            </p>
            <p>
              Tournament Chair:{' '}
              <a href="mailto:cbt-chair@washingtonrugby.org" className="text-wrfc-red hover:underline">
                cbt-chair@washingtonrugby.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-wrfc-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading confirmation...</p>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
