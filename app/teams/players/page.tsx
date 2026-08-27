import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowSquareOut, CaretRight } from '@phosphor-icons/react/dist/ssr';

import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { RosterExplorer } from '@/components/feature/roster/RosterExplorer';
import { RosterJsonLd } from '@/components/feature/roster/PlayerJsonLd';
import { pastPlayers, squadHighlights, squadPlayers, summarise } from '@/data/roster';

const SEASON = 'Fall 2026';

const summary = summarise(squadPlayers);

export const metadata: Metadata = {
  title: `${SEASON} Squad | Washington Rugby Football Club`,
  description: `The ${SEASON} Washington Rugby Football Club senior squad — ${summary.total} players, six of them called into the 2026 Capital Selects. Browse the roster by position and experience, and open any player's profile.`,
  keywords: [
    'washington rugby roster',
    'wrfc players',
    'dc rugby team roster',
    'washington rugby football club squad',
    'rugby players washington dc',
  ],
  alternates: { canonical: 'https://washingtonrugby.org/teams/players' },
  openGraph: {
    title: `${SEASON} Squad | Washington Rugby Football Club`,
    description: `Meet the ${summary.total} players in the ${SEASON} Washington Rugby squad.`,
    url: 'https://washingtonrugby.org/teams/players',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@WRFC_DC',
    title: `${SEASON} Squad | Washington Rugby Football Club`,
    description: `Meet the ${summary.total} players in the ${SEASON} Washington Rugby squad.`,
  },
};

const highlights = squadHighlights(squadPlayers);

export default function PlayersPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Teams', item: '/teams' },
          { name: 'Players', item: '/teams/players' },
        ]}
      />
      <RosterJsonLd players={squadPlayers} season={SEASON} />

      {/* --- Hero ---------------------------------------------------------- */}
      <header className="relative overflow-hidden bg-wrfc-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(200,16,46,0.55),transparent_55%),radial-gradient(circle_at_85%_10%,rgba(0,167,181,0.35),transparent_50%)]"
        />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <p className="font-accent text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            Washington Rugby Football Club · Est. 1963
          </p>
          <h1 className="display-large mt-3 text-white">{SEASON} Squad</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            The senior squad for the {SEASON} season. Filter by position, experience or honours, and
            open any profile to see where a player came from and what they have won.
          </p>

          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {highlights.map((highlight) => {
              const body = (
                <>
                  <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                    {highlight.label}
                  </p>
                  <p className="mt-2 font-heading text-xl font-bold leading-snug text-white">
                    {highlight.statement}
                  </p>
                  {highlight.detail && (
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{highlight.detail}</p>
                  )}
                  {highlight.href && (
                    <span className="mt-3 inline-flex items-center gap-1 font-accent text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors group-hover:text-white">
                      Read more
                      {highlight.external ? (
                        <ArrowSquareOut className="h-3.5 w-3.5" />
                      ) : (
                        <CaretRight weight="bold" className="h-3.5 w-3.5" />
                      )}
                    </span>
                  )}
                </>
              );

              return (
                <li key={highlight.label}>
                  {highlight.href ? (
                    <Link
                      href={highlight.href}
                      {...(highlight.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="group flex h-full flex-col rounded-xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/[0.1]"
                    >
                      {body}
                    </Link>
                  ) : (
                    <div className="flex h-full flex-col rounded-xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-sm">
                      {body}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </header>

      {/* --- Squad --------------------------------------------------------- */}
      <main className="container mx-auto px-4 py-12">
        <RosterExplorer players={squadPlayers} />

        {/* --- Previous players -------------------------------------------- */}
        {pastPlayers.length > 0 && (
          <section className="mt-20 border-t border-gray-200 pt-12 dark:border-white/10">
            <h2 className="display-small text-gray-900 dark:text-white">Previous Players</h2>
            <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
              {pastPlayers.length} players from earlier Washington Rugby rosters. Their profiles stay
              up — the club&apos;s recent history is worth keeping, and so are the links to it.
            </p>
            <div className="mt-8">
              <RosterExplorer players={pastPlayers} sticky={false} defaultView="list" />
            </div>
          </section>
        )}

        {/* --- Data note ---------------------------------------------------- */}
        <section className="mt-16 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/[0.03]">
          <h2 className="font-heading text-lg font-semibold text-gray-900 dark:text-white">
            About this roster
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Heights, weights, previous clubs and honours come from what each player entered at squad
            registration. Honours marked <em>verified by the club</em> are ones WRFC has direct
            knowledge of — club roles, and selections the club itself put a player forward for.
            Everything else is shown as reported by the player. Contact details, dates of birth,
            registration numbers and match availability are collected at registration and are
            deliberately not published here.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            On the roster and want a photo, a correction or your socials added? Email{' '}
            <a
              href="mailto:info@washingtonrugby.org?subject=Player%20profile%20update"
              className="font-medium text-wrfc-red underline-offset-2 hover:underline"
            >
              info@washingtonrugby.org
            </a>
            .
          </p>
        </section>

        {/* --- Recruitment --------------------------------------------------- */}
        <section className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-r from-wrfc-red to-red-800 p-8 text-white md:p-12">
          <h2 className="display-small">Your name could be on this list</h2>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            Every season this squad takes in new players, including people who have never touched a
            rugby ball. We train Tuesdays and Thursdays and we will teach you the game from the first
            ruck up.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-heading font-semibold text-wrfc-red transition-colors hover:bg-white/90"
            >
              Join the club
              <ArrowRight weight="bold" className="h-4 w-4" />
            </Link>
            <Link
              href="/schedule/practice"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-heading font-semibold text-white transition-colors hover:bg-white/10"
            >
              Practice times
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
