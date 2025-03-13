import { Metadata } from 'next';

type PageKey = 
  | 'home'
  | 'about'
  | 'roster'
  | 'schedule'
  | 'tournaments'
  | 'membership'
  | 'sponsors'
  | 'contact'
  | 'media';

interface PageSEOData {
  title: string;
  description: string;
  keywords: string[];
  imagePath: string;
  imageAlt?: string;
}

const pageSEOConfig: Record<PageKey, PageSEOData> = {
  home: {
    title: 'Washington Rugby Football Club | DC Premier Rugby Since 1963',
    description: 'Join DC\'s premier rugby club. WRFC offers competitive matches, expert coaching, and a strong community of rugby enthusiasts since 1963.',
    keywords: ['washington rugby', 'dc rugby club', 'rugby union', 'wrfc', 'join rugby team'],
    imagePath: '/assets/pictures/huddle_2025_irish.jpg',
    imageAlt: 'WRFC Team Huddle'
  },
  about: {
    title: 'About WRFC | History & Tradition Since 1963',
    description: 'Learn about Washington Rugby Football Club\'s rich history, traditions, and commitment to excellence in rugby since 1963.',
    keywords: ['wrfc history', 'washington rugby history', 'dc rugby tradition', 'rugby club history'],
    imagePath: '/assets/pictures/team_photo.jpg',
    imageAlt: 'WRFC Team Photo'
  },
  roster: {
    title: 'WRFC Team Roster | Meet Our Players',
    description: 'Meet the Washington Rugby Football Club players and coaching staff. View our current roster and team leadership.',
    keywords: ['wrfc players', 'washington rugby team', 'rugby roster', 'dc rugby players'],
    imagePath: '/assets/pictures/team_roster.jpg',
    imageAlt: 'WRFC Players'
  },
  schedule: {
    title: 'WRFC Match Schedule | Upcoming Games & Events',
    description: 'View Washington Rugby Football Club\'s match schedule, upcoming games, and rugby events in the DC area.',
    keywords: ['rugby schedule', 'dc rugby matches', 'rugby games dc', 'wrfc calendar'],
    imagePath: '/assets/pictures/match_action.jpg',
    imageAlt: 'WRFC Match Action'
  },
  tournaments: {
    title: 'Rugby Tournaments | WRFC Events & Championships',
    description: 'Explore WRFC\'s tournament schedule, including our famous Cherry Blossom Tournament and other rugby competitions.',
    keywords: ['rugby tournaments dc', 'cherry blossom rugby', 'rugby championships', 'wrfc tournaments'],
    imagePath: '/assets/pictures/tournament_action.jpg',
    imageAlt: 'WRFC Tournament Action'
  },
  membership: {
    title: 'Join WRFC | Rugby Club Membership',
    description: 'Become a member of Washington Rugby Football Club. Learn about membership benefits, dues, and how to join our rugby community.',
    keywords: ['join rugby club', 'rugby membership', 'wrfc registration', 'dc rugby join'],
    imagePath: '/assets/pictures/team_practice.jpg',
    imageAlt: 'WRFC Team Practice'
  },
  sponsors: {
    title: 'WRFC Sponsors | Support Washington Rugby',
    description: 'Meet our valued sponsors and learn how to support Washington Rugby Football Club. Partnership opportunities available.',
    keywords: ['rugby sponsors', 'wrfc partners', 'rugby sponsorship', 'support rugby dc'],
    imagePath: '/assets/pictures/sponsor_banner.jpg',
    imageAlt: 'WRFC Sponsors'
  },
  contact: {
    title: 'Contact WRFC | Get in Touch',
    description: 'Contact Washington Rugby Football Club. Reach out about joining, sponsorship, or general inquiries.',
    keywords: ['contact wrfc', 'rugby club contact', 'dc rugby contact', 'rugby information'],
    imagePath: '/assets/pictures/club_house.jpg',
    imageAlt: 'WRFC Contact'
  },
  media: {
    title: 'WRFC Media | Photos, Videos & News',
    description: 'Browse Washington Rugby Football Club media gallery, news updates, match highlights, and photo collections.',
    keywords: ['rugby photos', 'wrfc media', 'rugby videos', 'dc rugby news'],
    imagePath: '/assets/pictures/media_gallery.jpg',
    imageAlt: 'WRFC Media Gallery'
  }
};

export function getPageSEO(pageKey: PageKey): PageSEOData {
  return pageSEOConfig[pageKey];
}

export function generateMetadata(pageKey: PageKey): Metadata {
  const seoData = getPageSEO(pageKey);
  const { title, description, keywords, imagePath, imageAlt } = seoData;
  const url = `https://wrfc.org/${pageKey === 'home' ? '' : pageKey}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      images: [{
        url: imagePath,
        width: 1200,
        height: 630,
        alt: imageAlt || title
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imagePath],
      creator: '@WRFC_DC',
      site: '@WRFC_DC'
    },
    alternates: {
      canonical: url
    }
  };
}

export function getStructuredData(pageKey: PageKey, additionalData?: Record<string, unknown>) {
  const seoData = getPageSEO(pageKey);
  const baseUrl = 'https://wrfc.org';
  
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: seoData.title,
    description: seoData.description,
    url: `${baseUrl}/${pageKey === 'home' ? '' : pageKey}`,
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}${seoData.imagePath}`,
      width: 1200,
      height: 630,
      caption: seoData.imageAlt || seoData.title
    },
    ...additionalData
  };

  // Add specific structured data based on page type
  switch(pageKey) {
    case 'schedule':
      return {
        ...baseStructuredData,
        '@type': 'SportsEvent',
        location: {
          '@type': 'Place',
          name: 'Washington DC Area Rugby Fields',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Washington',
            addressRegion: 'DC',
            addressCountry: 'US'
          }
        }
      };
    case 'roster':
      return {
        ...baseStructuredData,
        '@type': 'SportsTeam',
        sport: {
          '@type': 'Sport',
          name: 'Rugby'
        },
        member: Array.isArray(additionalData?.players) ? additionalData.players : []
      };
    case 'tournaments':
      return {
        ...baseStructuredData,
        '@type': 'Event',
        eventStatus: 'https://schema.org/EventScheduled',
        organizer: {
          '@type': 'SportsOrganization',
          name: 'Washington Rugby Football Club',
          url: baseUrl
        }
      };
    default:
      return baseStructuredData;
  }
} 