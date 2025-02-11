'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the game components with no SSR
const PongGame = dynamic(() => import('../components/features/PongGame/PongGame'), { ssr: false })
const FoiaQuest = dynamic(() => import('../components/features/FoiaQuest/FoiaQuest'), { ssr: false })
const SnakeGame = dynamic(() => import('../components/features/SnakeGame/SnakeGame'), { ssr: false })

import { Press_Start_2P } from 'next/font/google'

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
}

const games: Game[] = [
  { 
    id: 'scif', 
    name: 'SCIF: The Password Hunt', 
    sprite: '/sprites/scif.png',
    background: '/backgrounds/scif-bg.png',
    summary: 'Roam the quirky office searching for clues to unlock the terminal!'
  },
  { 
    id: 'foia-quest', 
    name: 'FOIA Quest', 
    sprite: '/sprites/foia-quest.png',
    background: '/backgrounds/foia-bg.png',
    summary: 'Navigate the bureaucracy and uncover hidden truths in this document-hunting adventure.'
  },
  { 
    id: 'snake', 
    name: 'Snake', 
    sprite: '/sprites/snake.png',
    background: '/backgrounds/snake-bg.png',
    summary: 'Classic snake game with a modern twist. Collect power-ups and avoid obstacles.'
  },
  { 
    id: 'pong', 
    name: 'Pong', 
    sprite: '/sprites/pong.png',
    background: '/backgrounds/pong-bg.png',
    summary: 'The original arcade classic. Simple yet addictive paddle action.'
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
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-b from-background-light to-white dark:from-background-dark dark:to-gray-900">
      <style>{breathingGlowStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-[#FF8C00] mb-8 font-nasalization">
          Playground
        </h1>
        
        <div className={pressStart2P.className}>
          {!selectedGame ? (
            <div className="game-menu rounded-lg animate-fade-in">
              <div className="game-grid">
                {games.map((game) => (
                  <div
                    key={game.id}
                    className="game-item-large group relative transition-all duration-300 hover:scale-[1.02]"
                    onClick={() => setSelectedGame(game.id)}
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${game.background})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      animation: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.animation = 'breathe 3s ease-in-out infinite'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.animation = 'none'
                    }}
                  >
                    <div className="flex items-center p-6 h-full">
                      <div 
                        className="game-sprite"
                        style={{
                          backgroundImage: `url(${game.sprite})`,
                        }}
                      />
                      <div className="ml-6">
                        <h3 className="game-title text-white mb-2">{game.name}</h3>
                        <p className="game-text game-summary text-white/0 group-hover:text-white/90">
                          {game.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              {selectedGame === 'foia-quest' && <FoiaQuest />}
              {selectedGame === 'snake' && <SnakeGame />}
              {selectedGame === 'pong' && <PongGame />}
              <button 
                onClick={() => setSelectedGame(null)}
                className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg"
              >
                Back to Menu
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

