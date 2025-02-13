'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { GameContainer } from '../common/GameContainer';
import './SnakeGame.css';
import { GameNavigation } from '../common/GameNavigation';
import { useGameNavigation } from '../hooks/useGameNavigation';

type Position = {
  x: number;
  y: number;
};

enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

type GameState = 'start' | 'running' | 'paused' | 'gameOver';

const GRID_SIZE = 20; // initial board dimension (square)
const INITIAL_SNAKE: Position[] = [
  { x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) },
];
const INITIAL_DIRECTION = Direction.RIGHT;
const INITIAL_SPEED = 150; // initial interval (ms)
const MIN_SPEED = 50;      // fastest interval

// Initial board config (can change over time)
const initialBoardConfig = {
  width: GRID_SIZE,
  height: GRID_SIZE,
  gridColor: '#1a4d1a', // Only grid color changes
};

// ─── Helper Functions ──────────────────────────────────────────────────────────

// Returns true if d1 is directly opposite to d2.
const isOpposite = (d1: Direction, d2: Direction): boolean => {
  return (
    (d1 === Direction.UP && d2 === Direction.DOWN) ||
    (d1 === Direction.DOWN && d2 === Direction.UP) ||
    (d1 === Direction.LEFT && d2 === Direction.RIGHT) ||
    (d1 === Direction.RIGHT && d2 === Direction.LEFT)
  );
};

// Returns a random color from a retro palette.
const getRandomColor = (): string => {
  const colors = [
    '#1a4d1a', // Dark green
    '#2d862d', // Medium green
    '#39ac39', // Lighter green
    '#248f24', // Alternate green
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// ─── Custom useInterval Hook ───────────────────────────────────────────────────
// A hook that sets up an interval with a dynamic delay (pausing when delay is null).
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Always update the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

// ─── Main SnakeGame Component ───────────────────────────────────────────────
export default function SnakeGame() {
  const { handleNavigateToMenu } = useGameNavigation();

  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  // Direction state is still here for re-renders but real-time changes use a ref.
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [score, setScore] = useState<number>(0);
  const [gameState, setGameState] = useState<GameState>('start');
  const [highScore, setHighScore] = useState<number>(0);
  // Board configuration & level (for expanding the play area)
  const [boardConfig, setBoardConfig] = useState(initialBoardConfig);
  const [level, setLevel] = useState<number>(0);

  // A ref to queue rapid direction changes.
  const nextDirectionRef = useRef<Direction>(INITIAL_DIRECTION);

  // ── Update snake lookup (for collisions) ─────────────────────────────────────
  const snakePositions = useMemo(
    () => new Set(snake.map(s => `${s.x},${s.y}`)),
    [snake]
  );

  // ── Generate Food ───────────────────────────────────────────────────────────
  const generateFood = useCallback((): Position => {
    let newFood: Position;
    // If the snake fills the board, end the game.
    if (snake.length >= boardConfig.width * boardConfig.height) {
      setGameState('gameOver');
      return food;
    }
    do {
      newFood = {
        x: Math.floor(Math.random() * boardConfig.width),
        y: Math.floor(Math.random() * boardConfig.height),
      };
    } while (snakePositions.has(`${newFood.x},${newFood.y}`));
    return newFood;
  }, [snakePositions, food, boardConfig]);

  // ── Move the Snake (using the buffered direction) ──────────────────────────
  const moveSnake = useCallback(() => {
    if (gameState !== 'running') return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      // Use the buffered direction for a smooth turn.
      const currentDirection = nextDirectionRef.current;
      // Update the displayed direction (if needed).
      setDirection(currentDirection);

      switch (currentDirection) {
        case Direction.UP:
          head.y -= 1;
          break;
        case Direction.DOWN:
          head.y += 1;
          break;
        case Direction.LEFT:
          head.x -= 1;
          break;
        case Direction.RIGHT:
          head.x += 1;
          break;
      }

      // Wall collision based on current board dimensions.
      if (
        head.x < 0 ||
        head.x >= boardConfig.width ||
        head.y < 0 ||
        head.y >= boardConfig.height
      ) {
        setGameState('gameOver');
        return prevSnake;
      }

      // Self-collision.
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameState('gameOver');
        return prevSnake;
      }

      newSnake.unshift(head);

      // Check for food collision.
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 1);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }
      return newSnake;
    });
  }, [food, gameState, boardConfig, generateFood]);

  // ── Keyboard Controls ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState === 'running') {
        let newDir: Direction | null = null;
        switch (e.key) {
          case 'ArrowUp':
            newDir = Direction.UP;
            break;
          case 'ArrowDown':
            newDir = Direction.DOWN;
            break;
          case 'ArrowLeft':
            newDir = Direction.LEFT;
            break;
          case 'ArrowRight':
            newDir = Direction.RIGHT;
            break;
          case 'Escape': // Pause the game.
            setGameState('paused');
            break;
          default:
            break;
        }
        // Queue the turn if it isn't a direct reversal.
        if (newDir && !isOpposite(newDir, nextDirectionRef.current)) {
          nextDirectionRef.current = newDir;
        }
      } else if (gameState === 'paused' || gameState === 'start') {
        // Start or resume the game with the Enter (Return) key.
        if (e.key === 'Enter') {
          setGameState('running');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState]);

  // ── Prevent Default Scroll on Key Press ─────────────────────────────────────
  useEffect(() => {
    const preventDefaultScroll = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', preventDefaultScroll);
    return () => window.removeEventListener('keydown', preventDefaultScroll);
  }, []);

  // ── Incrementally Increase Speed (more gradual) ─────────────────────────────
  const currentSpeed = useMemo(() => {
    const newSpeed = INITIAL_SPEED * Math.pow(0.98, score);
    return Math.max(MIN_SPEED, Math.floor(newSpeed));
  }, [score]);

  // ── Game Loop ──────────────────────────────────────────────────────────────
  useInterval(moveSnake, gameState === 'running' ? currentSpeed : null);

  // ── Level Up: Expand Board When Score Crosses a Threshold ───────────────────
  useEffect(() => {
    const newLevel = Math.floor(score / 10);
    if (newLevel > level) {
      setLevel(newLevel);
      // Increase board dimensions by a small random amount (1 to 3 cells)
      const incrementWidth = Math.floor(Math.random() * 3) + 1;
      const incrementHeight = Math.floor(Math.random() * 3) + 1;
      setBoardConfig(prev => ({
        width: prev.width + incrementWidth,
        height: prev.height + incrementHeight,
        color: getRandomColor(), // New color signals the level change.
      }));
    }
  }, [score, level]);

  // ── Update High Score on Game Over ──────────────────────────────────────────
  useEffect(() => {
    if (gameState === 'gameOver' && score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [gameState, score, highScore]);

  // ── Reset Game Function ─────────────────────────────────────────────────────
  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood());
    nextDirectionRef.current = INITIAL_DIRECTION;
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameState('running');
    setLevel(0);
    setBoardConfig(initialBoardConfig);
  }, [generateFood]);

  const handleExit = useCallback(() => {
    handleNavigateToMenu();
  }, [handleNavigateToMenu]);

  // Load highScore from localStorage after mount
  useEffect(() => {
    const saved = localStorage.getItem('snakeHighScore');
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  return (
    <div>
      <div className="game-container">
        {/* Score Panel - Positioned like Pong */}
        <div className="score-panel">
          <div className="current-stats">
            <div className="score">Score: {score}</div>
            <div className="level">Level: {level + 1}</div>
          </div>
          <div className="high-score">High Score: {highScore}</div>
        </div>

        {/* Main Game Board - Using canvas-like sizing */}
        <div
          className="game-board"
          style={{
            gridTemplateColumns: `repeat(${boardConfig.width}, 1fr)`,
            border: `2px solid ${boardConfig.gridColor}`,
          }}
        >
          {Array.from({ length: boardConfig.width * boardConfig.height }).map((_, index) => {
            const x = index % boardConfig.width;
            const y = Math.floor(index / boardConfig.width);
            const cellKey = `${x}-${y}`;
            const cellClass = snakePositions.has(`${x},${y}`)
              ? 'cell snake'
              : food.x === x && food.y === y
              ? 'cell food'
              : 'cell';
            return <div key={cellKey} className={cellClass} />;
          })}
        </div>

        {/* Overlays - Improved spacing and hierarchy */}
        {gameState === 'start' && (
          <div className="overlay start-overlay">
            <h1>SNAKE</h1>
            <p className="instructions">Use arrow keys to control the snake</p>
            <p className="instructions">Press ESC to pause</p>
            <button onClick={() => setGameState('running')} className="primary-button">
              Start Game
            </button>
          </div>
        )}

        {gameState === 'paused' && (
          <div className="overlay pause-overlay">
            <h2>PAUSED</h2>
            <div className="button-group">
              <button onClick={() => setGameState('running')} className="primary-button">
                Resume
              </button>
              <button onClick={handleExit} className="secondary-button">
                Exit
              </button>
            </div>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="overlay gameover-overlay">
            <h2>GAME OVER</h2>
            <div className="final-score">
              <p>Final Score: {score}</p>
              <p>High Score: {highScore}</p>
            </div>
            <div className="button-group">
              <button onClick={resetGame} className="primary-button">
                Play Again
              </button>
              <button onClick={handleExit} className="secondary-button">
                Exit to Menu
              </button>
            </div>
          </div>
        )}

        <GameNavigation 
          onRestart={resetGame} 
          onExit={handleExit}
          className="game-navigation"
        />
      </div>
    </div>
  );
}
