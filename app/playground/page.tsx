'use client'

import { useState } from 'react'
import { Press_Start_2P } from 'next/font/google'
import Link from 'next/link'

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

interface Game {
  id: string;
  name: string;
  sprite: string;
  background: string;
  summary: string;
  path: string; // Add path for the game route
}

const games: Game[] = [
  { 
    id: 'scif', 
    name: 'SCIF: The Password Hunt', 
    sprite: '/sprites/scif.png',
    background: '/backgrounds/scif-bg.png',
    summary: 'Roam the quirky office searching for clues to unlock the terminal!',
    path: '/games/scif'
  },
  { 
    id: 'foia-quest', 
    name: 'FOIA Quest', 
    sprite: '/sprites/foia-quest.png',
    background: '/backgrounds/foia-bg.png',
    summary: 'Navigate the bureaucracy and uncover hidden truths in this document-hunting adventure.',
    path: '/games/foia-quest'
  },
  { 
    id: 'snake', 
    name: 'Snake', 
    sprite: '/sprites/snake.png',
    background: '/backgrounds/snake-bg.png',
    summary: 'Classic snake game with a modern twist. Collect power-ups and avoid obstacles.',
    path: '/games/snake'
  },
  { 
    id: 'pong', 
    name: 'Pong', 
    sprite: '/sprites/pong.png',
    background: '/backgrounds/pong-bg.png',
    summary: 'The original arcade classic. Simple yet addictive paddle action.',
    path: '/games/pong'
  }
]

// Add this CSS at the top level of the component, before the return statement
const breathingGlowStyles = `
  @keyframes breathe {
    0% { box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.2); }
    50% { box-shadow: 0 0 20px 4px rgba(255, 255, 255, 0.3); }
    100% { box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.2); }
  }
`

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,140,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,140,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,140,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,140,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in space-y-8">
          <div className="inline-block">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-[#FFA500] sm:text-5xl mb-6 font-nasalization tracking-wider group relative">
              Playground
              <sup className="text-[0.4em] font-mono ml-2 text-[#FF8C00] opacity-0 group-hover:opacity-100 transition-opacity duration-300">[arcade]</sup>
              <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF8C00] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </h1>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-mono leading-relaxed">
              Welcome to our retro-inspired game collection! Take a break from the serious world of federal IT and enjoy these custom-built arcade games.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">
              Each game is crafted with love and features unique mechanics inspired by the federal technology landscape.
            </p>
          </div>
        </div>
        
        <div className={`${pressStart2P.className} mt-12`}>
          <div className="game-menu rounded-lg animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
              {games.map((game) => (
                <Link
                  key={game.id}
                  href={game.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative transition-all duration-500 
                           hover:shadow-[0_0_30px_rgba(255,140,0,0.15)]
                           hover:scale-[1.02]
                           bg-slate-900/90 dark:bg-slate-800/90 
                           backdrop-blur-sm rounded-xl
                           border border-orange-100/10 dark:border-orange-500/10
                           overflow-hidden"
                >
                  <div 
                    className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${game.background})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  
                  <div className="relative flex items-center p-8 h-full">
                    <div 
                      className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden
                               border-2 border-[#FF8C00]/20 group-hover:border-[#FF8C00]/40
                               transition-all duration-500"
                      style={{
                        backgroundImage: `url(${game.sprite})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className="ml-6 flex-1">
                      <h3 className="text-lg text-[#FF8C00] mb-3 group-hover:text-[#FFA500] transition-colors duration-300">
                        {game.name}
                      </h3>
                      <p className="text-xs leading-relaxed text-slate-300/80 group-hover:text-white/90 transition-all duration-300">
                        {game.summary}
                      </p>
                      <div className="mt-4 text-[10px] text-slate-400/60 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        Click to launch game in new window →
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

