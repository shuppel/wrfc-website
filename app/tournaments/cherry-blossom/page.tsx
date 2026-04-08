import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cherry Blossom Tournament 2026 | Washington Rugby Football Club',
  description: 'Register for the 58th Annual Cherry Blossom Rugby Tournament. April 11, 2026 at 22006 James Monroe Highway, Aldie, VA 20105. Multiple divisions for men\'s club, collegiate, and old boys teams.',
  keywords: ['Cherry Blossom Tournament', 'rugby tournament', 'Virginia rugby', 'WRFC', '2026 rugby', 'collegiate rugby', 'spring rugby tournament', 'Aldie VA rugby', 'rugby tournament'],
  openGraph: {
    title: 'Cherry Blossom Tournament 2026',
    description: '58th Annual Cherry Blossom Rugby Tournament. April 11, 2026 at 22006 James Monroe Highway, Aldie, VA 20105.',
    images: ['/assets/pictures/138A4076.jpg'],
  },
};

export default function CherryBlossomTournament() {
  redirect('/tournaments/cherry-blossom/2026');
} 