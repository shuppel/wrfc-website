import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllAlumniSpotlights, getAlumniSpotlightBySlug } from '@/lib/contentful';
import { formatDate } from '@/lib/utils';
import { renderRichText } from '@/lib/rich-text';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import JsonLd from '@/components/JsonLd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Quote } from 'lucide-react';

interface AlumniSpotlightPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the alumni spotlight
export async function generateMetadata({ params }: AlumniSpotlightPageProps): Promise<Metadata> {
  const spotlight = await getAlumniSpotlightBySlug(params.slug);
  
  if (!spotlight) {
    return {
      title: 'Alumni Spotlight Not Found',
    };
  }

  const { name, yearsPlayed } = spotlight.fields;

  return {
    title: `${name} | WRFC Alumni Spotlight`,
    description: `Alumni Spotlight: ${name} (${yearsPlayed}) - Read about their journey with Washington Rugby Football Club and beyond.`,
    openGraph: {
      title: `${name} | Washington Rugby Football Club Alumni`,
      description: `Alumni Spotlight featuring ${name}`,
      type: 'article',
    },
  };
}

// Generate static paths for all alumni spotlights
export async function generateStaticParams() {
  try {
    const spotlights = await getAllAlumniSpotlights();
    
    return spotlights.map((spotlight) => ({
      slug: spotlight.fields.slug,
    }));
  } catch (error) {
    console.warn('Failed to fetch alumni spotlights for static generation:', error);
    // Return empty array to prevent build failure
    return [];
  }
}

export default async function AlumniSpotlightPage({ params }: AlumniSpotlightPageProps) {
  const spotlight = await getAlumniSpotlightBySlug(params.slug);
  
  if (!spotlight) {
    notFound();
  }

  const { 
    name,
    featuredImage,
    yearsPlayed,
    hometown,
    story,
    quote,
    publishDate,
    featured
  } = spotlight.fields;
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Alumni', item: '/alumni' },
          { name: 'Spotlights', item: '/alumni/spotlights' },
          { name: name, item: `/alumni/spotlights/${params.slug}` }
        ]}
      />
      
      <JsonLd 
        type="Article" 
        data={{
          '@type': 'Article',
          headline: `Alumni Spotlight: ${name}`,
          datePublished: publishDate,
          author: {
            '@type': 'Organization',
            name: 'Washington Rugby Football Club'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Washington Rugby Football Club',
            logo: {
              '@type': 'ImageObject',
              url: 'https://washingtonrugby.org/logos/wrfc_logo.png'
            }
          },
          description: `Alumni spotlight featuring ${name}, WRFC player from ${yearsPlayed}`,
          url: `https://washingtonrugby.org/alumni/spotlights/${params.slug}`,
          image: featuredImage ? `https:${featuredImage.fields.file.url}` : undefined
        }} 
      />

      <div className="max-w-4xl mx-auto">
        {/* Back to alumni link */}
        <Link 
          href="/alumni" 
          className="inline-flex items-center text-wrfc-red hover:text-wrfc-red/80 mb-8"
        >
          <svg className="w-4 h-4 mr-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Back to Alumni
        </Link>

        {/* Alumni Header */}
        <div className="mb-8">
          {featured && (
            <Badge variant="default" text="Featured Alumni" className="mb-4" />
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Years Played: {yearsPlayed}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{hometown}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {featuredImage && (
          <div className="relative w-full h-[400px] md:h-[500px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={`https:${featuredImage.fields.file.url}`}
              alt={name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Featured Quote */}
        {quote && (
          <Card className="mb-8 bg-gray-50 dark:bg-gray-800">
            <CardContent className="pt-6">
              <Quote className="w-8 h-8 text-wrfc-red mb-4" />
              <blockquote className="text-xl md:text-2xl italic text-gray-700 dark:text-gray-300">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <p className="mt-4 text-right text-gray-600 dark:text-gray-400">— {name}</p>
            </CardContent>
          </Card>
        )}

        {/* Alumni Story */}
        <Card>
          <CardHeader>
            <CardTitle>Alumni Story</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {renderRichText(story)}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">Share Your Story</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Are you a WRFC alumni? We&apos;d love to feature your rugby journey and hear about your experiences with the club.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-wrfc-red hover:bg-red-700">
              Get in Touch
            </Button>
          </Link>
        </div>

        {/* Published Date */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Published on {formatDate(publishDate)}
        </div>
      </div>
    </div>
  );
}