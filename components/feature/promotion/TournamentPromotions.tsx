'use client';

import { useEffect, useState } from 'react';
import PromotionCarousel from './PromotionCarousel';
import { getActivePromotions, Promotion } from '@/data/promotions';

export default function TournamentPromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  
  useEffect(() => {
    // Get active promotions and filter for tournament type
    const activePromotions = getActivePromotions().filter(
      promo => promo.type === 'tournament'
    );
    setPromotions(activePromotions);
  }, []);

  if (promotions.length === 0) {
    return null;
  }

  return (
    <section className="w-full my-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 font-nasalization text-wrfc-navy dark:text-white">
          Upcoming Tournaments
        </h2>
        <PromotionCarousel 
          promotions={promotions} 
          autoplayInterval={8000}
        />
      </div>
    </section>
  );
} 