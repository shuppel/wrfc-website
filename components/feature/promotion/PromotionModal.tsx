'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, X } from '@phosphor-icons/react';
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-nasalization text-wrfc-navy dark:text-white">
            {promotion.modalContent.title || promotion.title}
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        <div className="space-y-6">
          {promotion.modalContent.imageUrl && (
            <div className="relative h-56 w-full overflow-hidden rounded-lg">
              <Image
                src={promotion.modalContent.imageUrl}
                alt={promotion.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div 
            className="prose prose-blue max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: promotion.modalContent.content }}
          />

          <div className="flex justify-center space-x-4 pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
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
      </DialogContent>
    </Dialog>
  );
} 