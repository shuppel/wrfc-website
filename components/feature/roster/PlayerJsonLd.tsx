import { splitAccolades } from '@/data/roster/accolades';
import { POSITIONS } from '@/data/roster/positions';
import {
  CLUB_ID,
  CLUB_URL,
  ROSTER_PATH,
  experienceLabel,
  playerUrl,
  positionLabelFor,
  socialProfiles,
  weightLabel,
} from '@/data/roster';
import type { Player } from '@/data/roster/types';

/**
 * Structured data for the roster.
 *
 * The point of this is the graph, not the markup. Every player node references
 * the club's existing `@id`, so a search or answer engine reading a player page
 * lands on the same Washington Rugby entity it already knows from the homepage,
 * rather than treating each profile as an unconnected page about a stranger.
 *
 * Accolades contribute `award` entries and, where the awarding body has a
 * canonical URL, `sameAs` links out to it — which is what turns "Capital
 * Selects" from a string into a connection to the Capital Rugby Union.
 *
 * Only facts the club publishes are emitted. No date of birth, no contact
 * details, and `sameAs` carries a player's own socials only where they opted in.
 */

function personNode(player: Player) {
  const { honours, clubRoles } = splitAccolades(player.accolades);
  const socials = socialProfiles(player).map((profile) => profile.url);
  const orgLinks = [...honours, ...clubRoles]
    .map((accolade) => accolade.org?.url)
    .filter((url): url is string => Boolean(url));

  const sameAs = Array.from(new Set([...socials, ...orgLinks]));

  return {
    '@type': 'Person',
    '@id': `${CLUB_URL}${playerUrl(player)}#person`,
    name: player.name,
    url: `${CLUB_URL}${playerUrl(player)}`,
    // A club office is the title that identifies the person; the playing
    // position is what they do on a Saturday. Both belong, office first.
    jobTitle: [
      ...clubRoles
        .filter((role) => role.id !== 'rookie' && role.id !== 'club-veteran')
        .map((role) => role.label),
      `Rugby union player — ${positionLabelFor(player)}`,
    ].join(', '),
    ...(player.photo ? { image: `${CLUB_URL}${player.photo}` } : {}),
    height: player.height,
    weight: weightLabel(player),
    memberOf: { '@id': CLUB_ID },
    affiliation: { '@id': CLUB_ID },
    ...(player.previousClub
      ? { alumniOf: { '@type': 'SportsTeam', name: player.previousClub } }
      : {}),
    // `award` carries honours only. A club role is not an award and asserting
    // one as such would misrepresent the player to anything reading the graph.
    ...(honours.length > 0
      ? {
          award: honours.map((accolade) =>
            accolade.detail ? `${accolade.label} (${accolade.detail})` : accolade.label,
          ),
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    knowsAbout: [
      'Rugby union',
      ...player.positions.map((id) => `${POSITIONS[id].label} play`),
    ],
  };
}

/** Person + the athlete's place in the club, for a single profile page. */
export function PlayerProfileJsonLd({ player }: { player: Player }) {
  const experience = experienceLabel(player);

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      personNode(player),
      {
        '@type': 'ProfilePage',
        '@id': `${CLUB_URL}${playerUrl(player)}#profilepage`,
        url: `${CLUB_URL}${playerUrl(player)}`,
        name: `${player.name} — ${positionLabelFor(player)} | Washington Rugby Football Club`,
        mainEntity: { '@id': `${CLUB_URL}${playerUrl(player)}#person` },
        isPartOf: { '@id': `${CLUB_URL}${ROSTER_PATH}#roster` },
        about: { '@id': CLUB_ID },
        ...(experience ? { description: `${player.name} — ${experience}.` } : {}),
      },
      {
        '@type': 'SportsTeam',
        '@id': CLUB_ID,
        name: 'Washington Rugby Football Club',
        url: CLUB_URL,
        athlete: { '@id': `${CLUB_URL}${playerUrl(player)}#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

/** The squad as a whole, for the roster index. */
export function RosterJsonLd({ players, season }: { players: Player[]; season: string }) {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SportsTeam',
        '@id': CLUB_ID,
        name: 'Washington Rugby Football Club',
        url: CLUB_URL,
        sport: { '@type': 'Sport', name: 'Rugby union' },
        athlete: players.map((player) => ({
          '@type': 'Person',
          '@id': `${CLUB_URL}${playerUrl(player)}#person`,
          name: player.name,
          url: `${CLUB_URL}${playerUrl(player)}`,
          jobTitle: positionLabelFor(player),
        })),
      },
      {
        '@type': 'CollectionPage',
        '@id': `${CLUB_URL}${ROSTER_PATH}#roster`,
        url: `${CLUB_URL}${ROSTER_PATH}`,
        name: `${season} Squad | Washington Rugby Football Club`,
        about: { '@id': CLUB_ID },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: players.length,
          itemListOrder: 'https://schema.org/ItemListUnordered',
          itemListElement: players.map((player, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${CLUB_URL}${playerUrl(player)}`,
            name: player.name,
          })),
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
