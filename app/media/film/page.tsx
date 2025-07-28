import { Metadata } from 'next';
import { generateMetadata, getStructuredData } from '@/app/utils/seo';
import FilmRoomContent from './FilmRoomContent';

// Generate metadata for the film room page
export const metadata: Metadata = generateMetadata('media');

export default function FilmRoomPage() {
  // Structured data for video gallery
  const structuredData = getStructuredData('media', {
    '@type': 'VideoGallery',
    name: 'WRFC Film Room',
    description: 'Match highlights and rugby videos from Washington Rugby Football Club',
    url: 'https://washingtonrugby.org/media/film',
    publisher: {
      '@type': 'Organization',
      name: 'Washington Rugby Football Club',
      logo: {
        '@type': 'ImageObject',
        url: 'https://washingtonrugby.org/logos/wrfc_logo.png'
      }
    }
  });

  return <FilmRoomContent structuredData={structuredData} />;
}