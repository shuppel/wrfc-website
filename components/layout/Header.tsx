'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from '../ThemeToggle'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { 
    href: '/teams', 
    label: 'Teams',
    dropdown: [
      { href: '/teams/coaches', label: 'Coaching Staff', icon: '👨‍🏫' },
      { href: '/teams/players', label: 'Player Roster', icon: '🏃‍♂️' },
      { href: '/executive-committee', label: 'Executive Committee', icon: '👔' },
    ]
  },
  { 
    href: '/schedule', 
    label: 'Schedule',
    dropdown: [
      { href: '/schedule/practice', label: 'Practice Schedule', icon: '🏃' },
      { href: '/schedule/game', label: 'Game Schedule', icon: '🏉' },
      { href: '/schedule/events', label: 'Events & Tournaments', icon: '📅' },
    ]
  },
  { href: '/media', label: 'Media' },
  { href: '/tournaments', label: 'Tournaments' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle dropdown hover with delay
  const handleDropdownEnter = (linkHref: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setHoveredDropdown(linkHref)
  }

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setHoveredDropdown(null)
    }, 150) // Small delay before closing
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
    }
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
                <div 
                  key={link.href} 
                  className="relative"
                  onMouseEnter={() => link.dropdown && handleDropdownEnter(link.href)}
                  onMouseLeave={() => link.dropdown && handleDropdownLeave()}
                >
                  {link.dropdown ? (
                    <>
                      <Link 
                        href={link.href}
                        className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-wrfc-navy dark:hover:text-white text-sm font-medium tracking-wide transition-all duration-300 relative group flex items-center gap-1"
                      >
                        {link.label}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                          hoveredDropdown === link.href ? 'rotate-180' : ''
                        }`} />
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-wrfc-red group-hover:w-full transition-all duration-300" />
                      </Link>
                      
                      {/* Dropdown Menu */}
                      <div className={`absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 transform-gpu ${
                        hoveredDropdown === link.href 
                          ? 'opacity-100 translate-y-0 visible' 
                          : 'opacity-0 -translate-y-2 invisible'
                      }`}>
                        <div className="py-2">
                          {link.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-wrfc-navy dark:hover:text-white transition-colors group"
                              onClick={() => setHoveredDropdown(null)}
                            >
                              <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                                {dropdownItem.icon}
                              </span>
                              <span className="font-medium">{dropdownItem.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <NavLink href={link.href}>{link.label}</NavLink>
                  )}
                </div>
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
                <div key={link.href}>
                  {link.dropdown ? (
                    <>
                      <div className="py-3 text-gray-600 dark:text-gray-300 font-medium">
                        {link.label}
                      </div>
                      <div className="pl-4 space-y-1">
                        {link.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="flex items-center gap-2 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-wrfc-navy dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span>{dropdownItem.icon}</span>
                            <span>{dropdownItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="block py-3 text-gray-600 dark:text-gray-300 hover:text-wrfc-navy dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
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
      className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-wrfc-navy dark:hover:text-white text-sm font-medium tracking-wide transition-all duration-300 relative group transform hover:scale-105"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-wrfc-red group-hover:w-full transition-all duration-300" />
    </Link>
  )
} 