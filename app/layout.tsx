import type { Metadata } from 'next'
import { nasalization, jetbrainsMono } from './styles/fonts'
import './globals.css'
import { ThemeProvider } from './contexts/ThemeContext'

export const metadata: Metadata = {
  title: 'Nodetus.Com',
  description: 'Your expandable web solution',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${nasalization.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body 
        className={`min-h-screen bg-background font-geist antialiased ${jetbrainsMono.className}`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

