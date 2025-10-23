export interface Tournament {
  slug: string;
  name: string;
  year: number;
  startDate: string;
  endDate: string;
  description: string;
  registrationLink?: string;
  logo?: string;
  venue?: {
    name: string;
    address: string;
  };
  divisions?: Array<{
    name: string;
    price: number;
  }>;
}

export const tournaments: Tournament[] = [];

export function getAllTournaments(): Tournament[] {
  return tournaments;
}

export function getTournamentBySlug(slug: string): Tournament | undefined {
  return tournaments.find(tournament => tournament.slug === slug);
}

export function getAllTournamentSlugs(): string[] {
  return tournaments.map(tournament => tournament.slug);
}
