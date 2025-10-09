import { ReactNode } from 'react'
import HeaderImproved from './HeaderImproved'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderImproved />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
} 