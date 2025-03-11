'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface RegisterButtonProps {
  squareCheckoutUrl?: string;
}

export default function RegisterButton({ squareCheckoutUrl = 'https://checkout.square.site/merchant/W1AZ3RW1C2M9K/checkout/C6FSYI5DTSWWHGQDNKCUYTE6' }: RegisterButtonProps) {
  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-wrfc-red to-wrfc-navy rounded-lg blur opacity-75 animate-pulse"></div>
      <Button 
        className="relative bg-wrfc-red hover:bg-wrfc-red/90 text-white font-bold py-6 px-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        onClick={() => window.open(squareCheckoutUrl, '_blank')}
        aria-label="Register for the 2025 Cherry Blossom Tournament"
      >
        Register Now
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      </Button>
    </div>
  );
} 