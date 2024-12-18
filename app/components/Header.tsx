'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/app/components/ui/button'
import { Github, FileText } from 'lucide-react'
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/app/components/ui/tooltip'
import { ThemeToggle } from './ThemeToggle'

interface NavigationItem {
  href: string;
  label: string;
  index: string;
}

const navigationItems: NavigationItem[] = [
  { href: '/services', label: 'Services', index: '01' },
  { href: '/products', label: 'Products', index: '02' },
  { href: '/playground', label: 'Playground', index: '03' },
  { href: '/about', label: 'About', index: '04' },
  { href: '/contact', label: 'Contact', index: '05' },
]

export default function Header() {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
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
                <span className="font-nasalization text-2xl text-[#FF8C00] dark:text-[#FF8C00]">
                  Nodetus<sup className="text-xs">LLC</sup>
                </span>
              </Link>

              {/* Navigation Links */}
              <div className="hidden ml-10 space-x-8 lg:block font-mono">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base font-medium text-gray-500 hover:text-[#FF8C00] dark:hover:text-[#FF8C00]"
                  >
                    {item.label}<sup className="text-[0.6em]">{item.index}</sup>
                  </Link>
                ))}
              </div>
            </div>

            {/* Action Items */}
            <div className="ml-10 space-x-4 flex items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="https://github.com/Nodetus-Integrators-LLC" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-[#FF8C00] dark:hover:text-[#FF8C00] transition-colors"
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
                    className="text-gray-400 hover:text-[#FF8C00] dark:hover:text-[#FF8C00] transition-colors"
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
                className="border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00] hover:text-white dark:border-[#FF8C00] dark:text-[#FF8C00] dark:hover:bg-[#FF8C00] dark:hover:text-white font-mono"
              >
                Get Started<sup className="text-[0.6em]">→</sup>
              </Button>
            </div>
          </div>
        </nav>
      </TooltipProvider>
    </header>
  )
}