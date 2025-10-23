export interface AlumniSpotlight {
  slug: string;
  name: string;
  yearsPlayed: string;
  hometown: string;
  story: string;
  quote?: string;
  featuredImage?: string;
  publishDate: string;
  featured?: boolean;
}

export const alumniSpotlights: AlumniSpotlight[] = [
  {
    slug: 'dan-lyle',
    name: 'Dan Lyle',
    yearsPlayed: '1993-1996',
    hometown: 'Washington, DC',
    story: `
      <p>Dan Lyle is one of the most distinguished alumni of Washington Rugby Football Club, having served as captain of the USA Eagles national team and representing his country at the highest levels of international rugby.</p>
      
      <h2>WRFC Career</h2>
      <p>During his time with WRFC from 1993 to 1996, Dan was a commanding presence in the lock position, bringing leadership, athletic prowess, and rugby intelligence to every match.</p>
      
      <h2>International Success</h2>
      <p>Dan's contributions to American rugby extended far beyond the club level. He captained the USA Eagles 15s team and also represented the United States in rugby sevens, becoming one of the most recognizable faces of American rugby during the 1990s.</p>
      
      <h2>Legacy</h2>
      <p>Dan Lyle's impact on WRFC and American rugby continues to inspire current and future generations of players. His dedication to excellence both on and off the field exemplifies the values that WRFC strives to instill in all its members.</p>
    `,
    quote: "Playing for WRFC was foundational to my development as both a player and a leader. The club's commitment to excellence and brotherhood shaped my entire rugby career.",
    featuredImage: '/assets/pictures/team_photo.jpg',
    publishDate: '2024-03-15',
    featured: true
  }
];

export function getAllAlumniSpotlights(): AlumniSpotlight[] {
  return alumniSpotlights.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export function getAlumniSpotlightBySlug(slug: string): AlumniSpotlight | undefined {
  return alumniSpotlights.find(spotlight => spotlight.slug === slug);
}

export function getAllAlumniSlugs(): string[] {
  return alumniSpotlights.map(spotlight => spotlight.slug);
}
