import { type Metadata } from 'next'

// Site URLs and routes for sitemap generation
export const siteConfig = {
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wrfc.org',
  routes: [
    { path: '/', priority: 1.0 },
    { path: '/about', priority: 0.8 },
    { path: '/roster', priority: 0.8 },
    { path: '/schedule', priority: 0.8 },
    { path: '/membership', priority: 0.8 },
    { path: '/tournaments/cherry-blossom', priority: 0.8 },
    { path: '/contact', priority: 0.8 },
    { path: '/privacy', priority: 0.5 }
  ]
} as const;

// Viewport configuration for Next.js 13+
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff'
};

// Default metadata configuration for Next.js 13+
export const defaultMetadata: Metadata = {
  title: {
    default: 'Washington Rugby Football Club | DC Premier Rugby Since 1963',
    template: '%s | WRFC - Washington Rugby Football Club'
  },
  description: 'Washington Rugby Football Club (WRFC) is DC\'s premier rugby club, established in 1963. Join us for competitive matches, social events, and a strong rugby community.',
  metadataBase: new URL(siteConfig.baseUrl),
  keywords: 'Rugby Club DC, Washington Rugby, WRFC, Rugby Team, Rugby Union, Cherry Blossom Tournament, Rugby Community, Sports Club DC, Rugby Training, Join Rugby Club',
  authors: [{ name: 'Washington Rugby Football Club' }],
  
  // Open Graph
  openGraph: {
    type: 'website',
    siteName: 'Washington Rugby Football Club',
    title: 'Washington Rugby Football Club | DC Premier Rugby Since 1963',
    description: 'Join DC\'s premier rugby club. WRFC offers competitive matches, expert coaching, and a strong community of rugby enthusiasts.',
    locale: 'en_US',
    url: siteConfig.baseUrl,
    images: [{
      url: '/images/wrfc-logo.png',
      width: 1200,
      height: 630,
      alt: 'Washington Rugby Football Club - DC Premier Rugby Since 1963'
    }]
  },

  // Robots and Verification
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },

  // Icons and Manifest
  icons: {
    icon: [{ url: '/images/wrfc-logo.png', type: 'image/png' }],
    shortcut: '/images/wrfc-logo.png',
    apple: '/images/wrfc-logo.png',
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' }
    ]
  },
  manifest: '/site.webmanifest',

  // Additional Metadata
  other: {
    'geo.region': 'US-DC',
    'geo.placename': 'Washington'
  }
}; 