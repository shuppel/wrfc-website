'use client'

import SnakeGame from '@/app/components/features/SnakeGame/SnakeGame'
import { GameContainer } from '@/app/components/features/common/GameContainer'

export default function SnakeGamePage() {
  return (
    <GameContainer>
      <SnakeGame />
    </GameContainer>
  )
} 