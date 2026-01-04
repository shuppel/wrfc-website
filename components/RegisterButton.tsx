'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from '@phosphor-icons/react';

interface RegisterButtonProps {
  registrationUrl?: string;
}

export default function RegisterButton({ registrationUrl = 'https://www.zeffy.com/en-US/ticketing/cherry-blossom-tournament--2026' }: RegisterButtonProps) {
  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-wrfc-red to-wrfc-navy rounded-lg blur opacity-75 animate-pulse"></div>
      <Button
        className="relative bg-wrfc-red hover:bg-wrfc-red/90 text-white font-bold py-6 px-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        onClick={() => window.open(registrationUrl, '_blank')}
        aria-label="Register for the 2026 Cherry Blossom Tournament"
      >
        Register Now
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      </Button>
    </div>
  );
} 