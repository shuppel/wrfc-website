import { Metadata } from 'next';

type PageKey = 
  | 'home'
  | 'about'
  | 'players'
  | 'schedule'
  | 'practice-schedule'
  | 'game-schedule'
  | 'events'
  | 'tournaments'
  | 'membership'
  | 'sponsors'
  | 'contact'
  | 'media'
  | 'blog'
  | 'donate';

interface PageSEOData {
  title: string;
  description: string;
  keywords: string[];
  imagePath: string;
  imageAlt?: string;
}

const pageSEOConfig: Record<PageKey, PageSEOData> = {
  home: {
    title: 'Washington Rugby Football Club | DC\'s Oldest Rugby Club, Founded 1963',
    description: 'Washington Rugby Football Club is the oldest rugby club in Washington, DC, founded in 1963. Men\'s D1, D3 and social sides train year-round in NE DC under former USA Eagles internationals. WRFC founded Washington DC Youth Rugby in 2004 and hosts the Cherry Blossom Tournament each spring. No experience required.',
    keywords: ['dc rugby', 'dc rugby club', 'dc rugby team', 'washington dc rugby', 'rugby dc', 'mens rugby dc', 'mens rugby washington', 'club mens rugby', 'washington rugby', 'rugby union', 'wrfc', 'join rugby team', 'mens rugby team dc', 'washington mens rugby', 'dc mens rugby club', 'how to join a rugby club in dc', 'rugby for beginners dc', 'adult rugby dc'],
    imagePath: '/assets/pictures/huddle_2025_irish.jpg',
    imageAlt: 'WRFC Men\'s Rugby Team Huddle'
  },
  about: {
    title: 'About WRFC | DC Rugby History & Tradition Since 1963',
    description: 'Washington Rugby Football Club was founded in February 1963, making it the oldest rugby club in the nation\'s capital. Founding member of the USA Rugby Super League in 1997, founder of Washington DC Youth Rugby in 2004, and host of the Cherry Blossom Tournament since 1968.',
    keywords: ['wrfc history', 'washington rugby history', 'dc rugby tradition', 'dc rugby history', 'rugby club history', 'dc rugby club history', 'oldest rugby club in dc'],
    imagePath: '/assets/pictures/team_photo.jpg',
    imageAlt: 'WRFC Team Photo'
  },
  players: {
    title: 'WRFC Team Players | Meet Our Players',
    description: 'Meet the Washington Rugby Football Club players and coaching staff. View individual player profiles and team information.',
    keywords: ['wrfc players', 'washington rugby team', 'rugby players', 'dc rugby players', 'player profiles'],
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
  'practice-schedule': {
    title: 'WRFC Practice Schedule | Training Times & Philosophy',
    description: 'View Washington Rugby Football Club practice schedule, training philosophy, and detailed session breakdown. Join our regular training sessions.',
    keywords: ['rugby practice', 'training schedule', 'wrfc practice', 'rugby training dc', 'practice times'],
    imagePath: '/assets/pictures/team_practice.jpg',
    imageAlt: 'WRFC Practice Session'
  },
  'game-schedule': {
    title: 'WRFC Game Schedule | Match Fixtures & Results',
    description: 'View Washington Rugby Football Club game schedule, upcoming fixtures, and match results for the current season.',
    keywords: ['rugby games', 'match schedule', 'wrfc fixtures', 'rugby matches dc', 'game results'],
    imagePath: '/assets/pictures/match_action.jpg',
    imageAlt: 'WRFC Match Action'
  },
  events: {
    title: 'WRFC Events & Tournaments | Annual Calendar',
    description: 'Explore WRFC annual events including 30 Under 30, Cherry Blossom Tournament, banquets, and international tours.',
    keywords: ['rugby events', 'wrfc tournaments', 'cherry blossom', 'rugby banquet', 'rugby tour'],
    imagePath: '/assets/pictures/tournament_action.jpg',
    imageAlt: 'WRFC Events and Tournaments'
  },
  tournaments: {
    title: 'Rugby Tournaments | WRFC Events & Championships',
    description: 'Washington Rugby Football Club has hosted the Cherry Blossom Tournament every spring since 1968. See the current edition, past results and archives from previous years.',
    keywords: ['rugby tournaments dc', 'cherry blossom rugby', 'cherry blossom tournament', 'rugby championships', 'wrfc tournaments', 'spring rugby tournament east coast'],
    imagePath: '/assets/pictures/tournament_action.jpg',
    imageAlt: 'WRFC Tournament Action'
  },
  membership: {
    title: 'Join DC Rugby | WRFC Membership & How to Get Started',
    description: 'How to join Washington Rugby Football Club: turn up to a training session in NE DC, no experience or kit required. Details on membership dues, what your first practice looks like, and who to contact.',
    keywords: ['join rugby club', 'rugby membership', 'wrfc registration', 'dc rugby join', 'join dc rugby', 'dc rugby membership', 'how to join a rugby club in dc', 'rugby for beginners dc', 'play rugby with no experience'],
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
  },
  blog: {
    title: 'Blog | WRFC News & Updates',
    description: 'Read the latest news, match reports, and updates from Washington Rugby Football Club. Stay informed about club activities, player features, and tournament coverage.',
    keywords: ['WRFC blog', 'rugby news', 'Washington rugby updates', 'match reports', 'rugby articles'],
    imagePath: '/assets/pictures/blog_hero.jpg',
    imageAlt: 'WRFC Blog'
  },
  donate: {
    title: 'Donate to WRFC | Support Washington Rugby',
    description: 'Support Washington Rugby Football Club with a tax-deductible donation. Help us continue our legacy of rugby excellence in DC and grow the sport in our community.',
    keywords: ['donate rugby', 'support wrfc', 'rugby donation', 'dc rugby support', 'nonprofit rugby', 'rugby fundraising'],
    imagePath: '/assets/pictures/huddle_2025_irish.jpg',
    imageAlt: 'Support WRFC'
  }
};

export function getPageSEO(pageKey: PageKey): PageSEOData {
  return pageSEOConfig[pageKey];
}

export function generateMetadata(pageKey: PageKey): Metadata {
  const seoData = getPageSEO(pageKey);
  const { title, description, keywords, imagePath, imageAlt } = seoData;
  const url = `https://washingtonrugby.org/${pageKey === 'home' ? '' : pageKey}`;

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

// Custom metadata generator for dynamic pages
export function generateSEOMetadata({ title, description, path }: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | Washington Rugby Football Club`;
  const url = `https://washingtonrugby.org${path}`;
  const imagePath = '/assets/pictures/wrfc_logo_og.jpg';
  
  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      images: [{
        url: imagePath,
        width: 1200,
        height: 630,
        alt: title
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
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
  const baseUrl = 'https://washingtonrugby.org';
  
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
    case 'players':
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