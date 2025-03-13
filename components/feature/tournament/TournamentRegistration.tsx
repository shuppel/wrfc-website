'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Division {
  name: string;
  description?: string;
  fee: number;
}

interface TournamentRegistrationProps {
  divisions: Division[];
}

export default function TournamentRegistration({ divisions }: TournamentRegistrationProps) {
  const SQUARE_CHECKOUT_URL = 'https://checkout.square.site/merchant/W1AZ3RW1C2M9K/checkout/C6FSYI5DTSWWHGQDNKCUYTE6';

  return (
    <div>
      <div className="relative group mb-4">
        <div className="absolute -inset-1 bg-gradient-to-r from-wrfc-red via-wrfc-navy to-wrfc-red rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200" />
        <Button 
          className="relative w-full bg-wrfc-red hover:bg-wrfc-red/90 text-white py-6 text-lg font-bold tracking-wide shadow-lg group-hover:shadow-xl transition-all duration-200 overflow-hidden"
          onClick={() => window.open(SQUARE_CHECKOUT_URL, '_blank')}
          aria-label="Register your team for the Cherry Blossom Tournament"
        >
          <div className="relative z-10 flex items-center justify-center gap-2">
            <span>Register Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-wrfc-navy to-wrfc-red opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
        </Button>
      </div>
      
      {divisions && divisions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Tournament Divisions</h3>
          {divisions.map((division, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold text-lg">{division.name}</h4>
              {division.description && (
                <p className="text-gray-600 mt-2">{division.description}</p>
              )}
              <p className="text-wrfc-red font-medium mt-2">
                Registration Fee: ${division.fee.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 