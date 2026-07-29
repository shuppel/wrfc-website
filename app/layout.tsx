import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ArticleDrawerWrapper from '../components/layout/ArticleDrawerWrapper'
import { ThemeProvider } from '../contexts/ThemeContext'
import './globals.css'
import { Inter } from 'next/font/google'
import { Bebas_Neue, Titillium_Web, Quantico } from 'next/font/google'
import { OrganizationJsonLd, WebsiteJsonLd } from '../components/JsonLd'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const bebasNeue = Bebas_Neue({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
})
const titilliumWeb = Titillium_Web({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-titillium-web',
})
const quantico = Quantico({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-quantico',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://washingtonrugby.org'),
  applicationName: 'Washington Rugby Football Club',
  title: {
    default: 'Washington Rugby Football Club | DC\'s Oldest Rugby Club, Founded 1963',
    template: '%s | WRFC - DC Rugby'
  },
  description: 'Washington Rugby Football Club is the oldest rugby club in Washington, DC, founded in 1963. We field D1, D3 and social sides, train year-round in NE DC, are coached by former USA Eagles internationals, and founded Washington DC Youth Rugby in 2004. No experience required to join.',
  keywords: [
    'dc rugby', 'washington dc rugby', 'rugby dc', 'dc rugby club', 'washington rugby', 'wrfc',
    'washington rfc', 'rugby club', 'sports team', 'DC sports', 'dc rugby team',
    'rugby union', 'usa rugby', 'rugby training', 'rugby matches', 'dc rugby games',
    'rugby community', 'washington sports', 'rugby tournaments',
    'how to join a rugby club in dc', 'rugby for beginners dc', 'adult rugby dc',
    'play rugby washington dc', 'rugby near me dc'
  ],
  authors: [{ name: 'Washington Rugby Football Club' }],
  creator: 'Washington Rugby Football Club',
  publisher: 'Washington Rugby Football Club',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://washingtonrugby.org',
    siteName: 'Washington Rugby FC',
    title: 'Washington Rugby Football Club | DC\'s Oldest Rugby Club, Founded 1963',
    description: 'DC\'s oldest rugby club, founded 1963. D1, D3 and social sides, year-round training in NE DC, coaching from former USA Eagles internationals, and the club that founded Washington DC Youth Rugby. New players welcome.',
    images: [
      {
        url: '/logos/wrfc_logo.png',
        width: 1200,
        height: 630,
        alt: 'Washington Rugby Football Club - DC\'s First Rugby Club',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Washington Rugby Football Club | DC\'s Oldest Rugby Club, Founded 1963',
    description: 'DC\'s oldest rugby club, founded 1963. D1, D3 and social sides, year-round training in NE DC, coaching from former USA Eagles internationals, and the club that founded Washington DC Youth Rugby. New players welcome.',
    images: ['/logos/wrfc_logo.png'],
    creator: '@WRFC_DC',
    site: '@WRFC_DC',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      {
        url: '/logos/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        url: '/logos/icon.png',
        sizes: '32x32',
        type: 'image/png',
      }
    ],
    apple: {
      url: '/logos/apple-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
    other: [
      {
        rel: 'mask-icon',
        url: '/logos/icon.png',
        color: '#003366',
      }
    ],
  },
  category: 'sports',
  verification: {
    google: 'YOUR-GOOGLE-VERIFICATION-ID', // You'll need to add this
  },
  other: {
    'geo.region': 'US-DC',
    'geo.placename': 'Washington',
    'geo.position': '38.9072;-77.0369',
    'ICBM': '38.9072, -77.0369'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <script async src="https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js"></script>
      </head>
      <body className={`${inter.variable} ${bebasNeue.variable} ${titilliumWeb.variable} ${quantico.variable} font-sans min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col`}>
        <meta name="application-name" content="Washington Rugby Football Club" />
        <ThemeProvider>
          <Header />
          <main className="flex-grow pt-24">
            {children}
          </main>
          <Footer />
          <ArticleDrawerWrapper />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
} 