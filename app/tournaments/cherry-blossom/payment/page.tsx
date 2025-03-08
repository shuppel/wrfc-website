'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { CreditCard, Smartphone, Banknote, ArrowRight, Copy, Check } from 'lucide-react';
import SquarePayment from '@/components/SquarePayment';
import { useToast } from '@/components/ui/use-toast';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const selectedDivision = searchParams.get('division') || '';
  const teamName = searchParams.get('team') || '';

  const [isSquareDialogOpen, setIsSquareDialogOpen] = useState(false);
  const [isZelleDialogOpen, setIsZelleDialogOpen] = useState(false);
  const [isCheckDialogOpen, setIsCheckDialogOpen] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const handlePaymentSuccess = () => {
    setIsSquareDialogOpen(false);
    toast({
      title: 'Payment Successful',
      description: 'You will receive a confirmation email shortly.',
    });
  };

  const handlePaymentCancel = () => {
    setIsSquareDialogOpen(false);
  };

  const copyZelleInfo = async () => {
    try {
      await navigator.clipboard.writeText('440-391-4344');
      setHasCopied(true);
      toast({
        title: 'Copied to clipboard',
        description: 'Zelle number has been copied to your clipboard.',
      });
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please copy the number manually.',
        variant: 'destructive',
      });
    }
  };

  const handlePaymentConfirmation = (method: string) => {
    if (method === 'zelle') {
      toast({
        title: 'Payment Confirmation Submitted',
        description: 'Please allow up to 48 hours for payment verification. You will receive a confirmation email once verified.',
        duration: 5000,
      });
    } else if (method === 'check') {
      toast({
        title: 'Payment Confirmation Submitted',
        description: 'Please allow up to 10 business days for check processing. You will receive a confirmation email once processed.',
        duration: 5000,
      });
    }
    
    // Close respective dialogs
    if (method === 'zelle') setIsZelleDialogOpen(false);
    if (method === 'check') setIsCheckDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold font-nasalization text-wrfc-navy mb-8">Tournament Payment</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="bg-white shadow-lg border-2">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-2xl font-nasalization text-wrfc-navy">Payment Methods</CardTitle>
            <CardDescription>Choose your preferred payment method for {selectedDivision}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 bg-white">
            <div className="grid gap-4">
              <SquarePayment
                divisionId="cherry-blossom-2025"
                divisionName={`Cherry Blossom Tournament 2025 - ${selectedDivision}`}
                amount={400}
                onSuccess={handlePaymentSuccess}
                onCancel={handlePaymentCancel}
              />

              <Button 
                variant="outline"
                className="w-full h-auto py-4 flex items-center justify-between border-2"
                onClick={() => setIsZelleDialogOpen(true)}
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-wrfc-navy" />
                  <div className="text-left">
                    <div className="font-semibold text-wrfc-navy">Pay with Zelle</div>
                    <div className="text-sm text-gray-600">Send to: 440-391-4344</div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-wrfc-navy" />
              </Button>

              <Button 
                variant="outline"
                className="w-full h-auto py-4 flex items-center justify-between border-2"
                onClick={() => setIsCheckDialogOpen(true)}
              >
                <div className="flex items-center gap-3">
                  <Banknote className="h-5 w-5 text-wrfc-navy" />
                  <div className="text-left">
                    <div className="font-semibold text-wrfc-navy">Pay with Check</div>
                    <div className="text-sm text-gray-600">Mail to WRFC address below</div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-wrfc-navy" />
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Mailing Address for Checks:</h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-md border">
                  WRFC<br />
                  Attn: Treasurer<br />
                  2833 S Wakefield St Unit C<br />
                  Arlington, VA 22206
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="text-sm text-gray-600">
                  Note: Your registration is not complete until payment is received. Please ensure payment
                  is made within 7 days of registration to secure your spot.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg border-2">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-2xl font-nasalization text-wrfc-navy">Payment Details</CardTitle>
            <CardDescription>Tournament fee breakdown and payment status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 bg-white">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Registration Fee</span>
                <span className="text-lg font-semibold" id="fee-amount">$400.00</span>
              </div>
              
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Processing Fee (Square only)</span>
                <span className="text-lg font-semibold text-gray-600">+$12.00</span>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold">Total Due</span>
                <div className="text-right">
                  <div className="text-xl font-bold text-wrfc-navy">$400.00</div>
                  <div className="text-sm text-gray-600">($412.00 via Square)</div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                💡 <strong>Tip:</strong> Save on processing fees by paying with Zelle or check!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-nasalization text-wrfc-navy mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Everything you need to know about tournament payments
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="payment-due" className="border rounded-lg bg-white shadow-sm">
            <AccordionTrigger className="px-6 py-4 hover:no-underline data-[state=open]:text-wrfc-red">
              <div className="flex items-center text-left">
                <div>
                  <h3 className="text-lg font-semibold">When is payment due?</h3>
                  <p className="text-sm text-gray-500 font-normal">
                    Important deadlines for securing your spot
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700">
                  Payment must be received within 7 days of registration to secure your spot in the tournament.
                </p>
                <div className="mt-2 p-3 bg-yellow-50 rounded-md border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Important: Check payments must be received at least 5 days before the tournament.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="processing-fees" className="border rounded-lg bg-white shadow-sm">
            <AccordionTrigger className="px-6 py-4 hover:no-underline data-[state=open]:text-wrfc-red">
              <div className="flex items-center text-left">
                <div>
                  <h3 className="text-lg font-semibold">Are there any processing fees?</h3>
                  <p className="text-sm text-gray-500 font-normal">
                    Understanding additional costs
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700">
                  Card payments through Square incur a 3% processing fee. Zelle and check payments have no additional fees.
                </p>
                <div className="mt-2 p-3 bg-blue-50 rounded-md border border-blue-200">
                  <p className="text-sm text-blue-800">
                    💡 Tip: Save money by paying with Zelle or check!
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="withdrawal" className="border rounded-lg bg-white shadow-sm">
            <AccordionTrigger className="px-6 py-4 hover:no-underline data-[state=open]:text-wrfc-red">
              <div className="flex items-center text-left">
                <div>
                  <h3 className="text-lg font-semibold">What happens if we need to withdraw?</h3>
                  <p className="text-sm text-gray-500 font-normal">
                    Refund policy and deadlines
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700">
                  Refunds are available up to 30 days before the tournament, minus a $50 processing fee.
                </p>
                <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-700">
                    Deadline for refund requests: March 13, 2025
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Zelle Payment Instructions Dialog */}
      <Dialog open={isZelleDialogOpen} onOpenChange={setIsZelleDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white max-h-[90vh] overflow-y-auto">
          <DialogHeader className="bg-gray-50 sticky top-0 -mx-6 -mt-6 p-6 border-b z-10">
            <DialogTitle>Zelle Payment Instructions</DialogTitle>
            <DialogDescription>
              Send payment using Zelle to the following details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-wrfc-navy mb-2">The Washington DC Rugby Foundation</h2>
              <div className="flex justify-center">
                <Image
                  src="/assets/components/zelle_dc_foundation.png"
                  alt="Zelle QR Code"
                  width={250}
                  height={250}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Zelle Number:</h3>
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md border">
                  <code className="flex-1">440-391-4344</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyZelleInfo}
                    className="h-8 px-2 shrink-0"
                  >
                    {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Recipient Name:</h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-md border">Washington DC Rugby Foundation</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  Please include <strong>"CBT 2025 - {selectedDivision}"</strong>
                  {teamName && <> for team <strong>"{teamName}"</strong></>} in the payment memo.
                </p>
                <p className="text-sm text-yellow-800 mt-2">
                  After sending Zelle payment, please email a screenshot of the confirmation to <strong>treasurer@wrfc.org</strong>
                </p>
                <p className="text-sm text-yellow-800 mt-2">
                  ⏱️ Please allow up to 48 hours for payment verification
                </p>
              </div>
            </div>
          </div>
          <DialogFooter className="bg-gray-50 sticky bottom-0 -mx-6 -mb-6 p-6 border-t z-10">
            <div className="flex justify-between w-full">
              <Button variant="outline" onClick={() => setIsZelleDialogOpen(false)}>Close</Button>
              <Button 
                onClick={() => handlePaymentConfirmation('zelle')}
                className="bg-wrfc-red hover:bg-wrfc-red/90"
              >
                I've Completed the Payment
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Check Payment Instructions Dialog */}
      <Dialog open={isCheckDialogOpen} onOpenChange={setIsCheckDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white max-h-[90vh] overflow-y-auto">
          <DialogHeader className="bg-gray-50 sticky top-0 -mx-6 -mt-6 p-6 border-b z-10">
            <DialogTitle>Check Payment Instructions</DialogTitle>
            <DialogDescription>
              Please mail your check to the following address
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Mailing Address:</h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-md border">
                  WRFC<br />
                  Attn: Treasurer<br />
                  2833 S Wakefield St Unit C<br />
                  Arlington, VA 22206
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Make Check Payable To:</h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-md border">Washington DC Rugby Foundation</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  Please include <strong>"CBT 2025 - {selectedDivision}"</strong>
                  {teamName && <> for team <strong>"{teamName}"</strong></>} in the check memo.
                </p>
                <p className="text-sm text-yellow-800 mt-2">
                  <strong>Important:</strong> Please allow 10 business days for check processing. Check payments will not be accepted within 5 days of the tournament.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter className="bg-gray-50 sticky bottom-0 -mx-6 -mb-6 p-6 border-t z-10">
            <div className="flex justify-between w-full">
              <Button variant="outline" onClick={() => setIsCheckDialogOpen(false)}>Close</Button>
              <Button 
                onClick={() => handlePaymentConfirmation('check')}
                className="bg-wrfc-red hover:bg-wrfc-red/90"
              >
                I've Mailed the Check
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 