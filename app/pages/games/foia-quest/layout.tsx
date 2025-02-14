import { Metadata } from 'next';
import { defaultMetadata } from '@/app/seo/config';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'FOIA Quest | Nodetus Games',
  description: 'Navigate the complexities of Freedom of Information Act (FOIA) requests in this educational adventure game.',
  keywords: 'FOIA Quest, Government Simulation, Educational Game, FOIA Process, Document Management',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Play FOIA Quest on Nodetus',
    description: 'Master the art of FOIA requests in this engaging simulation.',
    type: 'website'
  }
};

export default function FoiaQuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 