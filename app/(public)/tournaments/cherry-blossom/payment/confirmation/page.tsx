'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, Calendar, MapPin, ClipboardList, Users } from 'lucide-react';
import confetti from 'canvas-confetti';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const teamName = searchParams.get('team') || '';
  const division = searchParams.get('division') || '';
  const paymentMethod = searchParams.get('method') || '';
  const amount = searchParams.get('amount') || '400.00';

  useEffect(() => {
    // Trigger confetti animation on load
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-20 w-20 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold font-nasalization text-wrfc-navy mb-4">
          Registration Complete!
        </h1>
        <p className="text-xl text-gray-600">
          Thank you for registering for the 2025 Cherry Blossom Tournament
        </p>
      </div>

      <Card className="max-w-2xl mx-auto bg-white p-6 shadow-lg border-2 mb-8">
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-2xl font-bold text-wrfc-navy mb-4">Registration Details</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Team Name</span>
                <span className="font-semibold">{teamName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Division</span>
                <span className="font-semibold">{division}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-semibold">{paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount Paid</span>
                <span className="font-semibold">${amount}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-wrfc-navy">Next Steps</h3>
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-wrfc-red flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Mark Your Calendar</p>
                  <p className="text-gray-600">Tournament dates: April 12-13, 2025</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-wrfc-red flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-gray-600">Liberty Sports Park, MD</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ClipboardList className="h-5 w-5 text-wrfc-red flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Complete Team Roster</p>
                  <p className="text-gray-600">Deadline: March 15, 2025</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-wrfc-red flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Required Documents</p>
                  <p className="text-gray-600">USA Rugby CIPP, Photo ID, Liability Waivers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="max-w-2xl mx-auto">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            📧 A confirmation email has been sent to your registered email address with all the details and next steps.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/tournaments/cherry-blossom/2025">
            <Button variant="outline">
              Return to Tournament Page
            </Button>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default function PaymentConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="animate-pulse">
          <div className="h-20 w-20 bg-gray-200 rounded-full mx-auto mb-6"></div>
          <div className="h-8 bg-gray-200 max-w-md mx-auto mb-4 rounded"></div>
          <div className="h-6 bg-gray-200 max-w-sm mx-auto rounded"></div>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
} 