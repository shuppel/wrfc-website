import React from 'react';

export function GameLoadingScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black/90 text-white">
      <div className="relative w-16 h-16 mb-4">
        {/* Arcade-style loading animation */}
        <div className="absolute inset-0 border-4 border-orange-500/30 rounded-full animate-[spin_3s_linear_infinite]" />
        <div className="absolute inset-2 border-4 border-orange-500/50 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
        <div className="absolute inset-4 border-4 border-orange-500/70 rounded-full animate-[spin_1s_linear_infinite]" />
      </div>
      <div className="text-lg font-mono">
        <span className="animate-pulse">Loading game</span>
        <span className="animate-[blink_1s_step-end_infinite]">...</span>
      </div>
      <div className="mt-2 text-sm text-orange-500/70 font-mono">
        Please wait while we initialize the game
      </div>
    </div>
  );
} 