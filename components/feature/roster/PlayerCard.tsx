import Link from 'next/link';
import { ArrowUpRight, Sparkle } from '@phosphor-icons/react/dist/ssr';

import { cn } from '@/lib/utils';
import { POSITION_GROUPS } from '@/data/roster/positions';
import {
  cardAccolades,
  experienceLabel,
  groupOf,
  playerUrl,
  positionLabelFor,
  weightLabel,
} from '@/data/roster';
import type { Player } from '@/data/roster/types';

import { AccoladeBadge } from './AccoladeBadge';
import { PlayerAvatar, signatureNumber } from './PlayerAvatar';

interface PlayerCardProps {
  player: Player;
  priority?: boolean;
}

export function PlayerCard({ player, priority = false }: PlayerCardProps) {
  const accolades = cardAccolades(player);
  const headline = accolades[0];
  const group = POSITION_GROUPS[groupOf(player)];
  const experience = experienceLabel(player);
  const weight = weightLabel(player);
  const unavailable = player.availability === 'unavailable';

  return (
    <Link
      href={playerUrl(player)}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl',
        'border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.04]',
        'transition-all duration-300 hover:-translate-y-1 hover:border-wrfc-red/50 hover:shadow-xl',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wrfc-red focus-visible:ring-offset-2',
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-wrfc-navy">
        <PlayerAvatar
          player={player}
          size="md"
          priority={priority}
          className="transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
        />

        {/* Legibility scrim for the text that sits over the image. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        <span className="absolute left-3 top-3 rounded-md bg-black/40 px-2 py-1 font-accent text-[10px] font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm">
          {group.label}
        </span>

        <span className="absolute right-3 top-3 font-display text-3xl leading-none text-white/40">
          {signatureNumber(player)}
        </span>

        {headline && (
          <span className="absolute right-3 bottom-3 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400/90 text-amber-950 shadow-lg">
            <Sparkle weight="fill" className="h-4 w-4" />
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-heading text-lg font-bold leading-tight text-white drop-shadow">
            {player.name}
          </h3>
          <p className="truncate font-accent text-xs uppercase tracking-wider text-white/75">
            {positionLabelFor(player)}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <dl className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
          {player.height && (
            <div className="flex items-center gap-1">
              <dt className="sr-only">Height</dt>
              <dd className="font-accent font-semibold text-gray-900 dark:text-gray-100">
                {player.height}
              </dd>
            </div>
          )}
          {weight && (
            <div className="flex items-center gap-1">
              <dt className="sr-only">Weight</dt>
              <dd className="font-accent font-semibold text-gray-900 dark:text-gray-100">{weight}</dd>
            </div>
          )}
          {experience && (
            <div className="flex items-center gap-1">
              <dt className="sr-only">Experience</dt>
              <dd>{experience}</dd>
            </div>
          )}
        </dl>

        {accolades.length > 0 && (
          <div className="flex min-w-0 flex-wrap gap-1.5">
            <AccoladeBadge accolade={accolades[0]} short className="max-w-full" />
            {accolades.length > 1 && (
              <span className="inline-flex items-center rounded-full border border-gray-200 px-2 py-1 font-accent text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:border-white/15 dark:text-gray-400">
                +{accolades.length - 1}
              </span>
            )}
          </div>
        )}

        {unavailable && (
          <p className="font-accent text-[11px] uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Unavailable this season
          </p>
        )}

        <span className="mt-auto inline-flex items-center gap-1 pt-1 font-accent text-xs font-semibold uppercase tracking-wider text-gray-400 transition-colors group-hover:text-wrfc-red dark:text-gray-500">
          View profile
          <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

export default PlayerCard;
