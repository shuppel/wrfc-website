import { Promotion } from './index';
import { ZEFFY_LINKS } from '@/data/zeffy-links';

/**
 * Rugby Night with the Washington Capitals — ticketed through Zeffy.
 *
 * Listed in the homepage "What's On" feed from `startDate` until `endDate`,
 * then it drops off on its own in the visitor's browser (no redeploy needed).
 *
 * TODO(event date): set `eventStart` to puck drop and `endDate` to the end of
 * game night. Until `endDate` is a valid date the item stays hidden —
 * promotions fail closed so they can never run forever.
 *
 * After the event: delete this file and its entry in ./index.ts, and the
 * `capitalsRugbyNight` block in /data/zeffy-links.ts (see docs/PROMOTIONS.md).
 */
export const capitalsRugbyNightPromotion: Promotion = {
  id: 'capitals-rugby-night-2026',
  title: 'Rugby Night with the Washington Capitals',
  description: 'Join Washington Rugby for a night at the Capitals game. Grab your tickets through Zeffy and sit with the club.',
  imageUrl: '/assets/pictures/huddle_2025_irish.jpg',
  buttonText: 'Get Tickets',
  buttonUrl: ZEFFY_LINKS.capitalsRugbyNight.ticketing,
  zeffyFormUrl: ZEFFY_LINKS.capitalsRugbyNight.embed,
  startDate: '2026-09-27T00:00:00-04:00',
  endDate: '', // TODO(event date): e.g. '2026-11-14T23:59:59-05:00'
  eventStart: undefined, // TODO(event date): e.g. '2026-11-14T19:00:00-05:00'
  location: 'Capital One Arena',
  priority: 200,
  isActive: true,
  type: 'event',
  tags: ['capitals', 'hockey', 'social', 'fundraiser'],
  ctaType: 'external',
};
