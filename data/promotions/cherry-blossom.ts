import { Promotion } from './index';
import { ZEFFY_LINKS } from '@/data/zeffy-links';

export const cherryBlossomPromotion: Promotion = {
  id: 'cherry-blossom-2026',
  title: 'Cherry Blossom Tournament 2026',
  description: 'We\'re back in DC! The 58th Annual Cherry Blossom Rugby Tournament returns to The Fields at RFK on April 11, 2026.',
  imageUrl: '/assets/pictures/138A4076.jpg',
  buttonText: 'Register Your Team',
  buttonUrl: ZEFFY_LINKS.cherryBlossom.registration,
  startDate: '2025-12-01T00:00:00Z',
  endDate: '2026-04-11T23:59:59Z',
  priority: 100,
  isActive: true,
  type: 'tournament',
  tags: ['rugby', 'tournament', 'cherry blossom', '2026', 'DC', 'RFK', 'washington dc'],
  ctaType: 'external',
  modalContent: {
    title: 'Cherry Blossom Tournament 2026',
    content: `
      <p class="text-lg mb-4"><strong>We're back in DC!</strong> The Washington Rugby Football Club is proud to host the 58th Annual Cherry Blossom Tournament - returning to the heart of the nation's capital!</p>
      
      <h3 class="text-xl font-bold mb-2 text-wrfc-red">Tournament Details</h3>
      <p class="mb-4"><strong>Date:</strong> April 11, 2026</p>
      <p class="mb-4"><strong>Location:</strong> The Fields at RFK, Washington DC</p>
      
      <h3 class="text-xl font-bold mb-2 text-wrfc-red">15s Only - Men's & Women's</h3>
      <ul class="list-disc pl-5 mb-4 space-y-1">
        <li>Club 15s - $485 (Early Bird) / $500</li>
        <li>College 15s - $450 (Early Bird) / $475</li>
        <li>High School 15s - $485</li>
        <li>Two Teams Bundle - $650</li>
      </ul>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Early bird pricing ends January 4th!</p>
      
      <p class="text-center font-bold text-lg bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">Registration Now Open!</p>
      
      <p class="mt-4">Don't miss your chance to compete in DC's premier spring rugby tournament. Register your team today!</p>
    `,
    imageUrl: '/assets/pictures/138A4076.jpg'
  }
}; 