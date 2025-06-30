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

export default client;