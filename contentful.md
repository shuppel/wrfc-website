# Contentful CMS Strategy

This document outlines the strategy for managing and serving dynamic content through Contentful CMS for the WRFC website.

## Overview

The WRFC website uses Contentful as a headless CMS to manage dynamic content while maintaining a hybrid approach that supports both CMS-managed content and hardcoded data for flexibility and performance.

## Content Architecture

### Current Content Types

1. **Blog Posts** - Blog articles with rich text content, featured images, authors, and tags
2. **Player Profiles** - Roster and player information including position, stats, and biographical data  
3. **Membership Plans** - Different membership options with benefits and pricing

### Player Profile Structure

Player profiles in Contentful include the following fields:
- `name` (Short Text) - Player's full name
- `slug` (Short Text) - URL-friendly identifier for routing
- `position` (Short Text) - Playing position
- `number` (Number) - Jersey number
- `picture` (Media) - Player headshot/photo
- `bio` (Long Text) - Player biography
- `joinDate` (Date) - Date joined the club
- `hometown` (Short Text) - Player's hometown
- `college` (Short Text) - College/university attended
- `highlights` (Short Text, List) - Career highlights and achievements

## Implementation Strategy

### Hybrid Data Approach

The website implements a dual-source strategy:

1. **Contentful CMS** - For rich, editable content managed by non-technical users
2. **Hardcoded Data** - For performance-critical or frequently accessed data (`/data/players.ts`)

### Content Fetching Pattern

```typescript
// Try Contentful first, fallback to hardcoded data
const contentfulPlayer = await getPlayerProfileBySlug(params.slug);
if (contentfulPlayer) {
  // Render Contentful data
  return <ContentfulPlayerProfile />;
}

const hardcodedPlayer = getPlayerBySlug(params.slug);
if (hardcodedPlayer) {
  // Render hardcoded data
  return <HardcodedPlayerProfile />;
}
```

### Client-Side Considerations

#### Static Generation Strategy
- All player profiles are pre-generated at build time using `generateStaticParams()`
- Both Contentful and hardcoded players are included in static generation
- SEO metadata is generated for each profile type

#### Runtime Rendering
- Pages check Contentful first for the most up-to-date content
- Graceful fallback to hardcoded data ensures site reliability
- Different UI components handle each data source appropriately

## Development Workflow

### Environment Setup

```bash
# Required environment variables
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
CONTENTFUL_ENVIRONMENT=master
```

### Content Management Process

1. **Content Creation**: Content managers use Contentful web interface to create/edit content
2. **Preview**: Content can be previewed before publishing
3. **Publishing**: Published content becomes available via API
4. **Build Trigger**: Website rebuilds automatically or manually to include new content

### Development Best Practices

#### 1. Graceful Degradation
Always provide fallbacks for missing Contentful data:
```typescript
const imageUrl = contentfulPlayer.fields.picture?.fields?.file?.url;
// Always check for optional fields before rendering
```

#### 2. Type Safety
Define TypeScript interfaces for Contentful responses:
```typescript
interface ContentfulPlayer {
  sys: { id: string }
  fields: {
    name: string
    position: string
    slug: string
    // ... other fields
  }
}
```

#### 3. Performance Optimization
- Use Next.js Image component for optimized image loading
- Implement proper caching strategies
- Generate static pages at build time when possible

## Content Strategy

### When to Use Contentful
- **Player Profiles**: Rich biographical content, frequently updated information
- **Blog Posts**: Articles, news, match reports
- **Events**: Tournament information, schedule updates
- **Dynamic Pages**: Content that changes frequently

### When to Use Hardcoded Data
- **Core Site Structure**: Navigation, static pages
- **Performance Critical**: Data needed for initial page loads
- **Development**: Placeholder content during development
- **Backup**: Fallback content when CMS is unavailable

## SEO and Performance

### Metadata Generation
Both content sources generate appropriate SEO metadata:
- Open Graph tags for social sharing
- Twitter Card metadata
- Structured data (JSON-LD) for search engines

### Performance Considerations
- Static generation for all player profiles
- Image optimization through Next.js Image component
- Proper caching headers for API responses

## Migration Strategy

### Phase 1: Hybrid Implementation (Current)
- Maintain existing hardcoded data
- Add Contentful integration alongside
- Test and validate CMS functionality

### Phase 2: Content Migration
- Gradually migrate static content to Contentful
- Train content managers on CMS usage
- Establish content approval workflows

### Phase 3: Full CMS Integration
- Complete migration of appropriate content
- Remove hardcoded fallbacks where appropriate
- Optimize performance for CMS-first approach

## Monitoring and Maintenance

### Content Health Checks
- Monitor API response times
- Track content freshness
- Validate required fields are populated

### Performance Monitoring
- Page load times for CMS-driven pages
- Image optimization effectiveness
- Static generation build times

## Future Enhancements

### Planned Content Types
- **Match Results**: Game scores, statistics, reports
- **Sponsor Information**: Sponsor profiles and benefits
- **Training Resources**: Practice schedules, training materials
- **Media Galleries**: Photo and video collections

### Technical Improvements
- Implement webhook-triggered rebuilds
- Add content preview functionality
- Enhance rich text rendering capabilities
- Implement search functionality across CMS content

## Troubleshooting

### Common Issues
1. **Missing Environment Variables**: Ensure all Contentful credentials are set
2. **API Rate Limits**: Implement proper caching and request batching
3. **Build Failures**: Check for malformed content or missing required fields
4. **Image Loading**: Verify Contentful image URLs are properly formatted

### Debug Tools
- Contentful web app for content inspection
- Browser network tab for API response debugging
- Next.js build logs for static generation issues

This strategy ensures a robust, scalable content management system that can grow with the club's needs while maintaining excellent performance and user experience.