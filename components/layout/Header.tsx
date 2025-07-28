'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from '../ThemeToggle'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, Trophy } from 'lucide-react'

const NAV_LINKS = [
  { 
    href: '/about', 
    label: 'About',
    dropdown: [
      { href: '/about', label: 'About WRFC', icon: '🏉' },
      { href: '/about/history', label: 'Our History', icon: '📜' },
      { href: '/about/hall-of-fame', label: 'Hall of Fame', icon: '🏆' },
      { href: '/about/championships', label: 'Championships', icon: '👑' },
      { href: '/about/international-players', label: 'Player Commendations', icon: '⭐' },
    ]
  },
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
  { href: 'https://www.zeffy.com/embed/ticketing/wrfc-player-dues?modal=true', label: 'Pay Dues', external: true, highlight: true, isZeffy: true },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null)
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null)
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
                    <NavLink href={link.href} external={link.external} highlight={link.highlight} isZeffy={(link as any).isZeffy}>{link.label}</NavLink>
                  )}
                </div>
              ))}
              <Link 
                href="/membership" 
                className="ml-6 px-8 py-3 bg-gradient-to-r from-wrfc-red to-red-700 text-white font-bold rounded-lg hover:from-red-700 hover:to-wrfc-red transition-all duration-300 transform hover:scale-105 hover:shadow-xl group flex items-center gap-3 relative"
              >
                <span className="relative z-10 inline-block transform group-hover:-translate-y-px transition-transform font-semibold tracking-wide">
                  <span className="hidden xl:inline">JOIN THE LEGACY</span>
                  <span className="xl:hidden">JOIN</span>
                </span>
                <Trophy className="relative z-10 w-5 h-5 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 hidden xl:block" />
                {/* Subtle gleaming border effect */}
                <span className="absolute inset-0 rounded-lg pointer-events-none">
                  <span className="absolute inset-0 rounded-lg border border-white/0 group-hover:border-white/20 transition-all duration-300" />
                  <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:w-full transition-all duration-1000" />
                    <span className="absolute bottom-0 right-0 h-px w-0 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:w-full transition-all duration-1000 delay-500" />
                    <span className="absolute top-0 right-0 w-px h-0 bg-gradient-to-b from-transparent via-white/40 to-transparent group-hover:h-full transition-all duration-1000 delay-250" />
                    <span className="absolute bottom-0 left-0 w-px h-0 bg-gradient-to-b from-transparent via-white/40 to-transparent group-hover:h-full transition-all duration-1000 delay-750" />
                  </span>
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
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen)
                if (!isMobileMenuOpen) {
                  setMobileOpenDropdown(null)
                }
              }}
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
            <div className="p-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <div key={link.href}>
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => setMobileOpenDropdown(mobileOpenDropdown === link.href ? null : link.href)}
                        className="w-full flex items-center justify-between py-3 text-gray-600 dark:text-gray-300 font-medium hover:text-wrfc-navy dark:hover:text-white transition-colors"
                      >
                        <span>{link.label}</span>
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileOpenDropdown === link.href ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        mobileOpenDropdown === link.href ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="pl-4 pb-2 space-y-1">
                          {link.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              className="flex items-center gap-2 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-wrfc-navy dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md transition-colors"
                              onClick={() => {
                                setIsMobileMenuOpen(false)
                                setMobileOpenDropdown(null)
                              }}
                            >
                              <span>{dropdownItem.icon}</span>
                              <span>{dropdownItem.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : link.external ? (
                    (link as any).isZeffy ? (
                      <a
                        zeffy-form-link={link.href}
                        className={`block py-3 rounded-md transition-colors ${
                          link.highlight 
                            ? 'text-wrfc-red dark:text-red-400 font-bold hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20'
                            : 'text-gray-600 dark:text-gray-300 hover:text-wrfc-navy dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block py-3 rounded-md transition-colors ${
                          link.highlight 
                            ? 'text-wrfc-red dark:text-red-400 font-bold hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20'
                            : 'text-gray-600 dark:text-gray-300 hover:text-wrfc-navy dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    )
                  ) : (
                    <Link
                      href={link.href}
                      className={`block py-3 rounded-md transition-colors ${
                        link.highlight 
                          ? 'text-wrfc-red dark:text-red-400 font-bold hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20'
                          : 'text-gray-600 dark:text-gray-300 hover:text-wrfc-navy dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
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
                className="px-6 py-2.5 bg-gradient-to-r from-wrfc-red to-red-700 text-white font-bold rounded-lg hover:from-red-700 hover:to-wrfc-red transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 relative group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative z-10 font-semibold tracking-wide">JOIN</span>
                <Trophy className="relative z-10 w-4 h-4 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                {/* Subtle gleaming border effect */}
                <span className="absolute inset-0 rounded-lg pointer-events-none">
                  <span className="absolute inset-0 rounded-lg border border-white/0 group-hover:border-white/20 transition-all duration-300" />
                  <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:w-full transition-all duration-1000" />
                    <span className="absolute bottom-0 right-0 h-px w-0 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:w-full transition-all duration-1000 delay-500" />
                    <span className="absolute top-0 right-0 w-px h-0 bg-gradient-to-b from-transparent via-white/40 to-transparent group-hover:h-full transition-all duration-1000 delay-250" />
                    <span className="absolute bottom-0 left-0 w-px h-0 bg-gradient-to-b from-transparent via-white/40 to-transparent group-hover:h-full transition-all duration-1000 delay-750" />
                  </span>
                </span>
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

function NavLink({ href, children, external, highlight, isZeffy }: { href: string; children: React.ReactNode; external?: boolean; highlight?: boolean; isZeffy?: boolean }) {
  const baseClass = "px-3 py-2 text-sm font-medium tracking-wide transition-all duration-300 relative group transform hover:scale-105"
  const linkClass = highlight 
    ? `${baseClass} text-wrfc-red dark:text-red-400 font-bold hover:text-red-700 dark:hover:text-red-300`
    : `${baseClass} text-gray-600 dark:text-gray-300 hover:text-wrfc-navy dark:hover:text-white`
  
  if (external) {
    if (isZeffy) {
      return (
        <a 
          zeffy-form-link={href}
          className={linkClass}
          style={{ cursor: 'pointer' }}
        >
          {children}
          <span className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
            highlight ? 'bg-wrfc-red' : 'bg-wrfc-red'
          }`} />
        </a>
      )
    }
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {children}
        <span className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
          highlight ? 'bg-wrfc-red' : 'bg-wrfc-red'
        }`} />
      </a>
    )
  }
  
  return (
    <Link 
      href={href}
      className={linkClass}
    >
      {children}
      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
        highlight ? 'bg-wrfc-red' : 'bg-wrfc-red'
      }`} />
    </Link>
  )
} 