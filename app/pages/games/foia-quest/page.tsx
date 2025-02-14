'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { GameContainer } from '@/app/components/features/common/GameContainer';
import { GameLoadingScreen } from '@/app/components/ui/GameLoadingScreen';

// Dynamically import the game component with SSR disabled
const FoiaQuest = dynamic(
  () => import('@/app/components/features/FoiaQuest/FoiaQuest'),
  { ssr: false }
);

export default function FoiaQuestPage() {
  return (
    <GameContainer>
      <Suspense fallback={<GameLoadingScreen />}>
        <FoiaQuest />
      </Suspense>
    </GameContainer>
  );
} 