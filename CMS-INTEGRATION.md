# Contentful CMS Integration for WRFC Website

This document outlines the integration of Contentful as a headless CMS for the Washington Rugby Football Club website. The integration enables dynamic content management for blog posts, player profiles, and membership plans.

## Implementation Overview

### Content Types

The following content types have been defined:

1. **Blog Posts**
   - Rich text content
   - Featured images
   - Author information
   - Categories and tags
   - Publish dates

2. **Player Profiles**
   - Personal information (name, position, number)
   - Profile pictures
   - Biographical information
   - Career highlights
   - Metadata (hometown, college, join date)

3. **Membership Plans**
   - Title and description
   - Pricing information
   - Benefits list
   - Payment links
   - Featured status

### Technical Implementation

The integration uses the following components:

- **Contentful SDK** (`contentful` and `contentful-management` packages)
- **Rich Text Renderer** (`@contentful/rich-text-react-renderer`)
- **Type Definitions** for content models
- **Server-Side API** functions for fetching content
- **Client-Side Hook** for dynamic content fetching

### Pages and Routes

The following pages have been implemented:

- `/blog` - Main blog listing page
- `/blog/[slug]` - Individual blog post pages
- `/roster/players` - Player profiles listing
- `/roster/players/[slug]` - Individual player profile pages
- `/membership/plans` - Membership plans listing

### API Routes

- `/api/content` - Generic API endpoint for fetching content by type and slug

## Setup Instructions

1. **Environment Variables**
   Create a `.env.local` file with the following:
   ```
   CONTENTFUL_SPACE_ID=your_space_id_here
   CONTENTFUL_ACCESS_TOKEN=your_access_token_here
   CONTENTFUL_ENVIRONMENT=master
   ```

2. **Content Model Setup in Contentful**
   Create the following content types in Contentful:
   - Blog Post
   - Player Profile
   - Membership Plan

   Use the field definitions from the typescript interfaces in `/lib/contentful.ts`.

3. **Content Entry**
   Add content entries in Contentful for:
   - Blog posts
   - Player profiles
   - Membership plans

## Usage Examples

### Server-Side Content Fetching

```typescript
// In a Server Component
import { getAllBlogPosts } from '@/lib/contentful';

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  // Render posts...
}
```

### Client-Side Content Fetching

```typescript
// In a Client Component
'use client';
import { useContent } from '@/hooks/useContent';
import type { BlogPost } from '@/lib/contentful';

export default function BlogList() {
  const { data: posts, isLoading, error } = useContent<BlogPost[]>('blog');
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  // Render posts...
}
```

### Rich Text Rendering

```typescript
import { renderRichText } from '@/lib/rich-text';

// In a component
<div className="prose">
  {renderRichText(content)}
</div>
```

## Extending the CMS

To add a new content type:

1. Define the TypeScript interface in `/lib/contentful.ts`
2. Add fetch functions in `/lib/contentful.ts`
3. Create corresponding page components
4. Add the new content type to the API handler

## Resources

- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Rich Text Renderer Documentation](https://github.com/contentful/rich-text/tree/master/packages/rich-text-react-renderer)
- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)