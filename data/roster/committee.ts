/**
 * Executive Committee records.
 *
 * This is the single source of truth for who has served on the EC. Both the
 * /executive-committee page and the player roster read from it: the page
 * renders the terms, and the roster derives a player's committee accolades
 * from them. Nothing is hand-copied between the two, so a change here shows up
 * in both places and they cannot drift apart.
 *
 * NAME SPELLINGS
 * The committee lists and the roster had drifted apart on several names
 * (Zuzuelo/Zuzelo, Ukuani/Ukwuani, Issac/Isaac, Cippolone/Cipollone). The
 * roster spelling wins, because it is the one in the profile URL, and `slug`
 * ties each member to their profile. A member without a `slug` has no roster
 * entry — a committee member who does not play, or someone listed before the
 * current roster records begin.
 */

export interface CommitteeMember {
  position: string;
  name: string;
  /** Player profile slug, where the member is on the roster. */
  slug?: string;
  /** The post itself was retired, rather than the person stepping down. */
  retired?: boolean;
}

export interface CommitteeTerm {
  /** Short form used in accolade text: "2026–27". */
  term: string;
  /** Long form used as a heading: "2026-2027". */
  label: string;
  /** Calendar year the term began. Sorts terms without parsing labels. */
  startYear: number;
  current: boolean;
  members: CommitteeMember[];
}

export const COMMITTEE_TERMS: CommitteeTerm[] = [
  {
    term: '2026–27',
    label: '2026-2027',
    startYear: 2026,
    current: true,
    members: [
      { position: 'President', name: 'Harry Higginbottom', slug: 'harry-higginbottom' },
      { position: 'Vice President', name: 'Matthew Bainbridge', slug: 'matthew-bainbridge' },
      { position: 'Secretary', name: 'Domenic Boresta', slug: 'domenic-boresta' },
      { position: 'Treasurer', name: 'Thomas Britt' },
      { position: 'Match Secretary', name: 'Zack Zuzelo', slug: 'zachary-zuzelo' },
      { position: 'Club Captain', name: 'Nate Santa Maria', slug: 'nate-santa-maria' },
      { position: 'Alumni/Youth Director', name: 'Roger Rog' },
      { position: 'CBT Chair', name: 'Josh Quick', slug: 'josh-quick' },
      { position: 'Recruitment Chair', name: 'Isaac Greenspan', slug: 'isaac-greenspan' },
      { position: 'Fundraising Chair', name: 'Ben Goodlet', slug: 'benjamin-goodlet' },
      { position: 'Social Chair', name: 'Daniel Perez' },
      { position: 'Social Media Chair', name: 'Dike Ukwuani', slug: 'dike-ukwuani' },
      { position: 'Webmaster', name: 'Erikk Shupp', slug: 'erikk-shupp' },
    ],
  },
  {
    term: '2025–26',
    label: '2025-2026',
    startYear: 2025,
    current: false,
    members: [
      { position: 'President', name: 'Harry Higginbottom', slug: 'harry-higginbottom' },
      { position: 'Vice President', name: 'Austin Park', slug: 'austin-park' },
      { position: 'Treasurer', name: 'Erikk Shupp', slug: 'erikk-shupp' },
      { position: 'Secretary', name: 'Domenic Boresta', slug: 'domenic-boresta' },
      { position: 'Match Secretary', name: 'Matthew Bainbridge', slug: 'matthew-bainbridge' },
      { position: 'Club Captain', name: 'Christopher Miller', slug: 'christopher-miller' },
      { position: 'Alumni/Youth Relations', name: 'Jonathan Fuentecilla', slug: 'jonathan-fuentecilla' },
      { position: 'CBT Chair', name: 'Andrew Klock', slug: 'andrew-klock' },
      { position: 'Recruitment Chair', name: 'Noah Davidson', slug: 'noah-davidson' },
      { position: 'Fundraising Chair', name: 'Nicholas Cipollone', slug: 'nicholas-cipollone' },
      { position: 'Social Chair', name: 'Austin "Ox" Longo', slug: 'austin-longo' },
      { position: 'Social Media Chair', name: 'Stephen Okala', slug: 'stephen-okala' },
    ],
  },
  {
    term: '2024–25',
    label: '2024-2025',
    startYear: 2024,
    current: false,
    members: [
      { position: 'President', name: 'Harry Higginbottom', slug: 'harry-higginbottom' },
      { position: 'Vice President', name: 'Austin Park', slug: 'austin-park' },
      { position: 'Secretary', name: 'Joshua Levine', slug: 'joshua-levine' },
      { position: 'Treasurer', name: 'Erikk Shupp', slug: 'erikk-shupp' },
      { position: 'Club Captain', name: 'Christopher Miller', slug: 'christopher-miller' },
      { position: 'Member at Large', name: 'Scott H.', retired: true },
      { position: 'Director of Player Operations', name: 'Jonathan Fuentecilla', slug: 'jonathan-fuentecilla' },
      { position: 'Youth Outreach', name: 'Kwon Dailey', slug: 'kwon-dailey', retired: true },
      { position: 'Alumni Outreach', name: 'Casey Ling', slug: 'casey-ling', retired: true },
      { position: 'CBT Chair', name: 'Douglas Mulliken', slug: 'douglas-mulliken' },
      { position: 'Social Chair', name: 'Austin "Ox" Longo', slug: 'austin-longo' },
      { position: 'Social Media Chair', name: 'Stephen Okala', slug: 'stephen-okala' },
      { position: 'Recruitment Chair', name: 'Nicholas Cipollone', slug: 'nicholas-cipollone' },
      { position: 'Fundraising Chair', name: 'Christopher DeVore', slug: 'christopher-devore' },
    ],
  },
];

export const currentTerm = COMMITTEE_TERMS.find((term) => term.current);
export const pastTerms = COMMITTEE_TERMS.filter((term) => !term.current);

export interface CommitteeService {
  position: string;
  /** Terms served in this position, most recent first. */
  terms: string[];
}

/** Every post a player currently holds on the committee. */
export function currentService(slug: string): CommitteeService[] {
  if (!currentTerm) return [];
  return currentTerm.members
    .filter((member) => member.slug === slug)
    .map((member) => ({ position: member.position, terms: [currentTerm.term] }));
}

/**
 * Posts a player has held on past committees, one entry per post with every
 * term they held it. Someone who was Treasurer twice reads as one line, not two.
 */
export function pastService(slug: string): CommitteeService[] {
  const byPosition = new Map<string, string[]>();

  pastTerms.forEach((term) => {
    term.members
      .filter((member) => member.slug === slug)
      .forEach((member) => {
        const terms = byPosition.get(member.position) ?? [];
        terms.push(term.term);
        byPosition.set(member.position, terms);
      });
  });

  return Array.from(byPosition, ([position, terms]) => ({ position, terms }));
}

/** "Treasurer (2025–26, 2024–25)" */
export function formatService(service: CommitteeService[]): string {
  return service
    .map(({ position, terms }) => `${position} (${terms.join(', ')})`)
    .join(' · ');
}
