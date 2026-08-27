import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Buildings,
  CalendarCheck,
  GraduationCap,
  Info,
  Medal,
  Ruler,
  Scales,
  TShirt,
} from '@phosphor-icons/react/dist/ssr';

import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { AccoladeBadge, AccoladeDetail } from '@/components/feature/roster/AccoladeBadge';
import { PlayerAvatar, signatureNumber } from '@/components/feature/roster/PlayerAvatar';
import { PlayerCard } from '@/components/feature/roster/PlayerCard';
import { PlayerProfileJsonLd } from '@/components/feature/roster/PlayerJsonLd';
import { PlayerSocialLinks } from '@/components/feature/roster/PlayerSocialLinks';
import { ShareProfile } from '@/components/feature/roster/ShareProfile';

import { POSITIONS, POSITION_GROUPS } from '@/data/roster/positions';
import {
  CLUB_URL,
  ROSTER_PATH,
  experienceLabel,
  getAllPlayerSlugs,
  getPlayerBySlug,
  groupOf,
  height,
  playerAccolades,
  positionLabelFor,
  relatedPlayers,
  shirtNumbersFor,
  weight,
} from '@/data/roster';
import type { Player } from '@/data/roster/types';

interface PlayerProfilePageProps {
  params: { slug: string };
}

/**
 * One sentence that works as a meta description, an OG description and the
 * default share text — so a shared profile reads the same everywhere.
 */
function summaryLine(player: Player): string {
  const { honours } = playerAccolades(player);
  const parts = [`${player.name} plays ${positionLabelFor(player)} for Washington Rugby Football Club`];

  const experience = experienceLabel(player);
  if (experience) parts.push(`At the club ${experience.toLowerCase()}`);
  if (player.previousClub) parts.push(`previously ${player.previousClub}`);
  if (honours.length > 0) parts.push(honours[0].label);

  return `${parts.join('. ')}.`;
}

export async function generateMetadata({ params }: PlayerProfilePageProps): Promise<Metadata> {
  const player = getPlayerBySlug(params.slug);

  if (!player) {
    return { title: 'Player Not Found', robots: { index: false, follow: false } };
  }

  const url = `${CLUB_URL}${ROSTER_PATH}/${player.slug}`;
  const title = `${player.name} — ${positionLabelFor(player)} | WRFC`;
  const description = summaryLine(player);

  return {
    title,
    description,
    keywords: [player.name, 'washington rugby', 'wrfc player', positionLabelFor(player)],
    alternates: { canonical: url },
    openGraph: {
      type: 'profile',
      title,
      description,
      url,
      siteName: 'Washington Rugby Football Club',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@WRFC_DC',
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  return getAllPlayerSlugs().map((slug) => ({ slug }));
}

export default function PlayerProfilePage({ params }: PlayerProfilePageProps) {
  const player = getPlayerBySlug(params.slug);
  if (!player) notFound();

  const { honours, clubRoles } = playerAccolades(player);
  const group = POSITION_GROUPS[groupOf(player)];
  const numbers = shirtNumbersFor(player.positions);
  const experience = experienceLabel(player);
  const playerHeight = height(player);
  const playerWeight = weight(player);
  const url = `${CLUB_URL}${ROSTER_PATH}/${player.slug}`;
  const related = relatedPlayers(player);

  const vitals = [
    playerHeight && {
      icon: Ruler,
      label: 'Height',
      value: playerHeight.primary,
      note: playerHeight.secondary,
    },
    playerWeight && {
      icon: Scales,
      label: 'Weight',
      value: playerWeight.primary,
      note: playerWeight.secondary,
    },
    {
      icon: TShirt,
      label: numbers.length > 1 ? 'Shirt numbers' : 'Shirt number',
      value: numbers.join(', '),
    },
    experience && { icon: CalendarCheck, label: 'At the club', value: experience },
    player.previousClub && { icon: Buildings, label: 'Came from', value: player.previousClub },
    player.collegeProgram && {
      icon: GraduationCap,
      label: 'College rugby',
      value: player.collegeProgram,
    },
    player.military && { icon: Medal, label: 'Service', value: player.military },
  ].filter(Boolean) as {
    icon: typeof Ruler;
    label: string;
    value: string;
    note?: string;
  }[];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Teams', item: '/teams' },
          { name: 'Players', item: ROSTER_PATH },
          { name: player.name, item: `${ROSTER_PATH}/${player.slug}` },
        ]}
      />
      <PlayerProfileJsonLd player={player} />

      {/* --- Hero ---------------------------------------------------------- */}
      <header className="relative overflow-hidden bg-wrfc-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(200,16,46,0.5),transparent_55%),radial-gradient(circle_at_90%_20%,rgba(0,167,181,0.3),transparent_50%)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 top-4 select-none font-display text-[14rem] leading-none text-white/[0.06] md:text-[22rem]"
        >
          {signatureNumber(player)}
        </span>

        <div className="container relative mx-auto px-4 py-8 md:py-12">
          <Link
            href={ROSTER_PATH}
            className="inline-flex items-center gap-2 font-accent text-xs font-semibold uppercase tracking-wider text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft weight="bold" className="h-4 w-4" />
            Full squad
          </Link>

          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end">
            <div className="relative aspect-[3/4] w-48 shrink-0 overflow-hidden rounded-2xl bg-wrfc-navy shadow-2xl ring-1 ring-white/20 md:w-64">
              <PlayerAvatar player={player} size="lg" priority sizes="(max-width: 768px) 192px, 256px" />
            </div>

            <div className="min-w-0 flex-1 pb-2">
              <p className="font-accent text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                {group.label} · {group.unit}
                {player.division ? ` · Men's ${player.division === 'Both' ? 'D1 & D3' : player.division}` : ''}
              </p>
              <h1 className="display-medium mt-2 text-white">{player.name}</h1>
              <p className="mt-1 font-heading text-xl text-white/80">{positionLabelFor(player)}</p>

              {(honours.length > 0 || clubRoles.length > 0) && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {[...honours, ...clubRoles].map((accolade) => (
                    <li key={accolade.id}>
                      <AccoladeBadge
                        accolade={accolade}
                        className="border-white/30 bg-white/10 text-white hover:border-white/60"
                      />
                    </li>
                  ))}
                </ul>
              )}

              {player.availability === 'unavailable' && player.availabilityNote && (
                <p className="mt-4 inline-flex max-w-xl items-start gap-2 rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-sm text-amber-100">
                  <Info weight="fill" className="mt-0.5 h-4 w-4 shrink-0" />
                  {player.availabilityNote}
                </p>
              )}

              <div className="mt-6">
                <ShareProfile
                  url={url}
                  title={`${player.name} — Washington Rugby Football Club`}
                  text={summaryLine(player)}
                  className="[&_span:first-child]:text-white/50 [&_a]:border-white/25 [&_a]:text-white/80 [&_button]:border-white/25 [&_button]:text-white/80"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            {/* --- Vitals -------------------------------------------------- */}
            <section>
              <h2 className="mb-4 font-accent text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Player card
              </h2>
              <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {vitals.map(({ icon: Icon, label, value, note }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-gray-200 p-4 dark:border-white/10"
                  >
                    <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      <Icon className="h-3.5 w-3.5" />
                      {label}
                    </dt>
                    <dd className="mt-1.5 font-heading text-base font-semibold text-gray-900 dark:text-white">
                      {value}
                      {note && (
                        <span className="ml-1.5 font-sans text-sm font-normal text-gray-400">
                          {note}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              {player.caps && (player.caps.d1 || player.caps.d3) && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {player.caps.d1 !== undefined && (
                    <div className="rounded-xl border border-gray-200 px-5 py-3 dark:border-white/10">
                      <span className="stat-number text-wrfc-red">{player.caps.d1}</span>
                      <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        D1 club caps
                      </p>
                    </div>
                  )}
                  {player.caps.d3 !== undefined && (
                    <div className="rounded-xl border border-gray-200 px-5 py-3 dark:border-white/10">
                      <span className="stat-number text-wrfc-teal">{player.caps.d3}</span>
                      <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        D3 club caps
                      </p>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* --- Honours ------------------------------------------------- */}
            {honours.length > 0 && (
              <section>
                <h2 className="display-small mb-2 text-gray-900 dark:text-white">Honours</h2>
                <p className="mb-5 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                  What each honour is, who awards it, and where the club got the information.
                </p>
                <ul className="space-y-3">
                  {honours.map((accolade) => (
                    <AccoladeDetail key={accolade.id} accolade={accolade} />
                  ))}
                </ul>
              </section>
            )}

            {clubRoles.length > 0 && (
              <section>
                <h2 className="display-small mb-2 text-gray-900 dark:text-white">At the club</h2>
                <p className="mb-5 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                  Roles and standing within Washington Rugby — not awards, but worth knowing.
                </p>
                <ul className="space-y-3">
                  {clubRoles.map((accolade) => (
                    <AccoladeDetail key={accolade.id} accolade={accolade} />
                  ))}
                </ul>
              </section>
            )}

            {/* --- Position explainer -------------------------------------- */}
            <section>
              <h2 className="display-small mb-4 text-gray-900 dark:text-white">
                Where {player.name.split(' ')[0]} plays
              </h2>
              <p className="mb-5 max-w-2xl text-gray-600 dark:text-gray-400">{group.blurb}</p>
              <ul className="flex flex-wrap gap-2">
                {player.positions.map((id) => {
                  const position = POSITIONS[id];
                  return (
                    <li
                      key={id}
                      className="rounded-xl border border-gray-200 px-4 py-3 dark:border-white/10"
                    >
                      <span className="font-heading text-base font-semibold text-gray-900 dark:text-white">
                        {position.label}
                      </span>
                      <span className="ml-2 font-accent text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        No. {position.numbers.join(' or ')}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>

          {/* --- Sidebar --------------------------------------------------- */}
          <aside className="space-y-8">
            <PlayerSocialLinks player={player} />

            <div className="rounded-2xl border border-gray-200 p-5 dark:border-white/10">
              <h2 className="font-heading text-base font-semibold text-gray-900 dark:text-white">
                Is this you?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Send a photo, a correction, or the socials you want linked here and we will update
                your profile. Socials are opt-in — nothing is added unless you ask for it.
              </p>
              <a
                href={`mailto:info@washingtonrugby.org?subject=${encodeURIComponent(
                  `Profile update — ${player.name}`,
                )}`}
                className="mt-4 inline-flex items-center gap-2 font-accent text-sm font-semibold uppercase tracking-wider text-wrfc-red hover:underline"
              >
                Update this profile
                <ArrowRight weight="bold" className="h-4 w-4" />
              </a>
            </div>

            {player.photoCredit && (
              <p className="text-xs text-gray-400">Photo: {player.photoCredit}</p>
            )}

            <div className="rounded-2xl bg-wrfc-navy p-5 text-white">
              <h2 className="font-heading text-base font-semibold">Play alongside {player.name.split(' ')[0]}</h2>
              <p className="mt-2 text-sm text-white/75">
                WRFC takes players at every level, including people who have never played.
              </p>
              <Link
                href="/membership"
                className="mt-4 inline-flex items-center gap-2 font-accent text-sm font-semibold uppercase tracking-wider text-white hover:underline"
              >
                Join the club
                <ArrowRight weight="bold" className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>

        {/* --- Same position ------------------------------------------------ */}
        {related.length > 0 && (
          <section className="mt-16 border-t border-gray-200 pt-12 dark:border-white/10">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="display-small text-gray-900 dark:text-white">
                More in the {group.label.toLowerCase()}
              </h2>
              <Link
                href={ROSTER_PATH}
                className="font-accent text-sm font-semibold uppercase tracking-wider text-wrfc-red hover:underline"
              >
                Full squad
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((teammate) => (
                <PlayerCard key={teammate.slug} player={teammate} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
