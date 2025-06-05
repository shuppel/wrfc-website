import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogPosts } from '@/lib/contentful';
import { formatDate } from '@/lib/utils';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { generateMetadata, getStructuredData } from '../utils/seo';

export const metadata: Metadata = {
  title: 'Blog | Washington Rugby Football Club',
  description: 'Stay updated with the latest news, match reports, and insights from Washington Rugby Football Club',
};

export default async function BlogPage() {
  // Fetch blog posts from Contentful
  const posts = await getAllBlogPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Blog', item: '/blog' }
        ]}
      />

      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">WRFC Blog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <BlogPostCard
                key={post.sys.id}
                slug={post.fields.slug}
                title={post.fields.title}
                date={post.fields.publishDate}
                excerpt={post.fields.excerpt}
                imageUrl={post.fields.featuredImage?.fields?.file?.url || ''}
                author={post.fields.author?.fields?.name || 'WRFC Staff'}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-500">No blog posts found. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface BlogPostCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  author: string;
}

function BlogPostCard({ slug, title, date, excerpt, imageUrl, author }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Featured Image */}
        <div className="relative h-48 overflow-hidden">
          {imageUrl ? (
            <Image
              src={`https:${imageUrl}`}
              alt={title}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">No image</span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span>{formatDate(date)}</span>
            <span className="mx-2">•</span>
            <span>{author}</span>
          </div>
          
          <h2 className="text-xl font-bold mb-2 group-hover:text-wrfc-red transition-colors">{title}</h2>
          
          <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">{excerpt}</p>
          
          <span className="text-wrfc-red font-semibold inline-flex items-center">
            Read More
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}