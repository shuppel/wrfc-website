import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllEvents, getEventBySlug } from '@/lib/contentful';
import { formatDate } from '@/lib/utils';
import { renderRichText } from '@/lib/rich-text';
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

// Generate metadata for the event
export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  try {
    const event = await getEventBySlug(params.slug);
    
    if (!event || !event.fields) {
      return {
        title: 'Event Not Found',
      };
    }

    const { title } = event.fields;

    return {
      title: `${title} | WRFC Events`,
      description: `${title} - Join us for this WRFC event. View details, location, and registration information.`,
      openGraph: {
        title: `${title} | Washington Rugby Football Club`,
        description: `Join us for ${title}`,
        type: 'website',
      },
    };
  } catch (error) {
    console.error('Error generating metadata for event:', error);
    return {
      title: 'Event | WRFC',
    };
  }
}

// Generate static paths for all events
export async function generateStaticParams() {
  try {
    const events = await getAllEvents();
    
    return events.map((event) => ({
      slug: event.fields.slug,
    }));
  } catch (error) {
    console.warn('Failed to fetch events for static generation:', error);
    // Return empty array to prevent build failure
    return [];
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventBySlug(params.slug);
  
  if (!event || !event.fields) {
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
  } = event.fields;

  const isUpcoming = new Date(startTime) > new Date();
  const isPast = new Date(endTime) < new Date();
  const isOngoing = !isUpcoming && !isPast;
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Structured Data */}
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
          ...(venue?.fields && {
            location: {
              '@type': 'Place',
              name: venue.fields.name,
              address: {
                '@type': 'PostalAddress',
                streetAddress: venue.fields.address
              }
            }
          }),
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
        {/* Back to events link */}
        <Link 
          href="/schedule/events" 
          className="inline-flex items-center text-wrfc-red hover:text-wrfc-red/80 mb-8"
        >
          <svg className="w-4 h-4 mr-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Back to Events
        </Link>

        {/* Event Header */}
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
            {/* Event Details */}
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
                {venue?.fields && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-semibold">Location</p>
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
                )}
              </div>
            </div>

            {/* Registration Button */}
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

        {/* Event Description */}
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {renderRichText(description)}
            </div>
          </CardContent>
        </Card>

        {/* Venue Info */}
        {venue?.fields?.parkingInfo && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Venue Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Venue Type</h4>
                <Badge variant="outline" text={venue.fields.venueType} />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Parking</h4>
                <div className="prose max-w-none dark:prose-invert">
                  {renderRichText(venue.fields.parkingInfo)}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}