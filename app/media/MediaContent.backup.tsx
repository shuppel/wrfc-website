'use client';

import { useState } from 'react';
import { YoutubeLogo, InstagramLogo, CaretDown } from '@phosphor-icons/react';
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import JsonLd from '@/components/JsonLd';

// Define JsonLdObject type to match the one in JsonLd component
type JsonLdValue = string | number | boolean | null | JsonLdObject | JsonLdValue[];
interface JsonLdObject {
  '@context'?: string;
  '@type'?: string;
  [key: string]: JsonLdValue | undefined;
}

// YouTube video IDs from WRFC channel
const initialVideoIds = [
  'lvy4b81NYFw', '815_hQyjoBY', // Latest additions
  'Cw3scdQIYg4', 'YTJ1jS2s6NI', '5w6kA-UJEQY', 'XSu7IhJvU3E', 'tTwvUYXgRbc',
  'LGg2lXNpBN4', '9kl7ksXXtG0', 'AfsYqJrOwEs', 'ET8Cfyq9CFI', '9B6AF4pHt7w',
  'Xf9RWlbqjHU', '2jdRB2Q3Hp4', 'yvKZErCF6j8', 'A8XPIchxcwM', 'o2VcfKcanf0',
  'xeArRHG2BC0', 'r88Klf9do0w', 'r0ff7O7p5ag', 'A8VqgKPvxEk'
];

interface VideoMetadata {
  id: string;
  title: string;
  author: string;
}

interface MediaContentProps {
  structuredData: JsonLdObject;
}

const VIDEOS_PER_PAGE = 4;

export default function MediaContent({ structuredData }: MediaContentProps) {
  const [activeTab, setActiveTab] = useState('videos');
  const [videoMetadata, setVideoMetadata] = useState<VideoMetadata[]>([]);
  const [visibleVideos, setVisibleVideos] = useState(VIDEOS_PER_PAGE);
  
  // YouTube player options
  const opts: YouTubeProps['opts'] = {
    width: '100%',
    height: '100%',
    playerVars: {
      modestbranding: 1,
      rel: 0,
    },
  };

  const onReady = (event: YouTubeEvent, videoId: string) => {
    const player = event.target;
    const data = player.getVideoData();
    
    const videoData: VideoMetadata = {
      id: videoId,
      title: data.title || 'WRFC Match Video',
      author: data.author || 'Washington Rugby'
    };

    setVideoMetadata(prev => {
      // Check if we already have this video's metadata
      if (prev.some(v => v.id === videoId)) {
        return prev;
      }
      
      // Add new metadata
      return [...prev, videoData];
    });
  };

  const loadMoreVideos = () => {
    setVisibleVideos(prev => Math.min(prev + VIDEOS_PER_PAGE, initialVideoIds.length));
  };

  const hasMoreVideos = visibleVideos < initialVideoIds.length;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Media', item: '/media' }
        ]} 
      />
      <JsonLd type="WebPage" data={structuredData} />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">WRFC Media</h1>
        
        {/* Tab Navigation */}
        <div className="flex justify-center gap-8 mb-12">
          <button 
            className={`pb-2 border-b-4 transition-colors flex items-center gap-2 ${
              activeTab === 'videos'
                ? 'text-wrfc-red border-wrfc-red'
                : 'text-gray-400 border-transparent hover:text-wrfc-red hover:border-wrfc-red'
            }`}
            onClick={() => setActiveTab('videos')}
          >
            <YoutubeLogo className="w-5 h-5" />
            Match Videos
          </button>
          <button 
            className={`pb-2 border-b-4 transition-colors flex items-center gap-2 ${
              activeTab === 'instagram'
                ? 'text-wrfc-red border-wrfc-red'
                : 'text-gray-400 border-transparent hover:text-wrfc-red hover:border-wrfc-red'
            }`}
            onClick={() => setActiveTab('instagram')}
          >
            <InstagramLogo className="w-5 h-5" />
            Instagram Feed
          </button>
        </div>

        <div className="max-w-7xl mx-auto">
          {activeTab === 'videos' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {initialVideoIds.slice(0, visibleVideos).map((videoId) => (
                  <div key={videoId} className="space-y-4">
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                      <YouTube
                        videoId={videoId}
                        opts={opts}
                        onReady={(event: YouTubeEvent) => onReady(event, videoId)}
                        className="w-full h-full"
                        iframeClassName="w-full h-full"
                      />
                    </div>
                    {videoMetadata.find(v => v.id === videoId) && (
                      <div className="px-2">
                        <h3 className="text-lg font-semibold">
                          {videoMetadata.find(v => v.id === videoId)?.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {videoMetadata.find(v => v.id === videoId)?.author}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {hasMoreVideos && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMoreVideos}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-wrfc-navy text-white rounded-lg hover:bg-wrfc-navy/90 transition-colors"
                  >
                    <CaretDown className="w-5 h-5" />
                    Load More Videos
                  </button>
                </div>
              )}
              
              <div className="text-center mt-12">
                <a 
                  href="https://www.youtube.com/@washingtonrugby7666"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
<YoutubeLogo className="w-5 h-5" />
                  Visit Our YouTube Channel
                </a>
              </div>
            </>
          )}

          {activeTab === 'instagram' && (
            <div className="py-8">
              <div className="flex flex-col items-center gap-8">
                <iframe 
                  src="https://www.instagram.com/wrfc1963/embed" 
                  width="500" 
                  height="730" 
                  frameBorder="0" 
                  scrolling="no" 
                  allowTransparency={true}
                  className="mx-auto rounded-lg shadow-lg"
                  title="WRFC Instagram Feed"
                />
                
                <a 
                  href="https://www.instagram.com/wrfc1963/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                >
                  <InstagramLogo className="w-5 h-5" />
                  Follow Us on Instagram
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 