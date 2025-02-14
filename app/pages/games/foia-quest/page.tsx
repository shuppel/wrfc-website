import { Metadata } from 'next';
import { defaultMetadata } from '@/app/seo/config';
import FoiaQuest from '@/app/components/features/FoiaQuest/FoiaQuest'
import { GameContainer } from '@/app/components/features/common/GameContainer'

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'FOIA Quest | Nodetus Games',
  description: 'Embark on an educational adventure in FOIA Quest. Learn about the Freedom of Information Act through an engaging game experience.',
  keywords: 'FOIA Quest, Educational Games, Government Transparency, Freedom of Information Act, Interactive Learning',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Play FOIA Quest on Nodetus',
    description: 'Learn about FOIA through an interactive game experience.',
    type: 'website'
  }
};

export default function FoiaQuestPage() {
  return (
    <GameContainer>
      <FoiaQuest />
    </GameContainer>
  )
} 