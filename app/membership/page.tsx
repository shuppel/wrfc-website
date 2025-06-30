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
          
          {/* Google Form iframe with responsive wrapper */}
          <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
            <div className="aspect-w-16 aspect-h-9 lg:aspect-h-12">
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSfrwiFB_oUzIvE8UHwtv9lz9JAACoPjDpWJ2LCo4xq_P01Atg/viewform?embedded=true" 
                className="w-full h-[600px] md:h-[800px] lg:h-[1000px] xl:h-[1200px]"
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0}
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