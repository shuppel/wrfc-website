'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, X, CalendarBlank, MapPin, Trophy } from '@phosphor-icons/react';
import Image from 'next/image';
import { getActivePromotions, Promotion } from '@/data/promotions';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [promotion, setPromotion] = useState<Promotion | null>(null);

  useEffect(() => {
    // Get the highest priority active promotion regardless of whether we show it
    const activePromotions = getActivePromotions();
    if (activePromotions.length > 0) {
      setPromotion(activePromotions[0]);
    }

    // Check if we've shown the modal recently (in the last 24 hours)
    const lastShown = localStorage.getItem('welcomeModalLastShown');
    const now = new Date().getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000;
    
    if (!lastShown || (now - parseInt(lastShown)) > oneDayInMs) {
      if (activePromotions.length > 0) {
        // Small delay to ensure the modal appears after page load
        const timer = setTimeout(() => {
          setIsOpen(true);
          // Store the current time in localStorage
          localStorage.setItem('welcomeModalLastShown', now.toString());
        }, 1500);
        
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCTA = () => {
    if (!promotion) return;
    
    if (promotion.ctaType === 'external') {
      window.open(promotion.buttonUrl, '_blank');
    } else {
      window.location.href = promotion.buttonUrl;
    }
    setIsOpen(false);
  };

  if (!promotion) return null;

  // Check if this is a Cherry Blossom promotion for special styling
  const isCherryBlossom = promotion.id.includes('cherry-blossom');

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md md:max-w-lg p-0 overflow-hidden border-0 shadow-2xl bg-transparent">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-3 top-3 z-20 rounded-full bg-white/90 dark:bg-gray-900/90 p-2 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg backdrop-blur-sm"
              aria-label="Close"
            >
              <X className="h-4 w-4" weight="bold" />
            </button>
            
            {/* Hero Image Section */}
            <div className="relative h-48 md:h-56 w-full overflow-hidden">
              <Image
                src={promotion.imageUrl}
                alt={promotion.title}
                fill
                className="object-cover scale-105 hover:scale-110 transition-transform duration-700"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-gray-900 dark:via-gray-900/20" />
              
              {/* Floating badge */}
              {isCherryBlossom && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500/90 text-white text-xs font-semibold backdrop-blur-sm shadow-lg">
                    <Trophy className="w-3.5 h-3.5" weight="fill" />
                    Early Bird Open
                  </span>
                </div>
              )}
            </div>
            
            {/* Content Section */}
            <div className="relative bg-white dark:bg-gray-900 px-6 pb-6 pt-2 -mt-6 rounded-t-3xl">
              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold mb-3 font-heading text-gray-900 dark:text-white leading-tight">
                {promotion.title}
              </h2>
              
              {/* Quick Info Pills */}
              {isCherryBlossom && (
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm">
                    <CalendarBlank className="w-4 h-4 text-pink-500" weight="duotone" />
                    April 11, 2026
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm">
                    <MapPin className="w-4 h-4 text-pink-500" weight="duotone" />
                    Aldie, VA 20105
                  </span>
                </div>
              )}
              
              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-5">
                {promotion.description}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300"
                  onClick={handleCTA}
                >
                  <span className="flex items-center justify-center gap-2">
                    {promotion.buttonText}
                    <ArrowRight className="w-4 h-4" weight="bold" />
                  </span>
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium"
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 