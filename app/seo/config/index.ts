import { type Metadata } from 'next'

export const defaultMetadata: Metadata = {
  title: {
    default: 'Nodetus Integrators LLC',
    template: '%s | Nodetus - No-nonsense IT Advisory'
  },
  description: 'Strategic IT Advisory services specializing in Market Research, Technical Writing, Human Centered Design, Product Management, and IT Modernization. [Sense of humor included]',
  metadataBase: new URL('https://www.nodetus.com'),
  openGraph: {
    title: 'Nodetus Integrators LLC',
    description: 'Strategic IT Advisory services specializing in Market Research, Technical Writing, Human Centered Design, Product Management, and IT Modernization.',
    url: 'https://www.nodetus.com',
    siteName: 'Nodetus Integrators LLC',
    locale: 'en_US',
    type: 'website',
  },
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
  icons: {
    icon: [{ url: '/assets/node_logo_paper_feel_webclip.png', type: 'image/png' }],
    shortcut: '/assets/node_logo_paper_feel_webclip.png',
    apple: '/assets/node_logo_paper_feel_webclip.png',
  },
}

export const routes = [
  { path: '/', priority: 1.0 },
  { path: '/about', priority: 0.8 },
  { path: '/services', priority: 0.8 },
  { path: '/services/market-research', priority: 0.8 },
  { path: '/services/technical-writing', priority: 0.8 },
  { path: '/services/human-centered-design', priority: 0.8 },
  { path: '/services/product-management', priority: 0.8 },
  { path: '/services/it-modernization', priority: 0.8 },
  { path: '/services/procurement-innovation', priority: 0.8 },
  { path: '/white-papers', priority: 0.8 },
  { path: '/contact', priority: 0.8 },
] 