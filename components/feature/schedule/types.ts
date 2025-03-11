export type DivisionType = 'D1' | 'D3' | 'Social';

// Helper function to map competition type to division type
export function getGameDivision(competition: string): DivisionType | undefined {
  if (competition.includes('D1') || competition === 'MAC Men D1' || competition === 'LEAGUE') {
    return 'D1';
  }
  if (competition.includes('D3') || competition === 'Capital Men D3 Challenger' || competition === 'TOURNAMENT') {
    return 'D3';
  }
  if (competition === 'SOCIAL' || competition === 'FRIENDLY') {
    return 'Social';
  }
  return undefined;
} 