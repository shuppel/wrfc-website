import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Barbell, Medal, Ruler, Users } from '@phosphor-icons/react/dist/ssr';

import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { RosterExplorer } from '@/components/feature/roster/RosterExplorer';
import { RosterJsonLd } from '@/components/feature/roster/PlayerJsonLd';
import { clubRosterPlayers, squadPlayers, summarise } from '@/data/roster';

const SEASON = 'Fall 2026';

const summary = summarise(squadPlayers);

export const metadata: Metadata = {
  title: `${SEASON} Squad | Washington Rugby Football Club`,
  description: `The ${SEASON} Washington Rugby Football Club squad: ${summary.total} players across ${summary.forwards} forwards and ${summary.backs} backs, including Capital Selects and Major League Rugby academy honours. Filter by position, experience and honours, and open any player's profile.`,
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

const STATS = [
  { icon: Users, value: summary.total, label: 'In the squad', hint: `${summary.forwards} forwards · ${summary.backs} backs` },
  {
    icon: Medal,
    value: summary.decorated,
    label: 'With honours',
    hint: summary.professional
      ? `${summary.professional} with professional pathway honours`
      : 'Representative and collegiate selections',
  },
  { icon: Barbell, value: summary.rookies, label: 'Rookies', hint: 'First season at the club' },
  { icon: Ruler, value: summary.veterans, label: 'Veterans', hint: 'Six or more seasons' },
];

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
            {summary.total} players — {summary.forwards} forwards and {summary.backs} backs — from
            first-season rookies to veterans with six or more seasons in the shirt. Filter by
            position, experience or honours, and open any profile to see where a player came from and
            what they have won.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map(({ icon: Icon, value, label, hint }) => (
              <div
                key={label}
                className="rounded-xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur-sm"
              >
                <Icon weight="duotone" className="h-5 w-5 text-white/50" />
                <dd className="stat-number mt-2 text-white">{value}</dd>
                <dt className="font-heading text-sm font-semibold text-white/90">{label}</dt>
                <p className="mt-0.5 text-xs text-white/50">{hint}</p>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* --- Squad --------------------------------------------------------- */}
      <main className="container mx-auto px-4 py-12">
        <RosterExplorer players={squadPlayers} />

        {/* --- Wider club roster ------------------------------------------- */}
        {clubRosterPlayers.length > 0 && (
          <section className="mt-20 border-t border-gray-200 pt-12 dark:border-white/10">
            <h2 className="display-small text-gray-900 dark:text-white">Also on the club roster</h2>
            <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
              Players carried on the club roster who are not on the {SEASON} squad list. Rugby squads
              turn over between seasons and a sign-up sheet is not a record of who has left, so these
              profiles stay up.
            </p>
            <div className="mt-8">
              <RosterExplorer players={clubRosterPlayers} sticky={false} />
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
