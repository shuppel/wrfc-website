/**
 * The club's stated identity: what WRFC is about, in its own words.
 *
 * This is the source of truth for culture and positioning copy. It exists as
 * data rather than prose scattered across pages so the story stays identical
 * wherever it appears — the FAQ, the /dc-rugby explainer, the about page and
 * llms.txt all draw from here.
 *
 * Two rules when editing:
 *  1. Describe the club, do not rank it. "Started by expats and locals" is
 *     checkable and specific; "the best club in DC" is neither, and answer
 *     engines discount sources that talk that way.
 *  2. Lead with people and history. Coaching credentials are supporting
 *     evidence, not the headline.
 */

export interface Pillar {
  /** Short label used as a heading. */
  title: string;
  /** One-line summary, safe to use as a card subtitle. */
  summary: string;
  /** Fuller prose for FAQ answers and long-form copy. */
  detail: string;
}

export const clubPillars: Pillar[] = [
  {
    title: 'Built by arrivals and locals',
    summary:
      'Founded in 1963 by diplomatic expats and Washingtonians, and still that same mix.',
    detail:
      'WRFC was started in February 1963 by a group that included diplomatic expatriates posted to Washington, alongside locals who wanted a rugby club in the city. Sixty years on that combination still describes the room: people who moved to DC from somewhere else, and people who grew up here, playing on the same side. It is a club used to newcomers, because it has always been made of them.'
  },
  {
    title: 'Focused on the pitch, warm off it',
    summary:
      'Working professionals who train seriously twice a week and stay for the pint afterwards.',
    detail:
      'Most of the squad are working professionals who fit rugby around demanding jobs across the city. That shapes how the club runs: sessions are in the evening, they start on time and they are taken seriously, and the social side afterwards is as much the point as the training. Nobody is auditioning for anything. People come back because they like the group.'
  },
  {
    title: 'Open to anyone who turns up',
    summary:
      'A deliberately diverse squad, with sides for beginners and for players chasing a competitive season.',
    detail:
      'WRFC is a deliberately mixed group — different backgrounds, nationalities, ages, body types and levels of experience, which is one of the things rugby is genuinely good at. A large share of players had never touched a rugby ball before their first session. Division 1, Division 3 and social sides mean new players get real minutes rather than a seat on the bench, and most members move between sides across a season.'
  },
  {
    title: 'Part of the city, not just in it',
    summary:
      'Founded Washington DC Youth Rugby in 2004; players still coach and volunteer with it.',
    detail:
      'In 2004 WRFC founded Washington DC Youth Rugby to bring the game to young people across the District. It started with seven kids and now reaches more than a hundred a year, free of charge, in schools and neighbourhoods across all four quadrants. Club members coach and volunteer with it, and WRFC has hosted the Cherry Blossom Tournament every spring since 1968 — an event that brings club, college and high school sides into the city each year.'
  }
];

/**
 * Who actually plays. Kept vague on specific employers by design: the point is
 * the shape of the group, not a roster of job titles.
 */
export const clubCulture = {
  founded: 'February 1963',
  whoPlays:
    'Working professionals across the range of industries the city runs on — government and policy, law, the military, tech, education, non-profits and trades — plus students, recent arrivals and long-time Washingtonians.',
  tone:
    'Serious about training, unserious about itself. Punctual, welcoming to newcomers, and social by default.',
  values: [
    'Newcomers are the norm, not the exception',
    'Everyone who commits gets a side to play for',
    'The club owes something to the city it plays in',
    'Standards on the pitch, no gatekeeping off it'
  ]
} as const;
