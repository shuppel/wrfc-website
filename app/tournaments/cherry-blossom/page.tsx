import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cherry Blossom Tournament 2026 | Washington Rugby Football Club',
  description: 'Register for the 58th Annual Cherry Blossom Rugby Tournament in Washington DC. April 11-12, 2026 at Liberty Sports Park. Multiple divisions for men\'s, women\'s, collegiate, and high school teams.',
  keywords: ['Cherry Blossom Tournament', 'rugby tournament', 'Washington DC rugby', 'WRFC', '2026 rugby', 'collegiate rugby', 'spring rugby tournament'],
  openGraph: {
    title: 'Cherry Blossom Tournament 2026',
    description: 'Premier East Coast rugby tournament. April 11-12, 2026 in Washington DC.',
    images: ['/assets/pictures/tournament_banner_watercolor.png'],
  },
};

export default function CherryBlossomTournament() {
  redirect('/tournaments/cherry-blossom/2026');
} 