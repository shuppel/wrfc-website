# Changelog

All notable changes to the WRFC Website project are documented in this file.

## [Unreleased]

### Added
- Donate page with Zeffy payment integration
- Cherry Blossom Tournament (CBT) registration system
  - Registration form with team and player information
  - Payment processing integration
  - Confirmation page with confetti animation
  - Google Sheets API integration
  - CBT API utilities and documentation
- GitHub Actions auto-release workflow
- Hammerberg Foundation sponsor (in honor of Craig Hammerberg)
- Magners Cider sponsor
- Comprehensive Phosphor Icons documentation

### Changed
- Replaced all emoji icons with Phosphor Icons throughout navigation and components
- Updated Media dropdown order: Social Media → Film Room → Blog
- Updated sponsor information and logos
- Updated CLAUDE.md with Phosphor Icons usage guidelines
- Updated cursor rules with icon library specifications

### Removed
- Matet's Kitchen from sponsors
- Deprecated Contentful CMS documentation files
- MediaContent.backup.tsx

### Fixed
- All icon-related lint errors (Award → Medal, Building → Buildings, Mail → Envelope, etc.)
- Package.json conflicts during merge

## [0.1.1] - 2024-12-05

### Added
- SEO optimization improvements
- Coach profile updates with photos
- US Eagles Hall of Fame page
- Coaching Staff page
- Wiki links for players and coaches
- Discord links throughout pages

### Changed
- Updated game schedule views
- Improved player roster display
- Enhanced alt text and image SEO
- Refactored to use static/Next.js built-in content data instead of Contentful
- Updated schedule and scores

### Fixed
- Lint errors for escaped quotes and type any usage
- Dark mode contrast for roster
- Mobile menu size with accordions
- pnpm-lock.yaml for deployment build failures

## [0.1.0] - Initial Release

### Added
- Core website structure with Next.js App Router
- Responsive design with Tailwind CSS
- About section with history, hall of fame, championships
- Team pages with player rosters and coaching staff
- Schedule management (practice, games, events)
- Media section with film room and social media
- Alumni spotlights section
- Tournament management and registration
- Blog functionality
- Membership plans page
- Contact page
- SEO optimization with JSON-LD structured data
- Dark mode support with theme toggle
- Zeffy payment integration for memberships and donations
- Sponsor showcase page
- Executive committee page
- Event pages with details and registration
- Local SEO for regional rugby clubs
- Analytics integration with Vercel Analytics

### Technical Stack
- Next.js 14.2.30
- React 18.3.1
- TypeScript 5.7.3
- Tailwind CSS 3.4.17
- Phosphor Icons 2.1.10
- Radix UI components
- Framer Motion for animations
- Contentful CMS (later replaced with static data)
- Zeffy for payments
- Canvas Confetti for celebrations

### Features
- Responsive mobile-first design
- Dark/light mode switching
- Server-side rendering for performance
- Static site generation where possible
- SEO-friendly metadata on all pages
- Accessible UI components
- Smooth animations and transitions
- Payment processing integration
- Form validation with React Hook Form and Zod
