import { createClient, Document } from 'contentful';

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

// Validation function to ensure required environment variables are set
export function validateContentfulConfig() {
  const requiredEnvVars = [
    'CONTENTFUL_SPACE_ID',
    'CONTENTFUL_ACCESS_TOKEN',
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Contentful configuration error: Environment variable ${envVar} is not set`);
    }
  }
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
  validateContentfulConfig();
  const response = await client.getEntries({
    content_type: 'blogPost',
    order: '-fields.publishDate',
  });
  return response.items as unknown as BlogPost[];
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  validateContentfulConfig();
  const response = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });
  
  return response.items.length > 0 
    ? response.items[0] as unknown as BlogPost 
    : null;
}

// Fetch all player profiles
export async function getAllPlayerProfiles(): Promise<PlayerProfile[]> {
  validateContentfulConfig();
  const response = await client.getEntries({
    content_type: 'playerProfile',
    order: 'fields.number',
  });
  return response.items as unknown as PlayerProfile[];
}

// Fetch a single player profile by slug
export async function getPlayerProfileBySlug(slug: string): Promise<PlayerProfile | null> {
  validateContentfulConfig();
  const response = await client.getEntries({
    content_type: 'playerProfile',
    'fields.slug': slug,
    limit: 1,
  });
  
  return response.items.length > 0 
    ? response.items[0] as unknown as PlayerProfile 
    : null;
}

// Fetch all membership plans
export async function getAllMembershipPlans(): Promise<MembershipPlan[]> {
  validateContentfulConfig();
  const response = await client.getEntries({
    content_type: 'membershipPlan',
    order: 'fields.price',
  });
  return response.items as unknown as MembershipPlan[];
}

export default client;