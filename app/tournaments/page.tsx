import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Trophy, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { getStructuredData } from '../utils/seo'
import { BreadcrumbJsonLd } from '../../components/JsonLd'
import JsonLd from '../../components/JsonLd'
import { Button } from '@/components/ui/button';
import RegisterButton from '@/components/RegisterButton';
import { getAllTournaments } from '@/data/tournaments';
import { formatDate } from '@/lib/utils';

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
    date: 'April 11, 2026',
    location: '22006 James Monroe Highway, Aldie, VA 20105',
    coverImage: '/assets/pictures/138A4076.jpg',
    description: '58th Annual Cherry Blossom Tournament - Join us in Aldie, VA for the premier East Coast spring rugby event.',
    divisions: [
      {
        id: 'club-2026',
        name: 'Club 15s',
        description: 'Men\'s & Women\'s Club teams',
        price: 485,
        maxTeams: 12,
        teamsRegistered: 0,
        registrationDeadline: '2026-04-01'
      },
      {
        id: 'college-2026',
        name: 'College 15s',
        description: 'Men\'s & Women\'s College teams',
        price: 450,
        maxTeams: 12,
        teamsRegistered: 0,
        registrationDeadline: '2026-04-01'
      },
      {
        id: 'high-school-2026',
        name: 'High School 15s',
        description: 'Men\'s & Women\'s High School teams',
        price: 485,
        maxTeams: 8,
        teamsRegistered: 0,
        registrationDeadline: '2026-04-01'
      },
      {
        id: 'two-teams-2026',
        name: 'Two Teams Bundle',
        description: 'Register two sides at a discount',
        price: 650,
        maxTeams: 8,
        teamsRegistered: 0,
        registrationDeadline: '2026-04-01'
      }
    ],
    status: 'upcoming',
    year: 2026
  },
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
    status: 'past',
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

export default async function TournamentsPage() {
  // Fetch tournaments from Contentful with error handling
  let contentfulTournaments: Awaited<ReturnType<typeof getAllTournaments>>;
  try {
    contentfulTournaments = await getAllTournaments();
  } catch (error) {
    console.warn('Failed to fetch tournaments from Contentful:', error);
    contentfulTournaments = [];
  }
  // Additional structured data specific to the tournaments page
  const structuredData = getStructuredData('tournaments', {
    '@type': 'Event',
    eventStatus: 'https://schema.org/EventScheduled',
    organizer: {
      '@type': 'SportsOrganization',
      name: 'Washington Rugby Football Club',
      url: 'https://washingtonrugby.org'
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
      url: 'https://washingtonrugby.org/tournaments',
      availability: 'https://schema.org/InStock',
      validFrom: '2024-01-01'
    }
  });

  const displayTournaments = contentfulTournaments.length > 0 
    ? contentfulTournaments.map(t => ({
        id: t.slug,
        name: t.name,
        date: `${formatDate(t.startDate)} - ${formatDate(t.endDate)}`,
        location: t.venue?.name || 'Washington DC Area',
        coverImage: t.logo || '/assets/pictures/2025_irish_ruck.jpg',
        description: t.description,
        divisions: t.divisions || [],
        status: (new Date(t.startDate) > new Date() ? 'upcoming' : 'past') as 'upcoming' | 'past',
        year: t.year
      }))
    : tournaments;

  const upcomingTournament = displayTournaments.find(t => t.status === 'upcoming');

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
          <h1 className="display-large mb-4 drop-shadow-lg">
            WRFC Tournaments
          </h1>
          <p className="text-xl md:text-2xl accent-text opacity-100 drop-shadow-lg">
            Celebrating rugby excellence in the nation&apos;s capital
          </p>
          <p className="text-lg mt-4 drop-shadow-lg">
            For Cherry Blossom Tournament inquiries: <a href="mailto:cbt-chair@washingtonrugby.org" className="underline hover:text-wrfc-red transition-colors">cbt-chair@washingtonrugby.org</a>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="upcoming" className="space-y-12">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto bg-white dark:bg-gray-900 shadow-md">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-wrfc-red data-[state=active]:text-white">Upcoming</TabsTrigger>
            <TabsTrigger value="archive" className="data-[state=active]:bg-wrfc-red data-[state=active]:text-white">Tournament Archive</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcomingTournament && (
              <div className="space-y-12">
                {/* Featured Tournament */}
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-wrfc-red via-wrfc-navy to-wrfc-red rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition-opacity" />
                  <Card className="relative p-8 group-hover:shadow-xl transition-shadow bg-white dark:bg-gray-900">
                    <div className="grid md:grid-cols-2 gap-8">
                      <Link href={`/tournaments/${upcomingTournament.id}`} className="relative h-[400px] md:h-full overflow-hidden rounded-xl">
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
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <div className="flex items-center gap-2 text-wrfc-red font-semibold">
                            <Trophy className="w-5 h-5" />
                            <span>{upcomingTournament.year === 2026 ? '58th' : '57th'} Annual Tournament</span>
                          </div>
                          {upcomingTournament.year === 2026 && (
                            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-pink-500 to-wrfc-red text-white text-xs font-bold px-3 py-1 rounded-full">
                              🌸 Now in Aldie, VA!
                            </span>
                          )}
                        </div>
                        <Link href={`/tournaments/${upcomingTournament.id}`}>
                          <h2 className="text-4xl font-bold mb-4 display-large text-wrfc-navy dark:text-white group-hover:text-wrfc-red transition-colors">
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
                          <Link href={upcomingTournament.year === 2026 ? '/tournaments/cherry-blossom/2026' : `/tournaments/${upcomingTournament.id}`}>
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
                  <h2 className="section-title mb-8">
                    Past Tournaments
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayTournaments
                      .filter(t => t.status === 'past')
                      .slice(0, 3)
                      .map(tournament => (
                        <Link
                          key={tournament.id}
                          href={`/tournaments/${tournament.id}`}
                          className="group"
                        >
                          <Card className="overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-gray-900">
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
              {Array.from(new Set(displayTournaments.filter(t => t.status === 'past').map(t => t.year)))
                .sort((a, b) => b - a)
                .map(year => (
                  <div key={year} className="space-y-6">
                    <h2 className="text-2xl font-bold display-large text-wrfc-navy dark:text-white">
                      {year} Tournaments
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {displayTournaments
                        .filter(t => t.status === 'past' && t.year === year)
                        .map(tournament => (
                          <Link
                            key={tournament.id}
                            href={`/tournaments/${tournament.id}`}
                            className="group"
                          >
                            <Card className="overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-gray-900">
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