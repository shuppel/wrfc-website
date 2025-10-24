'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin, Camera, Trophy, Users, ArrowLeft } from '@phosphor-icons/react';
import TournamentRegistration from '@/components/feature/tournament/TournamentRegistration';
import TournamentRegisterButton from '@/components/feature/tournament/TournamentRegisterButton';

interface TournamentDetails {
  year: number;
  date: string;
  location: {
    name: string;
    address: string;
  };
  divisions: {
    name: string;
    description?: string;
    fee: number;
  }[];
  coverImage: string;
  galleryImages: string[];
  previousYear?: {
    featuredTeams: string[];
    totalTeams: number;
    results: {
      division: string;
      champion: string;
      runnerUp: string;
    }[];
  };
}

// This would eventually come from a database or CMS
const tournamentDetails: TournamentDetails = {
  year: 2025,
  date: 'April 12-13, 2025',
  location: {
    name: 'Liberty Sports Park',
    address: '220 Prince George\'s Boulevard Upper Marlboro, MD 20774'
  },
  divisions: [
    { name: 'Senior Men\'s 15s', description: 'Premier division for club teams', fee: 400 },
    { name: 'Collegiate Men\'s 7s', description: 'CRC Qualifier', fee: 400 },
    { name: 'Collegiate Women\'s 7s', description: 'CRC Qualifier', fee: 400 },
    { name: 'High School Boy\'s 15s', description: 'Youth competition', fee: 350 },
    { name: 'High School Girl\'s 15s', description: 'Youth women\'s competition', fee: 350 },
    { name: 'Senior Women\'s 15s', description: 'Premier women\'s division for club teams', fee: 400 },
    { name: 'Old Boy\'s 15s', description: 'Veterans division', fee: 350 }
  ],
  coverImage: '/assets/pictures/2025_irish_ruck.jpg',
  galleryImages: [
    '/assets/pictures/2025_irish_ruck.jpg',
    '/assets/pictures/huddle_2025_irish.jpg',
    '/assets/pictures/2025_irish_harry.jpg'
  ],
  previousYear: {
    featuredTeams: [
      'Washington Irish',
      'New York Reds',
      'White Plains',
      'Mount Saint Marys',
      'Old Breed',
      'Washington Old Boys',
      'NoVA',
      'Kutztown',
      'Marysville',
      'Cincinnati RFC'
    ],
    totalTeams: 31,
    results: [
      { division: 'Senior Men\'s 15s', champion: 'White Plains', runnerUp: 'New York Reds' },
      { division: 'Collegiate Men\'s 7s', champion: 'Kutztown', runnerUp: 'St. Bonnaventure' }
    ]
  }
};

export default function CherryBlossomYearPage({ params }: { params: { year: string } }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={tournamentDetails.coverImage}
            alt={`Cherry Blossom Tournament ${params.year}`}
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 ">
            Cherry Blossom Tournament
          </h1>
          <p className="text-xl md:text-3xl mb-6 font-quantico">
            {params.year} Edition
          </p>
          <div className="flex items-center justify-center gap-8 mb-8 text-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{tournamentDetails.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{tournamentDetails.location.name}</span>
            </div>
          </div>
          <TournamentRegisterButton year={params.year} />
        </div>
      </section>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/tournaments" className="flex items-center text-gray-600 dark:text-gray-100 hover:text-wrfc-navy dark:hover:text-blue-400">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Tournaments
            </Link>
            <div className="flex items-center space-x-6">
              <Link 
                href={`/tournaments/cherry-blossom/${params.year}`}
                className="text-gray-600 dark:text-gray-100 hover:text-wrfc-navy dark:hover:text-blue-400"
              >
                Overview
              </Link>
              <Link 
                href={`/tournaments/cherry-blossom/${params.year}/photos`}
                className="text-gray-600 dark:text-gray-100 hover:text-wrfc-navy dark:hover:text-blue-400"
              >
                Photos
              </Link>
              <Link 
                href="#past-results"
                className="text-gray-600 dark:text-gray-100 hover:text-wrfc-navy dark:hover:text-blue-400"
              >
                Last CBT Results
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tournament Details Card */}
          <Card className="p-8">
            <h2 className="text-3xl font-bold mb-6  text-wrfc-navy dark:text-blue-400">
              Tournament Details
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-wrfc-red shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Location</h3>
                  <p>{tournamentDetails.location.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-100">
                    {tournamentDetails.location.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-wrfc-red shrink-0" />
                <div>
                  <h3 className="font-bold mb-2">Divisions & Entry Fees</h3>
                  <div className="space-y-3">
                    {tournamentDetails.divisions.map((division) => (
                      <div key={division.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-wrfc-red rounded-full mr-2" />
                          <span>{division.name}</span>
                        </div>
                        <span className="font-semibold">${division.fee}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <TournamentRegistration divisions={tournamentDetails.divisions} />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Past Results Card */}
          <Card className="p-8">
            <h2 className="text-3xl font-bold mb-6  text-wrfc-navy dark:text-blue-400">
              Last CBT Results
            </h2>
            <div className="space-y-6">
              {tournamentDetails.previousYear?.results.map((result) => (
                <div key={result.division} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="font-bold mb-2">{result.division}</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-wrfc-red" />
                      <span className="font-semibold">Champion:</span>
                      <span>{result.champion}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4" /> {/* Spacer */}
                      <span className="font-semibold">Runner-up:</span>
                      <span>{result.runnerUp}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div>
                <h3 className="font-bold mb-3">Last Year&apos;s Teams</h3>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {tournamentDetails.previousYear?.featuredTeams.map((team) => (
                      <span 
                        key={team} 
                        className="inline-flex items-center bg-gray-100 dark:bg-gray-900 rounded-full px-3 py-1 text-sm"
                      >
                        {team}
                      </span>
                    ))}
                  </div>
                  {tournamentDetails.previousYear && (
                    <p className="text-sm text-gray-600 dark:text-gray-100 mt-2">
                      + {tournamentDetails.previousYear.totalTeams - tournamentDetails.previousYear.featuredTeams.length} other teams
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Photo Highlights */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold  text-wrfc-navy dark:text-blue-400">
              Photo Highlights
            </h2>
            <Link href={`/tournaments/cherry-blossom/${params.year}/photos`}>
              <Button variant="outline">
                View All Photos
                <Camera className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tournamentDetails.galleryImages.map((image, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`Tournament Photo ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 