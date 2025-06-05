import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/contentful';
import { formatDate } from '@/lib/utils';
import { renderRichText } from '@/lib/rich-text';
import { BreadcrumbJsonLd, ArticleJsonLd } from '@/components/JsonLd';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  const { title, excerpt, featuredImage } = post.fields;
  const imageUrl = featuredImage?.fields?.file?.url;

  return {
    title: `${title} | WRFC Blog`,
    description: excerpt,
    openGraph: {
      title: `${title} | Washington Rugby Football Club Blog`,
      description: excerpt,
      type: 'article',
      images: imageUrl ? [`https:${imageUrl}`] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | WRFC Blog`,
      description: excerpt,
      images: imageUrl ? [`https:${imageUrl}`] : [],
    },
  };
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  
  return posts.map((post) => ({
    slug: post.fields.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const { 
    title, 
    publishDate, 
    featuredImage, 
    content, 
    author,
    categories,
    tags
  } = post.fields;

  // Format content to render
  // Note: For rich text content, you would typically use a rich text renderer
  // like contentful-richtext-react-renderer
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Blog', item: '/blog' },
          { name: title, item: `/blog/${params.slug}` }
        ]}
      />
      
      <ArticleJsonLd
        title={title}
        description={post.fields.excerpt}
        url={`https://wrfc.org/blog/${params.slug}`}
        images={featuredImage?.fields?.file?.url ? [`https:${featuredImage.fields.file.url}`] : []}
        datePublished={publishDate}
        authorName={author?.fields?.name || 'WRFC Staff'}
      />

      <div className="max-w-4xl mx-auto">
        {/* Back to blog link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-wrfc-red hover:text-wrfc-red/80 mb-8"
        >
          <svg className="w-4 h-4 mr-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Back to All Posts
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
          
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-6">
            {/* Author */}
            <div className="flex items-center">
              {author?.fields?.picture ? (
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image 
                    src={`https:${author.fields.picture.fields.file.url}`}
                    alt={author.fields.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-wrfc-navy text-white flex items-center justify-center mr-3">
                  {author?.fields?.name?.charAt(0) || 'W'}
                </div>
              )}
              <span>{author?.fields?.name || 'WRFC Staff'}</span>
            </div>
            
            <span className="mx-3">•</span>
            
            {/* Date */}
            <time dateTime={publishDate}>{formatDate(publishDate)}</time>
            
            {/* Categories */}
            {categories && categories.length > 0 && (
              <>
                <span className="mx-3">•</span>
                <div className="flex items-center">
                  {categories.map((category, index) => (
                    <span key={index} className="mr-2 last:mr-0">
                      {category}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {featuredImage && (
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={`https:${featuredImage.fields.file.url}`}
              alt={featuredImage.fields.title || title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
          {renderRichText(content)}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Link 
                  key={index}
                  href={`/blog/tags/${tag}`}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-sm transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}