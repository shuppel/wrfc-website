'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Message id Zeffy's embed forms use to talk to the host page.
const ZEFFY_MESSAGE_ID = 'zeffy-iframe';

const isZeffyOrigin = (origin: string): boolean => {
  try {
    const { hostname } = new URL(origin);
    return ['zeffy.com', 'simplyk.io'].some(domain => hostname === domain || hostname.endsWith(`.${domain}`));
  } catch {
    return false;
  }
};

interface ZeffyFormModalProps {
  /** Zeffy embed URL, e.g. https://www.zeffy.com/embed/ticketing/<slug>?modal=true */
  formUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Opens a Zeffy embed form in an on-page modal.
 *
 * Zeffy's embed-form-script only wires up `zeffy-form-link` elements that
 * exist at DOMContentLoaded, so buttons rendered later (popups, client-side
 * navigations) do nothing. This component does the same job for any button:
 * same overlay, same iframe, same open/close postMessage protocol.
 */
export default function ZeffyFormModal({ formUrl, isOpen, onClose }: ZeffyFormModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const handleMessage = (event: MessageEvent) => {
      if (!isZeffyOrigin(event.origin)) return;
      if (event.data?.id === ZEFFY_MESSAGE_ID && event.data?.close) onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('message', handleMessage);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('message', handleMessage);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleLoad = () => {
    // Same payload and target Zeffy's own embed script sends on open.
    iframeRef.current?.contentWindow?.postMessage({ id: ZEFFY_MESSAGE_ID, open: true }, '*');
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000]" role="dialog" aria-modal="true" aria-label="Zeffy form">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className="absolute inset-0 md:inset-y-[5%] md:inset-x-[10%]">
        <iframe
          ref={iframeRef}
          src={formUrl}
          title="Form powered and secured by Zeffy"
          allow="payment"
          onLoad={handleLoad}
          className="w-full h-full border-0 md:rounded"
        />
      </div>
    </div>,
    document.body
  );
}
