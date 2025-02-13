'use client'

import React from 'react'
import { useEffect, useRef, useState } from 'react'
import type { Game as PhaserGame } from 'phaser'
import { calculateGameSize } from './utils'
import styles from './SCIFGame.module.css'
import { GameNavigation } from '../common/GameNavigation'
import { useGameNavigation } from '../hooks/useGameNavigation'
import { GameContainer } from '../common/GameContainer'

// Import scenes
import BootScene from './scenes/BootScene'
import GameMapScene from './scenes/GameMapScene'

interface GameError extends CustomEvent {
  detail: {
    message: string;
  };
}

interface ExtendedGame extends PhaserGame {
  isDestroyed?: boolean;
}

export default function SCIFGame() {
  const gameRef = useRef<HTMLDivElement>(null)
  const gameInstanceRef = useRef<ExtendedGame | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [gameSize, setGameSize] = useState(calculateGameSize())
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const { handleNavigateToMenu } = useGameNavigation()

  // Handle component mount
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newSize = calculateGameSize()
      setGameSize(newSize)
      
      // Only resize if game instance exists and is properly initialized
      if (gameInstanceRef.current?.scale && !gameInstanceRef.current.isDestroyed) {
        try {
          gameInstanceRef.current.scale.resize(newSize.width, newSize.height)
        } catch (error) {
          console.error('Error resizing game:', error)
        }
      }
    }

    if (isMounted) {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [isMounted])

  // Handle game errors
  useEffect(() => {
    const handleGameError = (event: GameError) => {
      console.error('Game error:', event.detail)
      setError(event.detail.message || 'An error occurred in the game')
      setIsLoading(false)
    }

    if (isMounted) {
      window.addEventListener('game-error', handleGameError as EventListener)
      return () => window.removeEventListener('game-error', handleGameError as EventListener)
    }
  }, [isMounted])

  // Initialize game
  useEffect(() => {
    let game: ExtendedGame | null = null;

    const initGame = async () => {
      if (!isMounted || !gameRef.current) {
        return;
      }

      try {
        setIsLoading(true)
        setError(null)
        
        // Import Phaser dynamically
        const { default: Phaser } = await import('phaser')

        const config = {
          type: Phaser.AUTO,
          title: 'SCIF Game',
          parent: gameRef.current,
          width: gameSize.width,
          height: gameSize.height,
          pixelArt: true,
          scale: {
            mode: Phaser.Scale.RESIZE,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: gameSize.width,
            height: gameSize.height,
            parent: gameRef.current
          },
          physics: {
            default: 'arcade',
            arcade: { 
              gravity: { y: 0, x: 0 },
              debug: false 
            }
          },
          scene: [BootScene, GameMapScene],
          backgroundColor: '#000000',
        }
        
        game = new Phaser.Game(config) as ExtendedGame
        gameInstanceRef.current = game

        // Wait for the game to be ready
        game.events.once('ready', () => {
          setIsLoading(false)
        })

      } catch (err) {
        console.error('Error initializing game:', err)
        setError(`Failed to initialize game: ${err instanceof Error ? err.message : 'Unknown error'}`)
        setIsLoading(false)
      }
    }

    // Only initialize once mounted and ref is available
    if (isMounted && gameRef.current) {
      initGame()
    }

    return () => {
      if (game && !game.isDestroyed) {
        game.destroy(true)
        game.isDestroyed = true
        gameInstanceRef.current = null
      }
    }
  }, [gameSize, isMounted])

  // Don't render anything until mounted
  if (!isMounted) {
    return null;
  }

  if (error) {
    return (
      <div className={styles.theater_overlay}>
        <div className={styles.error_message}>
          <h2>Game Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <GameContainer className="scif-game">
      <div className={styles.theater_overlay}>
        <div className={styles.scif_container} ref={gameRef}>
          {isLoading && (
            <div className={styles.loading_overlay}>
              <div className={styles.loading_spinner}>Loading...</div>
            </div>
          )}
        </div>
      </div>
    </GameContainer>
  )
} 