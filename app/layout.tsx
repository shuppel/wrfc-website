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
    default: 'Washington Rugby Football Club | DC\'s First Rugby Club',
    template: '%s | Washington Rugby Football Club'
  },
  description: 'Washington Rugby Football Club (WRFC) is DC\'s premier rugby club, established in 1963. Join us for competitive matches, expert coaching, and a strong community of rugby enthusiasts.',
  keywords: [
    'rugby', 'washington rugby', 'washington dc rugby', 'wrfc', 
    'washington rfc', 'rugby club', 'sports team', 'DC sports',
    'rugby union', 'usa rugby', 'rugby training', 'rugby matches',
    'rugby community', 'washington sports', 'rugby tournaments'
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
  alternates: {
    canonical: 'https://washingtonrugby.org'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://washingtonrugby.org',
    siteName: 'Washington Rugby FC',
    title: 'Washington Rugby Football Club | DC\'s First Rugby Club',
    description: 'Join DC\'s premier rugby club. WRFC offers competitive matches, expert coaching, and a strong community of rugby enthusiasts since 1963.',
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
    title: 'Washington Rugby Football Club | DC\'s First Rugby Club',
    description: 'Join DC\'s premier rugby club. WRFC offers competitive matches, expert coaching, and a strong community of rugby enthusiasts since 1963.',
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
        <script src="https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js"></script>
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