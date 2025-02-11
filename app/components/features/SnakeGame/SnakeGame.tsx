'use client'

import * as React from 'react'
import { useState, useEffect, useCallback, useMemo } from 'react'
import './SnakeGame.css'

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

const GRID_SIZE = 20;
const INITIAL_SNAKE: Position[] = [{ x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) }];
const INITIAL_DIRECTION = Direction.RIGHT;
const INITIAL_SPEED = 150;

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  
  // Create a set of snake positions for faster lookups
  const snakePositions = useMemo(() => new Set(snake.map(s => `${s.x},${s.y}`)), [snake]);

  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snakePositions.has(`${newFood.x},${newFood.y}`));
    return newFood;
  }, [snakePositions]);

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake((prevSnake: Position[]) => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
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

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        return prevSnake;
      }

      // Check self-collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return prevSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 1);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }
      return newSnake;
    });
  }, [direction, food, gameOver, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection(prev => prev !== Direction.DOWN ? Direction.UP : prev);
          break;
        case 'ArrowDown':
          setDirection(prev => prev !== Direction.UP ? Direction.DOWN : prev);
          break;
        case 'ArrowLeft':
          setDirection(prev => prev !== Direction.RIGHT ? Direction.LEFT : prev);
          break;
        case 'ArrowRight':
          setDirection(prev => prev !== Direction.LEFT ? Direction.RIGHT : prev);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Dynamically adjust speed as the score increases
  useEffect(() => {
    if (gameOver) return;
    const speed = Math.max(50, INITIAL_SPEED - score * 5);
    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [moveSnake, score, gameOver]);

  // Prevent default scrolling behavior on key presses
  useEffect(() => {
    const preventDefaultScroll = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
    }
    window.addEventListener('keydown', preventDefaultScroll);
    return () => window.removeEventListener('keydown', preventDefaultScroll);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood());
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
  };

  const handleNavigateToMenu = () => {
    if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
      window.location.href = '/playground';
    }
  };

  const handleExit = () => handleNavigateToMenu();

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
          onClick={handleExit}
          aria-label="Exit game"
        >
          ×
        </button>
        <div className="game-container">
          <div className="snake-game">
            <div className="game-info">
              <span>Score: {score}</span>
              {gameOver && (
                <div className="game-over">
                  <h2>Game Over!</h2>
                  <button onClick={resetGame}>Play Again</button>
                </div>
              )}
            </div>
            <div className="game-board">
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                const x = index % GRID_SIZE;
                const y = Math.floor(index / GRID_SIZE);
                const cellKey = `${x}-${y}`;
                const cellClass = snakePositions.has(`${x},${y}`)
                  ? 'cell snake'
                  : (food.x === x && food.y === y)
                  ? 'cell food'
                  : 'cell';
                return <div key={cellKey} className={cellClass} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
