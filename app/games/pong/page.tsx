'use client'

import PongGame from '@/app/components/features/PongGame/PongGame'
import { GameContainer } from '@/app/components/features/common/GameContainer'

export default function PongGamePage() {
  return (
    <GameContainer>
      <PongGame />
    </GameContainer>
  )
} 