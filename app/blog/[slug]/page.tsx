import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllBlogPosts, getBlogPostBySlug } from '@/data/blog';
import { formatDate } from '@/lib/utils';
import { BreadcrumbJsonLd, ArticleJsonLd } from '@/components/JsonLd';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  const { title, excerpt, featuredImage } = post;

  return {
    title: `${title} | WRFC Blog`,
    description: excerpt,
    openGraph: {
      title: `${title} | Washington Rugby Football Club Blog`,
      description: excerpt,
      type: 'article',
      images: featuredImage ? [featuredImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | WRFC Blog`,
      description: excerpt,
      images: featuredImage ? [featuredImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);
  
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
  } = post;
  
  return (
    <div className="container mx-auto px-4 py-12">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Blog', item: '/blog' },
          { name: title, item: `/blog/${params.slug}` }
        ]}
      />
      
      <ArticleJsonLd
        title={title}
        description={post.excerpt}
        url={`https://washingtonrugby.org/blog/${params.slug}`}
        images={featuredImage ? [featuredImage] : []}
        datePublished={publishDate}
        authorName={author.name}
      />

      <div className="max-w-4xl mx-auto">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-wrfc-red hover:text-wrfc-red/80 mb-8"
        >
          <svg className="w-4 h-4 mr-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Back to All Posts
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
          
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-6">
            <div className="flex items-center">
              {author.picture ? (
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image 
                    src={author.picture}
                    alt={author.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-wrfc-navy text-white flex items-center justify-center mr-3">
                  {author.name.charAt(0)}
                </div>
              )}
              <span>{author.name}</span>
            </div>
            
            <span className="mx-3">•</span>
            
            <time dateTime={publishDate}>{formatDate(publishDate)}</time>
            
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

        {featuredImage && (
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div 
          className="prose prose-lg max-w-none dark:prose-invert mb-8"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {tags && tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
