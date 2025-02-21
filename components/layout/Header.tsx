'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from '../ThemeToggle'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/roster', label: 'Team' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/media', label: 'Media' },
  { href: '/tournaments', label: 'Tournaments' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 dark:bg-gray-900/95 shadow-md' : 'bg-white/90 dark:bg-gray-900/90'
    } backdrop-blur-md border-b border-gray-200 dark:border-gray-800`}>
      <nav className="container mx-auto px-4 pt-3">
        <div className="flex items-center h-16">
          {/* Logo Container */}
          <div className="flex-shrink-0">
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-end items-center">
            <div className="flex items-center space-x-1">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
              ))}
              <Link 
                href="/membership" 
                className="ml-4 px-6 py-2 bg-wrfc-red dark:bg-white text-white dark:text-wrfc-navy font-bold rounded-md hover:bg-wrfc-red/90 dark:hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group flex items-center gap-2"
              >
                <span className="inline-block transform group-hover:-translate-y-px transition-transform whitespace-nowrap">
                  <span className="hidden xl:inline">JOIN THE LEGACY</span>
                  <span className="xl:hidden">JOIN!</span>
                </span>
                <span className="inline-block transform group-hover:scale-110 transition-transform relative w-5 h-5 xl:block hidden" aria-hidden="true">
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
              <div className="pl-4 border-l border-gray-200 dark:border-gray-700">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex flex-1 justify-end">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden fixed inset-x-0 top-[4.5rem] bottom-0 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="mx-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
            {/* Navigation Links */}
            <div className="p-4 divide-y divide-gray-200 dark:divide-gray-700">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 text-gray-600 dark:text-gray-300 hover:text-wrfc-navy dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Theme Toggle and Join Button Container */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <ThemeToggle />
              <Link 
                href="/membership"
                className="px-6 py-2 bg-wrfc-red dark:bg-white text-white dark:text-wrfc-navy font-bold rounded-md hover:bg-wrfc-red/90 dark:hover:bg-gray-100 transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                JOIN!
              </Link>
            </div>
          </div>

          {/* Semi-transparent overlay */}
          <div 
            className={`fixed inset-0 bg-black/20 dark:bg-black/40 -z-10 transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      </nav>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-wrfc-navy dark:hover:text-white text-sm font-medium tracking-wide transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-wrfc-red group-hover:w-full transition-all duration-300" />
    </Link>
  )
} 