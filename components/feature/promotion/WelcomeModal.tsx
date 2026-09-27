'use client';

import { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, X, CalendarBlank, MapPin, Trophy, Ticket } from '@phosphor-icons/react';
import Image from 'next/image';
import { getActivePopupPromotion, Promotion } from '@/data/promotions';
import { getCurrentTournament } from '@/data/cherry-blossom-tournaments';
import ZeffyFormModal from '@/components/feature/payment/ZeffyFormModal';

// Show each promotion at most once per day per visitor.
const SHOW_INTERVAL_MS = 24 * 60 * 60 * 1000;
const storageKey = (promotionId: string) => `promoPopupLastShown:${promotionId}`;

function readLastShown(promotionId: string): number | null {
  try {
    const value = localStorage.getItem(storageKey(promotionId));
    return value ? parseInt(value, 10) : null;
  } catch {
    return null;
  }
}

function writeLastShown(promotionId: string, time: number) {
  try {
    localStorage.setItem(storageKey(promotionId), time.toString());
  } catch {
    // Storage unavailable (private mode, blocked cookies) — popup just shows again next visit.
  }
}

/**
 * Site-wide promotion popup. Picks the highest-priority promotion with
 * `showPopup: true` whose start/end window contains the current time (checked
 * in the browser), so it stops appearing on its own once `endDate` passes.
 */
export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isZeffyOpen, setIsZeffyOpen] = useState(false);
  const [promotion, setPromotion] = useState<Promotion | null>(null);

  useEffect(() => {
    const activePromotion = getActivePopupPromotion();
    if (!activePromotion) return;
    setPromotion(activePromotion);

    const lastShown = readLastShown(activePromotion.id);
    const now = Date.now();
    if (lastShown && now - lastShown < SHOW_INTERVAL_MS) return;

    // Small delay so the popup appears after the page has settled
    const timer = setTimeout(() => {
      setIsOpen(true);
      writeLastShown(activePromotion.id, now);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleZeffyClose = useCallback(() => setIsZeffyOpen(false), []);

  const handleCTA = () => {
    if (!promotion) return;

    setIsOpen(false);
    if (promotion.zeffyFormUrl) {
      setIsZeffyOpen(true);
    } else if (promotion.ctaType === 'external') {
      window.open(promotion.buttonUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = promotion.buttonUrl;
    }
  };

  if (!promotion) return null;

  // Cherry Blossom keeps its pink styling and live tournament details
  const isCherryBlossom = promotion.id.includes('cherry-blossom');
  const tournament = isCherryBlossom ? getCurrentTournament() : null;

  const badge = tournament
    ? (tournament.registrationOpen ? 'Registration Open' : 'Save the Date')
    : promotion.badge;
  const details = tournament
    ? {
        date: `${tournament.date}${tournament.datePending ? ' (TBC)' : ''}`,
        location: tournament.location.address,
      }
    : promotion.eventDetails;

  const BadgeIcon = isCherryBlossom ? Trophy : Ticket;
  const accentText = isCherryBlossom ? 'text-pink-500' : 'text-wrfc-red';
  const badgeClass = isCherryBlossom ? 'bg-pink-500/90' : 'bg-wrfc-red/90';
  const ctaClass = isCherryBlossom
    ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-pink-500/25 hover:shadow-pink-500/40'
    : 'bg-gradient-to-r from-wrfc-red to-red-700 hover:from-red-700 hover:to-red-800 shadow-red-500/25 hover:shadow-red-500/40';

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
                sizes="(min-width: 768px) 512px, 100vw"
                className="object-cover scale-105 hover:scale-110 transition-transform duration-700"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-gray-900 dark:via-gray-900/20" />

              {/* Floating badge */}
              {badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${badgeClass} text-white text-xs font-semibold backdrop-blur-sm shadow-lg`}>
                    <BadgeIcon className="w-3.5 h-3.5" weight="fill" />
                    {badge}
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
              {details && (
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm">
                    <CalendarBlank className={`w-4 h-4 ${accentText}`} weight="duotone" />
                    {details.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm">
                    <MapPin className={`w-4 h-4 ${accentText}`} weight="duotone" />
                    {details.location}
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
                  className={`flex-1 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 ${ctaClass}`}
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

      {promotion.zeffyFormUrl && (
        <ZeffyFormModal
          formUrl={promotion.zeffyFormUrl}
          isOpen={isZeffyOpen}
          onClose={handleZeffyClose}
        />
      )}
    </>
  );
}
