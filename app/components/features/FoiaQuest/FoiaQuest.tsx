'use client'

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './FoiaQuest.css'
import { GameNavigation } from '../common/GameNavigation';
import { useGameNavigation } from '../hooks/useGameNavigation';
import { GameContainer } from '../common/GameContainer';

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

const API_BASE = '/api/muckrock'

// Add API configuration
const API_CONFIG = {
  PAGE_SIZE: 50,
  DEFAULT_HEADERS: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
}

// Add API endpoints
const API_ENDPOINTS = {
  AGENCY: 'agency',
  FOIA: 'foia'
}

const TheaterMode = () => (
  <div className="scanlines"></div>
)

// Add available commands constant
const AVAILABLE_COMMANDS: Record<string, CommandInfo> = {
  help: { 
    description: 'Show available commands',
    help: `Available Commands:
=================

help                    Show this help message
help <command>         Show detailed help for a specific command

search <term>          Search for agencies
  Examples:
  - search fbi         Search for specific agency
  - search police      Search for type of agency
  - search california  Search by state/jurisdiction

request <agency_id>    Submit FOIA request to an agency
  Example: request 123

status                 Check current game status
clear                  Clear terminal

Use Tab for command completion and ↑↓ for command history.
Type "help <command>" for more details about a specific command.`
  },
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
  request: { 
    description: 'Submit FOIA request', 
    args: '<agency_id>',
    help: `Usage: request <agency_id>
Submits a FOIA request to the specified agency.

Steps:
1. First search for an agency using the search command
2. Note the agency ID number from the search results
3. Use request command with that ID number

Example workflow:
1. search fbi
2. [Note the ID from results, e.g. "123: FBI"]
3. request 123

Note: You must use a valid agency ID from search results.`
  },
  status: { 
    description: 'Check current game status',
    help: `Usage: status
Shows your current game progress including:
- Current level
- Score
- Request status
- Game state`
  },
  clear: { 
    description: 'Clear terminal',
    help: `Usage: clear
Clears the terminal screen and command history.
You can also use Ctrl+C as a shortcut.`
  }
} as const;

// Add fuzzy search utility
const fuzzySearch = (items: Agency[], searchTerm: string): Agency[] => {
  const searchTermLower = searchTerm.toLowerCase();
  const searchWords = searchTermLower.split(/\s+/);
  
  return items.filter(agency => {
    const nameLower = agency.name.toLowerCase();
    const jurisdictionLower = agency.jurisdiction.toLowerCase();
    const searchString = `${nameLower} ${jurisdictionLower}`;
    
    // All search words must be found in either name or jurisdiction
    return searchWords.every(word => 
      searchString.includes(word) ||
      // Add fuzzy matching using common abbreviations and partial matches
      (word.length > 2 && searchString.split(/\s+/).some(part => 
        part.startsWith(word) || 
        (word.length > 3 && part.includes(word))
      ))
    );
  }).sort((a, b) => {
    // Prioritize exact matches
    const aExact = a.name.toLowerCase().includes(searchTermLower) ? 0 : 1;
    const bExact = b.name.toLowerCase().includes(searchTermLower) ? 0 : 1;
    return aExact - bExact;
  });
};

export default function FoiaQuest() {
  const { handleNavigateToMenu } = useGameNavigation();
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
        const params = new URLSearchParams({
          format: 'json',
          page_size: '100' // Get more results initially
        });
        const response = await fetch(`${API_BASE}/${API_ENDPOINTS.AGENCY}?${params}`, {
          headers: API_CONFIG.DEFAULT_HEADERS,
          method: 'GET'
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        if (!data || !data.results) {
          throw new Error('Invalid API response format');
        }
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
      const params = new URLSearchParams({ format: 'json' });
      const response = await fetch(`${API_BASE}/${API_ENDPOINTS.FOIA}?${params}`, {
        method: 'POST',
        headers: API_CONFIG.DEFAULT_HEADERS,
        body: JSON.stringify({
          agency: agencyId,
          title: `Level ${gameState.level} FOIA Request`,
          document_request: `This is an automated FOIA request for testing purposes.`
        })
      })
      
      if (!response.ok) {
        if (response.status === 402) {
          throw new Error('No available FOIA requests. Please purchase more requests to continue.');
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      if (!data) {
        throw new Error('Invalid API response format');
      }
      
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
    const inputLower = input.toLowerCase().trim();
    
    // If we're starting a new command
    if (!inputLower.includes(' ')) {
      return Object.keys(AVAILABLE_COMMANDS)
        .filter(cmd => cmd.startsWith(inputLower));
    }

    // Handle help command suggestions
    if (inputLower.startsWith('help ')) {
      const searchTerm = inputLower.slice(5).trim();
      return Object.keys(AVAILABLE_COMMANDS)
        .filter(cmd => cmd.startsWith(searchTerm))
        .map(cmd => `help ${cmd}`);
    }

    // If we're in a search command, suggest from recent searches
    if (inputLower.startsWith('search ')) {
      const searchTerm = inputLower.slice(7).trim();
      const recentSearches = commandHistory
        .filter(cmd => cmd.input.startsWith('> search'))
        .map(cmd => cmd.input.slice(2)) // Remove '> ' prefix
        .filter(cmd => cmd.toLowerCase().includes(searchTerm))
        .slice(0, 5);
      
      // Add help suggestion if no recent searches or at start
      if (searchTerm === '' || recentSearches.length === 0) {
        recentSearches.unshift('help search');
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
      const trimmedCommand = currentCommand.trim();
      if (trimmedCommand.startsWith('search')) {
        setStatus(prev => ({ ...prev, mode: 'search' }));
      } else if (trimmedCommand.startsWith('help')) {
        setStatus(prev => ({ ...prev, mode: 'help' }));
      } else {
        setStatus(prev => ({ ...prev, mode: 'input' }));
      }
      return;
    }
    
    const command = currentCommand.trim()
    let response = ''
    let isError = false
    
    // Extract command and args, preserving original case for args
    const [mainCommand, ...args] = command.split(/\s+/)
    const mainCommandLower = mainCommand.toLowerCase()
    const commandArg = args.join(' ')
    const commandArgLower = commandArg.toLowerCase()

    switch (mainCommandLower) {
      case 'help':
        if (commandArg) {
          // Show help for specific command
          const requestedCommand = Object.entries(AVAILABLE_COMMANDS)
            .find(([cmd]) => cmd === commandArgLower);
          
          if (requestedCommand) {
            response = requestedCommand[1].help || `${requestedCommand[0]}${requestedCommand[1].args ? ' ' + requestedCommand[1].args : ''}: ${requestedCommand[1].description}`;
          } else {
            response = `Unknown command: "${commandArg}"\nType "help" to see all available commands.`;
            isError = true;
          }
        } else {
          response = AVAILABLE_COMMANDS.help.help || getHelpText();
        }
        break;
        
      case 'clear':
        setCommandHistory([])
        setCurrentCommand('')
        return;
        
      case 'status':
        response = `Level: ${gameState.level}\nScore: ${gameState.score}\nStatus: ${gameState.status}`
        break;
        
      case 'search':
        if (!commandArg) {
          response = AVAILABLE_COMMANDS.search.help || '';
          break;
        }

        // Add loading state
        setCommandHistory(prev => [...prev, 
          { input: `> ${command}`, output: 'Searching agencies...', isLoading: true }
        ]);
        setIsSearching(true);

        try {
          // Perform client-side fuzzy search
          const searchResults = fuzzySearch(agencies, commandArg);
          
          if (searchResults.length === 0) {
            response = `No agencies found matching your search: "${commandArg}"

Suggestions:
1. Check the spelling
2. Try using fewer words
3. Use alternative terms:
   - Instead of "${commandArg}", try related terms
   - Use broader categories
   - Include or remove location information
4. Try one of these example searches:
   - search fbi
   - search police
   - search california
   - search environmental

Type "-help search" for more search tips.`;
            isError = true;
          } else {
            const totalResults = searchResults.length;
            response = `Found ${totalResults > 5 ? '5 of ' + totalResults : totalResults} agencies matching "${commandArg}":\n\n` + 
              searchResults
                .slice(0, 5)
                .map((a: Agency) => `${a.id}: ${a.name} (${a.jurisdiction})`)
                .join('\n') +
              (totalResults > 5 ? '\n\nNote: Showing first 5 results. Try a more specific search to narrow down results.' : '');
          }
        } catch (error) {
          response = formatErrorMessage(error, 'agency search');
          isError = true;
        } finally {
          setIsSearching(false);
          // Remove the loading message
          setCommandHistory(prev => prev.slice(0, -1));
        }
        break;

      case 'request':
        if (!commandArg) {
          response = AVAILABLE_COMMANDS.request.help || '';
          isError = true;
          break;
        }
        const agencyExists = agencies.some(agency => agency.id === commandArg)
        if (!agencyExists) {
          response = `Error: Invalid agency ID "${commandArg}"

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
            await submitFoiaRequest(commandArg)
            response = 'Processing FOIA request...\nRequest submitted successfully!'
          } catch (error) {
            response = formatErrorMessage(error, 'FOIA request');
            isError = true;
          }
        }
        break;

      default:
        response = `Unknown command: "${mainCommand}"\nType "help" for available commands.`
        isError = true;
    }

    setCommandHistory(prev => [...prev, 
      { input: `> ${command}`, output: response, isError }
    ])
    setCurrentCommand('')
    setStatus(prev => ({ ...prev, lastCommand: command }));
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent default browser behavior for certain keys
    if ([
      'ArrowUp',
      'ArrowDown',
      'PageUp',
      'PageDown',
      'Home',
      'End'
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
    <GameContainer className="foia-quest">
      <div className="theater-overlay">
        <GameNavigation 
          onBack={handleNavigateToMenu}
          onExit={handleNavigateToMenu}
        />
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
    </GameContainer>
  )
} 