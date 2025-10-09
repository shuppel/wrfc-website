'use client'

import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, UserCircle2, CreditCard, Users } from 'lucide-react'

// Dynamically import ThemeToggle to prevent hydration issues
const ThemeToggle = dynamic(() => import('../ThemeToggle').then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800" />
})

interface NavDropdownItem {
  href: string;
  label: string;
  icon: string;
}

interface NavLink {
  href: string;
  label: string;
  dropdown?: NavDropdownItem[];
  external?: boolean;
  highlight?: boolean;
}

// Simplified nav structure for better mobile experience
const PRIMARY_NAV_LINKS: NavLink[] = [
  { 
    href: '/about', 
    label: 'About',
    dropdown: [
      { href: '/about', label: 'About WRFC', icon: '🏉' },
      { href: '/about/history', label: 'Our History', icon: '📜' },
      { href: '/about/hall-of-fame', label: 'Hall of Fame', icon: '🏆' },
    ]
  },
  { 
    href: '/teams', 
    label: 'Teams',
    dropdown: [
      { href: '/teams/players', label: 'Player Roster', icon: '🏃‍♂️' },
      { href: '/teams/coaches', label: 'Coaching Staff', icon: '👨‍🏫' },
      { href: '/executive-committee', label: 'Executive Committee', icon: '👔' },
      { href: '/media/film', label: 'Film Room', icon: '🎬' },
      { href: '/media/social', label: 'Social Media', icon: '📱' },
    ]
  },
  { 
    href: '/schedule', 
    label: 'Schedule',
    dropdown: [
      { href: '/schedule/practice', label: 'Practice', icon: '🏃' },
      { href: '/schedule/game', label: 'Games', icon: '🏉' },
      { href: '/schedule/events', label: 'Events', icon: '📅' },
    ]
  },
]

// Secondary links (less priority, shown differently on mobile)
const SECONDARY_NAV_LINKS: NavLink[] = [
  { href: '/tournaments', label: 'Tournaments' },
  { href: '/alumni', label: 'Alumni' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/blog', label: 'Blog' },
  { href: '/media', label: 'Media' },
  { href: '/contact', label: 'Contact' },
]

export default function HeaderImproved() {
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
    }, 150)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
    }
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handlePayDues = () => {
    if (typeof window !== 'undefined') {
      window.open('https://www.zeffy.com/en-US/ticketing/wrfc-player-dues', '_blank')
    }
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/98 dark:bg-gray-900/98 shadow-lg' : 'bg-white/95 dark:bg-gray-900/95'
    } backdrop-blur-md border-b border-gray-200 dark:border-gray-800`}>
      
      {/* Main Navigation Bar */}
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          
          {/* Logo - Responsive sizing */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="relative hover:opacity-90 transition-opacity group block"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 -mb-4 sm:-mb-5 lg:-mb-6">
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

          {/* Desktop Navigation - Split into primary and secondary */}
          <div className="hidden lg:flex flex-1 justify-end items-center gap-8">
            
            {/* Primary Navigation */}
            <div className="flex items-center gap-1 xl:gap-2">
              {PRIMARY_NAV_LINKS.map((link) => (
                <div 
                  key={link.href} 
                  className="relative"
                  onMouseEnter={() => link.dropdown && handleDropdownEnter(link.href)}
                  onMouseLeave={() => link.dropdown && handleDropdownLeave()}
                >
                  <Link 
                    href={link.href}
                    className="px-3 xl:px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-wrfc-navy dark:hover:text-white text-sm xl:text-base font-medium tracking-wide transition-all duration-300 relative group flex items-center gap-1"
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown className={`w-3 h-3 xl:w-4 xl:h-4 transition-transform duration-200 ${
                        hoveredDropdown === link.href ? 'rotate-180' : ''
                      }`} />
                    )}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-wrfc-red group-hover:w-full transition-all duration-300" />
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {link.dropdown && (
                    <div className={`absolute top-full left-0 mt-1 w-56 xl:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 transform-gpu ${
                      hoveredDropdown === link.href 
                        ? 'opacity-100 translate-y-0 visible' 
                        : 'opacity-0 -translate-y-2 invisible'
                    }`}>
                      <div className="py-2">
                        {link.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-wrfc-navy dark:hover:text-white transition-colors"
                            onClick={() => setHoveredDropdown(null)}
                          >
                            <span className="text-base">{dropdownItem.icon}</span>
                            <span className="font-medium">{dropdownItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Secondary Navigation - Desktop only */}
              <div className="hidden xl:flex items-center gap-1 ml-2 pl-2 border-l border-gray-300 dark:border-gray-600">
                {SECONDARY_NAV_LINKS.slice(0, 3).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-wrfc-navy dark:hover:text-white text-sm font-medium tracking-wide transition-all duration-300 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-wrfc-red group-hover:w-full transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Action Buttons - Desktop */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              
              {/* Member Actions - Compact button group */}
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button 
                  onClick={handlePayDues}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded transition-all cursor-pointer"
                  title="Pay Dues"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">Dues</span>
                </button>
                <Link 
                  href="/portal/login"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded transition-all"
                  title="Player Portal"
                >
                  <UserCircle2 className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">Portal</span>
                </Link>
              </div>
              
              {/* Primary CTA - Join Us */}
              <Link 
                href="/membership" 
                className="px-4 xl:px-6 py-2 xl:py-2.5 bg-gradient-to-r from-wrfc-red to-red-700 text-white text-sm xl:text-base font-bold rounded-lg hover:from-red-700 hover:to-wrfc-red transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap"
              >
                <Users className="w-4 h-4 inline mr-1.5 mb-0.5" />
                JOIN US
              </Link>
            </div>
          </div>

          {/* Mobile/Tablet Menu Button and Actions */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Compact action buttons for tablet/mobile */}
            <div className="hidden sm:flex items-center gap-2">
              <ThemeToggle />
              <Link 
                href="/membership" 
                className="px-3 py-1.5 bg-wrfc-red text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-all"
              >
                JOIN
              </Link>
            </div>
            
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
      </nav>

      {/* Mobile Menu - Full screen overlay */}
      <div 
        className={`lg:hidden fixed inset-0 top-[56px] sm:top-[64px] transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background overlay */}
        <div 
          className="absolute inset-0 bg-black/20 dark:bg-black/40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu content */}
        <div className={`absolute inset-x-0 top-0 bg-white dark:bg-gray-900 shadow-xl max-h-[calc(100vh-56px)] sm:max-h-[calc(100vh-64px)] overflow-y-auto transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          
          {/* Quick Actions - Mobile only */}
          <div className="sm:hidden p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between gap-3">
              <Link 
                href="/membership" 
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-wrfc-red to-red-700 text-white text-center font-bold rounded-lg hover:from-red-700 hover:to-wrfc-red transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                JOIN US
              </Link>
              <ThemeToggle />
            </div>
          </div>

          {/* Primary Navigation */}
          <div className="p-4 space-y-1">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Main Menu</h3>
            
            {PRIMARY_NAV_LINKS.map((link) => (
              <div key={link.href}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setMobileOpenDropdown(mobileOpenDropdown === link.href ? null : link.href)}
                      className="w-full flex items-center justify-between py-3 px-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <span>{link.label}</span>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileOpenDropdown === link.href ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      mobileOpenDropdown === link.href ? 'max-h-64' : 'max-h-0'
                    }`}>
                      <div className="pl-4 pb-2 space-y-1">
                        {link.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="flex items-center gap-2 py-2 px-3 text-sm text-gray-600 dark:text-gray-400 hover:text-wrfc-navy dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                            onClick={() => {
                              setIsMobileMenuOpen(false)
                              setMobileOpenDropdown(null)
                            }}
                          >
                            <span className="text-base">{dropdownItem.icon}</span>
                            <span>{dropdownItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="block py-3 px-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Secondary Navigation */}
          <div className="p-4 pt-0 space-y-1">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">More</h3>
            
            <div className="grid grid-cols-2 gap-2">
              {SECONDARY_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2 px-3 text-sm text-gray-600 dark:text-gray-400 hover:text-wrfc-navy dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Member Actions */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Member Access</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handlePayDues()
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                Pay Dues
              </button>
              
              <Link
                href="/portal/login"
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <UserCircle2 className="w-4 h-4" />
                Player Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}