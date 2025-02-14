import { Metadata } from 'next';
import { defaultMetadata } from '@/app/seo/config';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Pong | Nodetus Games',
  description: 'Experience the classic arcade game Pong with a modern twist. Challenge yourself in this timeless paddle-and-ball game.',
  keywords: 'Pong Game, Classic Arcade, Retro Gaming, Paddle Game, Browser Game',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Play Pong on Nodetus',
    description: 'Challenge yourself in this modern take on the classic Pong game.',
    type: 'website'
  }
};

export default function PongLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 