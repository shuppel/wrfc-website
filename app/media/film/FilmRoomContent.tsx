'use client';

import { useState } from 'react';
import { Play, CaretDown, Calendar, Eye } from '@phosphor-icons/react';
import YouTube, { YouTubeProps } from 'react-youtube';
import Image from 'next/image';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import JsonLd from '@/components/JsonLd';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Define JsonLdObject type
type JsonLdValue = string | number | boolean | null | JsonLdObject | JsonLdValue[];
interface JsonLdObject {
  '@context'?: string;
  '@type'?: string;
  [key: string]: JsonLdValue | undefined;
}

interface FilmRoomContentProps {
  structuredData: JsonLdObject;
}

// YouTube video data with categories
const videoData = [
  {
    id: 'lvy4b81NYFw',
    title: 'WRFC vs Potomac - Full Match Highlights',
    category: 'Match Highlights',
    date: '2025-01-15',
    views: '1.2K'
  },
  {
    id: '815_hQyjoBY',
    title: 'Try of the Season - Player Feature',
    category: 'Player Features',
    date: '2025-01-10',
    views: '856'
  },
  {
    id: 'Cw3scdQIYg4',
    title: 'Training Session - Scrum Techniques',
    category: 'Training',
    date: '2025-01-05',
    views: '623'
  },
  {
    id: 'YTJ1jS2s6NI',
    title: 'Cherry Blossom Tournament 2024 Recap',
    category: 'Tournaments',
    date: '2024-12-20',
    views: '2.1K'
  },
  {
    id: '5w6kA-UJEQY',
    title: 'WRFC vs Baltimore - Match Highlights',
    category: 'Match Highlights',
    date: '2024-12-15',
    views: '945'
  },
  {
    id: 'XSu7IhJvU3E',
    title: 'Player Interview - Team Captain',
    category: 'Interviews',
    date: '2024-12-10',
    views: '534'
  },
  {
    id: 'tTwvUYXgRbc',
    title: 'Season Review 2024',
    category: 'Season Reviews',
    date: '2024-12-01',
    views: '1.8K'
  },
  {
    id: 'LGg2lXNpBN4',
    title: 'Training Drills - Lineout Practice',
    category: 'Training',
    date: '2024-11-25',
    views: '412'
  }
];

const CATEGORIES = ['All', 'Match Highlights', 'Training', 'Player Features', 'Interviews', 'Tournaments', 'Season Reviews'];
const VIDEOS_PER_PAGE = 6;

export default function FilmRoomContent({ structuredData }: FilmRoomContentProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleVideos, setVisibleVideos] = useState(VIDEOS_PER_PAGE);
  const [selectedVideo, setSelectedVideo] = useState(videoData[0]);

  // Filter videos by category
  const filteredVideos = selectedCategory === 'All' 
    ? videoData 
    : videoData.filter(video => video.category === selectedCategory);

  // YouTube player options
  const opts: YouTubeProps['opts'] = {
    width: '100%',
    height: '100%',
    playerVars: {
      modestbranding: 1,
      rel: 0,
      autoplay: 0,
    },
  };

  const loadMoreVideos = () => {
    setVisibleVideos(prev => Math.min(prev + VIDEOS_PER_PAGE, filteredVideos.length));
  };

  const hasMoreVideos = visibleVideos < filteredVideos.length;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Media', item: '/media' },
          { name: 'Film Room', item: '/media/film' }
        ]} 
      />
      <JsonLd type="WebPage" data={structuredData} />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">WRFC Film Room</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Watch match highlights, training sessions, and exclusive interviews from Washington Rugby Football Club
          </p>
        </div>

        {/* Featured Video Player */}
        <div className="max-w-5xl mx-auto mb-12">
          <Card className="overflow-hidden">
            <div className="aspect-video bg-gray-900">
              <YouTube
                videoId={selectedVideo.id}
                opts={opts}
                className="w-full h-full"
                iframeClassName="w-full h-full"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Badge text={selectedVideo.category} variant="outline" />
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedVideo.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {selectedVideo.views} views
                  </span>
                </div>
              </div>
              <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(category);
                setVisibleVideos(VIDEOS_PER_PAGE);
              }}
              className={selectedCategory === category ? "bg-wrfc-red hover:bg-red-700" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredVideos.slice(0, visibleVideos).map((video) => (
            <Card 
              key={video.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 group">
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="w-16 h-16 text-white" />
                </div>
                <div className="absolute top-2 left-2">
                  <Badge text={video.category} variant="glow" className="text-xs" />
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold line-clamp-2 mb-2">{video.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(video.date).toLocaleDateString()}</span>
                  <span>{video.views} views</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreVideos && (
          <div className="text-center mb-12">
            <Button
              onClick={loadMoreVideos}
              variant="outline"
              size="lg"
              className="group"
            >
              <CaretDown className="w-5 h-5 mr-2 group-hover:translate-y-1 transition-transform" />
              Load More Videos
            </Button>
          </div>
        )}

        {/* YouTube Channel CTA */}
        <div className="text-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">Subscribe for More Content</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Don&apos;t miss any of our latest match highlights and exclusive content
          </p>
          <a 
            href="https://www.youtube.com/@washingtonrugby7666"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Subscribe on YouTube
          </a>
        </div>
      </div>
    </div>
  );
}