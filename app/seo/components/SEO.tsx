import Head from 'next/head'
import { useRouter } from 'next/router'

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  canonicalUrl?: string;
}

export default function SEO({
  title = 'Default Site Title', // Replace with your default site title
  description = 'Default site description that should be 150-160 characters long for optimal SEO performance.',
  image = '/default-og-image.jpg', // Replace with your default OG image path
  article = false,
  canonicalUrl,
}: SEOProps) {
  const router = useRouter()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com' // Replace with your site URL
  const fullUrl = `${siteUrl}${router.asPath}`
  const finalCanonicalUrl = canonicalUrl || fullUrl

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
    </Head>
  )
} 