# WRFC Website Technical Specification

**Version**: 1.0  
**Date**: January 2025  
**Status**: Draft

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Technology Stack](#technology-stack)
3. [Infrastructure & Services](#infrastructure--services)
4. [Data Architecture](#data-architecture)
5. [Player Management System](#player-management-system)
6. [API Strategy](#api-strategy)
7. [Security Considerations](#security-considerations)
8. [Performance Requirements](#performance-requirements)
9. [Analytics & Marketing](#analytics--marketing)
10. [Development Workflow](#development-workflow)
11. [Cost Analysis](#cost-analysis)
12. [Risk Assessment](#risk-assessment)
13. [Implementation Roadmap](#implementation-roadmap)

## Executive Summary

The Washington Rugby Football Club (WRFC) website is a modern web application built with Next.js 14, designed to serve as the primary digital presence for the club. The application provides comprehensive features including:

- Club information and history
- Player profiles with detailed statistics
- Match schedules and live results
- Event management and registration
- Membership services with integrated payments
- Media hub (blog, videos, social media)
- Tournament information and registration

The system is designed to be maintainable by non-technical staff while providing advanced features for player management and real-time updates.

## Technology Stack

### Frontend
- **Framework**: Next.js 14.2.24 (App Router)
- **Language**: TypeScript 5.7.3
- **Styling**: TailwindCSS 3.4.17
- **UI Components**: 
  - Radix UI (primitives)
  - Custom components with shadcn/ui patterns
- **State Management**: React Context API
- **Animations**: Framer Motion 12.4.7
- **Forms**: React Hook Form 7.54.2 with Zod 3.24.2 validation
- **Date Handling**: date-fns 4.1.0

### Content Management
- **CMS**: Contentful (Headless CMS)
- **Rich Text**: Contentful Rich Text Renderer 16.0.1
- **Media**: 
  - Progressive image loading
  - YouTube integration via react-youtube
  - Instagram embeds

### Backend Services
- **Auth & Player Data**: Jazz.tools (collaborative state management)
- **Payment Processing**: Zeffy (100% free for nonprofits)
- **Contact Forms**: Formspree
- **Email Notifications**: Nodemailer (for automated emails)

### Infrastructure
- **Hosting**: Vercel (Frontend & API routes)
- **Version Control**: GitHub
- **Domain/DNS**: GoDaddy
- **SSL**: Provided by Vercel
- **CDN**: Vercel Edge Network
- **Analytics**: 
  - Vercel Analytics
  - Google Analytics 4
  - Google Ads conversion tracking

## Infrastructure & Services

### Resource Inventory

| Service | Purpose | Cost | Status | Notes |
|---------|---------|------|--------|-------|
| **Vercel** | Frontend hosting & API routes | Free tier | Active | Pro tier if >100GB bandwidth |
| **GitHub** | Code repository | Free | Active | Private repo |
| **GoDaddy** | Domain & DNS | ~$20/year | Active | wrfc.com domain |
| **Contentful** | CMS for editorial | Free tier | Active | 10k records, 2 locales |
| **Jazz Cloud** | Player data & auth | Free (alpha) | Proposed | Future pricing TBD |
| **Zeffy** | Payment processing | Free | Implemented | 100% free for nonprofits |
| **Formspree** | Contact forms | Free tier | Active | 50 submissions/month |
| **Google Analytics** | User analytics | Free | Proposed | GA4 implementation |
| **Google Ads** | Marketing/conversions | Pay-per-click | Proposed | Optional for campaigns |

### Environment Variables

```env
# Contentful
CONTENTFUL_SPACE_ID=tpzjqap5g9yp
CONTENTFUL_ACCESS_TOKEN=***
CONTENTFUL_PREVIEW_ACCESS_TOKEN=***
CONTENTFUL_ENVIRONMENT=master

# Jazz
JAZZ_PROJECT_ID=***
JAZZ_SYNC_URL=wss://cloud.jazz.tools

# Formspree
NEXT_PUBLIC_FORMSPREE_FORM_ID=***

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=***
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-***
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-***

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=***
SMTP_PASS=***

# API Integration (Future)
RUGBY_API_KEY=***
RUGBY_API_URL=***
```

## Data Architecture

### Contentful Models (Editorial Content)

1. **Blog Post**
   - Title, slug, content (rich text)
   - Author (reference), tags, category
   - Featured image, excerpt
   - Published date, updated date

2. **Match**
   - Title, slug, match type
   - Date/time, venue (reference)
   - Home/away teams (references)
   - Scores, status (scheduled/final/postponed)
   - Match report (rich text)
   - Highlights URL

3. **Team**
   - Name, slug, logo
   - City, division (D1/D2/D3/D4)
   - Is WRFC team (boolean)

4. **Venue**
   - Name, slug, address
   - Google Maps URL
   - Parking information

5. **Tournament**
   - Name, slug, year
   - Start/end dates
   - Description, schedule
   - Registration link (Zeffy)
   - Active status

6. **Event**
   - Title, slug, type
   - Date/time, location
   - Description, registration link
   - Featured status

7. **Alumni Spotlight**
   - Name, slug, photo
   - Years played, current role
   - Story, quote
   - Featured status

### Hardcoded Data

```typescript
// /data/coaches.ts
interface Coach {
  id: string;
  name: string;
  role: string;
  teams: ('D1' | 'D2' | 'D3' | 'D4')[];
  email?: string;
  phone?: string;
  bio?: string;
  image?: string;
  certifications?: string[];
}

// /data/membership.ts
interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  frequency: 'annual' | 'monthly';
  benefits: string[];
  zeffyLink: string;
  popular?: boolean;
}
```

## Player Management System

### Jazz.tools Schema

```typescript
// Season definition
const Season = co.map({
  id: z.string(),
  year: z.number(),
  name: z.string(), // e.g., "Spring 2024", "Fall 2024"
  startDate: z.date(),
  endDate: z.date(),
  isActive: z.boolean()
});

// Comprehensive player statistics
const PlayerSeasonStats = co.map({
  seasonId: z.string(),
  division: z.enum(['D1', 'D2', 'D3', 'D4']),
  
  // Match statistics
  gamesPlayed: z.number().default(0),
  gamesStarted: z.number().default(0),
  minutesPlayed: z.number().default(0),
  
  // Scoring statistics
  tries: z.number().default(0),
  conversions: z.number().default(0),
  penaltyGoals: z.number().default(0),
  dropGoals: z.number().default(0),
  totalPoints: z.number().default(0),
  
  // Forward-specific stats
  scrums: z.number().default(0),
  lineouts: z.number().default(0),
  lineoutsSteals: z.number().default(0),
  
  // Back-specific stats
  metersRun: z.number().default(0),
  tackles: z.number().default(0),
  tacklesMissed: z.number().default(0),
  turnovers: z.number().default(0),
  
  // Discipline
  yellowCards: z.number().default(0),
  redCards: z.number().default(0),
  penalties: z.number().default(0),
  
  // Awards
  manOfTheMatch: z.number().default(0),
  
  // Metadata
  lastUpdated: z.date(),
  updatedBy: z.string() // user ID
});

// Player profile
const Player = co.map({
  // Basic info
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  
  // Rugby info
  position: z.enum([
    'Loosehead Prop', 'Hooker', 'Tighthead Prop',
    'Lock', 'Blindside Flanker', 'Openside Flanker', 'Number 8',
    'Scrum Half', 'Fly Half', 'Inside Centre', 'Outside Centre',
    'Left Wing', 'Right Wing', 'Fullback'
  ]),
  secondaryPosition: z.enum([...]).optional(),
  jerseyNumber: z.number().min(1).max(99).optional(),
  
  // Physical attributes
  height: z.string(), // e.g., "6'2" or "188cm"
  weight: z.string(), // e.g., "220lbs" or "100kg"
  
  // Background
  hometown: z.string(),
  college: z.string().optional(),
  previousClubs: z.array(z.string()),
  
  // WRFC info
  joinedDate: z.date(),
  currentDivision: z.enum(['D1', 'D2', 'D3', 'D4']),
  isActive: z.boolean(),
  
  // Media
  profilePhoto: co.ref(ImageDefinition),
  actionPhotos: z.array(co.ref(ImageDefinition)),
  
  // Stats by season
  seasonStats: z.array(PlayerSeasonStats),
  careerStats: PlayerSeasonStats, // Aggregated
  
  // Bio & achievements
  bio: z.string(),
  achievements: z.array(z.string()),
  
  // Social media
  socialMedia: z.object({
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    strava: z.string().optional()
  }),
  
  // Permissions
  canEditOwnProfile: z.boolean().default(true),
  isProfilePublic: z.boolean().default(true),
  
  // Metadata
  createdAt: z.date(),
  updatedAt: z.date(),
  lastLoginAt: z.date().optional()
});

// Match performance (for detailed stats)
const MatchPerformance = co.map({
  matchId: z.string(),
  playerId: z.string(),
  seasonId: z.string(),
  
  // Performance data
  minutesPlayed: z.number(),
  position: z.string(),
  jerseyNumber: z.number(),
  
  // Stats (subset of season stats)
  tries: z.number().default(0),
  conversions: z.number().default(0),
  // ... other relevant match stats
  
  rating: z.number().min(1).max(10).optional(),
  notes: z.string().optional()
});
```

## API Strategy

### External Rugby Data APIs

To integrate with rugby statistics and match data services:

1. **USA Rugby API** (if available)
   - Player registrations
   - Match results
   - Competition standings

2. **Rugby Stats API** (third-party)
   - Live match data
   - Historical statistics
   - Player rankings

### API Integration Architecture

```typescript
// /lib/api/rugby-api.ts
interface RugbyAPIClient {
  // Match data
  getMatchResults(matchId: string): Promise<MatchResult>;
  getLiveScore(matchId: string): Promise<LiveScore>;
  
  // Player data
  getPlayerStats(playerId: string, season: string): Promise<PlayerStats>;
  syncPlayerRegistration(playerId: string): Promise<Registration>;
  
  // Competition data
  getStandings(division: string, season: string): Promise<Standings>;
  getFixtures(teamId: string): Promise<Fixture[]>;
}

// Webhook endpoints for real-time updates
// /app/api/webhooks/rugby/route.ts
POST /api/webhooks/rugby/match-update
POST /api/webhooks/rugby/registration-update
```

### Data Synchronization Strategy

1. **Player Stats**: Bi-directional sync between Jazz and external API
2. **Match Results**: One-way sync from external API to Contentful
3. **Registration Status**: Real-time validation against USA Rugby
4. **Live Scores**: WebSocket connection for real-time updates

## Security Considerations

### Authentication & Authorization
- **Player Auth**: Jazz.tools with passkeys/social login
- **Admin Auth**: Separate admin panel with role-based access
- **API Security**: API key rotation, rate limiting
- **Content Security**: Contentful webhook signatures

### Data Protection
- **PII Handling**: Player emails/phones encrypted at rest
- **GDPR Compliance**: Data export/deletion capabilities
- **Payment Security**: All payment data handled by Zeffy
- **Session Management**: Secure, httpOnly cookies

### Security Headers
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com;"
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
];
```

## Performance Requirements

### Core Web Vitals Targets
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTFB** (Time to First Byte): < 600ms

### Performance Optimizations
1. **Image Optimization**
   - Next.js Image component
   - WebP format with fallbacks
   - Lazy loading
   - Blur placeholders

2. **Code Splitting**
   - Route-based splitting
   - Dynamic imports for heavy components
   - Tree shaking unused code

3. **Caching Strategy**
   - Static pages: 1 year cache
   - API routes: 5 minute cache
   - Player data: Real-time (no cache)
   - Match results: 1 minute cache during live games

## Analytics & Marketing

### Google Analytics 4 Implementation

```typescript
// /lib/gtag.ts
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views
export const pageview = (url: string) => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
```

### Key Events to Track
1. **User Engagement**
   - Page views
   - Scroll depth
   - Time on page
   - Video plays

2. **Conversions**
   - Membership sign-ups
   - Event registrations
   - Tournament registrations
   - Contact form submissions

3. **Player Portal**
   - Profile updates
   - Stats views
   - Photo uploads

### Google Ads Integration

```typescript
// Conversion tracking
export const trackConversion = (conversionId: string, value?: number) => {
  window.gtag('event', 'conversion', {
    send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/${conversionId}`,
    value: value,
    currency: 'USD'
  });
};

// Key conversions
- Membership purchase: 'membership_purchase'
- Tournament registration: 'tournament_signup'
- Event RSVP: 'event_registration'
```

## Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build
```

### Git Workflow
1. **Branches**
   - `main`: Production branch
   - `develop`: Development branch
   - `feature/*`: Feature branches
   - `hotfix/*`: Emergency fixes

2. **Commit Convention**
   ```
   type(scope): description
   
   Types: feat, fix, docs, style, refactor, test, chore
   ```

### Deployment Pipeline
1. **Preview**: Automatic on PR (Vercel)
2. **Staging**: Deploy from `develop` branch
3. **Production**: Deploy from `main` branch
4. **Rollback**: Vercel instant rollback

## Cost Analysis

### Monthly Costs (Estimated)

| Service | Free Tier | Paid Tier | Current Cost |
|---------|-----------|-----------|--------------|
| **Vercel** | 100GB bandwidth | $20/month Pro | $0 |
| **GitHub** | Unlimited public | $4/user private | $0 |
| **GoDaddy** | N/A | ~$20/year | $1.67 |
| **Contentful** | 10k records | $300/month | $0 |
| **Jazz** | Alpha (free) | TBD | $0 |
| **Zeffy** | Always free | N/A | $0 |
| **Formspree** | 50 submissions | $10/month | $0 |
| **Google Analytics** | Always free | N/A | $0 |
| **Google Ads** | Pay per click | Varies | Variable |
| **Total** | | | **$1.67** |

### Scaling Considerations
- **Traffic**: Free tiers support ~10k monthly users
- **Storage**: 5GB media storage included
- **API Calls**: 100k/month sufficient for current needs

## Risk Assessment

### Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Jazz.tools instability | High | Medium | Keep Contentful for critical data |
| API integration failure | Medium | Low | Implement fallback data sources |
| Traffic spike | Medium | Medium | CDN caching, rate limiting |
| Data loss | High | Low | Regular backups, version control |
| Security breach | High | Low | Regular updates, security audits |

### Business Risks
1. **Vendor Lock-in**: Mitigated by using standard formats
2. **Cost Overrun**: Monitor usage, set alerts
3. **Technical Debt**: Regular refactoring cycles
4. **Skill Gap**: Documentation, training materials

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4)
- [x] Remove Square, implement Zeffy
- [x] Set up Contentful environment
- [x] Create media section structure
- [ ] Define all Contentful models
- [ ] Create sample content
- [ ] Implement basic pages

### Phase 2: Content Management (Weeks 5-8)
- [ ] Build dynamic pages with Contentful
- [ ] Implement blog with filtering
- [ ] Create match schedule system
- [ ] Add event management
- [ ] Tournament registration flow

### Phase 3: Player Portal (Weeks 9-12)
- [ ] Implement Jazz.tools integration
- [ ] Create player registration flow
- [ ] Build profile management UI
- [ ] Add statistics tracking
- [ ] Enable photo uploads

### Phase 4: Advanced Features (Weeks 13-16)
- [ ] API integration for live scores
- [ ] Real-time match updates
- [ ] Advanced statistics dashboard
- [ ] Mobile app considerations
- [ ] Performance optimization

### Phase 5: Launch Preparation (Weeks 17-20)
- [ ] Security audit
- [ ] Performance testing
- [ ] SEO optimization
- [ ] Analytics setup
- [ ] Training materials
- [ ] Soft launch with beta users

### Phase 6: Post-Launch (Ongoing)
- [ ] Monitor performance
- [ ] Gather user feedback
- [ ] Iterative improvements
- [ ] Feature additions
- [ ] Scale infrastructure as needed

## Appendices

### A. Technology Decision Log
- **Next.js over Gatsby**: Better for dynamic content
- **Jazz over Supabase**: Real-time sync, offline-first
- **Zeffy over Stripe**: 100% free for nonprofits
- **Contentful over Strapi**: Better free tier, ecosystem

### B. API Documentation Links
- [Contentful API](https://www.contentful.com/developers/docs/)
- [Jazz.tools Docs](https://jazz.tools/docs)
- [Zeffy Integration](https://www.zeffy.com/en-us/developers)
- [Google Analytics 4](https://developers.google.com/analytics)

### C. Compliance Requirements
- GDPR compliance for EU visitors
- CCPA compliance for California residents
- Accessibility (WCAG 2.1 AA)
- USA Rugby data handling requirements

---

**Document Version**: 1.0  
**Last Updated**: January 2025  
**Next Review**: March 2025  
**Owner**: WRFC Technical Team