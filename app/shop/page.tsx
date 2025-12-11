'use client';

import { ShoppingBag, ArrowSquareOut } from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';

export default function ShopPage() {
  const oneilsStoreUrl = 'https://www.oneills.com/us_en/shop-by-team/rugby/rugby-union/washington-rfc.html';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <ShoppingBag className="w-12 h-12 text-wrfc-red" weight="fill" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            WRFC Team Store
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Shop official Washington Rugby Football Club gear and merchandise
          </p>
        </div>

        {/* Shop Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <div>
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                   O&apos;Neill&apos;s Team Store
                 </h2>
                 <p className="text-gray-600 dark:text-gray-300 mb-4">
                   Browse our complete selection of WRFC jerseys, merchandise, and gear from O&apos;Neill&apos;s, the world&apos;s leading rugby retailer.
                 </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">What You&apos;ll Find:</h3>
                <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-wrfc-red font-bold">•</span>
                    <span>Official WRFC Team Jerseys</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-wrfc-red font-bold">•</span>
                    <span>Training Gear & Apparel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-wrfc-red font-bold">•</span>
                    <span>Team Merchandise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-wrfc-red font-bold">•</span>
                    <span>Rugby Equipment & Accessories</span>
                  </li>
                </ul>
              </div>

              <a
                href={oneilsStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-wrfc-red to-red-700 hover:from-red-700 hover:to-wrfc-red text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
              >
                <span>Visit O&apos;Neill&apos;s Store</span>
                <ArrowSquareOut className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" weight="bold" />
              </a>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                You&apos;ll be redirected to O&apos;Neill&apos;s official WRFC team store
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
