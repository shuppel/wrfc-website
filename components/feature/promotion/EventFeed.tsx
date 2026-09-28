'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowSquareOut, Barbell, Clock, InstagramLogo, MapPin, Megaphone, Ticket, Trophy } from '@phosphor-icons/react';
import { FeedItem, getFeedItems } from '@/data/feed';
import ZeffyFormModal from '@/components/feature/payment/ZeffyFormModal';

// Club events are in DC; format in Eastern time so server and browser agree.
const TIME_ZONE = 'America/New_York';

const formatPart = (iso: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, ...options }).format(new Date(iso));

const KIND_LABEL: Record<FeedItem['kind'], string> = {
  event: 'Event',
  tournament: 'Tournament',
  announcement: 'News',
  other: 'Club',
  practice: 'Every week',
};

const KIND_ICON = {
  event: Ticket,
  tournament: Trophy,
  announcement: Megaphone,
  other: Megaphone,
  practice: Barbell,
} as const;

interface EventFeedProps {
  /**
   * The time the page was rendered (ISO). Used for the first render so server
   * and client markup match; the browser then re-evaluates with its own clock.
   */
  renderedAt: string;
}

/**
 * Homepage "What's On" feed: live, time-boxed promotions (soonest first)
 * followed by recurring club activity. Items drop off after their endDate.
 */
export default function EventFeed({ renderedAt }: EventFeedProps) {
  const [items, setItems] = useState<FeedItem[]>(() => getFeedItems(new Date(renderedAt)));
  const [zeffyFormUrl, setZeffyFormUrl] = useState<string | null>(null);
  const closeZeffy = useCallback(() => setZeffyFormUrl(null), []);

  useEffect(() => {
    setItems(getFeedItems(new Date()));
  }, []);

  const nextEventId = items.find(item => item.start)?.id;

  return (
    <section
      aria-labelledby="whats-on-heading"
      className="w-full rounded-2xl border border-white/15 bg-black/30 backdrop-blur-md shadow-2xl text-left"
    >
      <header className="flex items-center justify-between px-5 pt-5 pb-3">
        <h2 id="whats-on-heading" className="font-heading text-xl font-bold tracking-wide text-white">
          What&apos;s On
        </h2>
        <Link
          href="/schedule/events"
          className="inline-flex items-center gap-1 text-sm font-semibold text-gray-200 hover:text-white rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          Full schedule
          <ArrowRight className="w-4 h-4" weight="bold" />
        </Link>
      </header>

      <ul className="divide-y divide-white/10 px-2 pb-2">
        {items.map(item => (
          <li key={item.id}>
            <FeedRow
              item={item}
              highlight={item.id === nextEventId}
              onOpenZeffy={setZeffyFormUrl}
            />
          </li>
        ))}
      </ul>

      {zeffyFormUrl && (
        <ZeffyFormModal formUrl={zeffyFormUrl} isOpen onClose={closeZeffy} />
      )}
    </section>
  );
}

function FeedRow({
  item,
  highlight,
  onOpenZeffy,
}: {
  item: FeedItem;
  highlight: boolean;
  onOpenZeffy: (url: string) => void;
}) {
  const Icon = KIND_ICON[item.kind];
  const time = item.timeLabel
    ?? (item.start && !item.allDay ? formatPart(item.start, { weekday: 'short', hour: 'numeric', minute: '2-digit' }) : undefined);

  const body = (
    <>
      {/* Date tile */}
      <div
        className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl text-white ${
          highlight ? 'bg-wrfc-red shadow-lg shadow-red-900/40' : 'bg-white/10'
        }`}
        aria-hidden="true"
      >
        {item.start ? (
          <>
            <span className="text-[11px] font-semibold uppercase tracking-wider leading-none opacity-90">
              {formatPart(item.start, { month: 'short' })}
            </span>
            <span className="font-heading text-2xl font-bold leading-none mt-1">
              {formatPart(item.start, { day: 'numeric' })}
            </span>
          </>
        ) : (
          <Icon className="w-6 h-6" weight="duotone" />
        )}
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-300">
          {highlight ? 'Next up' : KIND_LABEL[item.kind]}
          {item.recurrence && <span className="text-gray-400"> · {item.recurrence}</span>}
        </p>
        <p className="font-semibold text-white leading-snug">
          {item.title}
        </p>
        {item.note && (
          <p className="mt-1 inline-flex items-center gap-1 text-sm text-gray-300">
            <InstagramLogo className="w-3.5 h-3.5" weight="bold" />
            {item.note}
          </p>
        )}
        {(time || item.location) && (
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm text-gray-300">
            {time && (
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" weight="bold" />
                {time}
              </span>
            )}
            {item.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" weight="bold" />
                {item.location}
              </span>
            )}
          </p>
        )}
      </div>

      {/* CTA */}
      <span className="hidden sm:inline-flex shrink-0 items-center gap-1 self-center text-sm font-semibold text-white/90 group-hover:text-white">
        {item.ctaLabel}
        {item.external && !item.zeffyFormUrl
          ? <ArrowSquareOut className="w-4 h-4" weight="bold" />
          : <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" weight="bold" />}
      </span>
    </>
  );

  const rowClass =
    'group flex w-full items-start gap-4 rounded-xl px-3 py-3 text-left transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70';

  if (item.zeffyFormUrl) {
    const url = item.zeffyFormUrl;
    return (
      <button type="button" className={rowClass} onClick={() => onOpenZeffy(url)}>
        {body}
      </button>
    );
  }

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
        {body}
      </a>
    );
  }

  return (
    <Link href={item.href} className={rowClass}>
      {body}
    </Link>
  );
}
