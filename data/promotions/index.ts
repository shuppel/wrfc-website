import { cherryBlossomPromotion } from './cherry-blossom';
import { capitalsRugbyNightPromotion } from './capitals-rugby-night';

/**
 * Site promotions: the homepage event feed and promotion carousels.
 *
 * Every promotion is time-boxed: it is only shown between `startDate` and
 * `endDate`, evaluated in the visitor's browser, so a promotion switches
 * itself off after the event without a redeploy. See docs/PROMOTIONS.md.
 */
export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonUrl: string;
  startDate: string; // ISO date string with offset, e.g. 2026-10-01T00:00:00-04:00
  endDate: string;   // ISO date string — the promotion stops showing after this
  priority: number;  // Higher number = higher priority
  isActive: boolean; // Manual kill switch, independent of the dates
  type: 'event' | 'tournament' | 'announcement' | 'other';
  tags?: string[];
  ctaType?: 'link' | 'modal' | 'external';
  /**
   * Zeffy embed URL (…/embed/ticketing/…?modal=true). When set, the CTA
   * opens the Zeffy form in an on-page modal instead of following buttonUrl.
   */
  zeffyFormUrl?: string;
  /**
   * When the event itself happens (ISO with offset). Drives the date shown in
   * the homepage event feed and its order (soonest first). Distinct from
   * startDate/endDate, which control when the promotion is visible.
   */
  eventStart?: string;
  /** Multi-day or all-day events: show the date without a time. */
  allDay?: boolean;
  /** Short venue label shown in the event feed, e.g. "Capital One Arena". */
  location?: string;
  modalContent?: {
    title: string;
    content: string;
    imageUrl?: string;
  };
}

// Export all promotions as an array
export const promotions: Promotion[] = [
  capitalsRugbyNightPromotion,
  cherryBlossomPromotion,
  // Add more promotions here as they are created
];

const isValidDate = (value: string): boolean => !Number.isNaN(new Date(value).getTime());

/**
 * Whether a promotion should be live at `now`. Fails closed: a promotion with
 * a missing or malformed date is never shown, so a typo can't leave a popup
 * running forever.
 */
export const isPromotionLive = (promo: Promotion, now: Date = new Date()): boolean => {
  if (!promo.isActive) return false;
  if (!isValidDate(promo.startDate) || !isValidDate(promo.endDate)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[promotions] "${promo.id}" has an invalid startDate/endDate and will not be shown.`);
    }
    return false;
  }
  return new Date(promo.startDate) <= now && new Date(promo.endDate) >= now;
};

// Helper function to get active promotions
export const getActivePromotions = (now: Date = new Date()): Promotion[] => {
  return promotions
    .filter(promo => isPromotionLive(promo, now))
    .sort((a, b) => b.priority - a.priority);
};
