import { Promotion } from './index';
import { ZEFFY_LINKS } from '@/data/zeffy-links';

export const cherryBlossomPromotion: Promotion = {
  id: 'cherry-blossom-2026',
  title: 'Cherry Blossom Tournament 2026',
  description: 'Join us for the 2026 Cherry Blossom Rugby Tournament in Washington DC. Register your team now for this premier East Coast rugby event!',
  imageUrl: '/assets/pictures/tournament_banner_watercolor.png',
  buttonText: 'Register Your Team',
  buttonUrl: ZEFFY_LINKS.cherryBlossom2026.registration,
  startDate: '2025-12-01T00:00:00Z',
  endDate: '2026-04-10T23:59:59Z',
  priority: 100,
  isActive: true,
  type: 'tournament',
  tags: ['rugby', 'tournament', 'cherry blossom', '2026', 'DC'],
  ctaType: 'external',
  modalContent: {
    title: 'Cherry Blossom Tournament 2026',
    content: `
      <p class="text-lg mb-4">The Washington Rugby Football Club is proud to host the annual Cherry Blossom Tournament - one of the premier rugby events on the East Coast!</p>
      
      <h3 class="text-xl font-bold mb-2 text-wrfc-red">Tournament Details</h3>
      <p class="mb-4"><strong>Date:</strong> April 11-12, 2026</p>
      <p class="mb-4"><strong>Location:</strong> Liberty Sports Park, 220 Prince George's Boulevard, Upper Marlboro, MD 20774</p>
      
      <h3 class="text-xl font-bold mb-2 text-wrfc-red">Divisions & Entry Fees</h3>
      <ul class="list-disc pl-5 mb-4 space-y-1">
        <li>Senior Men's 15s - $400</li>
        <li>Senior Women's 15s - $400</li>
        <li>Collegiate Men's 7s - $400</li>
        <li>Collegiate Women's 7s - $400</li>
        <li>High School Boy's 15s - $350</li>
        <li>High School Girl's 15s - $350</li>
        <li>Old Boy's 15s - $350</li>
      </ul>
      
      <p class="text-center font-bold text-lg bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">Early Bird Registration Now Open!</p>
      
      <p class="mt-4">Don't miss your chance to compete in DC's premier spring rugby tournament. Register your team today!</p>
    `,
    imageUrl: '/assets/pictures/tournament_banner_watercolor.png'
  }
}; 