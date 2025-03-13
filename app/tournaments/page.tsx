'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Trophy, ArrowRight } from 'lucide-react';
import { getStructuredData } from '../utils/seo'
import { BreadcrumbJsonLd } from '../../components/JsonLd'
import JsonLd from '../../components/JsonLd'
import { Button } from '@/components/ui/button';
import RegisterButton from '@/components/RegisterButton';

interface Tournament {
  id: string;
  name: string;
  date: string;
  location: string;
  coverImage: string;
  description: string;
  divisions: {
    id: string;
    name: string;
    description: string;
    price: number;
    maxTeams: number;
    teamsRegistered: number;
    registrationDeadline: string;
  }[];
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
    description: '57th Annual Cherry Blossom Tournament - A premier rugby event featuring multiple divisions for both men and women.',
    divisions: [
      {
        id: 'mens-d1',
        name: 'Men\'s Division 1',
        description: 'Premier men\'s division for top-level club teams',
        price: 750,
        maxTeams: 8,
        teamsRegistered: 3,
        registrationDeadline: '2025-03-15'
      },
      {
        id: 'mens-d2',
        name: 'Men\'s Division 2',
        description: 'Competitive men\'s division for developing clubs',
        price: 650,
        maxTeams: 8,
        teamsRegistered: 2,
        registrationDeadline: '2025-03-15'
      },
      {
        id: 'womens-premier',
        name: 'Women\'s Premier',
        description: 'Premier women\'s division for top-level club teams',
        price: 750,
        maxTeams: 8,
        teamsRegistered: 1,
        registrationDeadline: '2025-03-15'
      },
      {
        id: 'womens-club',
        name: 'Women\'s Club',
        description: 'Club-level women\'s division',
        price: 650,
        maxTeams: 8,
        teamsRegistered: 0,
        registrationDeadline: '2025-03-15'
      },
      {
        id: 'womens-old-girls',
        name: 'Women\'s Old Girls',
        description: 'Veterans division for women over 35',
        price: 550,
        maxTeams: 6,
        teamsRegistered: 0,
        registrationDeadline: '2025-03-15'
      },
      {
        id: 'mens-old-boys',
        name: 'Men\'s Old Boys',
        description: 'Veterans division for men over 35',
        price: 550,
        maxTeams: 6,
        teamsRegistered: 2,
        registrationDeadline: '2025-03-15'
      }
    ],
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
    divisions: [
      {
        id: 'mens-d1-2024',
        name: 'Men\'s Division 1',
        description: 'Premier men\'s division',
        price: 750,
        maxTeams: 8,
        teamsRegistered: 8,
        registrationDeadline: '2024-03-15'
      },
      {
        id: 'mens-d2-2024',
        name: 'Men\'s Division 2',
        description: 'Competitive men\'s division',
        price: 650,
        maxTeams: 8,
        teamsRegistered: 8,
        registrationDeadline: '2024-03-15'
      }
    ],
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
    divisions: [
      {
        id: 'mens-d1-2023',
        name: 'Men\'s Division 1',
        description: 'Premier men\'s division',
        price: 700,
        maxTeams: 8,
        teamsRegistered: 8,
        registrationDeadline: '2023-03-15'
      },
      {
        id: 'mens-d2-2023',
        name: 'Men\'s Division 2',
        description: 'Competitive men\'s division',
        price: 600,
        maxTeams: 8,
        teamsRegistered: 8,
        registrationDeadline: '2023-03-15'
      }
    ],
    status: 'past',
    year: 2023
  }
];

export default function TournamentsPage() {
  // Additional structured data specific to the tournaments page
  const structuredData = getStructuredData('tournaments', {
    '@type': 'Event',
    eventStatus: 'https://schema.org/EventScheduled',
    organizer: {
      '@type': 'SportsOrganization',
      name: 'Washington Rugby Football Club',
      url: 'https://wrfc.org'
    },
    location: {
      '@type': 'Place',
      name: 'Washington DC Area Rugby Fields',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Washington',
        addressRegion: 'DC',
        addressCountry: 'US'
      }
    },
    offers: {
      '@type': 'Offer',
      url: 'https://wrfc.org/tournaments',
      availability: 'https://schema.org/InStock',
      validFrom: '2024-01-01'
    }
  });

  const upcomingTournament = tournaments.find(t => t.status === 'upcoming');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Tournaments', item: '/tournaments' }
        ]} 
      />
      <JsonLd type="Event" data={structuredData} />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/art/tournament_banner_watercolor.png"
            alt="WRFC Tournaments"
            fill
            className="object-cover brightness-75 dark:brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-nasalization drop-shadow-lg">
            WRFC Tournaments
          </h1>
          <p className="text-xl md:text-2xl font-quantico opacity-100 drop-shadow-lg">
            Celebrating rugby excellence in the nation&apos;s capital
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="upcoming" className="space-y-12">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto bg-white dark:bg-gray-800 shadow-md">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-wrfc-red data-[state=active]:text-white">Upcoming</TabsTrigger>
            <TabsTrigger value="archive" className="data-[state=active]:bg-wrfc-red data-[state=active]:text-white">Tournament Archive</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcomingTournament && (
              <div className="space-y-12">
                {/* Featured Tournament */}
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-wrfc-red via-wrfc-navy to-wrfc-red rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition-opacity" />
                  <Card className="relative p-8 group-hover:shadow-xl transition-shadow bg-white dark:bg-gray-800">
                    <div className="grid md:grid-cols-2 gap-8">
                      <Link href={`/tournaments/${upcomingTournament.id}/${upcomingTournament.year}`} className="relative h-[400px] md:h-full overflow-hidden rounded-xl">
                        <Image
                          src={upcomingTournament.coverImage}
                          alt={upcomingTournament.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
                        <div className="absolute top-6 left-6 px-4 py-2 bg-wrfc-red text-white rounded-full font-bold shadow-lg">
                          Featured Event
                        </div>
                      </Link>
                      <div>
                        <div className="flex items-center gap-2 text-wrfc-red font-semibold mb-2">
                          <Trophy className="w-5 h-5" />
                          <span>57th Annual Tournament</span>
                        </div>
                        <Link href={`/tournaments/${upcomingTournament.id}/${upcomingTournament.year}`}>
                          <h2 className="text-4xl font-bold mb-4 font-nasalization text-wrfc-navy dark:text-white group-hover:text-wrfc-red transition-colors">
                            {upcomingTournament.name}
                          </h2>
                        </Link>
                        <div className="space-y-4 mb-8">
                          <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                            <Calendar className="w-5 h-5" />
                            <span>{upcomingTournament.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                            <MapPin className="w-5 h-5" />
                            <span>{upcomingTournament.location}</span>
                          </div>
                          <p className="text-gray-800 dark:text-gray-200 text-lg">
                            {upcomingTournament.description}
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link href={`/tournaments/${upcomingTournament.id}/${upcomingTournament.year}`}>
                            <Button className="bg-wrfc-navy hover:bg-wrfc-navy/90 text-white transition-colors">
                              View Tournament Details
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                          </Link>
                          <RegisterButton />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Past Tournaments Preview */}
                <div className="mt-16">
                  <h2 className="text-2xl font-bold mb-8 font-nasalization text-wrfc-navy dark:text-white">
                    Past Tournaments
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tournaments
                      .filter(t => t.status === 'past')
                      .slice(0, 3)
                      .map(tournament => (
                        <Link
                          key={tournament.id}
                          href={`/tournaments/${tournament.id}/${tournament.year}`}
                          className="group"
                        >
                          <Card className="overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-gray-800">
                            <div className="relative h-48">
                              <Image
                                src={tournament.coverImage}
                                alt={tournament.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/40" />
                              <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-xl font-bold drop-shadow-lg">{tournament.name}</h3>
                                <p className="text-sm opacity-100 drop-shadow-lg">{tournament.date}</p>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="archive">
            <div className="space-y-8">
              {Array.from(new Set(tournaments.filter(t => t.status === 'past').map(t => t.year)))
                .sort((a, b) => b - a)
                .map(year => (
                  <div key={year} className="space-y-6">
                    <h2 className="text-2xl font-bold font-nasalization text-wrfc-navy dark:text-white">
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
                            <Card className="overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-gray-800">
                              <div className="relative h-48">
                                <Image
                                  src={tournament.coverImage}
                                  alt={tournament.name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/40" />
                                <div className="absolute bottom-4 left-4 text-white">
                                  <h3 className="text-xl font-bold drop-shadow-lg">{tournament.name}</h3>
                                  <p className="text-sm opacity-100 drop-shadow-lg">{tournament.date}</p>
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