import { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Membership Plans | Washington Rugby Football Club',
  description: 'Explore Washington Rugby Football Club membership options and join our team. Player, social, and supporter memberships available.',
};

// Hard-coded membership plans
const membershipPlans = [
  {
    id: '1',
    title: 'Player Membership',
    description: 'Full playing membership with all club benefits',
    price: 250,
    featured: true,
    benefits: [
      'Full playing privileges',
      'Jersey and training kit',
      'Access to all practices',
      'Game day support',
      'Social event access',
      'Voting rights'
    ],
    paymentLink: '/membership/join'
  },
  {
    id: '2',
    title: 'Social Membership',
    description: 'Support the club and join our social events',
    price: 100,
    featured: false,
    benefits: [
      'Social event access',
      'Club newsletter',
      'Voting rights',
      'Member discounts'
    ],
    paymentLink: '/membership/join'
  },
  {
    id: '3',
    title: 'Student Player',
    description: 'Discounted membership for full-time students',
    price: 150,
    featured: false,
    benefits: [
      'Full playing privileges',
      'Jersey and training kit',
      'Access to all practices',
      'Game day support',
      'Social event access'
    ],
    paymentLink: '/membership/join'
  }
];

export default function MembershipPlansPage() {
  const featuredPlans = membershipPlans.filter(plan => plan.featured);
  const regularPlans = membershipPlans.filter(plan => !plan.featured);
  const sortedPlans = [...featuredPlans, ...regularPlans];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Membership', item: '/membership' },
          { name: 'Plans', item: '/membership/plans' }
        ]} 
      />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Membership Plans</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Join Washington Rugby Football Club and be part of our community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg border ${
                plan.featured
                  ? 'border-wrfc-red shadow-xl scale-105'
                  : 'border-gray-200 dark:border-gray-700'
              } p-6 flex flex-col`}
            >
              {plan.featured && (
                <div className="bg-wrfc-red text-white text-center py-2 px-4 rounded-t-lg -mt-6 -mx-6 mb-6">
                  <span className="font-semibold">Most Popular</span>
                </div>
              )}

              <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-600 dark:text-gray-400">/year</span>
              </div>

              <div className="space-y-3 mb-8 flex-grow">
                {plan.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.paymentLink}
                className={`inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold transition-colors ${
                  plan.featured
                    ? 'bg-wrfc-red text-white hover:bg-red-700'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Select Plan
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Have questions about membership?
          </p>
          <Link
            href="/contact"
            className="text-wrfc-red hover:text-red-700 font-semibold"
          >
            Contact us for more information
          </Link>
        </div>
      </div>
    </div>
  );
}