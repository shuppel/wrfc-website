'use client'

import { Metadata } from 'next';
import { defaultMetadata } from '@/app/seo/config';
import SCIFGame from '@/app/components/features/SCIFGame/SCIFGame'
import { GameContainer } from '@/app/components/features/common/GameContainer'

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'SCIF Game | Nodetus Games',
  description: 'Experience the challenges of managing a Sensitive Compartmented Information Facility (SCIF) in this unique simulation game.',
  keywords: 'SCIF Game, Security Simulation, Government Facility Management, Information Security, Educational Gaming',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Play SCIF Game on Nodetus',
    description: 'Manage a Sensitive Compartmented Information Facility in this simulation game.',
    type: 'website'
  }
};

export default function SCIFGamePage() {
  return (
    <GameContainer>
      <SCIFGame />
    </GameContainer>
  )
} 