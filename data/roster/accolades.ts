/**
 * Accolade registry.
 *
 * Every credential shown on a player profile resolves to an entry here rather
 * than being a free-text string on the player. That buys three things:
 *
 *  1. A bare string like "Cap Selects" means nothing to someone who does not
 *     already play rugby in the Mid-Atlantic. Each entry carries a one-line
 *     explanation of what the honour actually is.
 *  2. Structured data. The `org.url` becomes a `sameAs` entity link in the
 *     Person JSON-LD, which is how a search or answer engine connects a player
 *     to the organisation that awarded the honour.
 *  3. Consistent styling. Tier drives the badge treatment, so a professional
 *     academy contract never renders identically to a club role.
 *
 * SOURCING RULE — read before adding an entry to a player.
 * Accolades are recorded at the tier the club can stand behind:
 *   - `club-verified`  the club has direct knowledge of it (club roles, caps,
 *                      selections the club itself put the player forward for).
 *   - `self-reported`  the player stated it on the roster form.
 * Nothing here is scraped from a search engine and asserted as fact about a
 * named private individual. If a claim needs a citation, it needs `sources`.
 */

export type AccoladeTier = 'professional' | 'representative' | 'collegiate' | 'club';

export type Verification = 'club-verified' | 'self-reported';

export type AccoladeId =
  | 'capital-selects'
  | 'old-glory-inaugural'
  | 'alexandria-selects'
  | 'ncr-all-american'
  | 'collegiate-all-stars'
  | 'old-glory-academy'
  | 'free-jacks-academy'
  | 'maharlikans-7s'
  | 'nsw-suburban-finalist'
  | 'collegiate-program'
  | 'international-schools'
  | 'club-president'
  | 'club-captain'
  | 'vice-captain'
  | 'player-coach'
  | 'executive-committee'
  | 'former-executive-committee'
  | 'club-veteran'
  | 'rookie';

export interface AccoladeOrg {
  name: string;
  /** Authority URL. Emitted as `sameAs` in structured data. */
  url: string;
}

export interface AccoladeDefinition {
  id: AccoladeId;
  /** Full name of the honour. */
  label: string;
  /** Compact form for roster cards, where space is tight. */
  shortLabel: string;
  tier: AccoladeTier;
  /** What this honour actually is, for a reader who does not know. */
  description: string;
  org?: AccoladeOrg;
  /** A page on this site that backs the honour up, e.g. the committee records. */
  internalUrl?: string;
}

export interface AccoladeTierStyle {
  label: string;
  /** Rank for sorting — professional honours lead a player's list. */
  weight: number;
  badge: string;
  dot: string;
  ring: string;
}

export const ACCOLADE_TIERS: Record<AccoladeTier, AccoladeTierStyle> = {
  professional: {
    label: 'Professional pathway',
    weight: 4,
    badge:
      'bg-amber-400/15 text-amber-700 dark:text-amber-300 border-amber-500/40 hover:border-amber-500/70',
    dot: 'bg-amber-500',
    ring: 'ring-amber-500/30',
  },
  representative: {
    label: 'Representative honours',
    weight: 3,
    badge:
      'bg-wrfc-red/10 text-wrfc-red dark:text-red-300 border-wrfc-red/40 hover:border-wrfc-red/70',
    dot: 'bg-wrfc-red',
    ring: 'ring-wrfc-red/30',
  },
  collegiate: {
    label: 'Collegiate & academy',
    weight: 2,
    badge:
      'bg-wrfc-teal/10 text-teal-700 dark:text-teal-300 border-wrfc-teal/40 hover:border-wrfc-teal/70',
    dot: 'bg-wrfc-teal',
    ring: 'ring-wrfc-teal/30',
  },
  club: {
    label: 'Club',
    weight: 1,
    badge:
      'bg-wrfc-navy/10 text-wrfc-navy dark:bg-white/10 dark:text-slate-200 border-wrfc-navy/30 dark:border-white/25 hover:border-wrfc-navy/60',
    dot: 'bg-wrfc-navy dark:bg-slate-300',
    ring: 'ring-wrfc-navy/20',
  },
};

const CAPITAL_RUGBY_UNION: AccoladeOrg = {
  name: 'Capital Rugby Union',
  url: 'https://rugby.org/',
};

const OLD_GLORY_DC: AccoladeOrg = {
  name: 'Old Glory DC',
  url: 'https://oldglorydc.com/',
};

const NCR: AccoladeOrg = {
  name: 'National Collegiate Rugby',
  url: 'https://www.ncr.rugby/',
};

export const ACCOLADES: Record<AccoladeId, AccoladeDefinition> = {
  'capital-selects': {
    id: 'capital-selects',
    label: 'Capital Selects',
    shortLabel: 'Capital Selects',
    tier: 'representative',
    description:
      'The senior men\'s all-star side of the Capital Rugby Union, the governing body for club rugby across Washington DC, Maryland and Virginia. Players are selected from clubs across the region and the side plays as a curtain-raiser to Old Glory DC home matches.',
    org: CAPITAL_RUGBY_UNION,
  },
  'old-glory-inaugural': {
    id: 'old-glory-inaugural',
    label: 'Old Glory DC Capital Selects — inaugural side',
    shortLabel: 'OG Inaugural Side',
    tier: 'representative',
    description:
      'Named to the first Capital Selects squad assembled under the Old Glory DC and Capital Rugby Union player pathway partnership.',
    org: OLD_GLORY_DC,
  },
  'alexandria-selects': {
    id: 'alexandria-selects',
    label: 'Alexandria Selects',
    shortLabel: 'Alexandria Selects',
    tier: 'representative',
    description: 'Selected to a regional representative side drawn from clubs across Northern Virginia.',
  },
  'ncr-all-american': {
    id: 'ncr-all-american',
    label: 'NCR All-American',
    shortLabel: 'All-American',
    tier: 'representative',
    description:
      'National Collegiate Rugby\'s season honour, given to a small group of players across its men\'s and women\'s divisions — the highest individual selection available in NCR college rugby.',
    org: NCR,
  },
  'collegiate-all-stars': {
    id: 'collegiate-all-stars',
    label: 'Collegiate All-Stars',
    shortLabel: 'Collegiate All-Star',
    tier: 'representative',
    description: 'Selected to a collegiate all-star side assembled from players across multiple university programs.',
    org: NCR,
  },
  'old-glory-academy': {
    id: 'old-glory-academy',
    label: 'Old Glory DC Academy',
    shortLabel: 'OG Academy',
    tier: 'professional',
    description:
      'The development academy of Old Glory DC, Washington\'s Major League Rugby club, and the top of the Mid-Atlantic player pathway that Old Glory runs jointly with the Capital Rugby Union.',
    org: OLD_GLORY_DC,
  },
  'free-jacks-academy': {
    id: 'free-jacks-academy',
    label: 'New England Free Jacks Academy',
    shortLabel: 'Free Jacks Academy',
    tier: 'professional',
    description:
      'The development academy of the New England Free Jacks, a Major League Rugby club. The academy is the club\'s pathway from college and club rugby into a professional roster.',
    org: {
      name: 'Major League Rugby',
      url: 'https://www.majorleague.rugby/',
    },
  },
  'maharlikans-7s': {
    id: 'maharlikans-7s',
    label: 'Maharlikans 7s',
    shortLabel: 'Maharlikans 7s',
    tier: 'representative',
    description:
      'The Philippine Maharlikans are a Philippine Rugby Football Union-affiliated heritage club fielding sides in the USA, UK, Australia and Hong Kong, run as a talent identification pathway toward the Philippine national programme.',
    org: {
      name: 'Philippine Maharlikans',
      url: 'https://www.facebook.com/maharlika7s/',
    },
  },
  'nsw-suburban-finalist': {
    id: 'nsw-suburban-finalist',
    label: 'NSW Suburban Rugby Division 1 finalist',
    shortLabel: 'NSWSRU D1 Finalist',
    tier: 'representative',
    description:
      'Reached a Division 1 final in New South Wales Suburban Rugby, the senior club competition played across metropolitan Sydney, Australia.',
    org: {
      name: 'NSW Suburban Rugby Union',
      url: 'https://www.nsw.rugby/',
    },
  },
  'collegiate-program': {
    id: 'collegiate-program',
    label: 'Collegiate rugby program',
    shortLabel: 'College Rugby',
    tier: 'collegiate',
    description: 'Played rugby at university before joining WRFC.',
  },
  'international-schools': {
    id: 'international-schools',
    label: 'International schools rugby',
    shortLabel: 'Intl. Schools Rugby',
    tier: 'collegiate',
    description: 'Came up through a rugby programme outside the United States.',
  },
  'club-president': {
    id: 'club-president',
    label: 'Club President',
    shortLabel: 'President',
    tier: 'club',
    description: 'Elected head of the club, responsible to the membership for how Washington Rugby is run.',
    internalUrl: '/executive-committee',
  },
  'club-captain': {
    id: 'club-captain',
    label: 'Club Captain',
    shortLabel: 'Captain',
    tier: 'club',
    description: 'Leads the squad on the field and sets the standard at training.',
    internalUrl: '/executive-committee',
  },
  'vice-captain': {
    id: 'vice-captain',
    label: 'Vice Captain',
    shortLabel: 'Vice Captain',
    tier: 'club',
    description: 'Deputises for the club captain on and off the field.',
  },
  'player-coach': {
    id: 'player-coach',
    label: 'Player Coach',
    shortLabel: 'Player Coach',
    tier: 'club',
    description: 'Plays for the senior side and coaches within the program.',
  },
  'executive-committee': {
    id: 'executive-committee',
    label: 'Executive Committee',
    shortLabel: 'Exec Committee',
    tier: 'club',
    description: 'Serves on the committee that runs the club\'s operations, finances and fixtures.',
    internalUrl: '/executive-committee',
  },
  'former-executive-committee': {
    id: 'former-executive-committee',
    label: 'Former Executive Committee',
    shortLabel: 'Former EC',
    tier: 'club',
    description:
      'Served on a previous Executive Committee. The club is run entirely by players who volunteer for these posts alongside playing.',
    internalUrl: '/executive-committee',
  },
  'club-veteran': {
    id: 'club-veteran',
    label: 'Club Veteran',
    shortLabel: 'Veteran',
    tier: 'club',
    description: 'Six or more seasons in a Washington Rugby shirt.',
  },
  rookie: {
    id: 'rookie',
    label: 'Rookie Season',
    shortLabel: 'Rookie',
    tier: 'club',
    description: 'First season in a Washington Rugby shirt.',
  },
};

/** An accolade as it hangs off a player. */
export interface PlayerAccolade {
  id: AccoladeId;
  /** Extra specificity — "2x", "6 selections", a school name, a year. */
  detail?: string;
  verification: Verification;
}

export interface ResolvedAccolade extends AccoladeDefinition {
  detail?: string;
  verification: Verification;
}

export function resolveAccolade(accolade: PlayerAccolade): ResolvedAccolade {
  return {
    ...ACCOLADES[accolade.id],
    detail: accolade.detail,
    verification: accolade.verification,
  };
}

/** Resolved and sorted so the most significant honour reads first. */
export function resolveAccolades(accolades: PlayerAccolade[] = []): ResolvedAccolade[] {
  return accolades
    .map(resolveAccolade)
    .sort((a, b) => ACCOLADE_TIERS[b.tier].weight - ACCOLADE_TIERS[a.tier].weight);
}

/**
 * Split a player's accolades into honours won elsewhere and what they do at
 * WRFC. A club role and a rookie season are not awards, and listing them under
 * "Honours" next to an All-American selection flattens a real difference.
 */
export function splitAccolades(accolades: PlayerAccolade[] = []): {
  honours: ResolvedAccolade[];
  clubRoles: ResolvedAccolade[];
} {
  const resolved = resolveAccolades(accolades);
  return {
    honours: resolved.filter((accolade) => accolade.tier !== 'club'),
    clubRoles: resolved.filter((accolade) => accolade.tier === 'club'),
  };
}

/** "Capital Selects · 6 selections" — the badge's visible text. */
export function accoladeText(accolade: ResolvedAccolade, short = false): string {
  const label = short ? accolade.shortLabel : accolade.label;
  return accolade.detail ? `${label} · ${accolade.detail}` : label;
}
