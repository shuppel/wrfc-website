import { Metadata } from 'next';
import { defaultMetadata } from '@/app/seo/config';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    template: '%s | Nodetus Games',
    default: 'Interactive Games | Nodetus'
  },
  description: 'Experience our collection of interactive games designed to make learning about federal IT and procurement fun and engaging.',
  keywords: 'Educational Games, Federal IT Games, Interactive Learning, FOIA Quest, SCIF Game, Government Procurement Games',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Nodetus Interactive Games',
    description: 'Learn about federal IT through engaging gameplay.',
    type: 'website'
  }
};

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
      {children}
    </div>
  )
} 