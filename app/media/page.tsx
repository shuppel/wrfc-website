import { generateMetadata, getStructuredData } from '../utils/seo';
import MediaContent from './MediaContent';

// Generate metadata for the media page
export const metadata = generateMetadata('media');

export default function MediaPage() {
  // Additional structured data specific to the media page
  const structuredData = getStructuredData('media', {
    '@type': 'WebPage',
    mainEntity: {
      '@type': 'MediaGallery',
      name: 'WRFC Media Gallery',
      description: 'Browse Washington Rugby Football Club media gallery, including match photos, team highlights, and news updates.',
      about: {
        '@type': 'SportsTeam',
        name: 'Washington Rugby Football Club',
        sport: 'Rugby',
        url: 'https://washingtonrugby.org'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Washington Rugby Football Club',
        url: 'https://washingtonrugby.org'
      }
    }
  });

  return <MediaContent structuredData={structuredData} />;
} 