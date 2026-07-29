import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface NavItem {
  label: string
  path: string
  /** Renders the item as a red call-to-action. Reserved for a live campaign. */
  highlight?: boolean
}

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Membership', path: '/membership' },
  { label: 'Schedule', path: '/schedule' },
  { label: 'Team', path: '/team' },
  { label: 'About', path: '/about' },
  { label: 'Sponsors', path: '/sponsors' },
  { label: 'News', path: '/news' },
  { label: 'Shop', path: '/shop' },
  { label: 'Cherry Blossom Tournament', path: '/tournaments/cherry-blossom' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-wrfc-navy to-wrfc-navy/95 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="relative w-16 h-16">
                <Image 
                  src="/logo.png" 
                  alt="WRFC Logo" 
                  fill
                  className="object-contain transform group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-2 rounded-md font-heading text-sm font-medium tracking-wide transition-all duration-300 relative group
                    ${item.highlight 
                      ? 'bg-wrfc-red text-white hover:bg-wrfc-red/90 font-display uppercase text-base tracking-wider' 
                      : 'text-gray-200 hover:text-white'
                    }`}
                >
                  {item.label}
                  {!item.highlight && (
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-wrfc-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-md text-white hover:bg-wrfc-red/20 focus:outline-none transition-colors"
              aria-expanded={isOpen}
            >
              <span className="sr-only font-heading">Open main menu</span>
              <div className="relative w-6 h-6">
                <span 
                  className={`absolute inset-0 transform transition-transform duration-300 ${
                    isOpen ? 'rotate-45 translate-y-2.5' : ''
                  } w-6 h-0.5 bg-current rounded-full`}
                />
                <span 
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isOpen ? 'opacity-0' : ''
                  } w-6 h-0.5 bg-current rounded-full translate-y-2`}
                />
                <span 
                  className={`absolute inset-0 transform transition-transform duration-300 ${
                    isOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-4'
                  } w-6 h-0.5 bg-current rounded-full`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-wrfc-navy/50 backdrop-blur-sm">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-4 py-3 rounded-md font-heading text-base font-medium transition-colors ${
                item.highlight
                  ? 'bg-wrfc-red text-white hover:bg-wrfc-red/90 font-display uppercase tracking-wider'
                  : 'text-gray-200 hover:bg-wrfc-red/20 hover:text-white'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
} 