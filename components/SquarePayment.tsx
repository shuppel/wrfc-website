'use client';

import { Button } from '@/components/ui/button';
import { CreditCard as CreditCardIcon, ArrowRight } from 'lucide-react';

interface SquarePaymentProps {
  divisionId: string;
  divisionName: string;
  amount: number;
  squarePaymentLink: string; // New prop for external payment link
  onCancel: () => void;
}

// Client component for handling Square payment UI
export default function SquarePayment({ 
  divisionId, 
  divisionName, 
  amount, 
  squarePaymentLink,
  onCancel 
}: SquarePaymentProps) {
  
  const handlePaymentClick = () => {
    // Redirect to external Square payment page
    window.location.href = squarePaymentLink;
  };

  return (
    <Button 
      variant="outline"
      className="w-full h-auto py-4 flex items-center justify-between border-2"
      onClick={handlePaymentClick}
    >
      <div className="flex items-center gap-3">
        <CreditCardIcon className="h-5 w-5 text-wrfc-navy" />
        <div className="text-left">
          <div className="font-semibold text-wrfc-navy">Pay with Card</div>
          <div className="text-sm text-gray-600">Secure payment via Square (+3% fee)</div>
        </div>
      </div>
      <ArrowRight className="h-5 w-5 text-wrfc-navy" />
    </Button>
  );
} 