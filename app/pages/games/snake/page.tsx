import { Metadata } from 'next';
import { defaultMetadata } from '@/app/seo/config';
import SnakeGame from '@/app/components/features/SnakeGame/SnakeGame'
import { GameContainer } from '@/app/components/features/common/GameContainer'

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Play Snake | Nodetus Games',
  description: 'Play the classic Snake game with a modern twist. Test your reflexes and strategy in this addictive arcade game.',
  keywords: 'Snake Game, Classic Arcade, Online Games, Retro Gaming, Browser Games',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Play Snake on Nodetus',
    description: 'Classic Snake game reimagined for modern browsers.',
    type: 'website'
  }
};

export default function SnakeGamePage() {
  return (
    <GameContainer>
      <SnakeGame />
    </GameContainer>
  )
} 