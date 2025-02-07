'use client'

import { useState, useEffect } from 'react'
import './FoiaQuest.css'
import { useForm } from 'react-hook-form'

interface Agency {
  id: string
  name: string
  jurisdiction: string
}

interface FoiaRequest {
  id: string
  status: string
  title: string
  document_request: string
  agency: string
}

interface GameState {
  score: number
  level: number
  currentRequest: FoiaRequest | null
  inventory: string[]
  status: 'idle' | 'requesting' | 'success' | 'failure'
}

interface Command {
  input: string
  output: string
  isError?: boolean
}

const API_BASE = 'https://www.muckrock.com/api_v1'

const TheaterMode = () => (
  <div className="scanlines"></div>
)

export default function FoiaQuest() {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    currentRequest: null,
    inventory: [],
    status: 'idle'
  })

  const [commandHistory, setCommandHistory] = useState<Command[]>([
    { input: 'FOIA-OS v1.0 initialized...', output: 'Welcome to FOIA Quest. Type "help" for commands.' }
  ])
  const [currentCommand, setCurrentCommand] = useState('')
  const [agencies, setAgencies] = useState<Agency[]>([])
  const [loading, setLoading] = useState(true)

  const { register, handleSubmit } = useForm<FormData>()

  const fetchRequests = async () => {
    setLoading(true)
    try {
      // Fetch implementation here
      // setRequests(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await fetch(`${API_BASE}/agency/`)
        const data = await response.json()
        setAgencies(data.results)
        setLoading(false)
      } catch (error: unknown) {
        console.error('Failed to fetch agencies:', error instanceof Error ? error.message : 'Unknown error')
        setLoading(false)
      }
    }

    fetchAgencies()
  }, [])

  const submitFoiaRequest = async (agencyId: string) => {
    setGameState(prev => ({ ...prev, status: 'requesting' }))
    try {
      const response = await fetch(`${API_BASE}/foia/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agency: agencyId,
          title: `Level ${gameState.level} FOIA Request`,
          document_request: `This is an automated FOIA request for testing purposes.`
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to submit request')
      }
      
      const data = await response.json()
      setGameState(prev => ({
        ...prev,
        score: prev.score + 100,
        status: 'success',
        currentRequest: data
      }))
    } catch (error: unknown) {
      console.error('Failed to submit request:', error instanceof Error ? error.message : 'Unknown error')
      setGameState(prev => ({ ...prev, status: 'failure' }))
    }
  }

  const handleCommand = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    
    const command = currentCommand.toLowerCase().trim()
    let response = ''
    
    switch (command) {
      case 'help':
        response = `Available commands:
- search <term>: Search for agencies
- request <agency_id>: Submit FOIA request
- status: Check current game status
- clear: Clear terminal`
        break
        
      case 'clear':
        setCommandHistory([])
        setCurrentCommand('')
        return
        
      case 'status':
        response = `Level: ${gameState.level}\nScore: ${gameState.score}\nStatus: ${gameState.status}`
        break
        
      default:
        if (command.startsWith('search ')) {
          const term = command.slice(7)
          try {
            const res = await fetch(`${API_BASE}/agency/?q=${encodeURIComponent(term)}`)
            const data = await res.json()
            response = data.results
              .slice(0, 5)
              .map((a: Agency) => `${a.id}: ${a.name} (${a.jurisdiction})`)
              .join('\n')
          } catch (error) {
            response = 'Error: Search failed'
          }
        } else if (command.startsWith('request ')) {
          const agencyId = command.slice(8)
          await submitFoiaRequest(agencyId)
          response = 'Processing FOIA request...'
        } else {
          response = 'Unknown command. Type "help" for available commands.'
        }
    }

    setCommandHistory(prev => [...prev, 
      { input: `> ${currentCommand}`, output: response }
    ])
    setCurrentCommand('')
  }

  const handleNavigateToMenu = () => {
    if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
      window.location.href = '/playground'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-black text-green-500 font-['Press_Start_2P']">
        Loading FOIA-OS...
      </div>
    )
  }

  return (
    <div>
      <div className="theater-overlay">
        <button 
          className="nav-button back-button" 
          onClick={handleNavigateToMenu}
          aria-label="Back to menu"
        >
          ← Back to Menu
        </button>
        <button 
          className="exit-button" 
          onClick={handleNavigateToMenu}
          aria-label="Exit game"
        >
          ×
        </button>
        <div className="computer-wrapper">
          <div className="monitor">
            <div className="monitor-screen">
              <TheaterMode />
              <div className="terminal-container h-[600px] bg-black text-green-500 p-4 font-['Press_Start_2P'] overflow-hidden">
                <div className="screen-header">FOIA-OS v1.0</div>
                <div className="terminal-output h-[480px] overflow-y-auto mb-4">
                  {commandHistory.map((cmd, i) => (
                    <div key={i} className="mb-2">
                      <div className={cmd.isError ? 'text-red-500' : ''}>{cmd.input}</div>
                      <div className="ml-2 whitespace-pre-line">{cmd.output}</div>
                    </div>
                  ))}
                </div>
                
                <div className="terminal-input-line flex items-center">
                  <span className="mr-2">{'>'}</span>
                  <input
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyDown={handleCommand}
                    className="flex-1 bg-transparent outline-none text-green-500 font-['Press_Start_2P']"
                    autoFocus
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 