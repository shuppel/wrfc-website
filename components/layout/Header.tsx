'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from '../ThemeToggle'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <nav className="container mx-auto px-4 pt-3">
        <div className="flex items-center h-16">
          {/* Logo Container - Taking up roughly 1/3 of the space */}
          <div className="w-1/3">
            <Link 
              href="/" 
              className="relative w-32 h-32 -mb-8 hover:opacity-90 transition-opacity group block"
              style={{ marginTop: '-0.25rem' }}
            >
              <div className="relative w-full h-full pt-2">
                <Image
                  src="/logos/wrfc_logo.png"
                  alt="WRFC Logo"
                  fill
                  className="object-contain transform group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Navigation Container - Taking up the remaining space */}
          <div className="w-2/3 flex justify-end">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink href="/about">About</NavLink>
              <NavLink href="/roster">Team</NavLink>
              <NavLink href="/schedule">Schedule</NavLink>
              <NavLink href="/tournaments">Tournaments</NavLink>
              <NavLink href="/sponsors">Sponsors</NavLink>
              <Link 
                href="/membership" 
                className="px-8 py-3 bg-wrfc-red dark:bg-white text-white dark:text-wrfc-navy font-bold rounded-md hover:bg-wrfc-red/90 dark:hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group flex items-center gap-3"
              >
                <span className="inline-block transform group-hover:-translate-y-px transition-transform">
                  JOIN THE LEGACY
                </span>
                <span className="inline-block transform group-hover:scale-110 transition-transform relative w-5 h-5" aria-hidden="true">
                  <Image
                    src="/assets/rugby_ball_icon_blue_light.png"
                    alt=""
                    fill
                    className="object-contain block dark:hidden"
                  />
                  <div className="absolute -right-2 -top-2 w-9 h-9 hidden dark:block">
                    <Image
                      src="/assets/rugby_ball_icon_blue_dark.png"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </span>
              </Link>
              <NavLink href="/contact">Contact</NavLink>
              <div className="pl-4 border-l border-gray-200 dark:border-gray-700">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-wrfc-navy dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in">
            <div className="flex flex-col space-y-1 p-2">
              <NavLink href="/about">About</NavLink>
              <NavLink href="/roster">Team</NavLink>
              <NavLink href="/schedule">Schedule</NavLink>
              <NavLink href="/tournaments">Tournaments</NavLink>
              <NavLink href="/sponsors">Sponsors</NavLink>
              <Link 
                href="/membership" 
                className="px-8 py-3 bg-wrfc-red dark:bg-white text-white dark:text-wrfc-navy font-bold rounded-md hover:bg-wrfc-red/90 dark:hover:bg-gray-100 transition-all duration-300 text-center my-1 transform hover:scale-105 hover:shadow-lg group flex items-center justify-center gap-3"
              >
                <span className="inline-block transform group-hover:-translate-y-px transition-transform">
                  JOIN THE LEGACY
                </span>
                <span className="inline-block transform group-hover:scale-110 transition-transform relative w-5 h-5" aria-hidden="true">
                  <Image
                    src="/assets/rugby_ball_icon_blue_light.png"
                    alt=""
                    fill
                    className="object-contain block dark:hidden"
                  />
                  <div className="absolute -right-2 -top-2 w-9 h-9 hidden dark:block">
                    <Image
                      src="/assets/rugby_ball_icon_blue_dark.png"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </span>
              </Link>
              <NavLink href="/contact">Contact</NavLink>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="text-gray-600 dark:text-gray-300 hover:text-wrfc-navy dark:hover:text-white text-sm font-medium tracking-wide transition-colors relative group px-3 py-2"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-wrfc-red group-hover:w-full transition-all duration-300" />
    </Link>
  )
} 