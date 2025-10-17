import { Analytics } from '@vercel/analytics/react'
import HeaderImproved from '@/components/layout/HeaderImproved'
import Footer from '@/components/layout/Footer'
import ArticleDrawerWrapper from '@/components/layout/ArticleDrawerWrapper'
import { OrganizationJsonLd, WebsiteJsonLd } from '@/components/JsonLd'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <script async src="https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js"></script>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
        <meta name="application-name" content="Washington Rugby Football Club" />
        <HeaderImproved />
        <main className="flex-grow pt-16 sm:pt-20 lg:pt-24">
          {children}
        </main>
        <Footer />
        <ArticleDrawerWrapper />
        <Analytics />
      </div>
    </>
  )
}