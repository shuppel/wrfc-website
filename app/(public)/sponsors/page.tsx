import Link from 'next/link';
import { generateMetadata, getStructuredData } from '../utils/seo'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import JsonLd from '@/components/JsonLd'
import SponsorsList from '@/components/SponsorsList';

export interface Sponsor {
  name: string;
  logo: string;
  type: 'premier' | 'club' | 'supporting';
  description: string;
  website?: string;
  address?: string;
  contribution?: string;
  discount?: string;
  since?: string;
  badge?: 'gold' | 'silver' | 'bronze';
}

const SPONSORS: Sponsor[] = [
  {
    name: "Carlsberg",
    logo: "/assets/sponsors/carlsberg-logo.png",
    type: "premier",
    description: "A premier global brewery known for its quality beer and long-standing support of sports and community events.",
    website: "https://www.carlsberg.com",
    contribution: "Premier Level Support",
    since: "2024",
    badge: "gold"
  },
  {
    name: "Matet's Kitchen",
    logo: "/assets/sponsors/matets-kitchen-logo.jpg",
    type: "premier",
    description: "A beloved local restaurant bringing delicious cuisine to the DC community while supporting local sports.",
    website: "https://matetskitchen.com/",
    contribution: "Premier Level Support",
    since: "2024",
    badge: "gold"
  },
  {
    name: "The Queen Vic",
    logo: "/assets/sponsors/queen-vic-logo.png",
    type: "premier",
    description: "An authentic British pub in the heart of DC, bringing rugby culture and community together.",
    website: "https://www.thequeenvicdc.com",
    contribution: "Premier Level Support",
    since: "2024",
    badge: "gold"
  },
  {
    name: "Nodetus Integrators LLC",
    logo: "/assets/sponsors/nodetus_logo.png",
    type: "club",
    description: "Your friendly AI Integrators, powering digital transformation and innovation in sports technology.",
    website: "https://nodetus.com",
    contribution: "Technology Partner",
    since: "2024",
    badge: "silver"
  },
  // Add more sponsors here...
];

// Generate metadata for the sponsors page
export const metadata = generateMetadata('sponsors');

export default function Sponsors() {
  // Additional structured data specific to the sponsors page
  const structuredData = getStructuredData('sponsors', {
    '@type': 'WebPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'WRFC Sponsors',
      description: 'Our valued sponsors and partners who support Washington Rugby Football Club.',
      member: [
        {
          '@type': 'Organization',
          name: 'WRFC Sponsors',
          description: 'Current sponsors of Washington Rugby Football Club'
        }
      ],
      sponsor: {
        '@type': 'Organization',
        name: 'Sponsorship Opportunities',
        description: 'Partner with Washington Rugby Football Club'
      }
    }
  });

  return (
    <div className="flex flex-col items-center w-full">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Sponsors', item: '/sponsors' }
        ]} 
      />
      <JsonLd type="Organization" data={structuredData} />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="hero-title mb-6">Our Sponsors</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We&apos;re proud to partner with organizations that share our passion for rugby and community. 
            Our sponsors help make it possible for WRFC to continue its legacy of excellence.
          </p>
        </div>

        {/* Sponsors List - Client Component */}
        <SponsorsList sponsors={SPONSORS} />

        {/* Become a Sponsor Section */}
        <div className="bg-gradient-to-r from-wrfc-navy to-wrfc-navy/90 text-white rounded-xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Become a Sponsor</h2>
            <p className="text-xl mb-8">
              Join us in supporting one of DC&apos;s oldest and most successful rugby clubs. 
              Partner with WRFC and connect with our passionate community.
            </p>
            <Link 
              href="/contact"
              className="inline-block bg-wrfc-red px-8 py-3 rounded-md font-bold hover:bg-wrfc-red/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Contact Us About Sponsorship
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 