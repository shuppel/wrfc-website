import React from 'react';
import { GameNavigation } from './GameNavigation';
import { useGameNavigation } from '../hooks/useGameNavigation';

interface GameContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const GameContainer: React.FC<GameContainerProps> = ({ children, className = '' }) => {
  const { handleNavigateToMenu } = useGameNavigation();

  return (
    <div className={`game-container ${className}`}>
      <GameNavigation 
        onBack={handleNavigateToMenu}
        onExit={handleNavigateToMenu}
      />
      <div className="game-content">
        {children}
      </div>
      <style jsx>{`
        .game-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000;
          overflow: hidden;
        }
        
        .game-content {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}; 