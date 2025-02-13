import React from 'react';
import './GameNavigation.css';

interface GameNavigationProps {
  onExit: () => void;
  onBack: () => void;
}

export const GameNavigation: React.FC<GameNavigationProps> = ({ onExit, onBack }) => {
  return (
    <>
      <button 
        className="nav-button back-button" 
        onClick={onBack}
        aria-label="Back to menu"
      >
        ← Back to Menu
      </button>
      <button 
        className="exit-button" 
        onClick={onExit}
        aria-label="Exit game"
      >
        ×
      </button>
    </>
  );
}; 