'use client';

import { useState, useEffect } from 'react';
import { X, ChevronRight, Newspaper } from 'lucide-react';
import Image from 'next/image';

interface ArticleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ArticleDrawer({ isOpen, onClose }: ArticleDrawerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Drawer Trigger Button - Always visible */}
      <div className={`fixed right-0 top-1/2 -translate-y-1/2 transform transition-all duration-300 ${
        isOpen ? 'translate-x-full' : ''
      }`}>
        {/* Vertical Tab */}
        <button
          className="bg-wrfc-red text-white shadow-lg transition-all duration-300
            flex items-center gap-2 py-3 px-3
            rounded-l-lg hover:bg-wrfc-red/90 group"
          onClick={() => !isOpen && onClose()}
          aria-label="Open Article"
        >
          {/* News Icon */}
          <Newspaper className="w-5 h-5" />

          {/* Arrow */}
          <ChevronRight 
            className="w-5 h-5 text-white 
              animate-pulse group-hover:animate-bounce"
          />
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-[600px] bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold font-nasalization">Featured in The Telegraph</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            aria-label="Close drawer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto h-[calc(100vh-80px)]">
          <div className="prose dark:prose-invert max-w-none">
            {/* Featured Image */}
            <div className="relative h-[300px] w-full mb-6 rounded-lg overflow-hidden">
              <Image
                src="/assets/pictures/gareth_wrfc_2024.png"
                alt="Rugby match at Wallenberg Field with Washington Monument in background"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-6">
              {/* Main Headline */}
              <div>
                <h1 className="text-3xl font-bold mb-2 font-nasalization text-wrfc-red">
                  Washington Rugby FC: The Most Famous American Club in the UK!
                </h1>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Featured in The Telegraph's special report on American rugby
                </p>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Newspaper className="w-4 h-4" />
                <span>The Telegraph | December 18, 2024</span>
              </div>

              <div className="space-y-4">
                <p className="text-lg">
                  In a compelling feature by The Telegraph, Washington Rugby Football Club stands out 
                  as a shining example of how the amateur spirit of rugby is thriving in America, 
                  even as traditional club rugby faces challenges in England.
                </p>

                <blockquote className="border-l-4 border-wrfc-red pl-4 italic">
                  "It has been the most enjoyable three months of rugby I can remember playing. 
                  Americans understand the ethos of rugby that many in England have forgotten."
                </blockquote>

                <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-3">Article Highlights:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>WRFC's strong community and social culture</li>
                    <li>High-quality coaching from professional staff</li>
                    <li>The unique experience of playing at Wallenberg Field</li>
                    <li>Growing legacy in American rugby</li>
                  </ul>
                </div>

                <div className="bg-wrfc-red/10 p-6 rounded-lg">
                  <p className="font-bold mb-2">Read the full story:</p>
                  <a
                    href="https://www.telegraph.co.uk/rugby-union/2024/12/18/club-rugby-declining-england-amateur-ethos-america/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-wrfc-red hover:text-wrfc-red/80 font-semibold inline-flex items-center"
                  >
                    View on The Telegraph
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  Note: Access to the full article may require a Telegraph subscription.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 