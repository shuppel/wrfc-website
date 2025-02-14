import Head from 'next/head'
import { useRouter } from 'next/router'
import { OrganizationJsonLd } from './JsonLd'

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  canonicalUrl?: string;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  noindex?: boolean;
  alternateUrls?: {
    lang: string;
    url: string;
  }[];
}

export default function SEO({
  title = 'Nodetus Integrators LLC',
  description = 'No-nonsense IT Advisory. [Sense of humor included]',
  image = '/logo.png',
  article = false,
  canonicalUrl,
  keywords = 'IT Advisory, Market Research, Technical Writing, Human Centered Design, Product Management',
  author = 'Nodetus Integrators LLC',
  publishedTime,
  modifiedTime,
  section,
  noindex = false,
  alternateUrls = []
}: SEOProps) {
  const router = useRouter()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nodetus.com'
  const fullUrl = `${siteUrl}${router.asPath}`
  const finalCanonicalUrl = canonicalUrl || fullUrl
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <link rel="canonical" href={finalCanonicalUrl} />

        {/* Alternate Language URLs */}
        {alternateUrls.map(({ lang, url }) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />

        {/* Favicon Tags */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffffff" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={article ? 'article' : 'website'} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content={title} />
        <meta property="og:site_name" content="Nodetus Integrators LLC" />
        <meta property="og:locale" content="en_US" />
        {publishedTime && <meta property="article:published_time" content={publishedTime} />}
        {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        {section && <meta property="article:section" content={section} />}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={fullUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:image:alt" content={title} />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
        <meta name="googlebot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
        <meta name="theme-color" content="#ffffff" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="rating" content="General" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <OrganizationJsonLd />
    </>
  )
} 