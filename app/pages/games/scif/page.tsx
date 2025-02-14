'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { GameContainer } from '@/app/components/features/common/GameContainer';
import { GameLoadingScreen } from '@/app/components/ui/GameLoadingScreen';

// Dynamically import the game component with SSR disabled
const SCIFGame = dynamic(
  () => import('@/app/components/features/SCIFGame/SCIFGame'),
  { ssr: false }
);

export default function SCIFGamePage() {
  return (
    <GameContainer>
      <Suspense fallback={<GameLoadingScreen />}>
        <SCIFGame />
      </Suspense>
    </GameContainer>
  );
} 