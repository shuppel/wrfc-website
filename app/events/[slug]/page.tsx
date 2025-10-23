import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllEvents, getEventBySlug } from '@/data/events';
import { formatDate } from '@/lib/utils';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import JsonLd from '@/components/JsonLd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = getEventBySlug(params.slug);
  
  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  const { title } = event;

  return {
    title: `${title} | WRFC Events`,
    description: `${title} - Join us for this WRFC event. View details, location, and registration information.`,
    openGraph: {
      title: `${title} | Washington Rugby Football Club`,
      description: `Join us for ${title}`,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const events = getAllEvents();
  
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export default function EventPage({ params }: EventPageProps) {
  const event = getEventBySlug(params.slug);
  
  if (!event) {
    notFound();
  }

  const { 
    title,
    eventType,
    startTime,
    endTime,
    venue,
    description,
    registrationLink,
    featured
  } = event;

  const isUpcoming = new Date(startTime) > new Date();
  const isPast = new Date(endTime) < new Date();
  const isOngoing = !isUpcoming && !isPast;
  
  return (
    <div className="container mx-auto px-4 py-12">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Schedule', item: '/schedule' },
          { name: 'Events', item: '/schedule/events' },
          { name: title, item: `/events/${params.slug}` }
        ]}
      />
      
      <JsonLd 
        type="Event" 
        data={{
          '@type': 'Event',
          name: title,
          startDate: startTime,
          endDate: endTime,
          location: {
            '@type': 'Place',
            name: venue.name,
            address: {
              '@type': 'PostalAddress',
              streetAddress: venue.address
            }
          },
          description: `Washington Rugby Football Club ${eventType} event`,
          url: `https://washingtonrugby.org/events/${params.slug}`,
          organizer: {
            '@type': 'Organization',
            name: 'Washington Rugby Football Club',
            url: 'https://washingtonrugby.org'
          }
        }} 
      />

      <div className="max-w-4xl mx-auto">
        <Link 
          href="/schedule/events" 
          className="inline-flex items-center text-wrfc-red hover:text-wrfc-red/80 mb-8"
        >
          <svg className="w-4 h-4 mr-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Back to Events
        </Link>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <Badge variant="outline" text={eventType} />
                {featured && <Badge variant="default" text="Featured" />}
              </div>
              {isOngoing && <Badge variant="default" text="Happening Now" />}
              {isPast && <Badge variant="outline" text="Past Event" />}
            </div>
            <CardTitle className="text-3xl md:text-4xl">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-semibold">Date</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {formatDate(startTime)}
                      {formatDate(startTime) !== formatDate(endTime) && (
                        <> - {formatDate(endTime)}</>
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-semibold">Time</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {new Date(startTime).toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                      {' - '}
                      {new Date(endTime).toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-gray-600 dark:text-gray-400">{venue.name}</p>
                    <p className="text-sm text-gray-500">{venue.address}</p>
                    {venue.googleMapsUrl && (
                      <a 
                        href={venue.googleMapsUrl}
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

            {registrationLink && isUpcoming && (
              <div className="pt-6 border-t">
                <a 
                  href={registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button size="lg" className="bg-wrfc-red hover:bg-red-700">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Register for Event
                  </Button>
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </CardContent>
        </Card>

        {venue.parkingInfo && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Venue Information</CardTitle>
            </CardHeader>
            <CardContent>
              {venue.venueType && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Venue Type</h4>
                  <Badge variant="outline" text={venue.venueType} />
                </div>
              )}
              <div>
                <h4 className="font-semibold mb-2">Parking</h4>
                <p className="text-gray-600 dark:text-gray-300">{venue.parkingInfo}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
