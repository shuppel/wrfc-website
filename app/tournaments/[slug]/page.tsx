import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllTournaments, getTournamentBySlug } from '@/data/tournaments';
import { formatDate } from '@/lib/utils';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import JsonLd from '@/components/JsonLd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowSquareOut } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';

interface TournamentPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: TournamentPageProps): Promise<Metadata> {
  const tournament = getTournamentBySlug(params.slug);
  
  if (!tournament) {
    return {
      title: 'Tournament Not Found',
    };
  }

  const { name, year } = tournament;

  return {
    title: `${name} ${year} | WRFC Tournaments`,
    description: `${name} ${year} - Premier rugby tournament hosted by Washington Rugby Football Club. Registration, schedule, and tournament information.`,
    openGraph: {
      title: `${name} ${year} | Washington Rugby Football Club`,
      description: `Join us for the ${name} ${year} rugby tournament`,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const tournaments = getAllTournaments();
  
  return tournaments.map((tournament) => ({
    slug: tournament.slug,
  }));
}

export default function TournamentPage({ params }: TournamentPageProps) {
  const tournament = getTournamentBySlug(params.slug);
  
  if (!tournament) {
    notFound();
  }

  const { 
    name,
    year,
    startDate,
    endDate,
    description,
    registrationLink,
    logo,
    venue,
    divisions
  } = tournament;

  const isUpcoming = new Date(startDate) > new Date();
  const isPast = new Date(endDate) < new Date();
  const isOngoing = !isUpcoming && !isPast;
  
  return (
    <div className="container mx-auto px-4 py-12">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Tournaments', item: '/tournaments' },
          { name: `${name} ${year}`, item: `/tournaments/${params.slug}` }
        ]}
      />
      
      <JsonLd 
        type="Event" 
        data={{
          '@type': 'SportsEvent',
          name: `${name} ${year}`,
          startDate: startDate,
          endDate: endDate,
          location: venue ? {
            '@type': 'Place',
            name: venue.name,
            address: {
              '@type': 'PostalAddress',
              streetAddress: venue.address
            }
          } : undefined,
          description: description,
          url: `https://washingtonrugby.org/tournaments/${params.slug}`,
          organizer: {
            '@type': 'SportsOrganization',
            name: 'Washington Rugby Football Club',
            url: 'https://washingtonrugby.org'
          }
        }} 
      />

      <div className="max-w-4xl mx-auto">
        <Link 
          href="/tournaments" 
          className="inline-flex items-center text-wrfc-red hover:text-wrfc-red/80 mb-8"
        >
          <svg className="w-4 h-4 mr-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Back to Tournaments
        </Link>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <Badge variant="outline" text={year.toString()} />
              </div>
              {isOngoing && <Badge variant="default" text="Happening Now" />}
              {isPast && <Badge variant="outline" text="Past Tournament" />}
              {isUpcoming && <Badge variant="default" text="Upcoming" />}
            </div>
            <div className="flex items-center gap-4">
              {logo && (
                <Image src={logo} alt={name} width={80} height={80} className="rounded-lg" />
              )}
              <CardTitle className="text-3xl md:text-4xl">{name} {year}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-semibold">Dates</p>
                  <p className="text-gray-600 dark:text-gray-100">
                    {formatDate(startDate)} - {formatDate(endDate)}
                  </p>
                </div>
              </div>
            </div>

            {registrationLink && isUpcoming && (
              <div className="pt-6 border-t">
                <a 
                  href={registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button size="lg" className="bg-wrfc-red hover:bg-red-700">
                    <ArrowSquareOut className="w-4 h-4 mr-2" />
                    Register Now
                  </Button>
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About the Tournament</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </CardContent>
        </Card>

        {divisions && divisions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Divisions & Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {divisions.map((division, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div>
                      <h4 className="font-semibold">{division.name}</h4>
                    </div>
                    <div className="text-xl font-bold">${division.price}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
