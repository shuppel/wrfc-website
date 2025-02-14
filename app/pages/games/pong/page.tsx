'use client'

import { Metadata } from 'next';
import { defaultMetadata } from '@/app/seo/config';
import PongGame from '@/app/components/features/PongGame/PongGame'
import { GameContainer } from '@/app/components/features/common/GameContainer'

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Play Pong | Nodetus Games',
  description: 'Experience the classic Pong game reimagined. Challenge yourself or play with friends in this timeless arcade game.',
  keywords: 'Pong Game, Classic Arcade, Online Games, Retro Gaming, Multiplayer Games',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Play Pong on Nodetus',
    description: 'Classic Pong game reimagined for modern browsers.',
    type: 'website'
  }
};

export default function PongGamePage() {
  return (
    <GameContainer>
      <PongGame />
    </GameContainer>
  )
} 