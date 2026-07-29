export interface Event {
  slug: string;
  title: string;
  eventType: string;
  startTime: string;
  endTime: string;
  venue: {
    name: string;
    address: string;
    venueType?: string;
    googleMapsUrl?: string;
    parkingInfo?: string;
  };
  description: string;
  registrationLink?: string;
  featured?: boolean;
}

export const events: Event[] = [
  {
    slug: 'cherry-blossom-2025',
    title: 'Cherry Blossom Rugby Tournament 2025',
    eventType: 'Tournament',
    startTime: '2025-04-05T09:00:00-04:00',
    endTime: '2025-04-06T18:00:00-04:00',
    venue: {
      name: 'West Potomac Park',
      address: 'West Potomac Park, Washington, DC 20242',
      venueType: 'Outdoor Rugby Fields',
      googleMapsUrl: 'https://maps.google.com/?q=West+Potomac+Park+Washington+DC',
      parkingInfo: 'Street parking available. Consider public transportation.'
    },
    description: `
      <p>Join us for the annual Cherry Blossom Rugby Tournament, hosted by Washington Rugby every spring since 1968.</p>
      <p>Teams from across the country will compete in this prestigious tournament during DC's beautiful cherry blossom season.</p>
    `,
    registrationLink: 'https://www.washingtonrugby.org/tournaments/cherry-blossom',
    featured: true
  }
];

export function getAllEvents(): Event[] {
  return events.sort((a, b) => 
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );
}

export function getEventBySlug(slug: string): Event | undefined {
  return events.find(event => event.slug === slug);
}

export function getAllEventSlugs(): string[] {
  return events.map(event => event.slug);
}
