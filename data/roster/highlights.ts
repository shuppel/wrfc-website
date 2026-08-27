import { ACCOLADES } from './accolades';
import { players } from './roster';
import type { Player } from './types';

/**
 * Squad highlights for the roster hero.
 *
 * These replaced a grid of counted stats — players with honours, rookies,
 * veterans. Counting the squad against itself reads like an audit and says
 * nothing about the team; what a reader wants is what this side has actually
 * done.
 *
 * Most entries are club-authored rather than derived. A club-level fact like a
 * Capital Selects call-up count is not reconstructable from the roster, because
 * players only declare honours they happen to remember at registration — the
 * club knows the real number and the roster does not.
 */

export interface SquadHighlight {
  /** Small label above the statement. */
  label: string;
  /** The statement itself. Short — this is a headline, not a paragraph. */
  statement: string;
  detail?: string;
  href?: string;
  /** Opens in a new tab. Set for links off this site. */
  external?: boolean;
}

/**
 * CLUB-AUTHORED. Update these by hand when the club has a new one; nothing here
 * is derived, so nothing here goes stale on its own either. Keep each statement
 * to something a reader could check.
 */
const authoredHighlights: SquadHighlight[] = [
  {
    label: '2026 Capital Selects',
    statement: 'Six players in a 23-man squad',
    detail:
      'Washington Rugby had six players called into the Capital Rugby Union\'s 2026 senior representative side, the regional all-star team drawn from clubs across DC, Maryland and Virginia.',
    href: ACCOLADES['capital-selects'].org?.url,
    external: true,
  },
  {
    label: 'Coached by',
    statement: 'Two USA Eagles internationals',
    detail:
      'Thretton Palamo, capped by the United States at 19, and Jamason Fa\'anana-Schultz, who has captained the Eagles in test matches and captained Old Glory DC.',
    href: '/teams/coaches',
  },
];

/**
 * The one derived highlight: which college programs are represented in the
 * squad. It reads as team character rather than a count, and it updates itself
 * as players join.
 */
function collegiateHighlight(squad: Player[]): SquadHighlight | undefined {
  const programs = Array.from(
    new Set(
      squad
        .map((player) => player.collegeProgram)
        .filter((program): program is string => Boolean(program)),
    ),
  ).sort();

  if (programs.length < 2) return undefined;

  const listed = programs.slice(0, 4);
  const statement =
    listed.length > 1
      ? `${listed.slice(0, -1).join(', ')} and ${listed[listed.length - 1]}`
      : listed[0];

  return {
    label: 'College rugby in the squad',
    statement,
    detail:
      'Players who came to Washington Rugby out of a university program, alongside a squad that also takes people who have never played.',
  };
}

export function squadHighlights(
  squad: Player[] = players.filter((player) => player.squad === 'fall-2026'),
): SquadHighlight[] {
  const collegiate = collegiateHighlight(squad);
  return collegiate ? [...authoredHighlights, collegiate] : authoredHighlights;
}
