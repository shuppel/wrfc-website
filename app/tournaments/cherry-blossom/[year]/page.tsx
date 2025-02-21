'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'components/ui/button';
import { Card } from 'components/ui/card';
import { Calendar, MapPin, Camera, Trophy, Users, ArrowLeft } from 'lucide-react';

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
  }[];
  coverImage: string;
  galleryImages: string[];
  results?: {
    division: string;
    champion: string;
    runnerUp: string;
  }[];
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
    { name: 'Senior Men\'s 15s', description: 'Premier division for club teams' },
    { name: 'Collegiate Men\'s 7s', description: 'CRC Qualifier' },
    { name: 'High School Boy\'s 15s', description: 'Youth competition' },
    { name: 'Old Boy\'s 15s', description: 'Veterans division' }
  ],
  coverImage: '/assets/pictures/2025_irish_ruck.jpg',
  galleryImages: [
    '/assets/pictures/2025_irish_ruck.jpg',
    '/assets/pictures/huddle_2025_irish.jpg',
    '/assets/pictures/2025_irish_harry.jpg'
  ],
  results: [] // Will be populated after the tournament
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
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-nasalization">
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
        </div>
      </section>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/tournaments" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-wrfc-navy dark:hover:text-blue-400">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Tournaments
            </Link>
            <div className="flex items-center space-x-6">
              <Link 
                href={`/tournaments/cherry-blossom/${params.year}`}
                className="text-gray-600 dark:text-gray-400 hover:text-wrfc-navy dark:hover:text-blue-400"
              >
                Overview
              </Link>
              <Link 
                href={`/tournaments/cherry-blossom/${params.year}/photos`}
                className="text-gray-600 dark:text-gray-400 hover:text-wrfc-navy dark:hover:text-blue-400"
              >
                Photos
              </Link>
              <Link 
                href={`/tournaments/cherry-blossom/${params.year}/bracket`}
                className="text-gray-600 dark:text-gray-400 hover:text-wrfc-navy dark:hover:text-blue-400"
              >
                Bracket & Results
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8">
            <h2 className="text-3xl font-bold mb-6 font-nasalization text-wrfc-navy dark:text-blue-400">
              Tournament Details
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-wrfc-red shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Location</h3>
                  <p>{tournamentDetails.location.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tournamentDetails.location.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-wrfc-red shrink-0" />
                <div>
                  <h3 className="font-bold mb-2">Divisions</h3>
                  <div className="space-y-2">
                    {tournamentDetails.divisions.map((division) => (
                      <div key={division.name} className="flex items-center">
                        <span className="w-2 h-2 bg-wrfc-red rounded-full mr-2" />
                        <span>{division.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-3xl font-bold mb-6 font-nasalization text-wrfc-navy dark:text-blue-400">
              Quick Links
            </h2>
            <div className="space-y-4">
              <Link href={`/tournaments/cherry-blossom/${params.year}/photos`}>
                <Button variant="outline" className="w-full justify-start">
                  <Camera className="w-5 h-5 mr-2" />
                  View Photo Gallery
                </Button>
              </Link>
              <Link href={`/tournaments/cherry-blossom/${params.year}/bracket`}>
                <Button variant="outline" className="w-full justify-start">
                  <Trophy className="w-5 h-5 mr-2" />
                  Tournament Bracket & Results
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Preview Gallery */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold font-nasalization text-wrfc-navy dark:text-blue-400">
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