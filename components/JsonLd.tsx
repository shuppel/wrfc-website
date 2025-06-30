import React from 'react';

type JsonLdValue = string | number | boolean | null | JsonLdObject | JsonLdValue[];
interface JsonLdObject {
  '@context'?: string;
  '@type'?: string;
  [key: string]: JsonLdValue | undefined;
}

// Extended interface to support specific structured data types
interface ExtendedJsonLdObject extends JsonLdObject {
  member?: JsonLdValue[] | Record<string, JsonLdValue>;
  sport?: JsonLdObject;
  location?: JsonLdObject;
  mainEntity?: JsonLdObject;
  organizer?: JsonLdObject;
  eventStatus?: string;
}

interface JsonLdProps {
  type: 'Organization' | 'WebSite' | 'SportsTeam' | 'Event' | 'Person' | 'FAQPage' | 'Article' | 'WebPage';
  data: ExtendedJsonLdObject;
}

export default function JsonLd({ type, data }: JsonLdProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

// Pre-defined JSON-LD components for common use cases
export function OrganizationJsonLd() {
  const orgData = {
    '@type': 'SportsTeam',
    name: 'Washington Rugby Football Club',
    alternateName: 'WRFC',
    url: 'https://washingtonrugby.org',
    logo: 'https://washingtonrugby.org/logos/wrfc_logo.png',
    sameAs: [
      'https://www.facebook.com/WashingtonRugbyFootballClub/',
      'https://twitter.com/WRFC_DC',
      'https://www.instagram.com/wrfc1963/',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Washington',
      addressRegion: 'DC',
      addressCountry: 'US',
    },
    sport: {
      '@type': 'Sport',
      name: 'Rugby',
    },
    description: 'Washington Rugby Football Club (WRFC) is a premier rugby club in Washington, DC, offering competitive matches, expert coaching, and a strong community of rugby enthusiasts.',
    foundingDate: '1963',
    member: {
      '@type': 'SportsOrganization',
      name: 'USA Rugby',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          ...orgData,
        }),
      }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url: 'https://washingtonrugby.org',
          name: 'Washington Rugby Football Club',
          description: 'Official website of the Washington Rugby Football Club (WRFC)',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://washingtonrugby.org/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }),
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; item: string }[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `https://washingtonrugby.org${item.item}`,
          })),
        }),
      }}
    />
  );
}

export function SportEventJsonLd({ 
  name, 
  startDate, 
  endDate, 
  location, 
  description, 
  image, 
  url,
  competitor1,
  competitor2
}: { 
  name: string; 
  startDate: string; 
  endDate?: string; 
  location: { name: string; address: string }; 
  description?: string; 
  image?: string; 
  url?: string;
  competitor1: { name: string; url?: string };
  competitor2: { name: string; url?: string };
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SportsEvent',
          name,
          startDate,
          endDate: endDate || startDate,
          location: {
            '@type': 'Place',
            name: location.name,
            address: location.address,
          },
          description,
          image,
          url: url || 'https://washingtonrugby.org',
          competitor: [
            {
              '@type': 'SportsTeam',
              name: competitor1.name,
              url: competitor1.url,
            },
            {
              '@type': 'SportsTeam',
              name: competitor2.name,
              url: competitor2.url,
            },
          ],
          sport: {
            '@type': 'Sport',
            name: 'Rugby',
          },
        }),
      }}
    />
  );
} 