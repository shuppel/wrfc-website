import { Metadata } from 'next';
import { defaultMetadata } from '@/app/seo/config';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'IT Advisory Services | Nodetus',
  description: 'Comprehensive IT solutions tailored for federal agencies and contractors, delivering cutting-edge technology services with proven expertise.',
  keywords: 'IT Services, Federal Contractors, NAICS Codes, IT Modernization, Technical Services, Engineering Services, Computer Services',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'IT Advisory Services | Nodetus',
    description: 'Comprehensive IT solutions for federal agencies and contractors.',
    type: 'website'
  }
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 