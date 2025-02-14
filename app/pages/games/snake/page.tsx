'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { GameContainer } from '@/app/components/features/common/GameContainer';
import { GameLoadingScreen } from '@/app/components/ui/GameLoadingScreen';

// Dynamically import the game component with SSR disabled
const SnakeGame = dynamic(
  () => import('@/app/components/features/SnakeGame/SnakeGame'),
  { ssr: false }
);

export default function SnakeGamePage() {
  return (
    <GameContainer>
      <Suspense fallback={<GameLoadingScreen />}>
        <SnakeGame />
      </Suspense>
    </GameContainer>
  );
} 