'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface TournamentRegisterButtonProps {
  year: string;
  squareCheckoutUrl?: string;
}

export default function TournamentRegisterButton({ 
  year, 
  squareCheckoutUrl = 'https://checkout.square.site/merchant/W1AZ3RW1C2M9K/checkout/C6FSYI5DTSWWHGQDNKCUYTE6' 
}: TournamentRegisterButtonProps) {
  if (year === '2025') {
    return (
      <div className="relative inline-block">
        <div className="absolute -inset-1 bg-gradient-to-r from-wrfc-red via-wrfc-navy to-wrfc-red rounded-lg blur opacity-75 group-hover:opacity-100 animate-pulse"></div>
        <Button 
          size="lg" 
          className="relative bg-wrfc-red hover:bg-wrfc-red/90 text-white px-8 py-6 text-lg font-bold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={() => window.open(squareCheckoutUrl, '_blank')}
          aria-label="Register your team for the 2025 Cherry Blossom Tournament"
        >
          <span className="flex items-center">
            Register Your Team
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </span>
        </Button>
      </div>
    );
  }
  
  return (
    <Button 
      size="lg" 
      className="bg-wrfc-red hover:bg-wrfc-red/90 text-white px-8 py-6 text-lg"
    >
      Register Your Team
    </Button>
  );
} 