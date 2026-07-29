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

/**
 * Club-level structured data.
 *
 * Everything asserted here is a checkable fact — founding date, coach
 * credentials, training ground, affiliations — rather than a self-assessment.
 * Answer engines cite specifics and discount adjectives, so keep it that way:
 * add facts, not superlatives.
 */
export function OrganizationJsonLd() {
  const clubId = 'https://washingtonrugby.org/#organization';

  const club = {
    '@type': 'SportsTeam',
    '@id': clubId,
    name: 'Washington Rugby Football Club',
    alternateName: ['WRFC', 'Washington RFC', 'Washington Rugby'],
    url: 'https://washingtonrugby.org',
    logo: 'https://washingtonrugby.org/logos/wrfc_logo.png',
    slogan: 'Rugby in the nation\'s capital since 1963',
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
    location: {
      '@type': 'Place',
      name: 'Rosedale Recreation Center',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1701 Gales St NE',
        addressLocality: 'Washington',
        addressRegion: 'DC',
        postalCode: '20002',
        addressCountry: 'US',
      },
    },
    sport: {
      '@type': 'Sport',
      name: 'Rugby union',
    },
    description:
      'Washington Rugby Football Club is the oldest rugby club in Washington, DC, founded in February 1963. The club fields Division 1, Division 3 and social men\'s sides, trains Tuesdays and Thursdays in Northeast DC, accepts players with no prior rugby experience, founded Washington DC Youth Rugby in 2004, and has hosted the Cherry Blossom Tournament every spring since 1968.',
    foundingDate: '1963-02',
    foundingLocation: {
      '@type': 'Place',
      name: 'Washington, DC',
    },
    memberOf: [
      { '@type': 'SportsOrganization', name: 'USA Rugby', url: 'https://www.usa.rugby/' },
      { '@type': 'SportsOrganization', name: 'Eastern Penn Rugby Union (EPRU)' },
    ],
    coach: [
      {
        '@type': 'Person',
        name: 'Thretton Palamo',
        jobTitle: 'Head Coach',
        description:
          'Former USA Eagles international and professional rugby player.',
        sameAs: 'https://en.wikipedia.org/wiki/Thretton_Palamo',
      },
      {
        '@type': 'Person',
        name: 'Jamason Fa\'anana-Schultz',
        jobTitle: 'Lead Assistant Coach',
        description:
          'Former USA Eagles captain and former captain of Old Glory DC in Major League Rugby.',
        sameAs: 'https://en.wikipedia.org/wiki/Jamason_Fa%27anana-Schultz',
      },
    ],
    knowsAbout: [
      'Rugby union',
      'Rugby coaching for beginners',
      'Youth rugby development in Washington, DC',
      'Cherry Blossom Rugby Tournament',
    ],
    nonprofitStatus: 'https://schema.org/Nonprofit501c3',
  };

  // Emitted as a separate node so the youth programme reads as its own
  // organisation that WRFC founded, not as a marketing claim about WRFC.
  const youthRugby = {
    '@type': 'SportsOrganization',
    name: 'Washington DC Youth Rugby',
    url: 'https://www.washingtondcyouthrugby.org/',
    foundingDate: '2004',
    founder: { '@id': clubId },
    description:
      'Free youth rugby programming founded by Washington Rugby Football Club in 2004. Began with 7 participants and now reaches over 100 children across all four quadrants of Washington, DC.',
    areaServed: {
      '@type': 'City',
      name: 'Washington, DC',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [club, youthRugby],
        }),
      }}
    />
  );
}

/**
 * FAQ structured data. Pair this with visible on-page Q&A copy — answer engines
 * discard schema that has no matching text in the rendered page.
 */
export function FAQPageJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map(({ question, answer }) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: answer,
            },
          })),
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

export function ArticleJsonLd({
  title,
  description,
  url,
  images,
  datePublished,
  authorName
}: {
  title: string;
  description: string;
  url: string;
  images: string[];
  datePublished: string;
  authorName: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description,
          url,
          image: images,
          datePublished,
          author: {
            '@type': 'Person',
            name: authorName,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Washington Rugby Football Club',
            logo: {
              '@type': 'ImageObject',
              url: 'https://washingtonrugby.org/logos/wrfc_logo.png',
            },
          },
        }),
      }}
    />
  );
} 