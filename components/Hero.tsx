'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-6xl tracking-tight font-nasalization mb-4">
                  <span className="block text-[#FF8C00] dark:text-[#FF8C00] xl:inline">No-De-Tus</span>{' '}
                  <span className="block text-4xl text-slate-800 dark:text-slate-200 xl:inline">(latin)</span>
                </h1>
                <p className="mt-3 text-2xl text-slate-800 dark:text-slate-200 font-mono">
                  "Not About You"<sup className="text-[0.6em]">translation</sup>
                </p>
                <p className="mt-6 text-base text-slate-800 dark:text-slate-200 max-w-lg font-mono leading-relaxed">
                  It's not you or I, it's about the royal we. "We" pay taxes, "We" pay for services, "We" should benefit, "We" the people.
                  Nodetus is focused on generating better investments, stronger contracts, reducing administrative waste, improving outcomes, enriching stakeholder work life and ensuring mission over minutiae.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8"
              >
                <Button 
                  variant="outline"
                  className="px-8 py-3 text-base font-medium rounded-md text-[#FF8C00] dark:text-[#FF8C00] border-[#FF8C00] dark:border-[#FF8C00] hover:bg-[#FF8C00] hover:text-white dark:hover:text-white font-mono"
                >
                  Learn more<sup className="text-[0.6em]">02</sup>
                </Button>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Image
          src="/placeholder.svg"
          alt="Team collaborating in modern office space"
          width={1920}
          height={1080}
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          priority
        />
      </div>
    </div>
  )
}

