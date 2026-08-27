'use client';

import { useMemo, useState } from 'react';
import { Funnel, MagnifyingGlass, SquaresFour, Rows, X } from '@phosphor-icons/react';

import { cn } from '@/lib/utils';
import { resolveAccolades } from '@/data/roster/accolades';
import { POSITION_GROUPS, POSITION_GROUP_ORDER } from '@/data/roster/positions';
import type { PositionGroupId, Unit } from '@/data/roster/positions';
import {
  EXPERIENCE_BANDS,
  experienceBand,
  groupOf,
  positionLabelFor,
  unitOf,
} from '@/data/roster';
import type { ExperienceBand } from '@/data/roster';
import type { Player } from '@/data/roster/types';

import { PlayerCard } from './PlayerCard';
import { PlayerRow } from './PlayerRow';

type UnitFilter = 'all' | Unit;
type GroupFilter = 'all' | PositionGroupId;
type ExperienceFilter = 'all' | ExperienceBand;
type SortKey = 'position' | 'name' | 'experience' | 'height' | 'weight';
type ViewMode = 'grid' | 'list';

const SORTS: { id: SortKey; label: string }[] = [
  { id: 'position', label: 'Position (1–15)' },
  { id: 'name', label: 'Name (A–Z)' },
  { id: 'experience', label: 'Seasons at WRFC' },
  { id: 'height', label: 'Height' },
  { id: 'weight', label: 'Weight' },
];

interface RosterExplorerProps {
  players: Player[];
  emptyMessage?: string;
  /**
   * Whether the control bar pins to the top of the viewport. Only one explorer
   * on a page should — two competing sticky bars stack on top of each other.
   */
  sticky?: boolean;
  /** Which view the explorer opens in. */
  defaultView?: ViewMode;
}

export function RosterExplorer({
  players,
  emptyMessage = 'No players match those filters.',
  sticky = true,
  defaultView = 'grid',
}: RosterExplorerProps) {
  const [query, setQuery] = useState('');
  const [unit, setUnit] = useState<UnitFilter>('all');
  const [group, setGroup] = useState<GroupFilter>('all');
  const [experience, setExperience] = useState<ExperienceFilter>('all');
  const [decoratedOnly, setDecoratedOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>('position');
  const [view, setView] = useState<ViewMode>(defaultView);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Only offer position-group chips that the current unit filter can reach —
  // showing "Back Row" while Backs is selected is a dead end.
  const availableGroups = useMemo(
    () =>
      POSITION_GROUP_ORDER.filter(
        (id) => unit === 'all' || POSITION_GROUPS[id].unit === unit,
      ),
    [unit],
  );

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const filtered = players.filter((player) => {
      if (unit !== 'all' && unitOf(player) !== unit) return false;
      if (group !== 'all' && groupOf(player) !== group) return false;
      if (experience !== 'all' && experienceBand(player) !== experience) return false;
      if (decoratedOnly && (player.accolades ?? []).length === 0) return false;

      if (needle) {
        const haystack = [
          player.name,
          positionLabelFor(player),
          player.previousClub ?? '',
          ...resolveAccolades(player.accolades).map((accolade) => accolade.label),
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(needle)) return false;
      }

      return true;
    });

    const byName = (a: Player, b: Player) => a.name.localeCompare(b.name);

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'name':
          return byName(a, b);
        case 'experience':
          return (b.seasons ?? -1) - (a.seasons ?? -1) || byName(a, b);
        case 'height':
          return (b.heightCm ?? 0) - (a.heightCm ?? 0) || byName(a, b);
        case 'weight':
          return (b.weightKg ?? 0) - (a.weightKg ?? 0) || byName(a, b);
        case 'position':
        default:
          return (
            POSITION_GROUPS[groupOf(a)].order - POSITION_GROUPS[groupOf(b)].order || byName(a, b)
          );
      }
    });
  }, [players, query, unit, group, experience, decoratedOnly, sort]);

  const filtersActive =
    query !== '' || unit !== 'all' || group !== 'all' || experience !== 'all' || decoratedOnly;

  const reset = () => {
    setQuery('');
    setUnit('all');
    setGroup('all');
    setExperience('all');
    setDecoratedOnly(false);
  };

  const chip = (active: boolean) =>
    cn(
      'rounded-full border px-3.5 py-1.5 font-accent text-xs font-semibold uppercase tracking-wider transition-colors',
      active
        ? 'border-wrfc-red bg-wrfc-red text-white'
        : 'border-gray-200 bg-white text-gray-600 hover:border-wrfc-red/50 hover:text-wrfc-red dark:border-white/15 dark:bg-white/5 dark:text-gray-300',
    );

  return (
    <div>
      {/* --- Controls ------------------------------------------------------ */}
      <div
        className={cn(
          '-mx-4 mb-8 border-b border-gray-200 bg-white/85 px-4 py-4 backdrop-blur-md dark:border-white/10 dark:bg-gray-950/85',
          sticky && 'sticky top-0 z-20',
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px] flex-1">
              <MagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name, position, club or honour"
                aria-label="Search the roster"
                className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-wrfc-red focus:outline-none focus:ring-1 focus:ring-wrfc-red dark:border-white/15 dark:bg-white/5 dark:text-white"
              />
            </div>

            <label className="sr-only" htmlFor="roster-sort">
              Sort the roster
            </label>
            <select
              id="roster-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 focus:border-wrfc-red focus:outline-none dark:border-white/15 dark:bg-white/5 dark:text-gray-200"
            >
              {SORTS.map((option) => (
                <option key={option.id} value={option.id}>
                  Sort: {option.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setFiltersOpen((open) => !open)}
              aria-expanded={filtersOpen}
              aria-controls="roster-filters"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 font-accent text-xs font-semibold uppercase tracking-wider text-gray-600 sm:hidden dark:border-white/15 dark:text-gray-300"
            >
              <Funnel className="h-4 w-4" />
              Filters
              {filtersActive && <span className="h-1.5 w-1.5 rounded-full bg-wrfc-red" />}
            </button>

            <div className="flex rounded-full border border-gray-200 p-0.5 dark:border-white/15">
              <button
                type="button"
                onClick={() => setView('grid')}
                aria-label="Grid view"
                aria-pressed={view === 'grid'}
                className={cn(
                  'rounded-full p-2 transition-colors',
                  view === 'grid' ? 'bg-wrfc-red text-white' : 'text-gray-500 hover:text-wrfc-red',
                )}
              >
                <SquaresFour weight="fill" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setView('list')}
                aria-label="List view"
                aria-pressed={view === 'list'}
                className={cn(
                  'rounded-full p-2 transition-colors',
                  view === 'list' ? 'bg-wrfc-red text-white' : 'text-gray-500 hover:text-wrfc-red',
                )}
              >
                <Rows weight="fill" className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            id="roster-filters"
            className={cn(
              'flex-wrap items-center gap-2 sm:flex',
              filtersOpen ? 'flex' : 'hidden',
            )}
          >
            <Funnel className="hidden h-4 w-4 text-gray-400 sm:block" />

            <button type="button" onClick={() => { setUnit('all'); setGroup('all'); }} className={chip(unit === 'all')}>
              All
            </button>
            {(['Forwards', 'Backs'] as Unit[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setUnit(option);
                  setGroup('all');
                }}
                className={chip(unit === option)}
              >
                {option}
              </button>
            ))}

            <span className="mx-1 h-5 w-px bg-gray-200 dark:bg-white/15" />

            {availableGroups.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setGroup(group === id ? 'all' : id)}
                className={chip(group === id)}
              >
                {POSITION_GROUPS[id].label}
              </button>
            ))}

            <span className="mx-1 h-5 w-px bg-gray-200 dark:bg-white/15" />

            {EXPERIENCE_BANDS.map((band) => (
              <button
                key={band.id}
                type="button"
                title={band.hint}
                onClick={() => setExperience(experience === band.id ? 'all' : band.id)}
                className={chip(experience === band.id)}
              >
                {band.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setDecoratedOnly((value) => !value)}
              className={chip(decoratedOnly)}
            >
              With honours
            </button>

            {filtersActive && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-accent text-xs font-semibold uppercase tracking-wider text-gray-500 underline-offset-2 hover:text-wrfc-red hover:underline"
              >
                <X weight="bold" className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --- Results ------------------------------------------------------- */}
      <p className="mb-5 font-accent text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
        {results.length} {results.length === 1 ? 'player' : 'players'}
        {filtersActive ? ' matching' : ''}
      </p>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 p-12 text-center dark:border-white/15">
          <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 font-accent text-sm font-semibold uppercase tracking-wider text-wrfc-red hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {results.map((player, index) => (
            <PlayerCard key={player.slug} player={player} priority={index < 5} />
          ))}
        </div>
      ) : (
        <ul className="divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 dark:divide-white/10 dark:border-white/10">
          {results.map((player) => (
            <PlayerRow key={player.slug} player={player} />
          ))}
        </ul>
      )}

      {view === 'list' && results.length > 0 && (
        <p className="mt-3 text-xs text-gray-400">
          Heights and weights are self-reported at squad registration.
        </p>
      )}
    </div>
  );
}

export default RosterExplorer;
