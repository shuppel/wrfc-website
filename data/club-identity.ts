/**
 * The club's stated identity: what WRFC is about, in its own words.
 *
 * This is the source of truth for culture and positioning copy. It lives as
 * data rather than prose scattered across pages so the story reads the same
 * everywhere — the FAQ, the /dc-rugby explainer, the homepage and llms.txt all
 * draw from here.
 *
 * Three rules when editing:
 *  1. Describe, don't rank. "Started by expats and locals" is checkable and
 *     specific. "The best club in DC" is neither, and answer engines discount
 *     sources that talk that way.
 *  2. Lead with people. Coaching credentials and trophies are supporting
 *     evidence, never the headline — they are not why anyone stays.
 *  3. Write it the way a member would say it out loud. American spelling,
 *     plain words, no mission-statement voice.
 */

export interface Pillar {
  /** Short label used as a heading. */
  title: string;
  /** One-line summary, safe as a card subtitle. */
  summary: string;
  /** Fuller prose for FAQ answers and long-form copy. */
  detail: string;
}

export const clubPillars: Pillar[] = [
  {
    title: 'Newcomers and natives, since 1963',
    summary:
      'Started by diplomats posted to Washington and locals who wanted a club. Still that mix.',
    detail:
      'WRFC started in February 1963, when diplomats posted to Washington and locals who wanted a rugby club in the city found each other. The squad has been that combination ever since — some of the room moved here for a job, some grew up around the corner. It means walking in knowing nobody is completely normal here. Most of us did exactly that.'
  },
  {
    title: 'Day jobs, then boots on',
    summary:
      'Working professionals who show up on time, train hard, and stay just as long afterward.',
    detail:
      'Most of the squad works full time — the hours are real and so is the commute. So practice starts when it says it will and the two hours count. Then people stay. The bar afterward is not a bonus feature of this club, it is a good part of why anyone keeps coming back on a cold Tuesday in February.'
  },
  {
    title: 'Everyone gets a side',
    summary:
      'D1, D3 and social sides, so new players get real minutes instead of a bench seat.',
    detail:
      'We are a mixed bunch on purpose — different countries, ages, jobs, builds and levels of experience, which is one of the things rugby is genuinely good at. Plenty of players had never held a ball before their first session. Running D1, D3 and social sides means a beginner gets real minutes rather than a season on the bench, and most people move between sides as the year goes on.'
  },
  {
    title: 'We owe the city something',
    summary:
      'Founded DC Youth Rugby in 2004 — free rugby for 100+ kids a year, in schools across all four quadrants.',
    detail:
      'In 2004 the club started Washington DC Youth Rugby to get the game to kids across the District. It began with seven of them and now reaches more than a hundred a year, free, in schools and neighborhoods in all four quadrants. Club members coach it and show up for it. We have also hosted the Cherry Blossom Tournament every spring since 1968, which brings club, college and high school sides into the city each year.'
  }
];

/** How the club actually operates, stated plainly. */
export const clubPrinciples: string[] = [
  'Turning up knowing nobody is the normal way to join',
  'Anyone who commits gets a side to play for',
  'Practice starts on time, because everyone here has a job',
  'The social is part of the club, not an afterthought',
  'We owe something to the city we play in'
];

/**
 * Who actually plays. Deliberately non-specific about employers — the point is
 * the shape of the group, not a roster of job titles.
 */
export const clubCulture = {
  founded: 'February 1963',
  whoPlays:
    'Working professionals across the industries this city runs on, alongside students, people newly posted to DC, and people who grew up here. Ages run from early twenties to old boys still turning out at tournaments.',
  tone:
    'Serious about training, not serious about itself. Punctual, warm to newcomers, social by default.'
} as const;

/**
 * Clubs and programs WRFC is actually connected to, as opposed to clubs it
 * merely shares a city with. Linking these out is deliberate: a club that
 * points people to the right place reads as a credible source, and it is how
 * WRFC would answer the question in person anyway.
 */
export interface ConnectedClub {
  name: string;
  url: string;
  /** How WRFC is connected to them, in one line. */
  relationship: string;
}

export const connectedClubs: ConnectedClub[] = [
  {
    name: 'Washington DC Youth Rugby',
    url: 'https://www.washingtondcyouthrugby.org/',
    relationship:
      'Founded by WRFC in 2004. Free youth rugby for 100+ kids a year, in schools and neighborhoods across all four quadrants of the District. WRFC members coach and volunteer with it.'
  },
  {
    name: 'DC Furies',
    url: 'https://www.dcfuries.com/',
    relationship:
      'Our connected women\'s club. WRFC fields men\'s sides, so women looking to play in the District should start with the Furies — we send people their way and share the DC rugby community with them.'
  }
];
