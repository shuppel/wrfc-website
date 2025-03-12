'use client';

import { useEffect, useState } from 'react';
import PromotionCarousel from './PromotionCarousel';
import { getActivePromotions, Promotion } from '@/data/promotions';

export default function HomePromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  
  useEffect(() => {
    // Get active promotions on the client side
    const activePromotions = getActivePromotions();
    setPromotions(activePromotions);
  }, []);

  if (promotions.length === 0) {
    return null;
  }

  return (
    <section className="w-full my-8">
      <PromotionCarousel 
        promotions={promotions} 
        autoplayInterval={7000}
        className="max-w-6xl mx-auto"
      />
    </section>
  );
} 