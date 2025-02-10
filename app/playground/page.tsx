'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the game components with no SSR
const PongGame = dynamic(() => import('../components/features/PongGame/PongGame'), { ssr: false })
const FoiaQuest = dynamic(() => import('../components/features/FoiaQuest/FoiaQuest'), { ssr: false })

import { Press_Start_2P } from 'next/font/google'

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const games = [
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

export default function PlaygroundPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-b from-background-light to-white dark:from-background-dark dark:to-gray-900">
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
                    className="game-item-large group relative"
                    onClick={() => setSelectedGame(game.id)}
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${game.background})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
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

