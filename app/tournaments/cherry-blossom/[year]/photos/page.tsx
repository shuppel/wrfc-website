'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'components/ui/button';
import { ArrowLeft } from '@phosphor-icons/react';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

// This would eventually come from a database or CMS
const galleryImages: GalleryImage[] = [
  {
    src: '/assets/pictures/2025_irish_ruck.jpg',
    alt: 'Match Action',
    caption: 'Intense ruck during tournament play'
  },
  {
    src: '/assets/pictures/huddle_2025_irish.jpg',
    alt: 'Team Huddle',
    caption: 'Pre-match team huddle'
  },
  {
    src: '/assets/pictures/2025_irish_harry.jpg',
    alt: 'Player Action',
    caption: 'Player making a break'
  },
  // Add more images as needed
];

export default function TournamentPhotosPage({ params }: { params: { year: string } }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <Link 
              href={`/tournaments/cherry-blossom/${params.year}`}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-wrfc-navy dark:hover:text-blue-400"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Tournament
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-nasalization text-wrfc-navy dark:text-blue-400">
            Photo Gallery
          </h1>
          <p className="text-xl mb-12 text-gray-600 dark:text-gray-400">
            Cherry Blossom Tournament {params.year}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="group relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Download Section */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 font-nasalization text-wrfc-navy dark:text-blue-400">
            Download Photos
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            High-resolution photos are available for download. Please credit WRFC when using these images.
          </p>
          <Button className="bg-wrfc-red hover:bg-wrfc-red/90">
            Download Full Gallery
          </Button>
        </div>
      </div>
    </div>
  );
} 