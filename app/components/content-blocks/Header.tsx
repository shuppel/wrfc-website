'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/app/components/ui/button'
import { Github, FileText, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/app/components/ui/tooltip'
import { ThemeToggle } from '../ui/ThemeToggle'

interface NavigationItem {
  href: string;
  label: string;
  index: string;
}

const navigationItems: NavigationItem[] = [
  { href: '/pages/services', label: 'Services', index: '01' },
  { href: '/pages/products', label: 'Products', index: '02' },
  { href: '/pages/playground', label: 'Playground', index: '03' },
  { href: '/pages/about', label: 'About', index: '04' },
  { href: '/pages/contact', label: 'Contact', index: '05' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white/80 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm relative z-50">
      <TooltipProvider>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="w-full py-6 flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Image 
                  src="/assets/node_logo_paper_feel_webclip.png" 
                  alt="Nodetus Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                  priority
                />
                <span className="font-nasalization text-2xl text-[#FF8C00]">
                  Nodetus<sup className="text-xs">LLC</sup>
                </span>
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden ml-10 space-x-8 lg:block font-mono">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base font-medium text-gray-400 hover:text-[#FF8C00] transition-colors duration-200"
                  >
                    {item.label}<sup className="text-[0.6em] text-gray-400">{item.index}</sup>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-[#FF8C00] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>

            {/* Desktop Action Items */}
            <div className="hidden lg:flex ml-10 space-x-4 items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="https://github.com/Nodetus-Integrators-LLC" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-[#FF8C00] transition-colors duration-200"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View our GitHub</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="/assets/capabilities-statement.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-[#FF8C00] transition-colors duration-200"
                  >
                    <FileText className="w-6 h-6" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download Capabilities Statement</p>
                </TooltipContent>
              </Tooltip>

              <ThemeToggle />
              <Button 
                variant="outline" 
                className="border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00] hover:text-white font-mono transition-all duration-200"
              >
                Get Started<sup className="text-[0.6em]">→</sup>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg z-[100]`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-[#FF8C00] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}<sup className="text-[0.6em] text-gray-400">{item.index}</sup>
                </Link>
              ))}
              
              {/* Mobile Action Items */}
              <div className="flex items-center justify-start space-x-4 px-3 py-2">
                <a 
                  href="https://github.com/Nodetus-Integrators-LLC" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-[#FF8C00] transition-colors duration-200"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href="/assets/capabilities-statement.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-[#FF8C00] transition-colors duration-200"
                >
                  <FileText className="w-6 h-6" />
                </a>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      </TooltipProvider>
    </header>
  )
}