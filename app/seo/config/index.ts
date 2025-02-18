import { type Metadata } from 'next'

// Site URLs and routes for sitemap generation
export const siteConfig = {
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nodetus.com',
  routes: [
    { path: '/', priority: 1.0 },
    { path: '/about', priority: 0.8 },
    { path: '/services', priority: 0.8 },
    { path: '/products', priority: 0.8 },
    { path: '/contact', priority: 0.8 },
    { path: '/privacy', priority: 0.5 },
    { path: '/playground', priority: 0.6 },
    // Games section
    { path: '/games/pong', priority: 0.7 },
    { path: '/games/snake', priority: 0.7 },
    { path: '/games/foia-quest', priority: 0.7 },
    { path: '/games/scif', priority: 0.7 }
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
    default: 'Nodetus Integrators | Federal IT Consulting, Market Research & Digital Transformation',
    template: '%s | Nodetus - Strategic Federal IT Solutions'
  },
  description: 'Minority-owned federal IT consulting firm specializing in Strategic Planning, Market Research, Technical Writing, Human-Centered Design, Product Management, and IT Modernization for Federal Health IT and Civilian Agencies.',
  metadataBase: new URL(siteConfig.baseUrl),
  keywords: 'Federal IT Consulting, Health IT, Market Research, Technical Writing, Human Centered Design, Product Management, FinOps, IT Spend Management, IT Modernization, Digital Transformation, Procurement Innovation, Industrial Psychology, Minority Owned Business, Small Business, Asian Owned Business, Federal Contractor, Government Contractor',
  authors: [{ name: 'Nodetus Integrators LLC' }],
  
  // Open Graph
  openGraph: {
    type: 'website',
    siteName: 'Nodetus Integrators - Federal IT Solutions',
    title: 'Nodetus Integrators | Strategic Federal IT Consulting',
    description: 'Minority-owned federal IT consulting firm delivering strategic solutions in Market Research, Technical Writing, and Digital Transformation for Federal Health IT and Civilian Agencies.',
    locale: 'en_US',
    url: siteConfig.baseUrl,
    images: [{
      url: '/assets/node_logo_paper_feel_webclip.png',
      width: 1200,
      height: 630,
      alt: 'Nodetus Integrators - Strategic Federal IT Solutions'
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
    icon: [{ url: '/assets/node_logo_paper_feel_webclip.png', type: 'image/png' }],
    shortcut: '/assets/node_logo_paper_feel_webclip.png',
    apple: '/assets/node_logo_paper_feel_webclip.png',
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' }
    ]
  },
  manifest: '/site.webmanifest',

  // Additional Metadata
  other: {
    'geo.region': 'US-VA',
    'geo.placename': 'Arlington'
  }
}; 