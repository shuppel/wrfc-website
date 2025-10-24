'use client';

import { useState } from 'react';
import Link from 'next/link';
import { YoutubeLogo, InstagramLogo, FileText, ArrowRight, Calendar, Clock, Camera } from '@phosphor-icons/react';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import JsonLd from '@/components/JsonLd';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Define JsonLdObject type to match the one in JsonLd component
type JsonLdValue = string | number | boolean | null | JsonLdObject | JsonLdValue[];
interface JsonLdObject {
  '@context'?: string;
  '@type'?: string;
  [key: string]: JsonLdValue | undefined;
}

interface MediaContentProps {
  structuredData: JsonLdObject;
}

// Mock data for blog posts - will be replaced with Contentful data
const mockBlogPosts = [
  {
    id: '1',
    title: 'WRFC Dominates in Season Opener Against Potomac',
    excerpt: 'The Washington Rugby Football Club started their season with an impressive 45-12 victory over Potomac Athletic Club.',
    publishDate: '2025-01-15',
    author: { name: 'WRFC Communications', picture: '/logos/wrfc_logo.png' },
    featuredImage: '/assets/pictures/2022_d2_champs.png',
    slug: 'wrfc-dominates-season-opener',
    categories: ['Match Reports'],
    readingTime: '3 min read'
  },
  {
    id: '2',
    title: 'Cherry Blossom Tournament 2025 Registration Now Open',
    excerpt: 'Early bird registration is now available for the premier rugby tournament in the DC area. Register your team today!',
    publishDate: '2025-01-10',
    author: { name: 'Tournament Director', picture: '/logos/wrfc_logo.png' },
    featuredImage: '/assets/art/tournament_banner_watercolor.png',
    slug: 'cherry-blossom-2025-registration',
    categories: ['Tournaments'],
    readingTime: '2 min read'
  },
  {
    id: '3',
    title: 'New Training Schedule for Spring Season',
    excerpt: 'Updated practice times and locations for all divisions as we prepare for the competitive spring season.',
    publishDate: '2025-01-05',
    author: { name: 'Head Coach', picture: '/logos/wrfc_logo.png' },
    featuredImage: '/assets/pictures/throw_skill_2025.png',
    slug: 'spring-training-schedule',
    categories: ['Club News'],
    readingTime: '4 min read'
  }
];

export default function MediaContent({ structuredData }: MediaContentProps) {
  const [latestVideo] = useState<string>('lvy4b81NYFw'); // Latest WRFC video

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

      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-b from-blue-900 to-black text-white">
        <div className="container mx-auto px-4">
          <h1 className="display-large mb-6 text-center">
            Stay Connected with WRFC
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Get the latest news, match highlights, and behind-the-scenes content from Washington Rugby Football Club
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Media Hub Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Social Media Card */}
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <InstagramLogo className="w-8 h-8 text-pink-600" weight="fill" />
                <span className="text-sm text-gray-500 dark:text-gray-100">Live Updates</span>
              </div>
              <CardTitle className="text-2xl">Social Media</CardTitle>
              <CardDescription>Follow us for real-time updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {/* Instagram preview grid - placeholder for now */}
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-900 rounded"></div>
                ))}
              </div>
              <Link href="/media/social">
                <Button className="w-full group">
                  Connect With Us
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" weight="bold" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Film Room Card */}
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <YoutubeLogo className="w-8 h-8 text-red-600" weight="fill" />
                <span className="text-sm text-gray-500 dark:text-gray-100">Video Content</span>
              </div>
              <CardTitle className="text-2xl">Film Room</CardTitle>
              <CardDescription>Match highlights and player interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden mb-4">
                <iframe
                  src={`https://www.youtube.com/embed/${latestVideo}`}
                  title="Latest WRFC Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <Link href="/media/film">
                <Button className="w-full group">
                  Watch More Videos
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" weight="bold" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Blog Card */}
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-8 h-8 text-wrfc-red" />
                <span className="text-sm text-gray-500">Latest News</span>
              </div>
              <CardTitle className="text-2xl">Blog</CardTitle>
              <CardDescription>Match reports, club news, and player features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBlogPosts.slice(0, 2).map((post) => (
                  <div key={post.id} className="border-b pb-3 last:border-0">
                    <h4 className="font-semibold text-sm line-clamp-2 mb-1">{post.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/blog" className="mt-4 block">
                <Button className="w-full group">
                  View All Posts
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" weight="bold" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Club Photos Card */}
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Camera className="w-8 h-8 text-blue-600" weight="duotone" />
                <span className="text-sm text-gray-500 dark:text-gray-100">Coming Soon</span>
              </div>
              <CardTitle className="text-2xl">Club Photos</CardTitle>
              <CardDescription>Match day photos and club events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-gray-900 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-2" weight="duotone" />
                  <p className="text-sm text-gray-600 dark:text-gray-100">Gallery Coming Soon</p>
                </div>
              </div>
              <Link href="/media/photos">
                <Button className="w-full group" variant="outline">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" weight="bold" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter Signup Section */}
        <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss an Update</h2>
          <p className="text-lg text-gray-600 dark:text-gray-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive content, match previews, and club announcements delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-wrfc-red"
            />
            <Button className="bg-wrfc-red hover:bg-red-700 text-white px-6 py-3">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}