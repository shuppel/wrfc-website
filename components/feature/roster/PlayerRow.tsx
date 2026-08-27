import Link from 'next/link';
import { CaretRight } from '@phosphor-icons/react/dist/ssr';

import { POSITION_GROUPS } from '@/data/roster/positions';
import {
  cardAccolades,
  experienceLabel,
  groupOf,
  height,
  playerUrl,
  positionLabelFor,
  weight,
} from '@/data/roster';
import type { Player } from '@/data/roster/types';

import { AccoladeBadge } from './AccoladeBadge';
import { PlayerAvatar, signatureNumber } from './PlayerAvatar';

/** The dense row used by the roster's list view — a team sheet, essentially. */
export function PlayerRow({ player }: { player: Player }) {
  const accolades = cardAccolades(player);
  const figures = [height(player), weight(player)];
  const experience = experienceLabel(player);

  return (
    <li>
      <Link
        href={playerUrl(player)}
        className="group flex items-center gap-4 bg-white px-4 py-3 transition-colors hover:bg-gray-50 dark:bg-transparent dark:hover:bg-white/5"
      >
        <span className="w-8 shrink-0 text-center font-display text-2xl leading-none text-gray-300 dark:text-white/25">
          {signatureNumber(player)}
        </span>

        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-wrfc-navy">
          <PlayerAvatar player={player} size="sm" sizes="48px" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate font-heading text-base font-semibold text-gray-900 dark:text-white">
            {player.name}
          </span>
          <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
            {positionLabelFor(player)}
            <span className="mx-1.5 text-gray-300 dark:text-white/20">·</span>
            {POSITION_GROUPS[groupOf(player)].label}
          </span>
        </span>

        <span className="hidden w-40 shrink-0 text-sm text-gray-500 sm:block dark:text-gray-400">
          {figures.filter(Boolean).map((figure) => figure!.primary).join(' · ') || '—'}
        </span>

        <span className="hidden w-40 shrink-0 text-sm text-gray-500 md:block dark:text-gray-400">
          {experience ?? '—'}
        </span>

        <span className="hidden w-48 shrink-0 lg:block">
          {accolades[0] ? (
            <AccoladeBadge accolade={accolades[0]} short className="max-w-full" />
          ) : (
            <span className="text-sm text-gray-300 dark:text-white/20">—</span>
          )}
        </span>

        <CaretRight className="h-4 w-4 shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-wrfc-red" />
      </Link>
    </li>
  );
}

export default PlayerRow;
