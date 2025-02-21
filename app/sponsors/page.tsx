'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trophy, Heart, Users, Building } from 'lucide-react';

export default function Sponsors() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="hero-title mb-6">Our Sponsors</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We're proud to partner with organizations that share our passion for rugby and community. 
          Our sponsors help make it possible for WRFC to continue its legacy of excellence.
        </p>
      </div>

      {/* Sponsorship Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <Trophy className="w-12 h-12 text-wrfc-red mb-4" />
          <h3 className="text-2xl font-bold mb-4">Premier Sponsors</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our highest level of partnership, supporting WRFC's major initiatives and development programs.
          </p>
          {/* Add Premier Sponsors here */}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <Building className="w-12 h-12 text-wrfc-navy mb-4" />
          <h3 className="text-2xl font-bold mb-4">Club Sponsors</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Key partners who contribute to our club's operations and community outreach.
          </p>
          {/* Add Club Sponsors here */}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <Heart className="w-12 h-12 text-wrfc-teal mb-4" />
          <h3 className="text-2xl font-bold mb-4">Supporting Partners</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Local businesses and organizations that help sustain our rugby community.
          </p>
          {/* Add Supporting Partners here */}
        </div>
      </div>

      {/* Become a Sponsor Section */}
      <div className="bg-gradient-to-r from-wrfc-navy to-wrfc-navy/90 text-white rounded-xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Become a Sponsor</h2>
          <p className="text-xl mb-8">
            Join us in supporting one of DC's oldest and most successful rugby clubs. 
            Partner with WRFC and connect with our passionate community.
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-wrfc-red px-8 py-3 rounded-md font-bold hover:bg-wrfc-red/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Contact Us About Sponsorship
          </Link>
        </div>
      </div>

      {/* Current Sponsors Grid */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Current Sponsors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Add sponsor logos here */}
          <div className="aspect-video relative bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center">
            <p className="text-gray-400 text-center">Sponsor Logo</p>
          </div>
          {/* Repeat for other sponsors */}
        </div>
      </div>
    </div>
  );
} 