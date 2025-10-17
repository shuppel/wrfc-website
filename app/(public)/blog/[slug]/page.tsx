import { Metadata } from 'next';
import Link from 'next/link';

// Generate metadata for the blog post
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog Post | WRFC Blog',
    description: 'Blog post content coming soon',
  };
}

export default function BlogPostPage() {
  // For now, redirect to blog page since we don't have individual posts
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-wrfc-red hover:text-wrfc-red/80 mb-8"
        >
          <svg className="w-4 h-4 mr-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Back to Blog
        </Link>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Blog Post Coming Soon</h1>
        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>This blog post content is coming soon. Check back later for updates!</p>
        </div>
      </div>
    </div>
  );
}