import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cherry Blossom Tournament 2026 | Washington Rugby Football Club',
  description: 'We\'re back in DC! Register for the 58th Annual Cherry Blossom Rugby Tournament. April 11, 2026 at The Fields at RFK in Washington DC. Multiple divisions for men\'s club, collegiate, and old boys teams.',
  keywords: ['Cherry Blossom Tournament', 'rugby tournament', 'Washington DC rugby', 'WRFC', '2026 rugby', 'collegiate rugby', 'spring rugby tournament', 'RFK rugby', 'DC rugby tournament'],
  openGraph: {
    title: 'Cherry Blossom Tournament 2026 - We\'re Back in DC!',
    description: '58th Annual Cherry Blossom Rugby Tournament. April 11, 2026 at The Fields at RFK, Washington DC.',
    images: ['/assets/pictures/138A4076.jpg'],
  },
};

export default function CherryBlossomTournament() {
  redirect('/tournaments/cherry-blossom/2026');
} 