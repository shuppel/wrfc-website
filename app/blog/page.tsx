import { Metadata } from 'next';
import { getAllBlogPosts } from '@/data/blog';
import { generateMetadata, getStructuredData } from '@/app/utils/seo';
import BlogContent from './BlogContent';

export const metadata: Metadata = generateMetadata('blog');

export default function BlogPage() {
  const posts = getAllBlogPosts();

  const structuredData = getStructuredData('blog', {
    '@type': 'Blog',
    name: 'WRFC Blog',
    description: 'Official blog of the Washington Rugby Football Club',
    url: 'https://washingtonrugby.org/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Washington Rugby Football Club',
      logo: {
        '@type': 'ImageObject',
        url: 'https://washingtonrugby.org/logos/wrfc_logo.png'
      }
    },
    blogPost: posts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.publishDate,
      author: {
        '@type': 'Person',
        name: post.author.name
      },
      url: `https://washingtonrugby.org/blog/${post.slug}`
    }))
  });

  return <BlogContent structuredData={structuredData} posts={posts} />;
}
