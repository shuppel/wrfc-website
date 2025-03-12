'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Promotion } from '@/data/promotions';
import PromotionModal from './PromotionModal';

interface PromotionCarouselProps {
  promotions: Promotion[];
  autoplayInterval?: number; // in milliseconds
  showControls?: boolean;
  className?: string;
}

export default function PromotionCarousel({
  promotions,
  autoplayInterval = 5000,
  showControls = true,
  className = '',
}: PromotionCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);

  // Auto-advance the carousel
  useEffect(() => {
    if (autoplayInterval <= 0 || promotions.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promotions.length);
    }, autoplayInterval);
    
    return () => clearInterval(interval);
  }, [autoplayInterval, promotions.length]);

  // Skip rendering if no promotions
  if (promotions.length === 0) {
    return null;
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? promotions.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % promotions.length
    );
  };

  const handlePromotionClick = (promotion: Promotion) => {
    if (promotion.ctaType === 'modal') {
      setSelectedPromotion(promotion);
      setIsModalOpen(true);
    } else if (promotion.ctaType === 'external') {
      window.open(promotion.buttonUrl, '_blank');
    } else {
      // Default to link behavior
      window.location.href = promotion.buttonUrl;
    }
  };

  const currentPromotion = promotions[currentIndex];

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      {/* Carousel content */}
      <div className="relative h-[400px] w-full">
        <Image
          src={currentPromotion.imageUrl}
          alt={currentPromotion.title}
          fill
          className="object-cover brightness-75 transition-all duration-500"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-nasalization">
              {currentPromotion.title}
            </h2>
            <p className="text-lg mb-6">
              {currentPromotion.description}
            </p>
            <Button 
              className="bg-wrfc-red hover:bg-wrfc-red/90 text-white px-8 py-6 text-lg font-bold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => handlePromotionClick(currentPromotion)}
            >
              <span className="flex items-center">
                {currentPromotion.buttonText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Carousel controls */}
      {showControls && promotions.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
            onClick={handlePrevious}
            aria-label="Previous promotion"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
            onClick={handleNext}
            aria-label="Next promotion"
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
      )}
      
      {/* Carousel indicators */}
      {promotions.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {promotions.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to promotion ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Modal for promotions with modal content */}
      {selectedPromotion && (
        <PromotionModal
          promotion={selectedPromotion}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
} 