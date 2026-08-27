'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Check,
  FacebookLogo,
  LinkedinLogo,
  Link as LinkIcon,
  ShareNetwork,
  XLogo,
} from '@phosphor-icons/react';

import { cn } from '@/lib/utils';

interface ShareProfileProps {
  /** Absolute URL of the profile being shared. */
  url: string;
  title: string;
  text: string;
  className?: string;
}

/**
 * Share controls for a player profile.
 *
 * The native share sheet is the primary action where the browser has one —
 * that is the whole game on mobile, which is where a player actually shares
 * their own profile. Everything else degrades to copy-link plus the three
 * network intents, all of which work with JavaScript doing nothing clever.
 */
export function ShareProfile({ url, title, text, className }: ShareProfileProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  // Feature detection runs after mount so the server and first client render
  // agree; otherwise this hydrates mismatched.
  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && Boolean(navigator.share));
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard is blocked in some embedded webviews. Select the URL
      // instead so the reader can copy it by hand.
      window.prompt('Copy this link', url);
    }
  }, [url]);

  const nativeShare = useCallback(async () => {
    try {
      await navigator.share({ title, text, url });
    } catch {
      // The user dismissed the sheet, or the browser refused. Neither is an
      // error worth surfacing.
    }
  }, [title, text, url]);

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const networks = [
    {
      id: 'x',
      label: 'Share on X',
      Icon: XLogo,
      href: `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      id: 'facebook',
      label: 'Share on Facebook',
      Icon: FacebookLogo,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      id: 'linkedin',
      label: 'Share on LinkedIn',
      Icon: LinkedinLogo,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  const buttonStyles =
    'inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:border-wrfc-red hover:text-wrfc-red dark:border-white/15 dark:text-gray-300 dark:hover:border-wrfc-red';

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <span className="mr-1 font-accent text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Share
      </span>

      {canNativeShare && (
        <button
          type="button"
          onClick={nativeShare}
          aria-label="Share this profile"
          className={cn(buttonStyles, 'border-wrfc-red bg-wrfc-red text-white hover:text-white')}
        >
          <ShareNetwork weight="fill" className="h-4 w-4" />
        </button>
      )}

      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? 'Link copied' : 'Copy link to this profile'}
        className={cn(buttonStyles, copied && 'border-emerald-500 text-emerald-600')}
      >
        {copied ? <Check weight="bold" className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
      </button>

      {networks.map(({ id, label, Icon, href }) => (
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={buttonStyles}
        >
          <Icon weight="fill" className="h-4 w-4" />
        </a>
      ))}

      <span aria-live="polite" className="sr-only">
        {copied ? 'Profile link copied to clipboard' : ''}
      </span>
    </div>
  );
}

export default ShareProfile;
