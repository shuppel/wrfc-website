import { Metadata } from 'next';
import { defaultMetadata } from '@/app/seo/config';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Playground | Nodetus',
  description: 'Explore our interactive playground featuring games and demos showcasing our development capabilities.',
  keywords: 'Interactive Demos, Web Games, Development Showcase, Technical Demonstrations, Web Development, Game Development',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Nodetus Interactive Playground',
    description: 'Explore our interactive playground featuring games and demos.',
    type: 'website'
  }
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 