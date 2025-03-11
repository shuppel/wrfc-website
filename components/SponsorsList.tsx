'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Trophy, Heart, Building, Info, MapPin, Tag, Shield } from 'lucide-react';
import { Sponsor } from '../app/sponsors/page';

const BADGE_COLORS = {
  gold: 'bg-yellow-500',
  silver: 'bg-gray-400',
  bronze: 'bg-amber-700'
};

interface SponsorsListProps {
  sponsors: Sponsor[];
}

export default function SponsorsList({ sponsors }: SponsorsListProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const sponsorsByType = {
    premier: sponsors.filter(s => s.type === 'premier'),
    club: sponsors.filter(s => s.type === 'club'),
    supporting: sponsors.filter(s => s.type === 'supporting')
  };

  const SponsorCard = ({ sponsor }: { sponsor: Sponsor }) => (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      {/* Badge */}
      {sponsor.badge && (
        <div className={`absolute -top-3 -right-3 ${BADGE_COLORS[sponsor.badge]} text-white rounded-full p-2 shadow-lg`}>
          <Shield className="w-4 h-4" />
        </div>
      )}

      {/* Info Button */}
      <button
        onClick={() => setActiveTooltip(activeTooltip === sponsor.name ? null : sponsor.name)}
        className="absolute top-2 right-2 p-2 text-gray-500 hover:text-wrfc-navy dark:text-gray-400 dark:hover:text-white transition-colors"
        aria-label="Show sponsor information"
      >
        <Info className="w-5 h-5" />
      </button>

      {/* Sponsor Logo */}
      <div className="relative w-full aspect-video mb-4">
        <Image
          src={sponsor.logo}
          alt={sponsor.name}
          fill
          className="object-contain"
        />
      </div>

      {/* Sponsor Name */}
      <h3 className="text-xl font-bold mb-2">{sponsor.name}</h3>

      {/* Since Year */}
      {sponsor.since && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Partner since {sponsor.since}
        </p>
      )}

      {/* Info Tooltip */}
      {activeTooltip === sponsor.name && (
        <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-10">
          <p className="text-sm mb-3">{sponsor.description}</p>
          
          {sponsor.contribution && (
            <div className="flex items-center gap-2 text-sm mb-2">
              <Trophy className="w-4 h-4 text-wrfc-red" />
              <span>{sponsor.contribution}</span>
            </div>
          )}
          
          {sponsor.discount && (
            <div className="flex items-center gap-2 text-sm mb-2">
              <Tag className="w-4 h-4 text-wrfc-teal" />
              <span>{sponsor.discount}</span>
            </div>
          )}
          
          {sponsor.address && (
            <div className="flex items-center gap-2 text-sm mb-2">
              <MapPin className="w-4 h-4 text-wrfc-navy" />
              <span>{sponsor.address}</span>
            </div>
          )}
          
          {sponsor.website && (
            <a 
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-wrfc-red hover:text-wrfc-red/80 text-sm font-medium mt-2 inline-block"
            >
              Visit Website →
            </a>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Premier Sponsors */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="w-8 h-8 text-wrfc-red" />
          <h2 className="text-3xl font-bold">Premier Sponsors</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sponsorsByType.premier.map((sponsor, index) => (
            <SponsorCard key={index} sponsor={sponsor} />
          ))}
        </div>
      </section>

      {/* Club Sponsors */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <Building className="w-8 h-8 text-wrfc-navy" />
          <h2 className="text-3xl font-bold">Club Sponsors</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sponsorsByType.club.map((sponsor, index) => (
            <SponsorCard key={index} sponsor={sponsor} />
          ))}
        </div>
      </section>

      {/* Supporting Partners */}
      {sponsorsByType.supporting.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-8 h-8 text-wrfc-teal" />
            <h2 className="text-3xl font-bold">Supporting Partners</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsorsByType.supporting.map((sponsor, index) => (
              <SponsorCard key={index} sponsor={sponsor} />
            ))}
          </div>
        </section>
      )}
    </>
  );
} 