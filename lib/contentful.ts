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
    author: {
      fields: {
        name: string;
        picture: {
          fields: {
            file: {
              url: string;
            };
          };
        };
      };
    };
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

export interface ContentfulTeam {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    shortName: string;
    logo?: {
      fields: {
        file: {
          url: string;
        };
        title: string;
      };
    };
    city: string;
    state: string;
  };
}

export interface ContentfulVenue {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    city: string;
    state: string;
    address: string;
    latitude: number;
    longitude: number;
  };
}

export interface ContentfulGame {
  sys: {
    id: string;
  };
  fields: {
    gameId: string;
    date: string;
    kickoffTime: string;
    homeTeam: ContentfulTeam;
    awayTeam: ContentfulTeam;
    venue: ContentfulVenue;
    division: 'D1' | 'D3' | 'Social';
    competition: string;
    homeScore?: number;
    awayScore?: number;
    status: 'SCHEDULED' | 'FINAL' | 'FORFEIT' | 'CANCELLED' | 'POSTPONED';
    notes?: string;
    ticketUrl?: string;
    broadcastUrl?: string;
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

export type ContentfulGameCollection = {
  items: ContentfulGame[];
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

// Map Contentful competition values to Game interface
function mapCompetition(competition: string): 'LEAGUE' | 'FRIENDLY' | 'PLAYOFF' | 'TOURNAMENT' | 'SOCIAL' {
  const lowerCompetition = competition.toLowerCase();
  if (lowerCompetition.includes('league') || lowerCompetition.includes('regular')) return 'LEAGUE';
  if (lowerCompetition.includes('friendly')) return 'FRIENDLY';
  if (lowerCompetition.includes('playoff') || lowerCompetition.includes('championship')) return 'PLAYOFF';
  if (lowerCompetition.includes('tournament') || lowerCompetition.includes('cup')) return 'TOURNAMENT';
  if (lowerCompetition.includes('social')) return 'SOCIAL';
  return 'FRIENDLY'; // Default fallback
}

// Transform Contentful game data to app Game interface
function transformContentfulGame(contentfulGame: ContentfulGame): import('../types/game').Game {
  const { fields } = contentfulGame;
  const gameDate = new Date(fields.date);
  const season = gameDate.getFullYear().toString();
  
  // Determine if WRFC is home team
  const isHome = fields.homeTeam.fields.name.toLowerCase().includes('washington rugby') || 
                 fields.homeTeam.fields.name.toLowerCase().includes('wrfc');
  
  return {
    id: fields.gameId,
    date: fields.date,
    time: fields.kickoffTime,
    season,
    isHome,
    homeTeam: {
      id: fields.homeTeam.sys.id,
      name: fields.homeTeam.fields.name,
      shortName: fields.homeTeam.fields.shortName,
      logo: fields.homeTeam.fields.logo?.fields.file.url ? `https:${fields.homeTeam.fields.logo.fields.file.url}` : undefined,
      city: fields.homeTeam.fields.city,
      state: fields.homeTeam.fields.state,
    },
    awayTeam: {
      id: fields.awayTeam.sys.id,
      name: fields.awayTeam.fields.name,
      shortName: fields.awayTeam.fields.shortName,
      logo: fields.awayTeam.fields.logo?.fields.file.url ? `https:${fields.awayTeam.fields.logo.fields.file.url}` : undefined,
      city: fields.awayTeam.fields.city,
      state: fields.awayTeam.fields.state,
    },
    venue: {
      id: fields.venue.sys.id,
      name: fields.venue.fields.name,
      city: fields.venue.fields.city,
      state: fields.venue.fields.state,
      address: fields.venue.fields.address,
      coordinates: {
        lat: fields.venue.fields.latitude,
        lng: fields.venue.fields.longitude,
      },
    },
    competition: mapCompetition(fields.competition),
    result: (fields.status === 'FINAL' || fields.status === 'FORFEIT') && 
            fields.homeScore !== undefined && fields.awayScore !== undefined ? {
      homeScore: fields.homeScore,
      awayScore: fields.awayScore,
      status: fields.status,
      notes: fields.notes,
    } : undefined,
    ticketsUrl: fields.ticketUrl,
    broadcastUrl: fields.broadcastUrl,
  };
}

// Fetch all games from Contentful
export async function getAllGames(): Promise<import('../types/game').Game[]> {
  if (!validateContentfulConfig()) {
    return [];
  }
  try {
    const response = await client.getEntries({
      content_type: 'game',
      order: ['fields.date'],
      include: 2, // Include linked entries (teams and venues)
    });
    return response.items.map(item => transformContentfulGame(item as unknown as ContentfulGame));
  } catch (error) {
    console.error('Error fetching games from Contentful:', error);
    return [];
  }
}

// Fetch games by season/year
export async function getGamesBySeason(year: number): Promise<import('../types/game').Game[]> {
  if (!validateContentfulConfig()) {
    return [];
  }
  try {
    const startDate = `${year}-01-01T00:00:00.000Z`;
    const endDate = `${year}-12-31T23:59:59.999Z`;
    
    const response = await client.getEntries({
      content_type: 'game',
      'fields.date[gte]': startDate,
      'fields.date[lte]': endDate,
      order: ['fields.date'],
      include: 2,
    });
    return response.items.map(item => transformContentfulGame(item as unknown as ContentfulGame));
  } catch (error) {
    console.error('Error fetching games by season:', error);
    return [];
  }
}

// Fetch upcoming games
export async function getUpcomingGames(limit: number = 10): Promise<import('../types/game').Game[]> {
  if (!validateContentfulConfig()) {
    return [];
  }
  try {
    const now = new Date().toISOString();
    
    const response = await client.getEntries({
      content_type: 'game',
      'fields.date[gte]': now,
      order: ['fields.date'],
      limit,
      include: 2,
    });
    return response.items.map(item => transformContentfulGame(item as unknown as ContentfulGame));
  } catch (error) {
    console.error('Error fetching upcoming games:', error);
    return [];
  }
}

// Fetch past games (with results)
export async function getPastGames(limit: number = 20): Promise<import('../types/game').Game[]> {
  if (!validateContentfulConfig()) {
    return [];
  }
  try {
    const now = new Date().toISOString();
    
    const response = await client.getEntries({
      content_type: 'game',
      'fields.date[lt]': now,
      order: ['-fields.date'], // Most recent first
      limit,
      include: 2,
    });
    return response.items.map(item => transformContentfulGame(item as unknown as ContentfulGame));
  } catch (error) {
    console.error('Error fetching past games:', error);
    return [];
  }
}

export default client;