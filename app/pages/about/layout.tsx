import { Metadata } from 'next';
import { defaultMetadata } from '@/app/seo/config';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'About Us | Nodetus',
  description: '2nd Generation Korean-American entrepreneur revolutionizing IT Acquisition and Federal Technology Solutions. Learn about our leadership, experience, and commitment to excellence.',
  keywords: 'Nodetus Leadership, Asian Owned Small Business, Federal IT Services, IT Modernization, Professional Experience, Technical Expertise',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'About Nodetus - Leadership & Experience',
    description: 'Meet our leadership and discover how we revolutionize federal IT solutions.',
    type: 'profile'
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 