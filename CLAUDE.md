# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WRFC-website is a Next.js web application for the Washington Rugby Football Club. It's built using Next.js App Router architecture with TypeScript and styled using TailwindCSS. The website includes features like club information, roster listings, schedule management, tournament registration, and Zeffy payment integration.

## Commands

### Development

- **Start development server**: `npm run dev`
- **Build production version**: `npm run build`
- **Start production server**: `npm run start`
- **Lint code**: `npm run lint`

### Docker

Docker is configured for this project with a Docker Compose setup:

- **Start Docker development environment**: `docker-compose up` 

## Architecture

### Next.js App Router

This project uses Next.js App Router architecture:
- `/app` - Contains page routes with the file-based routing system
- Each route folder has a `page.tsx` file that defines the route's content
- Layout components (`layout.tsx`) define the structure around page content

### Key Components

The codebase is organized into several main sections:

1. **UI Components** (`/components/ui/`) - Reusable UI elements like buttons, cards, and dialogs
2. **Layout Components** (`/components/layout/`) - Page structure elements like Header and Footer 
3. **Feature Components** (`/components/feature/`) - Business logic components for features like payments, promotions, and tournament registration
4. **Page Routes** (`/app/`) - Routes for different sections of the website (e.g., membership, tournaments, roster)

### State Management

- Uses React's built-in state management with Context API (see `contexts/ThemeContext.tsx`)
- No global state management library

### SEO Implementation

The project has a strong focus on SEO:
- SEO data utilities in `/utils/seo.ts` for metadata generation
- JSON-LD structured data in components like `JsonLd.tsx`
- Each page includes appropriate metadata for search engines

### Payment Processing

- Integrates with Zeffy for payment processing (100% free for nonprofits)
- Uses external Zeffy payment links for all transactions
- Payment links configured in `/data/zeffy-links.ts`
- Component implementation in `/components/ZeffyPaymentButton.tsx`

## File Structure Highlights

- `/app` - Next.js App Router pages and layouts
- `/components` - React components organized by type and feature
- `/contexts` - React Context providers
- `/data` - Static data files and configurations
- `/lib` - Utility libraries and helper functions
- `/public` - Static assets, images, and logos
- `/seo` - SEO-related components and utilities
- `/types` - TypeScript type definitions
- `/utils` - General utility functions

## Content Management System

The website uses Contentful as a headless CMS to manage dynamic content. The following content types are defined:

1. **Blog Posts** - Blog articles with rich text content, featured images, authors, and tags
2. **Player Profiles** - Roster and player information including position, stats, and biographical data
3. **Membership Plans** - Different membership options with benefits and pricing

### Contentful Integration

- CMS client and API functions are in `/lib/contentful.ts`
- Rich text rendering is handled by `/lib/rich-text.tsx`
- Content fetching happens at build time using getStaticProps or at request time using server components

### Environment Setup

To work with the CMS, you need to set up the following environment variables:
```
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
CONTENTFUL_ENVIRONMENT=master
```

## Icons

This project uses **Phosphor Icons** (`@phosphor-icons/react`) as the icon library. Do NOT use Lucide React, Heroicons, or other icon libraries.

### Phosphor Icons Usage

**For client components** (`'use client'`):
```tsx
import { Trophy, Users, Calendar } from '@phosphor-icons/react';
```

**For server components** (default in App Router):
```tsx
import { Trophy, Users, Calendar } from '@phosphor-icons/react/dist/ssr';
```

### Common Icon Name Mappings

Phosphor uses different naming conventions than other libraries. Here are common mappings:

| Other Libraries | Phosphor Equivalent |
|-----------------|---------------------|
| `Mail`, `Email` | `Envelope` |
| `ExternalLink` | `ArrowSquareOut` |
| `Building` | `Buildings` |
| `Award`, `Medal` | `Trophy` or `Medal` |
| `School` | `GraduationCap` |
| `Youtube` | `YoutubeLogo` |
| `Instagram` | `InstagramLogo` |
| `Search` | `MagnifyingGlass` |
| `Filter` | `Funnel` |
| `MessageCircle` | `ChatCircle` |
| `Share2` | `ShareNetwork` |
| `Quote` | `Quotes` |
| `ClipboardList` | `ClipboardText` |
| `Smartphone` | `DeviceMobile` |
| `Banknote` | `Money` |
| `History` | `ClockCounterClockwise` |
| `DollarSign` | `CurrencyDollar` |

### Icon Sizing

Use Tailwind classes for sizing:
```tsx
<Trophy className="w-6 h-6" />  // 24px
<Trophy className="w-8 h-8" />  // 32px
```

### Finding Icons

Browse all available Phosphor icons at: https://phosphoricons.com/

## Working with the Codebase

When making changes:
1. Follow the existing project structure and patterns
2. Use TypeScript for all new code
3. Utilize TailwindCSS for styling following the project's design system
4. Maintain SEO best practices for any new or modified pages
5. Use the Zeffy payment integration for any payment-related features
6. Add new content types to Contentful when extending dynamic content
7. **Use Phosphor Icons** (`@phosphor-icons/react`) for all icons - never use Lucide, Heroicons, or other icon libraries

The codebase follows a component-based approach with a clear separation of UI components, layout elements, and feature implementations. For dynamic content, use the Contentful integration rather than hardcoding data.