import { Metadata } from 'next';
import { defaultMetadata } from '@/app/seo/config';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'SCIF Game | Nodetus Games',
  description: 'Experience the challenges of managing a Sensitive Compartmented Information Facility (SCIF) in this unique simulation game.',
  keywords: 'SCIF Game, Security Simulation, Government Facility, Educational Game, Cybersecurity',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Play SCIF Game on Nodetus',
    description: 'Learn about SCIF management through an interactive simulation.',
    type: 'website'
  }
};

export default function SCIFLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 