import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllMatches, getMatchBySlug } from '@/data/matches';
import { formatDate } from '@/lib/utils';
import { BreadcrumbJsonLd, SportEventJsonLd } from '@/components/JsonLd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Clock } from '@phosphor-icons/react/dist/ssr';

interface MatchPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: MatchPageProps): Promise<Metadata> {
  const match = getMatchBySlug(params.slug);
  
  if (!match) {
    return {
      title: 'Match Not Found',
    };
  }

  const { title } = match;

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

export async function generateStaticParams() {
  const matches = getAllMatches();
  
  return matches.map((match) => ({
    slug: match.slug,
  }));
}

export default function MatchPage({ params }: MatchPageProps) {
  const match = getMatchBySlug(params.slug);
  
  if (!match) {
    notFound();
  }

  const { 
    title,
    date,
    homeTeam,
    awayTeam,
    venue,
    kickoffTime,
    division,
    result,
    matchReport
  } = match;

  const isCompleted = !!result;
  
  return (
    <div className="container mx-auto px-4 py-12">
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
          name: venue.name,
          address: venue.address
        }}
        description={`Washington Rugby Football Club ${division} match`}
        url={`https://washingtonrugby.org/schedule/match/${params.slug}`}
        competitor1={{
          name: homeTeam
        }}
        competitor2={{
          name: awayTeam
        }}
      />

      <div className="max-w-4xl mx-auto">
        <Link 
          href="/schedule/game" 
          className="inline-flex items-center text-wrfc-red hover:text-wrfc-red/80 mb-8"
        >
          <svg className="w-4 h-4 mr-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Back to Matches
        </Link>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" text={division} />
              {isCompleted && <Badge variant="default" text="Final" />}
              {!isCompleted && <Badge variant="outline" text="Scheduled" />}
            </div>
            <CardTitle className="text-3xl md:text-4xl">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">{homeTeam}</h3>
                {isCompleted && result && (
                  <div className="text-5xl font-bold text-wrfc-red">{result.homeScore}</div>
                )}
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">{awayTeam}</h3>
                {isCompleted && result && (
                  <div className="text-5xl font-bold">{result.awayScore}</div>
                )}
              </div>
            </div>

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
                  <p className="font-semibold">Kickoff Time</p>
                  <p className="text-gray-600 dark:text-gray-400">{kickoffTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-gray-600 dark:text-gray-400">{venue.name}</p>
                  <p className="text-sm text-gray-500">{venue.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {matchReport && isCompleted && (
          <Card>
            <CardHeader>
              <CardTitle>Match Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: matchReport }}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
