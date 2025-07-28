import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllTournaments, getTournamentBySlug } from '@/lib/contentful';
import { formatDate } from '@/lib/utils';
import { renderRichText } from '@/lib/rich-text';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import JsonLd from '@/components/JsonLd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TournamentPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the tournament
export async function generateMetadata({ params }: TournamentPageProps): Promise<Metadata> {
  const tournament = await getTournamentBySlug(params.slug);
  
  if (!tournament) {
    return {
      title: 'Tournament Not Found',
    };
  }

  const { name, year } = tournament.fields;

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

// Generate static paths for all tournaments
export async function generateStaticParams() {
  const tournaments = await getAllTournaments();
  
  return tournaments.map((tournament) => ({
    slug: tournament.fields.slug,
  }));
}

export default async function TournamentPage({ params }: TournamentPageProps) {
  const tournament = await getTournamentBySlug(params.slug);
  
  if (!tournament) {
    notFound();
  }

  const { 
    name,
    year,
    startDate,
    endDate,
    description,
    heroImage,
    registrationLink,
    schedule,
    active
  } = tournament.fields;

  const isUpcoming = new Date(startDate) > new Date();
  const isPast = new Date(endDate) < new Date();
  const isOngoing = !isUpcoming && !isPast;
  
  return (
    <div className="flex flex-col items-center w-full">
      {/* Structured Data */}
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
          '@type': 'Event',
          name: `${name} ${year}`,
          startDate: startDate,
          endDate: endDate,
          description: `${name} ${year} rugby tournament hosted by Washington Rugby Football Club`,
          url: `https://washingtonrugby.org/tournaments/${params.slug}`,
          location: {
            '@type': 'Place',
            name: 'Washington Rugby Football Club',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Washington',
              addressRegion: 'DC'
            }
          },
          organizer: {
            '@type': 'Organization',
            name: 'Washington Rugby Football Club',
            url: 'https://washingtonrugby.org'
          }
        }} 
      />

      {/* Hero Section with Image */}
      {heroImage && (
        <section className="w-full relative h-[400px] md:h-[500px]">
          <Image
            src={`https:${heroImage.fields.file.url}`}
            alt={`${name} ${year}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <Badge 
                  variant={active ? "default" : "outline"} 
                  text={active ? "Active" : "Past Tournament"}
                  className={active ? "bg-green-600" : ""}
                />
                {isOngoing && <Badge variant="default" text="In Progress" />}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-2">{name}</h1>
              <p className="text-2xl md:text-3xl">{year}</p>
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back to tournaments link */}
          <Link 
            href="/tournaments" 
            className="inline-flex items-center text-wrfc-red hover:text-wrfc-red/80 mb-8"
          >
            <svg className="w-4 h-4 mr-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Back to Tournaments
          </Link>

          {/* Tournament Info Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-wrfc-red" />
                Tournament Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-semibold">Dates</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {formatDate(startDate)} - {formatDate(endDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-semibold">Status</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {isUpcoming && "Upcoming Tournament"}
                      {isOngoing && "Tournament in Progress"}
                      {isPast && "Tournament Complete"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Registration Button */}
              {registrationLink && active && isUpcoming && (
                <div className="pt-6 border-t">
                  <a 
                    href={registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button size="lg" className="bg-wrfc-red hover:bg-red-700">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Register Your Team
                    </Button>
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tournament Description */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>About the Tournament</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {renderRichText(description)}
              </div>
            </CardContent>
          </Card>

          {/* Tournament Schedule */}
          {schedule && (
            <Card>
              <CardHeader>
                <CardTitle>Tournament Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {renderRichText(schedule)}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Call to Action */}
          {active && (
            <div className="mt-12 text-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">
                {isUpcoming ? "Don't Miss Out!" : "Stay Updated"}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                {isUpcoming 
                  ? `The ${name} ${year} is one of the premier rugby tournaments in the DC area. Register your team today!`
                  : `Follow WRFC for updates on the ${name} and other upcoming tournaments.`
                }
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {registrationLink && isUpcoming && (
                  <a 
                    href={registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="bg-wrfc-red hover:bg-red-700">
                      Register Now
                    </Button>
                  </a>
                )}
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}