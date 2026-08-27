import type { PlayerAccolade } from './accolades';
import type { PositionGroupId, PositionId, Unit } from './positions';

export type Division = 'D1' | 'D3' | 'Both';

/**
 * Which list a player belongs to: the squad registered for the current season,
 * or a player from a previous season's roster.
 */
export type SquadList = 'fall-2026' | 'past';

/** Match availability. Deliberately coarse — see the privacy note in roster.ts. */
export type Availability = 'available' | 'unavailable';

/**
 * Socials are strictly opt-in. A player is only listed here if they asked to
 * be. Handles are stored without the leading @ and rendered through
 * `socialProfiles()`, which builds the URLs.
 */
export interface PlayerSocials {
  instagram?: string;
  x?: string;
  linkedin?: string;
  strava?: string;
  website?: string;
}

export interface Player {
  id: number;
  name: string;
  /** Stable URL segment. Set explicitly so a name correction never breaks a link. */
  slug: string;
  squad: SquadList;

  positions: PositionId[];
  /** Overrides the derived position string for legacy entries listed as e.g. "Utility Back". */
  positionLabel?: string;
  number?: number;
  division?: Division;

  /** Path under /public, or omitted to fall back to the monogram avatar. */
  photo?: string;
  photoCredit?: string;

  /**
   * Height and weight are stored in metric and converted for display.
   *
   * The previous roster stored a bare `weight` number that was kilograms for
   * some players and pounds for others, and the profile page rendered every one
   * of them as "kg" — so a 260 lb prop was published as a 260 kg prop. One
   * canonical unit removes that whole class of error.
   */
  heightCm?: number;
  weightKg?: number;

  /** Seasons with WRFC. 0 means a rookie season. */
  seasons?: number;
  previousClub?: string;

  accolades?: PlayerAccolade[];
  socials?: PlayerSocials;

  availability?: Availability;
  /** Shown alongside an `unavailable` status. Never a medical detail. */
  availabilityNote?: string;

  /** Carried over from the club's earlier roster records. */
  caps?: { d1?: number; d3?: number };
}

export interface RosterSection {
  group: PositionGroupId;
  unit: Unit;
  players: Player[];
}
