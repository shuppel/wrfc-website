import { Promotion } from './index';
import { ZEFFY_LINKS } from '@/data/zeffy-links';

/**
 * Rugby Night with the Washington Capitals — ticketed through Zeffy.
 *
 * Listed in the homepage "What's On" feed from `startDate` until `endDate`,
 * then it drops off on its own in the visitor's browser (no redeploy needed).
 *
 * Game: Capitals vs. Philadelphia Flyers, Wed Oct 28 2026, 7:30 PM puck drop
 * (the Capitals' "Hockey Halloween" rugby-jersey night). Drops off the feed
 * at midnight after the game.
 *
 * After the event: delete this file and its entry in ./index.ts, and the
 * `capitalsRugbyNight` block in /data/zeffy-links.ts (see docs/PROMOTIONS.md).
 */
export const capitalsRugbyNightPromotion: Promotion = {
  id: 'capitals-rugby-night-2026',
  title: 'Rugby Night with the Washington Capitals',
  description: 'Join Washington Rugby at Capital One Arena for Capitals vs. Flyers. Grab your tickets through Zeffy and sit with the club.',
  imageUrl: '/assets/pictures/huddle_2025_irish.jpg',
  buttonText: 'Get Tickets',
  buttonUrl: ZEFFY_LINKS.capitalsRugbyNight.ticketing,
  zeffyFormUrl: ZEFFY_LINKS.capitalsRugbyNight.embed,
  startDate: '2026-09-27T00:00:00-04:00',
  endDate: '2026-10-28T23:59:59-04:00',
  eventStart: '2026-10-28T19:30:00-04:00',
  location: 'Capital One Arena',
  priority: 200,
  isActive: true,
  type: 'event',
  tags: ['capitals', 'hockey', 'social', 'fundraiser'],
  ctaType: 'external',
};
