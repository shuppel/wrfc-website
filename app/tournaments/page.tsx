'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card } from 'components/ui/card';
import { Button } from 'components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import { Calendar, MapPin, Trophy, ChevronRight, ArrowRight, Users } from 'lucide-react';

interface Tournament {
  id: string;
  name: string;
  date: string;
  location: string;
  coverImage: string;
  description: string;
  divisions?: string[];
  status: 'upcoming' | 'past';
  year: number;
}

const tournaments: Tournament[] = [
  {
    id: 'cherry-blossom',
    name: 'Cherry Blossom Tournament',
    date: 'April 12-13, 2025',
    location: 'Liberty Sports Park, MD',
    coverImage: '/assets/pictures/2025_irish_ruck.jpg',
    description: '57th Annual Cherry Blossom Tournament featuring Men&apos;s 15s, Collegiate 7s, and more.',
    divisions: ['Senior Men\'s 15s', 'Collegiate Men\'s 7s', 'High School Boy\'s 15s', 'Old Boy\'s 15s'],
    status: 'upcoming',
    year: 2025
  },
  {
    id: 'cherry-blossom',
    name: 'Cherry Blossom Tournament',
    date: 'April 13-14, 2024',
    location: 'Liberty Sports Park, MD',
    coverImage: '/assets/pictures/2022_d2_champs.png',
    description: '56th Annual Cherry Blossom Tournament - Featuring competitive matches across multiple divisions.',
    status: 'past',
    year: 2024
  },
  {
    id: 'cherry-blossom',
    name: 'Cherry Blossom Tournament',
    date: 'April 15-16, 2023',
    location: 'Liberty Sports Park, MD',
    coverImage: '/assets/pictures/turkscaicosdc2025.png',
    description: '55th Annual Cherry Blossom Tournament - A celebration of rugby excellence.',
    status: 'past',
    year: 2023
  }
];

export default function TournamentsPage() {
  const upcomingTournament = tournaments.find(t => t.status === 'upcoming');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/art/tournament_banner_watercolor.png"
            alt="WRFC Tournaments"
            fill
            className="object-cover brightness-90 dark:brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent dark:from-black/60 dark:via-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-wrfc-navy/40 via-transparent to-wrfc-navy/40 dark:from-wrfc-navy/30 dark:to-wrfc-navy/30" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-nasalization">
            WRFC Tournaments
          </h1>
          <p className="text-xl md:text-2xl font-quantico opacity-90">
            Celebrating rugby excellence in the nation's capital
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="upcoming" className="space-y-12">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto bg-white dark:bg-gray-800 shadow-sm">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="archive">Tournament Archive</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcomingTournament && (
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-wrfc-red via-wrfc-navy to-wrfc-red rounded-[2rem] blur opacity-75" />
                <Link 
                  href={`/tournaments/${upcomingTournament.id}/${upcomingTournament.year}`}
                  className="relative block group"
                >
                  <Card className="overflow-hidden transform transition-all duration-300 group-hover:scale-[0.99] border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="relative h-[400px] md:h-full overflow-hidden">
                        <Image
                          src={upcomingTournament.coverImage}
                          alt={upcomingTournament.name}
                          fill
                          className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                        <div className="absolute top-6 left-6 px-4 py-2 bg-wrfc-red text-white rounded-full font-bold shadow-md">
                          Upcoming Tournament
                        </div>
                      </div>
                      <div className="p-8 flex flex-col">
                        <div className="flex items-center gap-2 text-wrfc-red font-semibold mb-2">
                          <Trophy className="w-5 h-5" />
                          <span>Featured Event</span>
                        </div>
                        <h2 className="text-4xl font-bold mb-4 font-nasalization text-wrfc-navy group-hover:text-wrfc-red transition-colors">
                          {upcomingTournament.name}
                        </h2>
                        <div className="space-y-4 mb-8">
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-400">
                            <Calendar className="w-5 h-5" />
                            <span>{upcomingTournament.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-400">
                            <MapPin className="w-5 h-5" />
                            <span>{upcomingTournament.location}</span>
                          </div>
                          <p className="text-gray-800 dark:text-gray-300 text-lg">
                            {upcomingTournament.description}
                          </p>
                          {upcomingTournament.divisions && (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-400">
                                <Users className="w-5 h-5" />
                                <span className="font-semibold">Divisions</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {upcomingTournament.divisions.map(division => (
                                  <span
                                    key={division}
                                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium shadow-sm"
                                  >
                                    {division}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mt-auto flex items-center gap-2 text-wrfc-red group-hover:text-wrfc-navy transition-colors">
                          <span className="font-semibold">View Tournament Details</span>
                          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="archive">
            <div className="space-y-8">
              {/* Year Groups */}
              {Array.from(new Set(tournaments.filter(t => t.status === 'past').map(t => t.year)))
                .sort((a, b) => b - a)
                .map(year => (
                  <div key={year} className="space-y-6">
                    <h2 className="text-2xl font-bold font-nasalization text-wrfc-navy dark:text-blue-400">
                      {year} Tournaments
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {tournaments
                        .filter(t => t.status === 'past' && t.year === year)
                        .map(tournament => (
                          <Link
                            key={tournament.id}
                            href={`/tournaments/${tournament.id}/${tournament.year}`}
                            className="group"
                          >
                            <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                              <div className="relative h-48">
                                <Image
                                  src={tournament.coverImage}
                                  alt={tournament.name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                  <h3 className="text-xl font-bold">{tournament.name}</h3>
                                  <p className="text-sm opacity-90">{tournament.date}</p>
                                </div>
                              </div>
                              <div className="p-4">
                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-400 text-sm">
                                  <MapPin className="w-4 h-4" />
                                  <span>{tournament.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-wrfc-red dark:text-gray-400 text-sm mt-2 font-medium">
                                  <Trophy className="w-4 h-4" />
                                  <span>View Results & Gallery</span>
                                </div>
                              </div>
                            </Card>
                          </Link>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 