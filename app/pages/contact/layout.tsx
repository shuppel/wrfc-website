import { Metadata } from 'next';
import { defaultMetadata } from '@/app/seo/config';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Contact Us | Nodetus',
  description: 'Get in touch with Nodetus Integrators LLC. We\'re here to help with your federal IT modernization needs and technology solutions.',
  keywords: 'Contact Nodetus, IT Advisory Services, Federal Contractors, Technology Consultation, Get in Touch',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Contact Nodetus Integrators',
    description: 'Reach out to discuss your federal IT modernization needs.',
    type: 'website'
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 