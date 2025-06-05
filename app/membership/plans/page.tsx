import { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { getAllMembershipPlans } from '@/lib/contentful';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Membership Plans | Washington Rugby Football Club',
  description: 'Explore Washington Rugby Football Club membership options and join our team. Player, social, and supporter memberships available.',
};

export default async function MembershipPlansPage() {
  // Fetch membership plans from Contentful
  const plans = await getAllMembershipPlans();
  
  // Separate featured and regular plans
  const featuredPlans = plans.filter(plan => plan.fields.featured);
  const regularPlans = plans.filter(plan => !plan.fields.featured);
  
  // Sort plans by price
  const sortedPlans = [...featuredPlans, ...regularPlans];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Membership', item: '/membership' },
          { name: 'Membership Plans', item: '/membership/plans' }
        ]}
      />

      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Membership Plans</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          Join Washington Rugby Football Club and be part of a legacy that dates back to 1963.
        </p>
        
        {sortedPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPlans.map((plan) => (
              <MembershipCard
                key={plan.sys.id}
                title={plan.fields.title}
                description={plan.fields.description}
                price={plan.fields.price}
                benefits={plan.fields.benefits}
                paymentLink={plan.fields.paymentLink}
                featured={plan.fields.featured}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No membership plans found. Please check back later.</p>
          </div>
        )}
        
        {/* Additional Information */}
        <div className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Membership FAQ</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What's included in membership?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Membership includes access to training sessions, eligibility for matches, club gear discounts, 
                and social events. Specific benefits vary by membership type.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">How long does membership last?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Most memberships are valid for one rugby season (typically one year). 
                Renewal reminders will be sent before your membership expires.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I upgrade my membership?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, you can upgrade your membership at any time. 
                Contact our membership coordinator for assistance.
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <Link 
              href="/contact" 
              className="inline-flex items-center text-wrfc-red hover:text-wrfc-red/80"
            >
              Have more questions? Contact us
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MembershipCardProps {
  title: string;
  description: string;
  price: number;
  benefits: string[];
  paymentLink: string;
  featured?: boolean;
}

function MembershipCard({ title, description, price, benefits, paymentLink, featured = false }: MembershipCardProps) {
  return (
    <div className={`rounded-xl overflow-hidden border ${featured 
      ? 'border-wrfc-red shadow-lg transform-gpu scale-105' 
      : 'border-gray-200 dark:border-gray-700'}`}
    >
      {/* Featured Banner */}
      {featured && (
        <div className="bg-wrfc-red text-white text-center py-2 font-semibold">
          Recommended
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        
        <div className="mb-6">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-gray-500 dark:text-gray-400">/year</span>
        </div>
        
        {/* Benefits List */}
        <ul className="space-y-3 mb-8">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-wrfc-red mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
            </li>
          ))}
        </ul>
        
        {/* CTA Button */}
        <Link 
          href={paymentLink || '/contact'} 
          className={`block w-full py-3 px-4 rounded-lg text-center font-semibold transition-colors ${
            featured 
              ? 'bg-wrfc-red text-white hover:bg-wrfc-red/90' 
              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {paymentLink ? 'Join Now' : 'Contact for Details'}
        </Link>
      </div>
    </div>
  );
}