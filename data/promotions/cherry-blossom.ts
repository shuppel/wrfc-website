import { Promotion } from './index';
import { ZEFFY_LINKS } from '@/data/zeffy-links';

export const cherryBlossomPromotion: Promotion = {
  id: 'cherry-blossom-2025',
  title: 'Cherry Blossom Tournament 2025',
  description: 'Join us for the annual Cherry Blossom Rugby Tournament in Washington DC. Multiple divisions available for men\'s and women\'s teams.',
  imageUrl: '/assets/pictures/tournament_banner_watercolor.png',
  buttonText: 'Register Now',
  buttonUrl: ZEFFY_LINKS.cherryBlossom.registration,
  startDate: '2025-01-01T00:00:00Z',
  endDate: '2025-04-10T23:59:59Z',
  priority: 100,
  isActive: false,
  type: 'tournament',
  tags: ['rugby', 'tournament', 'cherry blossom', '2025'],
  ctaType: 'external',
  modalContent: {
    title: 'Cherry Blossom Tournament 2025',
    content: `
      <p>The Washington Rugby Football Club is proud to host the annual Cherry Blossom Tournament on April 12-13, 2025.</p>
      
      <h3>Divisions</h3>
      <ul>
        <li>Senior Men's 15s - $400</li>
        <li>Collegiate Men's 7s - $400</li>
        <li>Collegiate Women's 7s - $400</li>
        <li>High School Boy's 15s - $350</li>
        <li>High School Girl's 15s - $350</li>
        <li>Senior Women's 15s - $400</li>
        <li>Old Boy's 15s - $350</li>
      </ul>
      
      <p class="text-center font-bold">Location: Liberty Sports Park, 220 Prince George's Boulevard Upper Marlboro, MD 20774</p>
      
      <p>Register your team today to secure your spot in this premier rugby event!</p>
    `,
    imageUrl: '/assets/pictures/tournament_banner_watercolor.png'
  }
}; 