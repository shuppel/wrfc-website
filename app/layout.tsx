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
  metadataBase: new URL('https://wrfc.org'),
  title: {
    default: 'WRFC - Washington Rugby Football Club',
    template: '%s | Washington Rugby Football Club'
  },
  description: 'Home of Washington Rugby Football Club - Tradition, Excellence, Community since 1963',
  keywords: ['rugby', 'washington rugby', 'washington dc rugby', 'wrfc', 'washington rfc', 'rugby club', 'sports team', 'DC sports'],
  authors: [{ name: 'Washington Rugby Football Club' }],
  creator: 'Washington Rugby Football Club',
  publisher: 'Washington Rugby Football Club',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wrfc.org',
    siteName: 'Washington Rugby Football Club',
    title: 'WRFC - Washington Rugby Football Club',
    description: 'Home of Washington Rugby Football Club - Tradition, Excellence, Community since 1963',
    images: [
      {
        url: '/logos/wrfc_logo.png',
        width: 800,
        height: 600,
        alt: 'Washington Rugby Football Club Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WRFC - Washington Rugby Football Club',
    description: 'Home of Washington Rugby Football Club - Tradition, Excellence, Community since 1963',
    images: ['/logos/wrfc_logo.png'],
    creator: '@WRFC_DC',
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
  alternates: {
    canonical: '/',
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
      </head>
      <body className={`${inter.variable} ${bebasNeue.variable} ${titilliumWeb.variable} ${quantico.variable} font-sans min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col`}>
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