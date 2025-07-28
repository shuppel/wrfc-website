import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || 'dummy-space-id',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'dummy-access-token',
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

// Validation function to ensure required environment variables are set
export function validateContentfulConfig(): boolean {
  const requiredEnvVars = [
    'CONTENTFUL_SPACE_ID',
    'CONTENTFUL_ACCESS_TOKEN',
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar] || process.env[envVar] === '') {
      console.warn(`Contentful configuration warning: Environment variable ${envVar} is not set. Returning empty data.`);
      return false;
    }
  }
  return true;
}

// Define types for content models
export interface Author {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    slug: string;
    picture?: {
      fields: {
        file: {
          url: string;
        };
        title?: string;
      };
    };
    bio?: string;
    title?: string;
    email?: string;
    linkedinUrl?: string;
    instagramUrl?: string;
    websiteUrl?: string;
  };
}

export interface BlogPost {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    publishDate: string;
    featuredImage: {
      fields: {
        file: {
          url: string;
        };
        title: string;
      };
    };
    excerpt: string;
    content: Document; // Rich text content
    author?: Author;
    categories: string[];
    tags: string[];
  };
}

export interface PlayerProfile {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    slug: string;
    position: string;
    picture: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    number: number;
    bio: string;
    joinDate: string;
    hometown: string;
    college: string;
    highlights: string[];
    featured: boolean;
  };
}

export interface MembershipPlan {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    description: string;
    price: number;
    benefits: string[];
    featured: boolean;
    paymentLink: string;
  };
}

export interface AlumniSpotlight {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    slug: string;
    featuredImage?: {
      fields: {
        file: {
          url: string;
        };
        title: string;
      };
    };
    yearsPlayed: string; // e.g., "2010-2015"
    hometown: string; // Location/city
    story: Document; // Rich text content
    quote: string; // Featured quote
    publishDate: string;
    featured: boolean;
  };
}

export interface ContentfulTeam {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    slug: string;
    logo?: {
      fields: {
        file: {
          url: string;
        };
        title: string;
      };
    };
    city: string;
    division: 'D1' | 'D2' | 'D3' | 'D4';
    isWRFC: boolean;
  };
}

export interface ContentfulVenue {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    slug: string;
    venueType: 'Rugby Field' | 'Training Ground' | 'Social Venue' | 'Stadium' | 'Multi-Sport Complex';
    address: string;
    googleMapsUrl?: string;
    parkingInfo?: Document; // Rich text
  };
}

export interface Match {
  sys: {
    id: string;
  };
  fields: {
    title: string; // e.g., "WRFC vs Georgetown"
    slug: string;
    matchType: 'League' | 'Friendly' | 'Tournament' | 'Playoff';
    date: string; // Match date and time
    homeTeam: ContentfulTeam;
    awayTeam: ContentfulTeam;
    venue: ContentfulVenue;
    wrfcDivisions: ('D1' | 'D2' | 'D3' | 'D4')[];
    scoreHome?: number;
    scoreAway?: number;
    status: 'Scheduled' | 'Final' | 'Postponed' | 'Cancelled';
    matchReport?: Document; // Rich text
    highlightsUrl?: string;
  };
}

export interface Tournament {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    slug: string;
    year: number;
    startDate: string;
    endDate: string;
    description: Document; // Rich text
    heroImage?: {
      fields: {
        file: {
          url: string;
        };
        title: string;
      };
    };
    registrationLink?: string; // Zeffy link
    schedule?: Document; // Rich text
    active: boolean;
  };
}

export interface Event {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    eventType: 'Social' | 'Fundraiser' | 'Training' | 'Meeting';
    startTime: string; // Event start date/time
    endTime: string; // Event end date/time
    venue: ContentfulVenue;
    description: Document; // Rich text
    registrationLink?: string; // Zeffy or external link
    featured: boolean;
  };
}

// Post types
export type BlogPostCollection = {
  items: BlogPost[];
  total: number;
};

export type PlayerProfileCollection = {
  items: PlayerProfile[];
  total: number;
};

export type MembershipPlanCollection = {
  items: MembershipPlan[];
  total: number;
};

export type MatchCollection = {
  items: Match[];
  total: number;
};

export type TournamentCollection = {
  items: Tournament[];
  total: number;
};

export type EventCollection = {
  items: Event[];
  total: number;
};

export type AlumniSpotlightCollection = {
  items: AlumniSpotlight[];
  total: number;
};

// Fetch all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!validateContentfulConfig()) {
    return [];
  }
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      order: ['-fields.publishDate'],
    });
    return response.items as unknown as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!validateContentfulConfig()) {
    return null;
  }
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    });
    
    return response.items.length > 0 
      ? response.items[0] as unknown as BlogPost 
      : null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Fetch all player profiles
export async function getAllPlayerProfiles(): Promise<PlayerProfile[]> {
  if (!validateContentfulConfig()) {
    return [];
  }
  try {
    const response = await client.getEntries({
      content_type: 'playerProfile',
      order: ['fields.number'],
    });
    return response.items as unknown as PlayerProfile[];
  } catch (error) {
    console.error('Error fetching player profiles:', error);
    return [];
  }
}

// Fetch a single player profile by slug
export async function getPlayerProfileBySlug(slug: string): Promise<PlayerProfile | null> {
  if (!validateContentfulConfig()) {
    return null;
  }
  try {
    const response = await client.getEntries({
      content_type: 'playerProfile',
      'fields.slug': slug,
      limit: 1,
    });
    
    return response.items.length > 0 
      ? response.items[0] as unknown as PlayerProfile 
      : null;
  } catch (error) {
    console.error('Error fetching player profile:', error);
    return null;
  }
}

// Fetch all membership plans
export async function getAllMembershipPlans(): Promise<MembershipPlan[]> {
  if (!validateContentfulConfig()) {
    return [];
  }
  try {
    const response = await client.getEntries({
      content_type: 'membershipPlan',
      order: ['fields.price'],
    });
    return response.items as unknown as MembershipPlan[];
  } catch (error) {
    console.error('Error fetching membership plans:', error);
    return [];
  }
}

// Fetch all alumni spotlights
export async function getAllAlumniSpotlights(): Promise<AlumniSpotlight[]> {
  if (!validateContentfulConfig()) {
    return [];
  }
  try {
    const response = await client.getEntries({
      content_type: 'alumniSpotlight',
      order: ['-fields.publishDate'],
    });
    return response.items as unknown as AlumniSpotlight[];
  } catch (error) {
    console.error('Error fetching alumni spotlights:', error);
    return [];
  }
}

// Fetch featured alumni spotlights
export async function getFeaturedAlumniSpotlights(): Promise<AlumniSpotlight[]> {
  if (!validateContentfulConfig()) {
    return [];
  }
  try {
    const response = await client.getEntries({
      content_type: 'alumniSpotlight',
      'fields.featured': true,
      order: ['-fields.publishDate'],
      limit: 3,
    });
    return response.items as unknown as AlumniSpotlight[];
  } catch (error) {
    console.error('Error fetching featured alumni spotlights:', error);
    return [];
  }
}

// Fetch a single alumni spotlight by slug
export async function getAlumniSpotlightBySlug(slug: string): Promise<AlumniSpotlight | null> {
  if (!validateContentfulConfig()) {
    return null;
  }
  try {
    const response = await client.getEntries({
      content_type: 'alumniSpotlight',
      'fields.slug': slug,
      limit: 1,
    });
    
    return response.items.length > 0 
      ? response.items[0] as unknown as AlumniSpotlight 
      : null;
  } catch (error) {
    console.error('Error fetching alumni spotlight:', error);
    return null;
  }
}



// Transform Contentful match data to app Game interface
export function transformMatch(match: Match): import('../types/game').Game {
  const { fields } = match;
  const gameDate = new Date(fields.date);
  const season = gameDate.getFullYear().toString();
  
  // Determine if WRFC is home team
  const isHome = fields.homeTeam.fields.isWRFC;
  
  return {
    id: match.sys.id,
    date: fields.date,
    time: fields.date, // Using same date field for time
    season,
    isHome,
    homeTeam: {
      id: fields.homeTeam.sys.id,
      name: fields.homeTeam.fields.name,
      shortName: fields.homeTeam.fields.name, // Using name as shortName for now
      logo: fields.homeTeam.fields.logo?.fields.file.url ? `https:${fields.homeTeam.fields.logo.fields.file.url}` : undefined,
      city: fields.homeTeam.fields.city,
      state: '', // Not in new schema
    },
    awayTeam: {
      id: fields.awayTeam.sys.id,
      name: fields.awayTeam.fields.name,
      shortName: fields.awayTeam.fields.name, // Using name as shortName for now
      logo: fields.awayTeam.fields.logo?.fields.file.url ? `https:${fields.awayTeam.fields.logo.fields.file.url}` : undefined,
      city: fields.awayTeam.fields.city,
      state: '', // Not in new schema
    },
    venue: {
      id: fields.venue.sys.id,
      name: fields.venue.fields.name,
      city: '', // Not in new schema
      state: '', // Not in new schema
      address: fields.venue.fields.address,
      coordinates: {
        lat: 0, // Not in new schema
        lng: 0, // Not in new schema
      },
    },
    competition: fields.matchType === 'League' ? 'LEAGUE' : 
                 fields.matchType === 'Friendly' ? 'FRIENDLY' :
                 fields.matchType === 'Tournament' ? 'TOURNAMENT' : 'PLAYOFF',
    result: fields.status === 'Final' && 
            fields.scoreHome !== undefined && fields.scoreAway !== undefined ? {
      homeScore: fields.scoreHome,
      awayScore: fields.scoreAway,
      status: 'FINAL',
      notes: undefined,
    } : undefined,
    ticketsUrl: undefined,
    broadcastUrl: fields.highlightsUrl,
  };
}

// Fetch all matches from Contentful
export async function getAllMatches(): Promise<Match[]> {
  if (!validateContentfulConfig()) {
    return [];
  }
  try {
    const response = await client.getEntries({
      content_type: 'match',
      order: ['fields.date'],
      include: 2, // Include linked entries (teams and venues)
    });
    return response.items as unknown as Match[];
  } catch (error) {
    console.error('Error fetching matches from Contentful:', error);
    return [];
  }
}

// Fetch a single match by slug
export async function getMatchBySlug(slug: string): Promise<Match | null> {
  if (!validateContentfulConfig()) {
    return null;
  }
  try {
    const response = await client.getEntries({
      content_type: 'match',
      'fields.slug': slug,
      limit: 1,
      include: 2,
    });
    
    return response.items.length > 0 
      ? response.items[0] as unknown as Match 
      : null;
  } catch (error) {
    console.error('Error fetching match:', error);
    return null;
  }
}

// Fetch upcoming matches
export async function getUpcomingMatches(limit: number = 10): Promise<Match[]> {
  if (!validateContentfulConfig()) {
    return [];
  }
  try {
    const now = new Date().toISOString();
    
    const response = await client.getEntries({
      content_type: 'match',
      'fields.date[gte]': now,
      order: ['fields.date'],
      limit,
      include: 2,
    });
    return response.items as unknown as Match[];
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    return [];
  }
}

// Fetch past matches (with results)
export async function getPastMatches(limit: number = 20): Promise<Match[]> {
  if (!validateContentfulConfig()) {
    return [];
  }
  try {
    const now = new Date().toISOString();
    
    const response = await client.getEntries({
      content_type: 'match',
      'fields.date[lt]': now,
      order: ['-fields.date'], // Most recent first
      limit,
      include: 2,
    });
    return response.items as unknown as Match[];
  } catch (error) {
    console.error('Error fetching past matches:', error);
    return [];
  }
}

// Tournament functions
export async function getAllTournaments(): Promise<Tournament[]> {
  if (!validateContentfulConfig()) {
    return [];
  }
  try {
    const response = await client.getEntries({
      content_type: 'tournament',
      order: ['-fields.startDate'],
    });
    return response.items as unknown as Tournament[];
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    return [];
  }
}

export async function getActiveTournaments(): Promise<Tournament[]> {
  if (!validateContentfulConfig()) {
    return [];
  }
  try {
    const response = await client.getEntries({
      content_type: 'tournament',
      'fields.active': true,
      order: ['fields.startDate'],
    });
    return response.items as unknown as Tournament[];
  } catch (error) {
    console.error('Error fetching active tournaments:', error);
    return [];
  }
}

export async function getTournamentBySlug(slug: string): Promise<Tournament | null> {
  if (!validateContentfulConfig()) {
    return null;
  }
  try {
    const response = await client.getEntries({
      content_type: 'tournament',
      'fields.slug': slug,
      limit: 1,
    });
    
    return response.items.length > 0 
      ? response.items[0] as unknown as Tournament 
      : null;
  } catch (error) {
    console.error('Error fetching tournament:', error);
    return null;
  }
}

// Event functions
export async function getAllEvents(): Promise<Event[]> {
  if (!validateContentfulConfig()) {
    return [];
  }
  try {
    const response = await client.getEntries({
      content_type: 'event',
      order: ['fields.startTime'],
      include: 2, // Include venue
    });
    return response.items as unknown as Event[];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function getUpcomingEvents(limit: number = 10): Promise<Event[]> {
  if (!validateContentfulConfig()) {
    return [];
  }
  try {
    const now = new Date().toISOString();
    
    const response = await client.getEntries({
      content_type: 'event',
      'fields.startTime[gte]': now,
      order: ['fields.startTime'],
      limit,
      include: 2,
    });
    return response.items as unknown as Event[];
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return [];
  }
}

export async function getFeaturedEvents(): Promise<Event[]> {
  if (!validateContentfulConfig()) {
    return [];
  }
  try {
    const now = new Date().toISOString();
    
    const response = await client.getEntries({
      content_type: 'event',
      'fields.featured': true,
      'fields.startTime[gte]': now,
      order: ['fields.startTime'],
      limit: 3,
    });
    return response.items as unknown as Event[];
  } catch (error) {
    console.error('Error fetching featured events:', error);
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  if (!validateContentfulConfig()) {
    return null;
  }
  try {
    const response = await client.getEntries({
      content_type: 'event',
      'fields.slug': slug,
      limit: 1,
      include: 2,
    });
    
    return response.items.length > 0 
      ? response.items[0] as unknown as Event 
      : null;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

// For backward compatibility - will be removed later
export async function getAllGames(): Promise<import('../types/game').Game[]> {
  const matches = await getAllMatches();
  return matches.map(transformMatch);
}

export default client;