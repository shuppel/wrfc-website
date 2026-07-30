import { Promotion } from './index';
import { ZEFFY_LINKS } from '@/data/zeffy-links';

/**
 * Cherry Blossom Tournament promotion.
 *
 * CBT 2026 (58th) is complete — Washington Rugby won the Men's Club Bracket.
 * This entry is now a dormant save-the-date for CBT 2027 (59th).
 *
 * To bring it back online when the committee opens registration:
 *   1. Set the real date/venue below and in /data/cherry-blossom-tournaments.ts
 *   2. Add the 2027 Zeffy form to /data/zeffy-links.ts
 *   3. Set `isActive: true` and update `startDate` / `endDate`
 */
export const cherryBlossomPromotion: Promotion = {
  id: 'cherry-blossom-2027',
  title: 'Cherry Blossom Tournament 2027',
  description: 'The 59th Annual Cherry Blossom Rugby Tournament returns in spring 2027. Date and venue to be announced.',
  imageUrl: '/assets/pictures/138A4076.jpg',
  buttonText: 'Tournament Details',
  buttonUrl: ZEFFY_LINKS.cherryBlossom.registration || '/tournaments/cherry-blossom',
  startDate: '2026-12-01T00:00:00Z',
  endDate: '2027-04-30T23:59:59Z',
  priority: 100,
  isActive: false,
  type: 'tournament',
  tags: ['rugby', 'tournament', 'cherry blossom', '2027'],
  ctaType: 'link',
  modalContent: {
    title: 'Cherry Blossom Tournament 2027',
    content: `
      <p class="text-lg mb-4">Washington Rugby Football Club has hosted the Cherry Blossom Tournament every spring since 1968. The 59th edition takes place in spring 2027.</p>

      <h3 class="text-xl font-bold mb-2 text-wrfc-red">What We Know So Far</h3>
      <p class="mb-4"><strong>Date:</strong> April 2027 (to be confirmed)</p>
      <p class="mb-4"><strong>Format:</strong> 15s — Men's &amp; Women's club, college and high school brackets</p>

      <p class="mb-4">Registration typically opens in December. Teams that played in 2026 will be emailed first.</p>

      <p class="mt-4">Questions or want on the notification list? Email <a href="mailto:cbt-chair@washingtonrugby.org" class="underline">cbt-chair@washingtonrugby.org</a>.</p>
    `,
    imageUrl: '/assets/pictures/138A4076.jpg'
  }
};
