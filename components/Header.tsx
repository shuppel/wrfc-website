import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Github, FileText } from 'lucide-react'
import {
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ThemeToggle } from './ThemeToggle'

export default function Header() {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/node_logo_paper_feel_webclip.png" 
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
            <div className="hidden ml-10 space-x-8 lg:block font-mono">
              <Link href="/services" className="text-base font-medium text-gray-500 hover:text-[#FF8C00] dark:hover:text-[#FF8C00]">
                Services<sup className="text-[0.6em]">01</sup>
              </Link>
              <Link href="/products" className="text-base font-medium text-gray-500 hover:text-[#FF8C00] dark:hover:text-[#FF8C00]">
                Products<sup className="text-[0.6em]">02</sup>
              </Link>
              <Link href="/playground" className="text-base font-medium text-gray-500 hover:text-[#FF8C00] dark:hover:text-[#FF8C00]">
                Playground<sup className="text-[0.6em]">03</sup>
              </Link>
              <Link href="/about" className="text-base font-medium text-gray-500 hover:text-[#FF8C00] dark:hover:text-[#FF8C00]">
                About<sup className="text-[0.6em]">04</sup>
              </Link>
              <Link href="/contact" className="text-base font-medium text-gray-500 hover:text-[#FF8C00] dark:hover:text-[#FF8C00]">
                Contact<sup className="text-[0.6em]">05</sup>
              </Link>
            </div>
          </div>
          <div className="ml-10 space-x-4 flex items-center">
            <TooltipProvider>
              <TooltipTrigger>
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
                View our GitHub
              </TooltipContent>
            </TooltipProvider>
            <TooltipProvider>
              <TooltipTrigger>
                <a 
                  href="/capabilities-statement.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-[#FF8C00] dark:hover:text-[#FF8C00] transition-colors"
                >
                  <FileText className="w-6 h-6" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                Download Capabilities Statement
              </TooltipContent>
            </TooltipProvider>
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
    </header>
  )
}

