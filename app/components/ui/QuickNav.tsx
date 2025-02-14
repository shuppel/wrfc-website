'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface NavLink {
  href: string
  icon: string
  label: string
}

interface QuickNavProps {
  links?: NavLink[]
}

export default function QuickNav({ links }: QuickNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Default navigation links for the home page
  const defaultLinks: NavLink[] = [
    { href: '#top', icon: '🏠', label: 'Top' },
    { href: '#mission', icon: '📋', label: 'Mission' },
    { href: '#competencies', icon: '💡', label: 'Core Competencies' },
  ]

  // Use provided links or default links
  const navigationLinks = links || defaultLinks

  const handleClick = (href: string) => {
    if (href.startsWith('#')) {
      // If it's an anchor link, handle smooth scrolling
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Menu Items */}
      <div 
        className={`flex flex-col gap-2 items-end transition-all duration-300 
                   ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => handleClick(link.href)}
            className="bg-black/50 hover:bg-black/70 backdrop-blur-md text-white px-6 py-3 rounded-lg shadow-lg 
                     transition-all duration-300 flex items-center gap-3 w-48 
                     hover:w-56 group"
          >
            <span className="text-lg">{link.icon}</span>
            <span className="font-medium text-sm opacity-90 group-hover:opacity-100">
              {link.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-orange-500/90 hover:bg-orange-600/90 text-white p-4 rounded-full shadow-lg 
                   transition-all duration-500 backdrop-blur-sm relative group
                   ${isOpen ? 'rotate-180 bg-black/50 hover:bg-black/70' : ''}`}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      >
        <div className="relative w-6 h-6">
          {/* Map Icon - Shows when menu is closed */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`absolute inset-0 transition-all duration-300 
                       ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
          >
            <path d="M3 6l6-3l6 3l6-3v15l-6 3l-6-3l-6 3V6" />
            <path d="M9 3v15" />
            <path d="M15 6v15" />
          </svg>

          {/* Arrow Icon - Shows when menu is open */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`absolute inset-0 transition-all duration-300 
                       ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
          >
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </button>
    </nav>
  )
} 