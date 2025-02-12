'use client'

import { useState, useEffect, useRef } from 'react'
import './FoiaQuest.css'

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
  isLoading?: boolean
}

interface StatusInfo {
  mode: 'input' | 'search' | 'help';
  level: number;
  score: number;
  lastCommand?: string;
}

// Add type definitions for commands
interface CommandInfo {
  description: string;
  args?: string;
  help?: string;
}

const API_BASE = 'https://www.muckrock.com/api_v1'

const TheaterMode = () => (
  <div className="scanlines"></div>
)

// Add available commands constant
const AVAILABLE_COMMANDS: Record<string, CommandInfo> = {
  help: { description: 'Show available commands' },
  search: { 
    description: 'Search for agencies', 
    args: '<term>',
    help: `Usage: search <term>
Searches for agencies by name, jurisdiction, or type.

Examples:
- search fbi                    # Search for specific agency
- search police                 # Search for type of agency
- search california            # Search by state/jurisdiction
- search department of health  # Search by department name
- search new york             # Search by city/state
- search environmental        # Search by topic/domain
- search district court       # Search by institution type
- search treasury            # Search federal departments

Tips:
- Use fewer words for broader results
- Try different variations of names
- Include location for local agencies
- Use common abbreviations (FBI, EPA, DOJ)
- Search by topic (health, education, police)

Note: Results are limited to 5 agencies at a time.`
  },
  request: { description: 'Submit FOIA request', args: '<agency_id>' },
  status: { description: 'Check current game status' },
  clear: { description: 'Clear terminal' }
} as const;

export default function FoiaQuest() {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    currentRequest: null,
    inventory: [],
    status: 'idle'
  })

  const [commandHistory, setCommandHistory] = useState<Command[]>([
    { 
      input: '',
      output: `<div class="ascii-art">
███████╗ ██████╗ ██╗ █████╗     ██████╗ ██╗   ██╗███████╗███████╗████████╗
██╔════╝██╔═══██╗██║██╔══██╗    ██╔═══██╗██║   ██║██╔════╝██╔════╝╚══██╔══╝
█████╗  ██║   ██║██║███████║    ██║   ██║██║   ██║█████╗  ███████╗   ██║   
██╔══╝  ██║   ██║██║██╔══██║    ██║▄▄ ██║██║   ██║██╔══╝  ╚════██║   ██║   
██║     ╚██████╔╝██║██║  ██║    ╚██████╔╝╚██████╔╝███████╗███████║   ██║   
╚═╝      ╚═════╝ ╚═╝╚═╝  ╚═╝     ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝   ╚═╝   
                                                                    
                        © 2025 Erikk L Shupp
                      Nodetus Integrators LLC</div>

FOIA-OS v1.0 initialized...
Welcome to FOIA Quest. Type "help" for commands.`
    }
  ])
  const [currentCommand, setCurrentCommand] = useState('')
  const [agencies, setAgencies] = useState<Agency[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<StatusInfo>({
    mode: 'input',
    level: 1,
    score: 0,
  })

  // Add command history navigation state
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [savedCommand, setSavedCommand] = useState('');

  // Add autocomplete state
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);

  // Add ref for terminal output
  const terminalOutputRef = useRef<HTMLDivElement>(null);

  // Add effect to scroll to bottom when command history changes
  useEffect(() => {
    if (terminalOutputRef.current) {
      terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
    }
  }, [commandHistory]);

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

  // Function to get command suggestions
  const getCommandSuggestions = (input: string): string[] => {
    const [command, ...args] = input.toLowerCase().trim().split(' ');
    
    // If we're starting a new command
    if (!input.includes(' ')) {
      return Object.keys(AVAILABLE_COMMANDS)
        .filter(cmd => cmd.startsWith(command));
    }

    // If we have just typed 'search' with no args, suggest help
    if (command === 'search' && args.length === 0) {
      return ['-help search: Show search command usage and examples'];
    }

    // If we're in a search command, suggest from recent searches
    if (command === 'search' && args.length <= 1) {
      const searchTerm = args[0] || '';
      const recentSearches = commandHistory
        .filter(cmd => cmd.input.startsWith('> search'))
        .map(cmd => cmd.input.slice(8)) // Remove '> search ' prefix
        .filter(cmd => cmd.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 5);
      
      // Add help suggestion if no recent searches or at start
      if (searchTerm === '' || recentSearches.length === 0) {
        recentSearches.unshift('-help search');
      }
      
      return recentSearches;
    }

    return [];
  };

  const [isSearching, setIsSearching] = useState(false);

  const formatErrorMessage = (error: unknown, context: string): string => {
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        return `Network Error: Unable to connect to the FOIA database.
Troubleshooting steps:
1. Check your internet connection
2. Try again in a few moments
3. If the problem persists, the service may be temporarily unavailable

Error details: ${error.message}`;
      }
      if (error.message.includes('404')) {
        return `API Error: The requested resource was not found.
This might mean:
- The agency database is temporarily unavailable
- The API endpoint has changed
- The service is experiencing issues

Please try again later.`;
      }
      return `Error during ${context}: ${error.message}
Try again or use a different search term.`;
    }
    return `Unexpected error during ${context}. Please try again.`;
  };

  const handleCommand = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      if (currentCommand.startsWith('search')) {
        setStatus(prev => ({ ...prev, mode: 'search' }));
      } else if (currentCommand === 'help') {
        setStatus(prev => ({ ...prev, mode: 'help' }));
      } else {
        setStatus(prev => ({ ...prev, mode: 'input' }));
      }
      return;
    }
    
    const command = currentCommand.toLowerCase().trim()
    let response = ''
    let isError = false
    
    switch (command) {
      case 'help':
        response = getHelpText();
        break;
        
      case '-help search':
      case 'help search':
        response = AVAILABLE_COMMANDS.search.help || '';
        break;
        
      case 'clear':
        setCommandHistory([])
        setCurrentCommand('')
        return;
        
      case 'status':
        response = `Level: ${gameState.level}\nScore: ${gameState.score}\nStatus: ${gameState.status}`
        break;
        
      default:
        if (command.startsWith('search ')) {
          const term = command.slice(7).trim()
          if (!term) {
            response = AVAILABLE_COMMANDS.search.help || '';
            break;
          }

          // Add loading state
          setCommandHistory(prev => [...prev, 
            { input: `> ${currentCommand}`, output: 'Searching agencies...', isLoading: true }
          ]);
          setIsSearching(true);

          try {
            const res = await fetch(`${API_BASE}/agency/?q=${encodeURIComponent(term)}`)
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            
            if (data.results.length === 0) {
              response = `No agencies found matching your search: "${term}"

Suggestions:
1. Check the spelling
2. Try using fewer words
3. Use alternative terms:
   - Instead of "${term}", try related terms
   - Use broader categories
   - Include or remove location information
4. Try one of these example searches:
   - search police
   - search california
   - search environmental

Type "-help search" for more search tips.`;
              isError = true;
            } else {
              response = `Found ${data.results.length > 5 ? '5 of ' + data.results.length : data.results.length} agencies matching "${term}":\n\n` + 
                data.results
                  .slice(0, 5)
                  .map((a: Agency) => `${a.id}: ${a.name} (${a.jurisdiction})`)
                  .join('\n') +
                (data.results.length > 5 ? '\n\nNote: Showing first 5 results. Try a more specific search to narrow down results.' : '');
            }
          } catch (error) {
            response = formatErrorMessage(error, 'agency search');
            isError = true;
          } finally {
            setIsSearching(false);
            // Remove the loading message
            setCommandHistory(prev => prev.slice(0, -1));
          }
        } else if (command.startsWith('request ')) {
          const agencyId = command.slice(8)
          const agencyExists = agencies.some(agency => agency.id === agencyId)
          if (!agencyExists) {
            response = `Error: Invalid agency ID "${agencyId}"

Please:
1. Use the search command to find valid agency IDs
2. Copy the ID number from the search results
3. Use the request command with that ID

Example:
1. search fbi
2. Find the ID in the results (e.g., "123: FBI")
3. request 123`;
            isError = true;
          } else {
            try {
              await submitFoiaRequest(agencyId)
              response = 'Processing FOIA request...\nRequest submitted successfully!'
            } catch (error) {
              response = formatErrorMessage(error, 'FOIA request');
              isError = true;
            }
          }
        } else {
          response = `Unknown command: "${command}"\nType "help" for available commands.`
          isError = true;
        }
    }

    setCommandHistory(prev => [...prev, 
      { input: `> ${currentCommand}`, output: response, isError }
    ])
    setCurrentCommand('')
    setStatus(prev => ({ ...prev, lastCommand: currentCommand }));
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent default browser behavior for certain keys
    if ([
      'ArrowUp',
      'ArrowDown',
      'PageUp',
      'PageDown',
      'Home',
      'End',
      ' ' // Space
    ].includes(e.key)) {
      e.preventDefault();
    }

    // Handle command history navigation
    if (e.key === 'ArrowUp') {
      if (historyIndex === -1) {
        setSavedCommand(currentCommand); // Save current input before navigating
      }
      if (commandHistory.length > 1 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        // Get command from history, skipping the initial ASCII art
        const command = commandHistory[commandHistory.length - 1 - newIndex];
        setCurrentCommand(command.input.startsWith('> ') ? command.input.slice(2) : command.input);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const command = commandHistory[commandHistory.length - 1 - newIndex];
        setCurrentCommand(command.input.startsWith('> ') ? command.input.slice(2) : command.input);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand(savedCommand); // Restore the saved command
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      
      if (!showSuggestions) {
        const newSuggestions = getCommandSuggestions(currentCommand);
        if (newSuggestions.length > 0) {
          setSuggestions(newSuggestions);
          setShowSuggestions(true);
          setSelectedSuggestion(0);
        }
      } else if (suggestions.length > 0) {
        // Apply the selected suggestion
        const suggestion = suggestions[selectedSuggestion];
        setCurrentCommand(suggestion);
        setShowSuggestions(false);
        setSuggestions([]);
        setSelectedSuggestion(-1);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSuggestions([]);
      setSelectedSuggestion(-1);
    } else if (e.key === 'Enter') {
      if (showSuggestions) {
        e.preventDefault();
        const suggestion = suggestions[selectedSuggestion];
        setCurrentCommand(suggestion);
        setShowSuggestions(false);
        setSuggestions([]);
        setSelectedSuggestion(-1);
      } else {
        handleCommand(e);
        setHistoryIndex(-1);
        setSavedCommand('');
      }
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      setCommandHistory([]);
      setCurrentCommand('');
      setHistoryIndex(-1);
      setSavedCommand('');
    }
  };

  const handleNavigateToMenu = () => {
    if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
      window.location.href = '/playground'
    }
  }

  const StatusBar = () => (
    <div className="status-bar">
      <div className="status-bar-section">
        <div className="status-bar-item">
          <span className="key-hint">Tab</span>
          <span>Autocomplete</span>
        </div>
        <div className="status-bar-item">
          <span className="key-hint">↑↓</span>
          <span>History</span>
        </div>
        <div className="status-bar-item">
          <span className="key-hint">Ctrl+C</span>
          <span>Clear</span>
        </div>
      </div>
      <div className="status-bar-section">
        <div className="status-bar-item">
          Mode: {status.mode.toUpperCase()}
        </div>
        <div className="status-bar-item">
          Level: {status.level}
        </div>
        <div className="status-bar-item">
          Score: {status.score}
        </div>
      </div>
    </div>
  );

  // Add Suggestions component
  const Suggestions = () => {
    if (!showSuggestions || suggestions.length === 0) return null;

    return (
      <div className="suggestions-container">
        {suggestions.map((suggestion, index) => (
          <div
            key={suggestion}
            className={`suggestion-item ${index === selectedSuggestion ? 'selected' : ''}`}
            onClick={() => {
              setCurrentCommand(suggestion);
              setShowSuggestions(false);
              setSuggestions([]);
              setSelectedSuggestion(-1);
            }}
          >
            {suggestion}
          </div>
        ))}
      </div>
    );
  };

  // Modify help command to show command descriptions
  const getHelpText = () => {
    return Object.entries(AVAILABLE_COMMANDS)
      .map(([cmd, info]) => `- ${cmd}${info.args ? ' ' + info.args : ''}: ${info.description}`)
      .join('\n');
  };

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
                <div 
                  ref={terminalOutputRef}
                  className="terminal-output h-[480px] overflow-y-auto mb-4 smooth-scroll"
                >
                  {commandHistory.map((cmd, i) => (
                    <div key={i} className="mb-2">
                      <div className={cmd.isError ? 'text-red-500' : ''}>{cmd.input}</div>
                      <div 
                        className={`ml-2 whitespace-pre-line ${cmd.isLoading ? 'loading-dots' : ''}`}
                        dangerouslySetInnerHTML={{ __html: cmd.output }}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="terminal-input-line">
                  <span>{'>'}</span>
                  <input
                    type="text"
                    value={currentCommand}
                    onChange={(e) => {
                      setCurrentCommand(e.target.value);
                      setShowSuggestions(false);
                    }}
                    onKeyDown={handleKeyDown}
                    className={`terminal-input ${isSearching ? 'cursor-wait' : ''}`}
                    disabled={isSearching}
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                  />
                  <Suggestions />
                </div>
                <StatusBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 