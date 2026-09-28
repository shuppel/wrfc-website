import { getActivePromotions, Promotion } from '@/data/promotions';

/** One row in the homepage "What's On" feed. */
export interface FeedItem {
  id: string;
  kind: Promotion['type'] | 'practice';
  title: string;
  /** ISO datetime of the event; undefined for recurring items. */
  start?: string;
  allDay?: boolean;
  /** Shown instead of a date for recurring items, e.g. "Tue & Thu". */
  recurrence?: string;
  timeLabel?: string;
  location?: string;
  href: string;
  ctaLabel: string;
  external?: boolean;
  zeffyFormUrl?: string;
}

/**
 * Always-on items listed after dated events, so the feed is never empty.
 * Keep in sync with /app/schedule/practice.
 */
export const recurringFeedItems: FeedItem[] = [
  {
    id: 'practice',
    kind: 'practice',
    title: 'Team Practice',
    recurrence: 'Tue & Thu',
    timeLabel: '8:00 – 10:00 PM',
    location: 'Rosedale Rec Center',
    href: '/schedule/practice',
    ctaLabel: 'Practice details',
  },
];

// Max dated events shown in the feed; the rest live on /schedule/events.
export const MAX_FEED_EVENTS = 4;

const toFeedItem = (promo: Promotion): FeedItem => ({
  id: promo.id,
  kind: promo.type,
  title: promo.title,
  start: promo.eventStart,
  allDay: promo.allDay,
  location: promo.location,
  href: promo.buttonUrl,
  ctaLabel: promo.buttonText,
  external: promo.ctaType === 'external',
  zeffyFormUrl: promo.zeffyFormUrl,
});

const startTime = (item: FeedItem): number =>
  item.start ? new Date(item.start).getTime() : Number.POSITIVE_INFINITY;

/**
 * Live promotions as feed items, soonest event first (undated ones after),
 * followed by the recurring items. Uses the same start/end window as every
 * other promotion surface, so events drop off after their `endDate`.
 */
export function getFeedItems(now: Date = new Date()): FeedItem[] {
  const events = getActivePromotions(now)
    .map(toFeedItem)
    .sort((a, b) => startTime(a) - startTime(b))
    .slice(0, MAX_FEED_EVENTS);
  return [...events, ...recurringFeedItems];
}
