import { Metadata } from 'next';
import { generateMetadata } from '@/utils/seo';
import BlogContent from './BlogContent';

// Generate metadata for the blog page
export const metadata: Metadata = generateMetadata('blog');

export default function BlogPage() {
  return <BlogContent />;
}