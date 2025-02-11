'use client'

import { useCallback, useEffect, useState, useRef } from 'react'
import Phaser from 'phaser'
import GridEngine from 'grid-engine'
import { calculateGameSize } from './utils'
import './SCIFGame.css'

// Import scenes
import BootScene from './scenes/BootScene'
import MainMenuScene from './scenes/MainMenuScene'
import GameMapScene from './scenes/GameMapScene'

// Since these values aren't used, we can remove the destructuring
calculateGameSize()

// Dialog data
type DialogKey = 'stickyNote' | 'book';

interface DialogEventDetail {
  characterName: DialogKey;
}

const dialogs = {
  "stickyNote": [{
    "message": "Hint: Your password isn't '1234'… or is it?",
  }],
  "book": [{
    "message": "The key to my heart is 7 letters long…",
  }]
}

export default function SCIFGame() {
  const gameRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Array<{message: string}>>([])
  const [characterName, setCharacterName] = useState<DialogKey | ''>('')
  
  const handleMessageIsDone = useCallback(() => {
    const customEvent = new CustomEvent(`${characterName}-dialog-finished`, {
      detail: {},
    })
    window.dispatchEvent(customEvent)
    setMessages([])
    setCharacterName('')
  }, [characterName])

  useEffect(() => {
    if (!gameRef.current) return

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      title: 'SCIF Game',
      parent: gameRef.current,
      width: 800,
      height: 600,
      pixelArt: true,
      scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.ENVELOP
      },
      physics: {
        default: 'arcade',
        arcade: { 
          gravity: { y: 0, x: 0 },
          debug: false 
        }
      },
      scene: [BootScene, MainMenuScene, GameMapScene],
      plugins: {
        scene: [{
          key: 'gridEngine',
          plugin: GridEngine,
          mapping: 'gridEngine'
        }]
      },
      dom: { createContainer: true }
    }
    
    const game = new Phaser.Game(config)
    
    // Set up dialog event listeners
    const dialogBoxEventListener = ({ detail }: CustomEvent<DialogEventDetail>) => {
      setCharacterName(detail.characterName)
      setMessages(dialogs[detail.characterName] || [])
    }
    
    window.addEventListener('new-dialog', dialogBoxEventListener as EventListener)
    
    return () => {
      game.destroy(true)
      window.removeEventListener('new-dialog', dialogBoxEventListener as EventListener)
    }
  }, [])

  return (
    <div>
      <div className="theater-overlay">
        <button 
          className="nav-button back-button" 
          onClick={() => {
            if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
              window.location.href = '/playground'
            }
          }}
          aria-label="Back to menu"
        >
          ← Back to Menu
        </button>
        <div className="scif-container" ref={gameRef} />
        {messages.length > 0 && (
          <div className="dialog-box">
            <div className="dialog-content">
              {messages[0].message}
              <button onClick={handleMessageIsDone}>Continue</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 