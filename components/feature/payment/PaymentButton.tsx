'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ZEFFY_LINKS } from '@/data/zeffy-links';

interface PaymentButtonProps {
  zeffyCheckoutUrl?: string;
}

export default function PaymentButton({ 
  zeffyCheckoutUrl = ZEFFY_LINKS.cherryBlossom.registration
}: PaymentButtonProps) {
  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-wrfc-red via-wrfc-navy to-wrfc-red rounded-lg blur opacity-75 animate-pulse"></div>
      <Button 
        className="relative w-full bg-wrfc-red hover:bg-wrfc-red/90 text-white py-4 text-lg font-bold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        onClick={() => window.open(zeffyCheckoutUrl, '_blank')}
        aria-label="Proceed to payment for the Cherry Blossom Tournament"
      >
        <span className="flex items-center justify-center">
          Proceed to Payment
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
        </span>
      </Button>
    </div>
  );
} 