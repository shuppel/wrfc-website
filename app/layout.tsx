import type { Metadata } from 'next'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ArticleDrawerWrapper from '../components/layout/ArticleDrawerWrapper'
import { ThemeProvider } from '../contexts/ThemeContext'
import './globals.css'
import { Inter } from 'next/font/google'
import { Bebas_Neue, Titillium_Web, Quantico } from 'next/font/google'

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
  title: 'WRFC - Washington Rugby Football Club',
  description: 'Home of Washington Rugby Football Club - Tradition, Excellence, Community',
  keywords: ['rugby', 'washington rugby', 'washington dc rugby', 'wrfc', 'washington rfc'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${bebasNeue.variable} ${titilliumWeb.variable} ${quantico.variable} font-sans min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col`}>
        <ThemeProvider>
          <Header />
          <main className="flex-grow pt-24">
            {children}
          </main>
          <Footer />
          <ArticleDrawerWrapper />
        </ThemeProvider>
      </body>
    </html>
  )
} 