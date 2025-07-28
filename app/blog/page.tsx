import { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/contentful';
import { generateMetadata, getStructuredData } from '@/app/utils/seo';
import BlogContent from './BlogContent';

// Generate metadata for the blog page
export const metadata: Metadata = generateMetadata('blog');

export default async function BlogPage() {
  // Fetch blog posts from Contentful with error handling
  let posts: Awaited<ReturnType<typeof getAllBlogPosts>>;
  try {
    posts = await getAllBlogPosts();
  } catch (error) {
    console.warn('Failed to fetch blog posts:', error);
    posts = [];
  }

  // Structured data for blog listing page
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
      headline: post.fields.title,
      datePublished: post.fields.publishDate,
      author: {
        '@type': 'Person',
        name: post.fields.author?.fields?.name || 'WRFC Staff'
      },
      url: `https://washingtonrugby.org/blog/${post.fields.slug}`
    }))
  });

  return <BlogContent structuredData={structuredData} posts={posts} />;
}