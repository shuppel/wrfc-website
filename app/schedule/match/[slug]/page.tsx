import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllMatches, getMatchBySlug } from '@/lib/contentful';
import { formatDate } from '@/lib/utils';
import { renderRichText } from '@/lib/rich-text';
import { BreadcrumbJsonLd, SportEventJsonLd } from '@/components/JsonLd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Clock, Trophy } from 'lucide-react';

interface MatchPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the match
export async function generateMetadata({ params }: MatchPageProps): Promise<Metadata> {
  const match = await getMatchBySlug(params.slug);
  
  if (!match) {
    return {
      title: 'Match Not Found',
    };
  }

  const { title } = match.fields;

  return {
    title: `${title} | WRFC Match`,
    description: `Match details for ${title}. View venue information, kickoff time, and match report.`,
    openGraph: {
      title: `${title} | Washington Rugby Football Club`,
      description: `Match details for ${title}`,
      type: 'website',
    },
  };
}

// Generate static paths for all matches
export async function generateStaticParams() {
  const matches = await getAllMatches();
  
  return matches.map((match) => ({
    slug: match.fields.slug,
  }));
}

export default async function MatchPage({ params }: MatchPageProps) {
  const match = await getMatchBySlug(params.slug);
  
  if (!match) {
    notFound();
  }

  const { 
    title,
    date,
    homeTeam,
    awayTeam,
    venue,
    wrfcDivisions,
    scoreHome,
    scoreAway,
    status,
    matchReport,
    highlightsUrl,
    matchType
  } = match.fields;

  const isCompleted = status === 'Final';
  const isPending = status === 'Scheduled';
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Schedule', item: '/schedule' },
          { name: 'Matches', item: '/schedule/game' },
          { name: title, item: `/schedule/match/${params.slug}` }
        ]}
      />
      
      <SportEventJsonLd
        name={title}
        startDate={date}
        location={{
          name: venue.fields.name,
          address: venue.fields.address
        }}
        description={`Washington Rugby Football Club ${matchType} match`}
        url={`https://washingtonrugby.org/schedule/match/${params.slug}`}
        competitor1={{ 
          name: homeTeam.fields.name,
          url: homeTeam.fields.isWRFC ? 'https://washingtonrugby.org' : undefined
        }}
        competitor2={{ 
          name: awayTeam.fields.name,
          url: awayTeam.fields.isWRFC ? 'https://washingtonrugby.org' : undefined
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Back to schedule link */}
        <Link 
          href="/schedule/game" 
          className="inline-flex items-center text-wrfc-red hover:text-wrfc-red/80 mb-8"
        >
          <svg className="w-4 h-4 mr-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Back to Schedule
        </Link>

        {/* Match Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge variant={isPending ? "outline" : "default"} text={status} />
              <Badge variant="outline" text={matchType} />
            </div>
            <CardTitle className="text-3xl md:text-4xl">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Score Display */}
            {isCompleted && scoreHome !== undefined && scoreAway !== undefined && (
              <div className="flex items-center justify-center gap-8 py-8 mb-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{homeTeam.fields.name}</p>
                  <p className="text-4xl font-bold">{scoreHome}</p>
                </div>
                <div className="text-2xl text-gray-400">-</div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{awayTeam.fields.name}</p>
                  <p className="text-4xl font-bold">{scoreAway}</p>
                </div>
              </div>
            )}

            {/* Match Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-semibold">Date</p>
                    <p className="text-gray-600 dark:text-gray-400">{formatDate(date)}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-semibold">Kickoff</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {new Date(date).toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-semibold">Divisions</p>
                    <p className="text-gray-600 dark:text-gray-400">{wrfcDivisions.join(', ')}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-semibold">Venue</p>
                    <p className="text-gray-600 dark:text-gray-400">{venue.fields.name}</p>
                    <p className="text-sm text-gray-500">{venue.fields.address}</p>
                    {venue.fields.googleMapsUrl && (
                      <a 
                        href={venue.fields.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-wrfc-red hover:underline"
                      >
                        Get Directions →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights Link */}
            {highlightsUrl && (
              <div className="mt-6 pt-6 border-t">
                <a 
                  href={highlightsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-wrfc-red hover:text-wrfc-red/80"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Watch Highlights
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Match Report */}
        {matchReport && (
          <Card>
            <CardHeader>
              <CardTitle>Match Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {renderRichText(matchReport)}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Parking Info */}
        {venue.fields.parkingInfo && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Parking Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert">
                {renderRichText(venue.fields.parkingInfo)}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}