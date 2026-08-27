/**
 * Rugby union position taxonomy.
 *
 * The roster form collects positions as free-form-ish strings ("Prop (1 or 3)",
 * "Winger (11 or 12)"). Those strings are useless for filtering, sorting or
 * structured data, so every position is normalised into an entry here and the
 * rest of the app only ever deals with a `PositionId`.
 *
 * Shirt numbers are the real ones (a winger wears 11 or 14 — the form's
 * "11 or 12" is a typo in the form, not the laws of the game).
 */

export type Unit = 'Forwards' | 'Backs';

export type PositionGroupId =
  | 'front-row'
  | 'second-row'
  | 'back-row'
  | 'half-backs'
  | 'centers'
  | 'back-three';

export type PositionId =
  | 'prop'
  | 'hooker'
  | 'lock'
  | 'flanker'
  | 'number-8'
  | 'scrum-half'
  | 'fly-half'
  | 'center'
  | 'wing'
  | 'full-back';

export interface PositionGroup {
  id: PositionGroupId;
  /** Display name used for section headings on the roster. */
  label: string;
  unit: Unit;
  /** One line explaining what this group actually does, for newcomers. */
  blurb: string;
  /** Sort weight — 1 through 15, front to back. */
  order: number;
}

export interface Position {
  id: PositionId;
  label: string;
  /** Compact label for cards and chips. */
  shortLabel: string;
  group: PositionGroupId;
  unit: Unit;
  /** Shirt numbers traditionally worn in this position. */
  numbers: number[];
  order: number;
}

export const POSITION_GROUPS: Record<PositionGroupId, PositionGroup> = {
  'front-row': {
    id: 'front-row',
    label: 'Front Row',
    unit: 'Forwards',
    blurb: 'Props and hookers — the three players who hold up the scrum.',
    order: 1,
  },
  'second-row': {
    id: 'second-row',
    label: 'Second Row',
    unit: 'Forwards',
    blurb: 'Locks — the engine of the scrum and the primary lineout targets.',
    order: 2,
  },
  'back-row': {
    id: 'back-row',
    label: 'Back Row',
    unit: 'Forwards',
    blurb: 'Flankers and the number 8 — first to the breakdown, last to stop.',
    order: 3,
  },
  'half-backs': {
    id: 'half-backs',
    label: 'Half Backs',
    unit: 'Backs',
    blurb: 'Scrum-half and fly-half — the players who decide where the ball goes.',
    order: 4,
  },
  centers: {
    id: 'centers',
    label: 'Centers',
    unit: 'Backs',
    blurb: 'Inside and outside center — the midfield, in attack and defence.',
    order: 5,
  },
  'back-three': {
    id: 'back-three',
    label: 'Back Three',
    unit: 'Backs',
    blurb: 'Wings and full-back — the finishers and the last line of defence.',
    order: 6,
  },
};

export const POSITIONS: Record<PositionId, Position> = {
  prop: { id: 'prop', label: 'Prop', shortLabel: 'Prop', group: 'front-row', unit: 'Forwards', numbers: [1, 3], order: 1 },
  hooker: { id: 'hooker', label: 'Hooker', shortLabel: 'Hooker', group: 'front-row', unit: 'Forwards', numbers: [2], order: 2 },
  lock: { id: 'lock', label: 'Lock', shortLabel: 'Lock', group: 'second-row', unit: 'Forwards', numbers: [4, 5], order: 3 },
  flanker: { id: 'flanker', label: 'Flanker', shortLabel: 'Flanker', group: 'back-row', unit: 'Forwards', numbers: [6, 7], order: 4 },
  'number-8': { id: 'number-8', label: 'Number 8', shortLabel: 'No. 8', group: 'back-row', unit: 'Forwards', numbers: [8], order: 5 },
  'scrum-half': { id: 'scrum-half', label: 'Scrum-half', shortLabel: 'Scrum-half', group: 'half-backs', unit: 'Backs', numbers: [9], order: 6 },
  'fly-half': { id: 'fly-half', label: 'Fly-half', shortLabel: 'Fly-half', group: 'half-backs', unit: 'Backs', numbers: [10], order: 7 },
  center: { id: 'center', label: 'Center', shortLabel: 'Center', group: 'centers', unit: 'Backs', numbers: [12, 13], order: 8 },
  wing: { id: 'wing', label: 'Wing', shortLabel: 'Wing', group: 'back-three', unit: 'Backs', numbers: [11, 14], order: 9 },
  'full-back': { id: 'full-back', label: 'Full-back', shortLabel: 'Full-back', group: 'back-three', unit: 'Backs', numbers: [15], order: 10 },
};

export const POSITION_GROUP_ORDER: PositionGroupId[] = Object.values(POSITION_GROUPS)
  .sort((a, b) => a.order - b.order)
  .map((group) => group.id);

export function getPosition(id: PositionId): Position {
  return POSITIONS[id];
}

export function getPositionGroup(id: PositionGroupId): PositionGroup {
  return POSITION_GROUPS[id];
}

/** The group a player is listed under, taken from their first-listed position. */
export function primaryGroupOf(positions: PositionId[]): PositionGroupId {
  return POSITIONS[positions[0]].group;
}

/** "Prop / Hooker" — how a player's positions read on a card. */
export function formatPositions(positions: PositionId[]): string {
  return positions.map((id) => POSITIONS[id].label).join(' / ');
}

/** Every shirt number a player could wear, deduplicated and in order. */
export function shirtNumbersFor(positions: PositionId[]): number[] {
  const numbers = new Set<number>();
  positions.forEach((id) => POSITIONS[id].numbers.forEach((n) => numbers.add(n)));
  return Array.from(numbers).sort((a, b) => a - b);
}
