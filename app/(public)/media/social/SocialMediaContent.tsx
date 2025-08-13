'use client';

import { Users, Heart, MessageCircle, Share2 } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import JsonLd from '@/components/JsonLd';

// Custom Instagram icon component
const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
  </svg>
);

// Custom Facebook icon component
const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Define JsonLdObject type
type JsonLdValue = string | number | boolean | null | JsonLdObject | JsonLdValue[];
interface JsonLdObject {
  '@context'?: string;
  '@type'?: string;
  [key: string]: JsonLdValue | undefined;
}

interface SocialMediaContentProps {
  structuredData: JsonLdObject;
}

export default function SocialMediaContent({ structuredData }: SocialMediaContentProps) {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Media', item: '/media' },
          { name: 'Social Media', item: '/media/social' }
        ]} 
      />
      <JsonLd type="WebPage" data={structuredData} />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Connect With WRFC</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Follow Washington Rugby Football Club on social media for real-time updates, behind-the-scenes content, and community engagement
          </p>
        </div>

        {/* Social Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-wrfc-red" />
              <h3 className="text-2xl font-bold">2.5K+</h3>
              <p className="text-gray-600 dark:text-gray-400">Followers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 mx-auto mb-2 text-wrfc-red" />
              <h3 className="text-2xl font-bold">15K+</h3>
              <p className="text-gray-600 dark:text-gray-400">Likes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 text-wrfc-red" />
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="text-gray-600 dark:text-gray-400">Posts</p>
            </CardContent>
          </Card>
        </div>

        {/* Social Media Feeds */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Instagram Feed */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardTitle className="flex items-center gap-2">
                <Instagram className="w-6 h-6" />
                Instagram @wrfc1963
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
                <iframe 
                  src="https://www.instagram.com/wrfc1963/embed" 
                  width="100%" 
                  height="600" 
                  frameBorder="0" 
                  scrolling="no" 
                  allowTransparency={true}
                  className="mx-auto rounded-lg"
                  title="WRFC Instagram Feed"
                />
              </div>
              <a 
                href="https://www.instagram.com/wrfc1963/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  <Instagram className="w-5 h-5 mr-2" />
                  Follow on Instagram
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Facebook Feed */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <Facebook className="w-6 h-6" />
                Facebook @washingtonrugby
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 min-h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <Facebook className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Visit our Facebook page for the latest updates, event information, and community discussions
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-6">
                    <div>
                      <p className="font-semibold">Match Updates</p>
                      <p>Live scores & reports</p>
                    </div>
                    <div>
                      <p className="font-semibold">Event Photos</p>
                      <p>Game day galleries</p>
                    </div>
                    <div>
                      <p className="font-semibold">Club News</p>
                      <p>Announcements</p>
                    </div>
                    <div>
                      <p className="font-semibold">Community</p>
                      <p>Fan discussions</p>
                    </div>
                  </div>
                </div>
              </div>
              <a 
                href="https://www.facebook.com/washingtonrugby"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Facebook className="w-5 h-5 mr-2" />
                  Follow on Facebook
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Social Media Guidelines */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Join the Conversation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Share2 className="w-12 h-12 mx-auto mb-3 text-wrfc-red" />
                <h3 className="font-semibold mb-2">Share Your Experience</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tag us in your rugby photos and stories using #WRFC1963
                </p>
              </div>
              <div className="text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 text-wrfc-red" />
                <h3 className="font-semibold mb-2">Engage With Us</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Comment on our posts and join the WRFC community discussions
                </p>
              </div>
              <div className="text-center">
                <Heart className="w-12 h-12 mx-auto mb-3 text-wrfc-red" />
                <h3 className="font-semibold mb-2">Show Your Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Like and share our content to help grow the rugby community
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Don&apos;t miss any updates from WRFC. Follow us on all our social media channels to stay informed about matches, events, and club news.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://www.instagram.com/wrfc1963/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="group">
                <Instagram className="w-5 h-5 mr-2 group-hover:text-pink-500" />
                Instagram
              </Button>
            </a>
            <a 
              href="https://www.facebook.com/washingtonrugby"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="group">
                <Facebook className="w-5 h-5 mr-2 group-hover:text-blue-600" />
                Facebook
              </Button>
            </a>
            <a 
              href="https://www.youtube.com/@washingtonrugby7666"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="group">
                <svg className="w-5 h-5 mr-2 group-hover:text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}