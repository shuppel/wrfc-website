# WRFC Website MVP Content Strategy & Implementation Plan

## Overview
This document captures the content modeling decisions and implementation strategy for the WRFC website MVP. Created to preserve planning decisions and ensure continuity.

## Content Management Strategy

### Contentful (CMS) - For Dynamic Content
We'll use Contentful for content that changes frequently and needs editorial control.

### Hardcoded Data - For Stable Content
- **Coaches**: Rarely change, will be hardcoded in `/data/coaches.ts`
- **Membership Plans**: Simple structure, hardcoded with Zeffy links in `/data/membership.ts`

### Future: Supabase - For Player Management
- Players will self-manage their profiles
- Offloads data management from admin team
- Uses free tier effectively

## Contentful Content Models (MVP)

### 1. Match
*For schedule and match results*

**Fields:**
- **Title** (Short text, Required) - e.g., "WRFC vs Georgetown"
- **Slug** (Short text, Required, Unique) - URL slug
- **Match Type** (Dropdown, Required) - League, Friendly, Tournament, Playoff
- **Date** (Date & time, Required) - Match date and time
- **Home Team** (Reference to Team) - Link to Team content
- **Away Team** (Reference to Team) - Link to Team content
- **Venue** (Reference to Venue) - Link to Venue content
- **WRFC Divisions** (Multiple choice) - D1, D2, D3, D4
- **Score Home** (Number) - Final score
- **Score Away** (Number) - Final score
- **Status** (Dropdown) - Scheduled, Final, Postponed, Cancelled
- **Match Report** (Rich text) - Post-game writeup
- **Highlights URL** (Short text) - YouTube/video link

### 2. Team
*For opponent information*

**Fields:**
- **Name** (Short text, Required) - Team name
- **Slug** (Short text, Required, Unique) - URL slug
- **Logo** (Media) - Team logo (optional)
- **City** (Short text) - Location
- **Division** (Dropdown) - D1, D2, D3, D4
- **Is WRFC** (Boolean) - Mark WRFC teams

### 3. Venue
*For match locations*

**Fields:**
- **Name** (Short text, Required) - Venue name
- **Slug** (Short text, Required, Unique) - URL slug
- **Venue Type** (Dropdown, Required) - Rugby Field, Training Ground, Social Venue, Stadium, Multi-Sport Complex
- **Address** (Long text, Required) - Full address
- **Google Maps URL** (Short text) - Direct link to maps
- **Parking Info** (Rich text) - Simple parking instructions

### 4. Alumni Spotlight
*For featuring notable alumni*

**Fields:**
- **Name** (Short text, Required) - Alumni name
- **Slug** (Short text, Required, Unique) - URL slug
- **Featured Image** (Media) - Main photo
- **Years Played** (Short text) - e.g., "2010-2015"
- **Hometown** (Short text) - Location/city
- **Story** (Rich text) - Their WRFC story
- **Quote** (Long text) - Featured quote
- **Published Date** (Date & time) - When to publish
- **Featured** (Boolean) - Show on homepage?

### 5. Tournament
*For Cherry Blossom and other tournaments*

**Fields:**
- **Name** (Short text, Required) - Tournament name
- **Slug** (Short text, Required, Unique) - URL slug
- **Year** (Number, Required) - Tournament year
- **Start Date** (Date & time, Required) - First day
- **End Date** (Date & time, Required) - Last day
- **Description** (Rich text) - Tournament overview
- **Hero Image** (Media) - Main banner image
- **Registration Link** (Short text) - Zeffy registration
- **Schedule** (Rich text) - Tournament schedule
- **Active** (Boolean) - Current/upcoming tournament?

### 6. Event
*For non-match events*

**Fields:**
- **Title** (Short text, Required) - Event name
- **Slug** (Short text, Required, Unique) - URL slug
- **Event Type** (Dropdown) - Social, Fundraiser, Training, Meeting
- **Start Time** (Date & time, Required) - Event start date/time
- **End Time** (Date & time, Required) - Event end date/time
- **Venue** (Reference to Venue) - Link to Venue content
- **Description** (Rich text) - Event details
- **Registration Link** (Short text) - Zeffy or external link
- **Featured** (Boolean) - Highlight this event?

## Hardcoded Data Structures

### Coaches (`/data/coaches.ts`)
```typescript
interface Coach {
  name: string
  role: string
  teams: string[]
  email?: string
  bio?: string
  image?: string
}
```

### Membership Plans (`/data/membership.ts`)
```typescript
interface MembershipPlan {
  name: string
  price: number
  frequency: 'annual' | 'monthly'
  benefits: string[]
  zeffyLink: string
  popular?: boolean
}
```

## Implementation Phases

### Phase 1: MVP (Current)
1. **Set up Contentful models** for Match, Team, Venue, Alumni Spotlight, Tournament, Event
2. **Create hardcoded files** for Coaches and Membership
3. **Update components** to use real data from Contentful
4. **Remove mock data** throughout the site

### Phase 2: Post-MVP
1. **Player Management System**
   - Implement Supabase integration
   - Create player self-service portal
   - Link player profiles to main site
2. **Sponsors Module**
   - Define sponsor strategy first
   - Add Sponsor content type to Contentful
   - Create sponsor display components

### Phase 3: Enhanced Features
1. **Advanced Statistics** for matches and players
2. **Photo Galleries** for events and tournaments
3. **Historical Data** preservation and display

## Technical Implementation Notes

### Contentful Setup Order
1. Create Team and Venue first (referenced by other types)
2. Create Match (references Team and Venue)
3. Create remaining types in any order

### TypeScript Interfaces Location
- Contentful types: `/lib/contentful.ts`
- Hardcoded data types: `/types/index.ts`

### Data Fetching Strategy
- Use static generation where possible
- Implement ISR (Incremental Static Regeneration) for frequently updated content
- Cache Contentful responses appropriately

## Decisions Made

### Why These Choices:
1. **Contentful for dynamic content**: Editorial control, version history, preview capability
2. **Hardcoded coaches**: Rarely change, simpler to maintain
3. **Deferred player profiles**: Reduces admin burden, empowers players
4. **Postponed sponsors**: Need strategy before implementation
5. **Simplified membership**: Direct Zeffy links, no complex logic needed

### What We're NOT Building (MVP):
- Player profiles in CMS
- Sponsor management
- Complex membership tiers
- Payment processing (using Zeffy externally)
- User authentication
- Comments/forums

## Current Status

### Completed:
- ✅ Removed Square payment integration
- ✅ Implemented Zeffy payment buttons
- ✅ Set up Contentful environment variables
- ✅ Created Media section structure
- ✅ Built Blog, Film Room, and Social Media pages
- ✅ Created all 6 core content models in Contentful

### Media Components Checklist:
1. **Blog Section** (`/app/blog/`)
   - [ ] Update to use real Contentful blog posts
   - [ ] Implement filtering by category/tag
   - [ ] Add author information display
   - [ ] Create featured posts section
   - [ ] Add pagination for blog list

2. **Film Room** (`/app/media/film/`)
   - [ ] Create YouTube playlist integration
   - [ ] Add video categories (Highlights, Training, Full Matches)
   - [ ] Implement video search/filter
   - [ ] Add view count tracking

3. **Social Media** (`/app/media/social/`)
   - [ ] Fix import error for SocialMediaContent
   - [ ] Add Instagram feed integration
   - [ ] Add Facebook feed integration
   - [ ] Create social media aggregation

### Contentful API Integration Steps:
1. **Update `/lib/contentful.ts`**
   - [ ] Add TypeScript interfaces for all 6 content types
   - [ ] Create fetch functions for each content type
   - [ ] Add preview API support
   - [ ] Implement error handling

2. **Remove Dummy Data**
   - [ ] `/data/players.ts` - Keep until Jazz implementation
   - [ ] Blog posts in `/app/blog/page.tsx`
   - [ ] Match data in schedule components
   - [ ] Event data in event components
   - [ ] Tournament data
   - [ ] Alumni spotlights

3. **Update Components**
   - [ ] Blog components to use Contentful data
   - [ ] Schedule components for matches
   - [ ] Event listing components
   - [ ] Tournament pages
   - [ ] Alumni spotlight components

4. **Add Dynamic Routes**
   - [ ] `/blog/[slug]` - Individual blog posts
   - [ ] `/schedule/match/[slug]` - Match details
   - [ ] `/events/[slug]` - Event details
   - [ ] `/alumni/[slug]` - Alumni profiles

### Next Immediate Steps:
1. Fix the social media import error
2. Update `/lib/contentful.ts` with new content types
3. Create sample content in Contentful for testing
4. Start replacing dummy data with real Contentful queries
5. Test and refine

## Environment Variables Required
```
CONTENTFUL_SPACE_ID=tpzjqap5g9yp
CONTENTFUL_ACCESS_TOKEN=[your-access-token]
CONTENTFUL_PREVIEW_ACCESS_TOKEN=[your-preview-token]
CONTENTFUL_ENVIRONMENT=master
```

## Notes for Future Development
- Consider implementing preview mode for Contentful
- Add webhook for automatic rebuilds on content changes
- Implement proper error boundaries for data fetching
- Consider edge caching strategy for better performance

---

*Last Updated: [Current Date]*
*This document should be updated as decisions change or implementation progresses.*