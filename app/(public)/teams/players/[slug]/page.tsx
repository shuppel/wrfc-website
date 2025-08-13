import { redirect } from 'next/navigation';

interface PlayerProfilePageProps {
  params: {
    slug: string;
  };
}

export default function PlayerProfilePage({}: PlayerProfilePageProps) {
  // Redirect all player profile requests to the main players page
  redirect('/teams/players');
}

// Disable static generation for now
export async function generateStaticParams() {
  return [];
}