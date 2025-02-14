import type { Metadata } from 'next'
import Header from '@/app/components/content-blocks/Header'
import Footer from '@/app/components/content-blocks/Footer'
import { ThemeProvider } from '@/app/contexts/ThemeContext'
import './globals.css'
import { Inter, Press_Start_2P } from 'next/font/google'
import { defaultMetadata, viewport } from './seo/config'
import { OrganizationJsonLd } from './seo/components/JsonLd'
import { Analytics } from '@vercel/analytics/react'

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

export const metadata: Metadata = defaultMetadata
export { viewport }

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
      <head>
        <OrganizationJsonLd />
      </head>
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
        <Analytics />
      </body>
    </html>
  )
}

