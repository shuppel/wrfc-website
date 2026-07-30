import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getCurrentTournament } from '@/data/cherry-blossom-tournaments';

const tournament = getCurrentTournament();

export const metadata: Metadata = {
  title: `Cherry Blossom Rugby Tournament ${tournament.year} | Washington Rugby Football Club`,
  description: `The ${tournament.edition}th Annual Cherry Blossom Rugby Tournament, hosted by Washington Rugby Football Club every spring since 1968. Men's and women's club, college and high school 15s brackets. ${tournament.registrationOpen ? 'Registration is open.' : `Registration opens ${tournament.registrationOpens ?? 'in December'}.`}`,
  keywords: [
    'Cherry Blossom Tournament',
    'Cherry Blossom rugby tournament',
    'DC rugby tournament',
    'spring rugby tournament',
    'east coast rugby tournament',
    'college rugby tournament',
    'high school rugby tournament',
    'WRFC',
    `${tournament.year} rugby tournament`
  ],
  openGraph: {
    title: `Cherry Blossom Rugby Tournament ${tournament.year}`,
    description: `${tournament.edition}th Annual Cherry Blossom Rugby Tournament, hosted by Washington Rugby Football Club since 1968.`,
    images: ['/assets/pictures/138A4076.jpg'],
  },
};

export default function CherryBlossomTournament() {
  redirect(`/tournaments/cherry-blossom/${tournament.year}`);
}
