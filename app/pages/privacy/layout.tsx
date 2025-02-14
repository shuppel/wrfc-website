import { Metadata } from 'next';
import { defaultMetadata } from '@/app/seo/config';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Privacy Policy | Nodetus',
  description: 'Our commitment to protecting your privacy and data security. Learn about how we handle and protect your information.',
  keywords: 'Privacy Policy, Data Protection, Information Security, Terms of Service, Data Privacy',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Nodetus Privacy Policy',
    description: 'Learn about our data protection and privacy practices.',
    type: 'website'
  }
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 