import { getStructuredData } from '../utils/seo'
import { BreadcrumbJsonLd } from '../../components/JsonLd'
import JsonLd from '../../components/JsonLd'

export default function MembershipPage() {
  // Additional structured data specific to the membership page
  const structuredData = getStructuredData('membership', {
    '@type': 'WebPage',
    mainEntity: {
      '@type': 'Product',
      name: 'WRFC Membership',
      description: 'Join Washington Rugby Football Club and become part of our rugby community.',
      category: 'Sports Club Membership',
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        url: 'https://washingtonrugby.org/membership',
        validFrom: '2024-01-01'
      },
      brand: {
        '@type': 'SportsOrganization',
        name: 'Washington Rugby Football Club',
        url: 'https://washingtonrugby.org'
      }
    }
  });

  return (
    <div className="flex flex-col items-center w-full">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Membership', item: '/membership' }
        ]} 
      />
      <JsonLd type="WebPage" data={structuredData} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Join WRFC</h1>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-lg mb-8 text-gray-600">
            Complete the form below to join Washington Rugby Football Club and become part of our rugby community.
          </p>
          
          {/* Discord Community Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg mb-6 text-gray-700 dark:text-white">
              New players: Connect with the team, get practice updates, and ask questions in our Discord server!
            </p>
            <a 
              href="https://discord.gg/XPkXVEySsh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .031-.056c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span>Join WRFC Discord</span>
            </a>
          </div>
          
          {/* Google Form iframe with responsive wrapper */}
          <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
            <div className="aspect-w-16 aspect-h-9 lg:aspect-h-12">
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSfrwiFB_oUzIvE8UHwtv9lz9JAACoPjDpWJ2LCo4xq_P01Atg/viewform?embedded=true" 
                className="w-full h-[600px] md:h-[800px] lg:h-[1000px] xl:h-[1200px] border-0"
                loading="lazy"
                title="WRFC Membership Form"
              >
                Loading…
              </iframe>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Having trouble viewing the form? 
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSfrwiFB_oUzIvE8UHwtv9lz9JAACoPjDpWJ2LCo4xq_P01Atg/viewform" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-1 text-primary hover:underline"
              >
                Open in new tab
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 