import { Metadata } from 'next';
import { generateSEOMetadata, getStructuredData } from '@/app/utils/seo';
import SocialMediaContent from './SocialMediaContent';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Social Media | WRFC',
  description: 'Follow Washington Rugby Football Club on Instagram and Facebook for real-time updates, match coverage, and behind-the-scenes content from DC\'s premier rugby club.',
  path: '/media/social',
});

export default function SocialMediaPage() {
  // Structured data for social media hub
  const structuredData = getStructuredData('media', {
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
  });

  return <SocialMediaContent structuredData={structuredData} />;
}