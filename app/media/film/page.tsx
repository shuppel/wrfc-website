import { Metadata } from 'next';
import { generateSEOMetadata, getStructuredData } from '@/app/utils/seo';
import FilmRoomContent from './FilmRoomContent';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Film Room | WRFC Match Highlights & Rugby Videos',
  description: 'Watch Washington Rugby Football Club match highlights, training footage, and rugby videos. Film analysis and video coverage from DC\'s premier rugby club.',
  path: '/media/film',
});

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