'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { GameContainer } from '@/app/components/features/common/GameContainer';
import { GameLoadingScreen } from '@/app/components/ui/GameLoadingScreen';

// Dynamically import the game component with SSR disabled
const PongGame = dynamic(
  () => import('@/app/components/features/PongGame/PongGame'),
  { ssr: false }
);

export default function PongGamePage() {
  return (
    <GameContainer>
      <Suspense fallback={<GameLoadingScreen />}>
        <PongGame />
      </Suspense>
    </GameContainer>
  );
} 