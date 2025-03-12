import { cherryBlossomPromotion } from './cherry-blossom';

export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonUrl: string;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  priority: number;  // Higher number = higher priority
  isActive: boolean;
  type: 'event' | 'tournament' | 'announcement' | 'other';
  tags?: string[];
  ctaType?: 'link' | 'modal' | 'external';
  modalContent?: {
    title: string;
    content: string;
    imageUrl?: string;
  };
}

// Export all promotions as an array
export const promotions: Promotion[] = [
  cherryBlossomPromotion,
  // Add more promotions here as they are created
];

// Helper function to get active promotions
export const getActivePromotions = (): Promotion[] => {
  const now = new Date();
  return promotions
    .filter(promo => 
      promo.isActive && 
      new Date(promo.startDate) <= now && 
      new Date(promo.endDate) >= now
    )
    .sort((a, b) => b.priority - a.priority);
}; 