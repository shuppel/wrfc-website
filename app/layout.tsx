import type { Metadata } from 'next'
import Header from '@/app/components/content-blocks/Header'
import Footer from '@/app/components/content-blocks/Footer'
import { ThemeProvider } from '@/app/contexts/ThemeContext'
import './globals.css'
import { Inter, Press_Start_2P } from 'next/font/google'
import Link from 'next/link'

// Initialize fonts with optimized loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
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
    google: 'your-google-verification-code', // Add your Google verification code
  },
  icons: {
    icon: [
      {
        url: '/assets/node_logo_paper_feel_webclip.png',
        type: 'image/png',
      }
    ],
    shortcut: '/assets/node_logo_paper_feel_webclip.png',
    apple: '/assets/node_logo_paper_feel_webclip.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={`${pressStart2P.className}`}
    >
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen transition-colors duration-300">
            <Header />
            <main className="flex-grow relative z-10">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

