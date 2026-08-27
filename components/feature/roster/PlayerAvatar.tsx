import Image from 'next/image';

import { cn } from '@/lib/utils';
import { POSITIONS, primaryGroupOf } from '@/data/roster/positions';
import type { PositionGroupId } from '@/data/roster/positions';
import type { Player } from '@/data/roster/types';

/**
 * A player's photo, or a monogram if the club does not have one on file.
 *
 * Most of the squad has no headshot, and filling 79 cards with the same stock
 * illustration reads as broken. The monogram instead gives every player a
 * distinct, deterministic tile: initials over a gradient keyed to the shirt
 * number they wear, with the number set behind them. It looks intentional at
 * card size and it stays stable across rebuilds.
 */

/**
 * Gradients are grouped by position family so a wall of cards reads as a team
 * sheet — front row in reds, second row in blues, and so on. Within a family
 * there are three variants picked by a hash of the player's name, because a
 * squad with eleven props should not render as eleven identical tiles.
 */
const GROUP_GRADIENTS: Record<PositionGroupId, string[]> = {
  'front-row': [
    'from-[#7f1d1d] via-[#b91c1c] to-[#450a0a]',
    'from-[#7c2d12] via-[#c2410c] to-[#431407]',
    'from-[#881337] via-[#9f1239] to-[#4c0519]',
  ],
  'second-row': [
    'from-[#1e3a5f] via-[#1d4ed8] to-[#0b1f3f]',
    'from-[#0c4a6e] via-[#0369a1] to-[#082f49]',
    'from-[#312e81] via-[#4338ca] to-[#1e1b4b]',
  ],
  'back-row': [
    'from-[#134e4a] via-[#0f766e] to-[#042f2e]',
    'from-[#14532d] via-[#15803d] to-[#052e16]',
    'from-[#365314] via-[#4d7c0f] to-[#1a2e05]',
  ],
  'half-backs': [
    'from-[#581c87] via-[#7e22ce] to-[#2e1065]',
    'from-[#4c1d95] via-[#6d28d9] to-[#2e1065]',
    'from-[#6b21a8] via-[#a21caf] to-[#3b0764]',
  ],
  centers: [
    'from-[#164e63] via-[#0e7490] to-[#083344]',
    'from-[#155e75] via-[#0891b2] to-[#083344]',
    'from-[#0f766e] via-[#14b8a6] to-[#042f2e]',
  ],
  'back-three': [
    'from-[#831843] via-[#be185d] to-[#500724]',
    'from-[#78350f] via-[#a16207] to-[#422006]',
    'from-[#002B5C] via-[#0b4a8f] to-[#001529]',
  ],
};

/** Small stable string hash, so a player's tile never changes between builds. */
function hashName(name: string): number {
  let hash = 0;
  for (let index = 0; index < name.length; index += 1) {
    hash = (hash * 31 + name.charCodeAt(index)) % 100000;
  }
  return hash;
}

export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

/** The shirt number that keys a player's monogram colour. */
export function signatureNumber(player: Player): number {
  return player.number ?? POSITIONS[player.positions[0]].numbers[0];
}

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

const SIZES: Record<AvatarSize, { initials: string; ghost: string }> = {
  sm: { initials: 'text-lg', ghost: 'text-5xl' },
  md: { initials: 'text-3xl', ghost: 'text-8xl' },
  lg: { initials: 'text-5xl', ghost: 'text-[9rem]' },
  xl: { initials: 'text-6xl md:text-7xl', ghost: 'text-[12rem]' },
};

interface PlayerAvatarProps {
  player: Player;
  size?: AvatarSize;
  className?: string;
  priority?: boolean;
  /** Passed to next/image so the browser picks a sane source width. */
  sizes?: string;
}

export function PlayerAvatar({
  player,
  size = 'md',
  className,
  priority = false,
  sizes = '(max-width: 768px) 50vw, 320px',
}: PlayerAvatarProps) {
  if (player.photo) {
    return (
      <Image
        src={player.photo}
        alt={`${player.name}, Washington Rugby Football Club`}
        fill
        priority={priority}
        sizes={sizes}
        className={cn('object-cover', className)}
      />
    );
  }

  const number = signatureNumber(player);
  const family = GROUP_GRADIENTS[primaryGroupOf(player.positions)];
  const gradient = family[hashName(player.name) % family.length];
  const scale = SIZES[size];

  return (
    <div
      aria-hidden
      className={cn(
        'absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br',
        gradient,
        className,
      )}
    >
      <span
        className={cn(
          'pointer-events-none absolute font-display leading-none text-white/10 select-none',
          scale.ghost,
        )}
      >
        {number}
      </span>
      <span
        className={cn(
          'relative font-display tracking-[0.15em] text-white/90 drop-shadow-sm',
          scale.initials,
        )}
      >
        {initialsOf(player.name)}
      </span>
    </div>
  );
}

export default PlayerAvatar;
