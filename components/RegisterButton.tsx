'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from '@phosphor-icons/react';
import { getCurrentTournament } from '@/data/cherry-blossom-tournaments';
import { ZEFFY_LINKS } from '@/data/zeffy-links';

interface RegisterButtonProps {
  registrationUrl?: string;
}

export default function RegisterButton({ registrationUrl }: RegisterButtonProps) {
  const tournament = getCurrentTournament();
  const url = registrationUrl ?? ZEFFY_LINKS.cherryBlossom.registration;
  const isOpen = tournament.registrationOpen && Boolean(url);

  // Before registration opens we point teams at the tournament chair rather than
  // a dead checkout link.
  if (!isOpen) {
    return (
      <div className="relative">
        <Button
          asChild
          variant="outline"
          className="relative font-bold py-6 px-6 transition-all duration-300"
        >
          <Link href="/tournaments/cherry-blossom">
            Registration Opens {tournament.registrationOpens ?? 'Soon'}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-wrfc-red to-wrfc-navy rounded-lg blur opacity-75 animate-pulse"></div>
      <Button
        className="relative bg-wrfc-red hover:bg-wrfc-red/90 text-white font-bold py-6 px-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        onClick={() => window.open(url, '_blank')}
        aria-label={`Register for the ${tournament.year} Cherry Blossom Tournament`}
      >
        Register Now
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      </Button>
    </div>
  );
}
