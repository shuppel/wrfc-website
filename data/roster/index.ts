import { resolveAccolades, splitAccolades } from './accolades';
import { players } from './roster';
import {
  POSITION_GROUPS,
  POSITION_GROUP_ORDER,
  POSITIONS,
  formatPositions,
  primaryGroupOf,
} from './positions';
import type { PositionGroupId, Unit } from './positions';
import type { Player, RosterSection } from './types';

export * from './accolades';
export * from './positions';
export * from './types';
export { players };

export const CLUB_URL = 'https://washingtonrugby.org';
export const CLUB_ID = `${CLUB_URL}/#organization`;
export const ROSTER_PATH = '/teams/players';

/** Placeholder used when a player has no photo on file. */
export const FALLBACK_PHOTO = '/assets/art/player_profile_rugby.png';

export const squadPlayers = players.filter((player) => player.squad === 'fall-2026');
export const clubRosterPlayers = players.filter((player) => player.squad === 'club-roster');

export function getPlayerBySlug(slug: string): Player | undefined {
  return players.find((player) => player.slug === slug);
}

export function getAllPlayerSlugs(): string[] {
  return players.map((player) => player.slug);
}

export function playerUrl(player: Player): string {
  return `${ROSTER_PATH}/${player.slug}`;
}

/** How a player's position reads on a card or in a title. */
export function positionLabelFor(player: Player): string {
  return player.positionLabel ?? formatPositions(player.positions);
}

export function unitOf(player: Player): Unit {
  return POSITIONS[player.positions[0]].unit;
}

export function groupOf(player: Player): PositionGroupId {
  return primaryGroupOf(player.positions);
}

/** "Rookie season", "3rd season", "6+ seasons". */
export function experienceLabel(player: Player): string | undefined {
  const { seasons } = player;
  if (seasons === undefined) return undefined;
  if (seasons === 0) return 'Rookie season';
  if (seasons >= 6) return '6+ seasons at WRFC';
  const rounded = Number.isInteger(seasons) ? `${seasons}` : `${seasons}`;
  return `${rounded} season${seasons === 1 ? '' : 's'} at WRFC`;
}

export type ExperienceBand = 'rookie' | 'developing' | 'established' | 'veteran';

export const EXPERIENCE_BANDS: { id: ExperienceBand; label: string; hint: string }[] = [
  { id: 'rookie', label: 'Rookies', hint: 'First season' },
  { id: 'developing', label: '1–3 seasons', hint: 'Finding their feet' },
  { id: 'established', label: '4–5 seasons', hint: 'Established' },
  { id: 'veteran', label: '6+ seasons', hint: 'Club veterans' },
];

export function experienceBand(player: Player): ExperienceBand | undefined {
  const { seasons } = player;
  if (seasons === undefined) return undefined;
  if (seasons === 0) return 'rookie';
  if (seasons >= 6) return 'veteran';
  if (seasons >= 4) return 'established';
  return 'developing';
}

export function weightLabel(player: Player): string | undefined {
  if (player.weightLabel) return player.weightLabel;
  if (player.weightLbs === undefined) return undefined;
  return `${player.weightLbs} lb`;
}

/**
 * The single accolade that leads a player's card. An honour won elsewhere beats
 * a club role, so a card shows "All-American" rather than "Rookie".
 */
export function headlineAccolade(player: Player) {
  const { honours, clubRoles } = splitAccolades(player.accolades);
  return honours[0] ?? clubRoles[0];
}

/** Accolades ordered as a card should show them. */
export function cardAccolades(player: Player) {
  const { honours, clubRoles } = splitAccolades(player.accolades);
  return [...honours, ...clubRoles];
}

/** Group a list of players into the six position groups, front to back. */
export function toSections(list: Player[]): RosterSection[] {
  return POSITION_GROUP_ORDER.map((groupId) => ({
    group: groupId,
    unit: POSITION_GROUPS[groupId].unit,
    players: list.filter((player) => groupOf(player) === groupId),
  })).filter((section) => section.players.length > 0);
}

export interface SquadSummary {
  total: number;
  forwards: number;
  backs: number;
  rookies: number;
  veterans: number;
  decorated: number;
  professional: number;
  countriesAndPrograms: number;
}

/**
 * Headline numbers for the roster page. Derived from the roster rather than
 * hardcoded, so they cannot drift out of date the way "50+ players" did.
 */
export function summarise(list: Player[] = squadPlayers): SquadSummary {
  // Club roles and rookie tags do not count as honours — otherwise almost
  // everyone is "decorated" and the number stops meaning anything.
  const decorated = list.filter((player) => splitAccolades(player.accolades).honours.length > 0);
  const professional = list.filter((player) =>
    splitAccolades(player.accolades).honours.some((accolade) => accolade.tier === 'professional'),
  );

  return {
    total: list.length,
    forwards: list.filter((player) => unitOf(player) === 'Forwards').length,
    backs: list.filter((player) => unitOf(player) === 'Backs').length,
    rookies: list.filter((player) => player.seasons === 0).length,
    veterans: list.filter((player) => (player.seasons ?? 0) >= 6).length,
    decorated: decorated.length,
    professional: professional.length,
    countriesAndPrograms: new Set(
      list.map((player) => player.previousClub).filter((club): club is string => Boolean(club)),
    ).size,
  };
}

export interface SocialProfile {
  id: keyof NonNullable<Player['socials']>;
  label: string;
  handle: string;
  url: string;
}

/**
 * Turn a player's opt-in handles into labelled links. The stored value may be a
 * handle or a full URL — both are accepted so a player can send whichever they
 * have to hand.
 */
export function socialProfiles(player: Player): SocialProfile[] {
  const socials = player.socials;
  if (!socials) return [];

  const asUrl = (value: string, base: string) =>
    /^https?:\/\//i.test(value) ? value : `${base}${value.replace(/^@/, '')}`;

  const profiles: SocialProfile[] = [];

  if (socials.instagram) {
    profiles.push({
      id: 'instagram',
      label: 'Instagram',
      handle: `@${socials.instagram.replace(/^@/, '')}`,
      url: asUrl(socials.instagram, 'https://instagram.com/'),
    });
  }
  if (socials.x) {
    profiles.push({
      id: 'x',
      label: 'X',
      handle: `@${socials.x.replace(/^@/, '')}`,
      url: asUrl(socials.x, 'https://x.com/'),
    });
  }
  if (socials.linkedin) {
    profiles.push({
      id: 'linkedin',
      label: 'LinkedIn',
      handle: player.name,
      url: asUrl(socials.linkedin, 'https://www.linkedin.com/in/'),
    });
  }
  if (socials.strava) {
    profiles.push({
      id: 'strava',
      label: 'Strava',
      handle: player.name,
      url: asUrl(socials.strava, 'https://www.strava.com/athletes/'),
    });
  }
  if (socials.website) {
    profiles.push({
      id: 'website',
      label: 'Website',
      handle: socials.website.replace(/^https?:\/\//, '').replace(/\/$/, ''),
      url: asUrl(socials.website, 'https://'),
    });
  }

  return profiles;
}

/**
 * Squad-mates who cover the same position group. Drives the "same position"
 * rail on a profile, which is what keeps the roster internally linked rather
 * than being 79 dead-end pages.
 */
export function relatedPlayers(player: Player, limit = 4): Player[] {
  const group = groupOf(player);
  const pool = player.squad === 'fall-2026' ? squadPlayers : players;

  return pool
    .filter((other) => other.slug !== player.slug && groupOf(other) === group)
    .slice(0, limit);
}
