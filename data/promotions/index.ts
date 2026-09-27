import { cherryBlossomPromotion } from './cherry-blossom';
import { capitalsRugbyNightPromotion } from './capitals-rugby-night';

/**
 * Site promotions (popups, carousels).
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
   * Zeffy embed URL (…/embed/ticketing/…?modal=true). When set, the popup CTA
   * opens the Zeffy form in an on-page modal instead of following buttonUrl.
   */
  zeffyFormUrl?: string;
  /** Show this promotion as the site-wide popup on page load. */
  showPopup?: boolean;
  /** Short label shown on the popup image, e.g. "Tickets on sale". */
  badge?: string;
  /** Date / location pills shown in the popup. */
  eventDetails?: {
    date: string;
    location: string;
  };
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

/** The highest-priority live promotion flagged for the site-wide popup. */
export const getActivePopupPromotion = (now: Date = new Date()): Promotion | null => {
  return getActivePromotions(now).find(promo => promo.showPopup) ?? null;
};
