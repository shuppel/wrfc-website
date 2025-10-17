'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Clock, ChevronRight } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

// Blog categories
const CATEGORIES = [
  'All',
  'Match Reports',
  'Club News',
  'Player Features',
  'Tournaments',
  'Training Tips',
  'Alumni Stories'
];

// Mock data for demonstration
const mockPosts = [
  {
    id: '1',
    title: 'WRFC Dominates in Season Opener Against Potomac',
    slug: 'wrfc-dominates-season-opener',
    excerpt: 'The Washington Rugby Football Club started their season with an impressive 45-12 victory over Potomac Athletic Club, showcasing strong offensive plays and solid defense.',
    content: 'Full article content here...',
    publishDate: '2025-01-15',
    featuredImage: { url: '/assets/pictures/2022_d2_champs.png' },
    author: {
      name: 'WRFC Communications',
      picture: { url: '/logos/wrfc_logo.png' },
      title: 'Communications Team'
    },
    categories: ['Match Reports'],
    tags: ['D1', 'League', 'Victory'],
    readingTime: '3 min read'
  },
  {
    id: '2',
    title: 'Cherry Blossom Tournament 2025 Registration Now Open',
    slug: 'cherry-blossom-2025-registration',
    excerpt: 'Early bird registration is now available for the premier rugby tournament in the DC area. Multiple divisions available for all skill levels.',
    content: 'Full article content here...',
    publishDate: '2025-01-10',
    featuredImage: { url: '/assets/art/tournament_banner_watercolor.png' },
    author: {
      name: 'Tournament Director',
      picture: { url: '/logos/wrfc_logo.png' },
      title: 'Tournament Committee'
    },
    categories: ['Tournaments', 'Club News'],
    tags: ['Cherry Blossom', 'Registration', 'Tournament'],
    readingTime: '2 min read'
  },
  {
    id: '3',
    title: 'Player Spotlight: John Smith\'s Journey to WRFC',
    slug: 'player-spotlight-john-smith',
    excerpt: 'From college rugby to the D1 squad, learn about flanker John Smith\'s rugby journey and his impact on the team.',
    content: 'Full article content here...',
    publishDate: '2025-01-05',
    featuredImage: { url: '/assets/pictures/throw_skill_2025.png' },
    author: {
      name: 'Sarah Johnson',
      picture: { url: '/logos/wrfc_logo.png' },
      title: 'Content Writer'
    },
    categories: ['Player Features'],
    tags: ['Player Profile', 'D1', 'Interview'],
    readingTime: '5 min read'
  }
];

interface BlogPostCardData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishDate: string;
  featuredImage?: { url: string } | null;
  author?: {
    name: string;
    picture?: { url: string } | null;
    title?: string;
  } | null;
  categories?: string[];
  tags?: string[];
  readingTime: string;
}

export default function BlogContent() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState<BlogPostCardData[]>(mockPosts);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPosts(mockPosts);
    } else {
      setFilteredPosts(mockPosts.filter(post => 
        post.categories?.includes(selectedCategory)
      ));
    }
  }, [selectedCategory]);

  // Get featured post (most recent)
  const featuredPost = mockPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Blog', item: '/blog' }
        ]} 
      />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">WRFC Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Stay updated with the latest news, match reports, and insights from Washington Rugby Football Club
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-wrfc-red hover:bg-red-700" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === 'All' && (
          <div className="mb-16">
            <Link href={`/blog/${featuredPost.slug}`}>
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={featuredPost.featuredImage?.url || '/logos/wrfc_logo.png'}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge text="Featured" className="bg-wrfc-red text-white" />
                    </div>
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(featuredPost.publishDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {featuredPost.author?.name || 'WRFC Staff'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readingTime}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 hover:text-wrfc-red transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {featuredPost.categories?.map((cat: string) => (
                          <Badge key={cat} text={cat} variant="outline" />
                        ))}
                      </div>
                      <span className="text-wrfc-red font-semibold flex items-center gap-2 group">
                        Read More
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingPosts.length > 0 ? (
            remainingPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-500">
                {selectedCategory === 'All' 
                  ? 'No blog posts found. Check back soon!' 
                  : `No posts found in "${selectedCategory}" category.`}
              </p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredPosts.length > 9 && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Load More Posts
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function BlogPostCard({ post }: { post: BlogPostCardData }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.featuredImage?.url || '/logos/wrfc_logo.png'}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {post.categories && post.categories[0] && (
            <div className="absolute top-4 left-4">
              <Badge text={post.categories[0]} variant="outline" className="bg-white/90 backdrop-blur-sm" />
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.publishDate)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTime}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-wrfc-red transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {post.author?.picture && (
                <Image
                  src={post.author.picture.url}
                  alt={post.author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {post.author?.name || 'WRFC Staff'}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-wrfc-red group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}