import { Metadata } from 'next';
import { generateMetadata } from '@/utils/seo';
import SocialMediaContent from './SocialMediaContent';

// Generate metadata for the social media page
export const metadata: Metadata = generateMetadata('media');

export default function SocialMediaPage() {
  // Structured data for social media hub
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'WRFC Social Media Hub',
    description: 'Connect with Washington Rugby Football Club on social media. Follow us on Instagram and Facebook for real-time updates.',
    url: 'https://washingtonrugby.org/media/social',
    publisher: {
      '@type': 'Organization',
      name: 'Washington Rugby Football Club',
      sameAs: [
        'https://www.instagram.com/wrfc1963/',
        'https://www.facebook.com/washingtonrugby'
      ]
    }
  };

  return <SocialMediaContent structuredData={structuredData} />;
}