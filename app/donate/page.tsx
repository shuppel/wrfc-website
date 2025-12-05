import { generateMetadata, getStructuredData } from '../utils/seo'
import { BreadcrumbJsonLd } from '../../components/JsonLd'
import JsonLd from '../../components/JsonLd'
import { Heart, Shield, Trophy, Users } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

// Generate metadata for the donate page
export const metadata = generateMetadata('donate');

export default function DonatePage() {
  // Additional structured data specific to the donate page
  const structuredData = getStructuredData('donate', {
    '@type': 'WebPage',
    mainEntity: {
      '@type': 'DonateAction',
      name: 'Support Washington Rugby Football Club',
      description: 'Make a tax-deductible donation to support WRFC programs, equipment, and community initiatives.',
      recipient: {
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
          { name: 'Donate', item: '/donate' }
        ]} 
      />
      <JsonLd type="WebPage" data={structuredData} />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Heart className="w-16 h-16 text-wrfc-red" weight="fill" />
          </div>
          <h1 className="hero-title mb-6">Support WRFC</h1>
          <p className="text-xl text-gray-600 dark:text-gray-100 max-w-3xl mx-auto">
            Your generous donation helps us continue our legacy of excellence, support our players, 
            and grow rugby in the DC community. Every contribution makes a difference.
          </p>
        </div>

        {/* Impact Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <ImpactCard 
            icon={<Trophy className="w-12 h-12 text-wrfc-red" weight="fill" />}
            title="Equipment & Facilities"
            description="Support team equipment, training facilities, and infrastructure improvements."
          />
          <ImpactCard 
            icon={<Users className="w-12 h-12 text-wrfc-navy" weight="fill" />}
            title="Player Development"
            description="Fund coaching programs, training camps, and player development initiatives."
          />
          <ImpactCard 
            icon={<Shield className="w-12 h-12 text-wrfc-teal" weight="fill" />}
            title="Community Programs"
            description="Support youth outreach, tournament hosting, and community rugby events."
          />
        </div>

        {/* Zeffy Donation Form */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-6">Make a Donation</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
              WRFC uses Zeffy for donations - 100% free with no platform fees. Your entire donation goes directly to supporting the club.
            </p>
            
            {/* Zeffy Donation Button */}
            <div className="text-center mb-8">
              <a
                zeffy-form-link="https://www.zeffy.com/en-US/donation-form/wrfc-donations"
                className="inline-block bg-gradient-to-r from-wrfc-red to-red-700 text-white px-12 py-4 rounded-lg font-bold text-lg hover:from-red-700 hover:to-wrfc-red transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                style={{ cursor: 'pointer' }}
              >
                Donate Now
              </a>
            </div>

            {/* Alternative Link */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Or{' '}
              <a 
                href="https://www.zeffy.com/en-US/donation-form/wrfc-donations"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wrfc-red hover:underline font-medium"
              >
                open the donation form in a new window
              </a>
            </p>
          </div>
        </div>

        {/* Tax Deductible Notice */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 max-w-3xl mx-auto mb-16">
          <h3 className="text-2xl font-bold mb-4 text-center">Tax-Deductible Contribution</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Washington Rugby Football Club is a registered 501(c)(3) nonprofit organization. 
            Your donation is tax-deductible to the fullest extent allowed by law. 
            You will receive a receipt for your records after your donation is processed.
          </p>
        </div>

        {/* Thank You Section with Image */}
        <div className="relative overflow-hidden rounded-xl mb-12">
          <div className="relative h-64 md:h-96">
            <Image
              src="/assets/pictures/huddle_2025_irish.jpg"
              alt="WRFC Team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-wrfc-navy/95 to-wrfc-navy/90" />
            <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Thank You for Your Support</h2>
                <p className="text-xl max-w-2xl mx-auto">
                  Your contribution helps us continue 60+ years of rugby excellence in Washington, DC. 
                  Together, we&apos;re building the future of DC rugby.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Ways to Support */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Other Ways to Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SupportOption 
              title="Become a Sponsor"
              description="Partner with WRFC and gain visibility in the DC rugby community."
              link="/sponsors"
              linkText="Learn More About Sponsorship"
            />
            <SupportOption 
              title="Join as a Member"
              description="Become a playing member or social supporter of Washington Rugby."
              link="/membership"
              linkText="Explore Membership Options"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ImpactCard({ icon, title, description }: { 
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-shadow">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

function SupportOption({ title, description, link, linkText }: {
  title: string
  description: string
  link: string
  linkText: string
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <a 
        href={link}
        className="text-wrfc-red hover:text-red-700 font-semibold hover:underline"
      >
        {linkText} →
      </a>
    </div>
  );
}
