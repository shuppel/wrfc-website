import { generateMetadata } from '../utils/seo';
import { WebsiteJsonLd, OrganizationJsonLd } from '@/components/JsonLd';
import { Metadata } from 'next';

// Enhanced metadata with additional SEO properties
export const metadata: Metadata = {
  ...generateMetadata('contact'),
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  verification: {
    google: 'verification_token',  // Replace with actual Google verification token
    yandex: 'verification_token',  // Replace with actual Yandex verification token if needed
  },
  alternates: {
    canonical: 'https://washingtonrugby.org/contact',
    languages: {
      'en-US': 'https://washingtonrugby.org/contact',
    },
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Global JSON-LD for the website and organization */}
      <WebsiteJsonLd />
      <OrganizationJsonLd />
      
      {/* Main content */}
      <div itemScope itemType="https://schema.org/ContactPage">
        {children}
      </div>
    </>
  );
} 