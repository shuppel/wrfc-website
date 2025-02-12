// app/components/hero.tsx
'use client'
import { Button } from './button'
import Image from 'next/image'
import Link from 'next/link'
import * as React from "react"

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <div className="animate-fade-up bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
                <h1 className="text-6xl tracking-tight font-nasalization mb-4">
                  <span className="block text-[#FF8C00] dark:text-[#FF8C00] xl:inline">No-De-Tus</span>{' '}
                  <span className="block text-4xl text-slate-800 dark:text-slate-200 xl:inline">(latin)</span>
                </h1>
                <p className="mt-3 text-2xl text-slate-800 dark:text-slate-200 font-mono">
                  &quot;Not About You&quot;<sup className="text-[0.6em]">translation</sup>
                </p>
                <p className="mt-6 text-base text-slate-800 dark:text-slate-200 max-w-lg font-mono leading-relaxed">
                  It&apos;s not you or I, it&apos;s about the royal we. &quot;We&quot; pay taxes, &quot;We&quot; pay for services, &quot;We&quot; should benefit, &quot;We&quot; the people.
                  Nodetus is focused on generating better investments, stronger contracts, reducing administrative waste, improving outcomes, enriching stakeholder work life and ensuring mission over minutiae.
                </p>
                <div className="mt-8">
                  <Link href="/services">
                    <Button 
                      variant="outline"
                      className="px-8 py-3 text-base font-medium rounded-md text-[#FF8C00] dark:text-[#FF8C00] border-[#FF8C00] dark:border-[#FF8C00] hover:bg-[#FF8C00] hover:text-white dark:hover:text-white font-mono"
                    >
                      Learn more<sup className="text-[0.6em]">01</sup>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="relative h-56 w-full sm:h-72 md:h-96 lg:h-full">
          <Image
            src="/assets/hero-workspace.png"
            alt="Team collaborating in modern office space"
            width={1792}
            height={1024}
            className="h-full w-full object-cover"
            priority
            onError={(e) => {
              console.error('Image failed to load:', e);
              const img = e.currentTarget as HTMLImageElement;
              img.src = '/assets/fallback-workspace.png';
              img.onerror = null;
            }}
          />
        </div>
      </div>
    </div>
  )
}