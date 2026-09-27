import { Promotion } from './index';
import { ZEFFY_LINKS } from '@/data/zeffy-links';

/**
 * Rugby Night with the Washington Capitals — ticketed through Zeffy.
 *
 * Shown as the site-wide popup from `startDate` until `endDate`, then it
 * switches itself off in the visitor's browser (no redeploy needed).
 *
 * TODO(event date): set `endDate` to the end of game night and fill in
 * `eventDetails.date`. Until `endDate` is a valid date the popup stays
 * hidden — promotions fail closed so they can never run forever.
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
  priority: 200,
  isActive: true,
  showPopup: true,
  badge: 'Tickets on sale',
  type: 'event',
  tags: ['capitals', 'hockey', 'social', 'fundraiser'],
  ctaType: 'external',
  eventDetails: {
    date: 'Date TBA', // TODO(event date)
    location: 'Capital One Arena',
  },
};
