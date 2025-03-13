// SEO data utility functions for retrieving and formatting metadata
import { Metadata } from 'next';

// Mock database of SEO data (would eventually come from a real DB or CMS via GraphQL)
const SEO_DATA = {
  home: {
    title: 'WRFC - Washington Rugby Football Club',
    description: 'Home of Washington Rugby Football Club - Tradition, Excellence, Community since 1963',
    imagePath: '/logos/wrfc_logo.png',
    keywords: ['rugby', 'washington rugby', 'washington dc rugby', 'wrfc', 'washington rfc'],
  },
  about: {
    title: 'About WRFC | Washington Rugby Football Club',
    description: 'Learn about the history, mission, and values of the Washington Rugby Football Club. Est. 1963',
    imagePath: '/assets/about-cover.jpg',
    keywords: ['rugby history', 'washington rugby history', 'wrfc history', 'dc rugby club'],
  },
  roster: {
    title: 'Team Roster | Washington Rugby Football Club',
    description: 'Meet the players and coaching staff of Washington Rugby Football Club',
    imagePath: '/assets/team-photo.jpg',
    keywords: ['rugby players', 'washington rugby team', 'wrfc roster', 'dc rugby players'],
  },
  schedule: {
    title: 'Match Schedule | Washington Rugby Football Club',
    description: 'Upcoming matches, fixtures, and results for Washington Rugby Football Club',
    imagePath: '/assets/match-action.jpg',
    keywords: ['rugby matches', 'washington rugby schedule', 'wrfc fixtures', 'dc rugby games'],
  },
  membership: {
    title: 'Join WRFC | Washington Rugby Football Club',
    description: 'Become a member of Washington Rugby Football Club. All skill levels welcome.',
    imagePath: '/assets/membership.jpg',
    keywords: ['join rugby', 'washington rugby membership', 'play rugby in dc', 'rugby club membership'],
  },
  tournaments: {
    title: 'Tournaments | Washington Rugby Football Club',
    description: 'Tournaments hosted and participated in by Washington Rugby Football Club',
    imagePath: '/assets/tournament.jpg',
    keywords: ['rugby tournaments', 'dc rugby tournaments', 'wrfc tournament', 'washington rugby events'],
  },
  contact: {
    title: 'Contact Us | Washington Rugby Football Club',
    description: 'Get in touch with Washington Rugby Football Club. Contact information and form.',
    imagePath: '/assets/contact.jpg',
    keywords: ['contact rugby club', 'washington rugby contact', 'wrfc info', 'dc rugby information'],
  },
};

export type PageKey = keyof typeof SEO_DATA;

/**
 * Retrieves SEO data for a specific page
 * This simulates a GraphQL query to a backend
 * 
 * Example GraphQL query this simulates:
 * query GetPageSEO($pageKey: String!) {
 *   page(key: $pageKey) {
 *     title
 *     description
 *     imagePath
 *     keywords
 *   }
 * }
 */
export function getPageSEO(pageKey: PageKey) {
  return SEO_DATA[pageKey] || SEO_DATA.home;
}

/**
 * Generates Next.js Metadata object for a page
 */
export function generateMetadata(pageKey: PageKey): Metadata {
  const seoData = getPageSEO(pageKey);
  const { title, description, imagePath, keywords } = seoData;

  return {
    title,
    description,
    keywords: keywords || [],
    openGraph: {
      title,
      description,
      images: [{ url: imagePath }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imagePath],
    },
  };
}

/**
 * Gets structured data for JSON-LD based on page type
 */
export function getStructuredData(pageKey: PageKey, additionalData?: Record<string, unknown>) {
  // This would be expanded based on the specific page needs
  const baseData = getPageSEO(pageKey);
  
  // Different structured data based on page type
  switch(pageKey) {
    case 'schedule':
      return {
        '@type': 'SportsEvent',
        name: baseData.title,
        description: baseData.description,
        ...additionalData
      };
    case 'roster':
      return {
        '@type': 'SportsTeam',
        name: 'Washington Rugby Football Club',
        member: additionalData?.players || [],
        ...additionalData
      };
    default:
      return {
        '@type': 'WebPage',
        name: baseData.title,
        description: baseData.description,
        ...additionalData
      };
  }
} 