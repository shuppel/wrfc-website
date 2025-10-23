export interface Match {
  slug: string;
  title: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  venue: {
    name: string;
    address: string;
  };
  kickoffTime: string;
  division: string;
  result?: {
    homeScore: number;
    awayScore: number;
  };
  matchReport?: string;
}

export const matches: Match[] = [];

export function getAllMatches(): Match[] {
  return matches;
}

export function getMatchBySlug(slug: string): Match | undefined {
  return matches.find(match => match.slug === slug);
}

export function getAllMatchSlugs(): string[] {
  return matches.map(match => match.slug);
}
