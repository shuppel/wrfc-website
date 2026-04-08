'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, X, CalendarBlank, MapPin } from '@phosphor-icons/react';
import Image from 'next/image';
import { Promotion } from '@/data/promotions';

interface PromotionModalProps {
  promotion: Promotion;
  isOpen: boolean;
  onClose: () => void;
}

export default function PromotionModal({ promotion, isOpen, onClose }: PromotionModalProps) {
  if (!promotion.modalContent) {
    return null;
  }

  const handleCTA = () => {
    if (promotion.ctaType === 'external') {
      window.open(promotion.buttonUrl, '_blank');
    } else {
      window.location.href = promotion.buttonUrl;
    }
    onClose();
  };

  // Check if this is a Cherry Blossom promotion for special styling
  const isCherryBlossom = promotion.id.includes('cherry-blossom');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg p-0 overflow-hidden border-0 shadow-2xl bg-transparent">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-20 rounded-full bg-white/90 dark:bg-gray-900/90 p-2 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg backdrop-blur-sm"
            aria-label="Close"
          >
            <X className="h-4 w-4" weight="bold" />
          </button>
          
          {/* Hero Image Section */}
          {promotion.modalContent.imageUrl && (
            <div className="relative h-40 md:h-48 w-full overflow-hidden">
              <Image
                src={promotion.modalContent.imageUrl}
                alt={promotion.title}
                fill
                className="object-cover"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-gray-900 dark:via-gray-900/20" />
            </div>
          )}
          
          {/* Content Section */}
          <div className={`relative bg-white dark:bg-gray-900 px-6 pb-6 pt-4 ${promotion.modalContent.imageUrl ? '-mt-4 rounded-t-3xl' : 'pt-6'}`}>
            {/* Title */}
            <h2 className="text-xl md:text-2xl font-bold mb-3 font-heading text-gray-900 dark:text-white leading-tight">
              {promotion.modalContent.title || promotion.title}
            </h2>
            
            {/* Quick Info Pills - only for Cherry Blossom */}
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
            
            {/* Description - simplified, no raw HTML */}
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-5">
              {promotion.description}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                className={`flex-1 font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 ${
                  isCherryBlossom 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-pink-500/25 hover:shadow-pink-500/40'
                    : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/25 hover:shadow-orange-500/40'
                }`}
                onClick={handleCTA}
              >
                <span className="flex items-center justify-center gap-2">
                  {promotion.buttonText}
                  <ArrowRight className="w-4 h-4" weight="bold" />
                </span>
              </Button>
              <Button 
                variant="ghost" 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 