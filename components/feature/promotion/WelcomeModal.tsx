'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, X } from 'lucide-react';
import Image from 'next/image';
import { getActivePromotions, Promotion } from '@/data/promotions';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const isDev = process.env.NODE_ENV === 'development';

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
        }, 1000);
        
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

  // Debug function to force show the modal
  const forceShowModal = () => {
    if (promotion) {
      setIsOpen(true);
    }
  };

  if (!promotion) return null;

  return (
    <>
      {/* Debug button - only visible in development */}
      {isDev && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button 
            onClick={forceShowModal}
            className="bg-gray-800 text-white text-xs"
            size="sm"
          >
            Debug: Show Promo
          </Button>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
          <div className="relative">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-2 text-white hover:bg-black/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
            
            <div className="relative h-64 w-full">
              <Image
                src="/assets/art/tournament_banner_watercolor.png"
                alt={promotion.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-900">
              <h2 className="text-3xl font-bold mb-3 font-nasalization text-wrfc-navy dark:text-white">
                {promotion.title}
              </h2>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {promotion.description}
              </p>
              
              {promotion.modalContent && (
                <div 
                  className="prose prose-blue max-w-none dark:prose-invert mb-6"
                  dangerouslySetInnerHTML={{ __html: promotion.modalContent.content }}
                />
              )}
              
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={handleClose}>
                  Maybe Later
                </Button>
                <Button 
                  className="bg-wrfc-red hover:bg-wrfc-red/90 text-white"
                  onClick={handleCTA}
                >
                  <span className="flex items-center">
                    {promotion.buttonText}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 