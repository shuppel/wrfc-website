import Link from 'next/link';
import {
  ArrowSquareOut,
  CaretRight,
  CheckCircle,
  Medal,
  ShieldStar,
  Star,
  Trophy,
} from '@phosphor-icons/react/dist/ssr';

import { cn } from '@/lib/utils';
import { ACCOLADE_TIERS, accoladeText } from '@/data/roster/accolades';
import type { AccoladeTier, ResolvedAccolade } from '@/data/roster/accolades';

const TIER_ICONS: Record<AccoladeTier, typeof Trophy> = {
  professional: Trophy,
  representative: Medal,
  'club-honour': Star,
  club: ShieldStar,
};

interface AccoladeBadgeProps {
  accolade: ResolvedAccolade;
  /** Compact form for roster cards. */
  short?: boolean;
  className?: string;
}

/**
 * The chip form — used on cards and anywhere a list of honours needs to stay
 * on one line. The full explanation lives in `AccoladeDetail` on the profile.
 */
export function AccoladeBadge({ accolade, short = false, className }: AccoladeBadgeProps) {
  const tier = ACCOLADE_TIERS[accolade.tier];
  const Icon = TIER_ICONS[accolade.tier];

  return (
    <span
      title={accolade.description}
      className={cn(
        'inline-flex min-w-0 max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1',
        'font-accent text-[11px] font-semibold uppercase tracking-wider',
        'transition-colors',
        tier.badge,
        className,
      )}
    >
      <Icon weight="fill" className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate">{accoladeText(accolade, short)}</span>
    </span>
  );
}

/**
 * The expanded form on a player profile: the honour, what it actually is, who
 * awards it, and whether the club has verified it or the player declared it.
 *
 * The verification line matters. It is the difference between a roster that
 * asserts things about real people and one that says where each claim came
 * from.
 */
export function AccoladeDetail({ accolade }: { accolade: ResolvedAccolade }) {
  const tier = ACCOLADE_TIERS[accolade.tier];
  const Icon = TIER_ICONS[accolade.tier];
  const verified = accolade.verification === 'club-verified';

  return (
    <li
      className={cn(
        'group relative rounded-xl border bg-white/60 p-4 transition-all',
        'dark:bg-white/[0.03] hover:shadow-md',
        tier.badge.replace(/text-\S+/g, ''),
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1',
            tier.badge,
            tier.ring,
          )}
        >
          <Icon weight="fill" className="h-5 w-5" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <h3 className="font-heading text-base font-semibold text-gray-900 dark:text-white">
              {accolade.label}
            </h3>
            {accolade.detail && (
              <span className="font-accent text-xs uppercase tracking-wider text-wrfc-red">
                {accolade.detail}
              </span>
            )}
          </div>

          <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {accolade.description}
          </p>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <span
              className={cn(
                'inline-flex items-center gap-1 text-xs',
                verified
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : 'text-gray-500 dark:text-gray-400',
              )}
            >
              <CheckCircle weight={verified ? 'fill' : 'regular'} className="h-3.5 w-3.5" />
              {verified ? 'Verified by the club' : 'Reported by the player'}
            </span>

            {accolade.org && (
              <Link
                href={accolade.org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-wrfc-navy underline-offset-2 hover:underline dark:text-sky-300"
              >
                {accolade.org.name}
                <ArrowSquareOut className="h-3.5 w-3.5" />
              </Link>
            )}

            {accolade.internalUrl && (
              <Link
                href={accolade.internalUrl}
                className="inline-flex items-center gap-1 text-xs font-medium text-wrfc-navy underline-offset-2 hover:underline dark:text-sky-300"
              >
                Committee records
                <CaretRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default AccoladeBadge;
