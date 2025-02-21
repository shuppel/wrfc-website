'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trophy, Heart, Building, Info, MapPin, Tag, Shirt, Shield, Star } from 'lucide-react';
import { useState } from 'react';

interface Sponsor {
  name: string;
  logo: string;
  type: 'premier' | 'club' | 'supporting';
  description: string;
  website?: string;
  address?: string;
  contribution?: string;
  discount?: string;
  since?: string;
  badge?: 'gold' | 'silver' | 'bronze';
}

const SPONSORS: Sponsor[] = [
  {
    name: "Example Premier Sponsor",
    logo: "/logos/placeholder-logo.png",
    type: "premier",
    description: "Premier sponsor supporting WRFC's mission",
    website: "https://example.com",
    address: "123 Rugby St, Washington, DC 20001",
    contribution: "Premier Level Support",
    since: "2023",
    badge: "gold"
  },
  {
    name: "Carlsberg",
    logo: "/assets/sponsors/carlsberg-logo.png",
    type: "premier",
    description: "A premier global brewery known for its quality beer and long-standing support of sports and community events.",
    website: "https://www.carlsberg.com",
    contribution: "Premier Level Support",
    since: "2024",
    badge: "gold"
  },
  {
    name: "Matet's Kitchen",
    logo: "/assets/sponsors/matets-kitchen-logo.jpg",
    type: "premier",
    description: "A beloved local restaurant bringing delicious cuisine to the DC community while supporting local sports.",
    website: "https://www.matets-kitchen.com",
    contribution: "Premier Level Support",
    since: "2024",
    badge: "gold"
  },
  {
    name: "The Queen Vic",
    logo: "/assets/sponsors/queen-vic-logo.png",
    type: "premier",
    description: "An authentic British pub in the heart of DC, bringing rugby culture and community together.",
    website: "https://www.thequeenvicdc.com",
    contribution: "Premier Level Support",
    since: "2024",
    badge: "gold"
  },
  {
    name: "Nodetus Integrators LLC",
    logo: "/assets/sponsors/nodetus_logo.png",
    type: "club",
    description: "Your friendly AI Integrators, powering digital transformation and innovation in sports technology.",
    website: "https://nodetus.com",
    contribution: "Technology Partner",
    since: "2024",
    badge: "silver"
  },
  // Add more sponsors here...
];

const BADGE_COLORS = {
  gold: 'bg-yellow-500',
  silver: 'bg-gray-400',
  bronze: 'bg-amber-700'
};

export default function Sponsors() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const sponsorsByType = {
    premier: SPONSORS.filter(s => s.type === 'premier'),
    club: SPONSORS.filter(s => s.type === 'club'),
    supporting: SPONSORS.filter(s => s.type === 'supporting')
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
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="hero-title mb-6">Our Sponsors</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We&apos;re proud to partner with organizations that share our passion for rugby and community. 
          Our sponsors help make it possible for WRFC to continue its legacy of excellence.
        </p>
      </div>

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

      {/* Become a Sponsor Section */}
      <div className="bg-gradient-to-r from-wrfc-navy to-wrfc-navy/90 text-white rounded-xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Become a Sponsor</h2>
          <p className="text-xl mb-8">
            Join us in supporting one of DC&apos;s oldest and most successful rugby clubs. 
            Partner with WRFC and connect with our passionate community.
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-wrfc-red px-8 py-3 rounded-md font-bold hover:bg-wrfc-red/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Contact Us About Sponsorship
          </Link>
        </div>
      </div>
    </div>
  );
} 