'use client';

import React from 'react';
import './GameNavigation.css';

interface GameNavigationProps {
  onExit: () => void;
  onBack: () => void;
  onRestart?: () => void;  // Optional restart handler
  className?: string;      // Optional className for styling
}

export const GameNavigation: React.FC<GameNavigationProps> = ({ 
  onExit, 
  onBack, 
  onRestart,
  className = '' 
}) => {
  return (
    <div className={className}>
      <button 
        className="nav-button back-button" 
        onClick={onBack}
        aria-label="Back to menu"
      >
        ← Back to Menu
      </button>
      {onRestart && (
        <button 
          className="nav-button restart-button" 
          onClick={onRestart}
          aria-label="Restart game"
        >
          ↺ Restart
        </button>
      )}
      <button 
        className="exit-button" 
        onClick={onExit}
        aria-label="Exit game"
      >
        ×
      </button>
    </div>
  );
}; 