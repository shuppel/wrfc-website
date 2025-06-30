'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Select } from 'components/ui/select';
import { Card } from 'components/ui/card';
import { getStructuredData } from '../utils/seo'
import { BreadcrumbJsonLd } from '../../components/JsonLd'
import JsonLd from '../../components/JsonLd'

const membershipSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Valid phone number is required'),
  }),
  rugbyInfo: z.object({
    experience: z.enum(['none', 'beginner', 'intermediate', 'advanced']),
    position: z.string().optional(),
    previousClub: z.string().optional(),
  }),
  emergencyContact: z.object({
    name: z.string().min(2, 'Contact name is required'),
    relationship: z.string().min(2, 'Relationship is required'),
    phone: z.string().min(10, 'Valid phone number is required'),
  }),
});

type MembershipForm = z.infer<typeof membershipSchema>;

const steps = ['Personal Information', 'Rugby Experience', 'Emergency Contact', 'Review'];

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

  const [currentStep, setCurrentStep] = useState(0);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<MembershipForm>({
    resolver: zodResolver(membershipSchema),
  });

  const onSubmit = async (data: MembershipForm) => {
    // Handle form submission - integrate with your backend API
    console.log('Form submitted:', data);
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

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

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep ? 'bg-primary text-white' : 'bg-gray-200'
              }`}>
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-20 h-1 ${
                  index < currentStep ? 'bg-primary' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <Card className="max-w-2xl mx-auto p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      {...register('personalInfo.firstName')}
                      placeholder="First Name"
                    />
                    {errors.personalInfo?.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.personalInfo.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register('personalInfo.lastName')}
                      placeholder="Last Name"
                    />
                    {errors.personalInfo?.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.personalInfo.lastName.message}</p>
                    )}
                  </div>
                </div>
                <Input
                  {...register('personalInfo.email')}
                  type="email"
                  placeholder="Email"
                />
                {errors.personalInfo?.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.personalInfo.email.message}</p>
                )}
                <Input
                  {...register('personalInfo.phone')}
                  placeholder="Phone Number"
                />
                {errors.personalInfo?.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.personalInfo.phone.message}</p>
                )}
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Rugby Experience</h2>
                <Select
                  {...register('rugbyInfo.experience')}
                >
                  <option value="">Select Experience Level</option>
                  <option value="none">No Experience</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </Select>
                <Input
                  {...register('rugbyInfo.position')}
                  placeholder="Preferred Position (optional)"
                />
                <Input
                  {...register('rugbyInfo.previousClub')}
                  placeholder="Previous Club (optional)"
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Emergency Contact</h2>
                <Input
                  {...register('emergencyContact.name')}
                  placeholder="Contact Name"
                />
                {errors.emergencyContact?.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.emergencyContact.name.message}</p>
                )}
                <Input
                  {...register('emergencyContact.relationship')}
                  placeholder="Relationship"
                />
                {errors.emergencyContact?.relationship && (
                  <p className="text-red-500 text-sm mt-1">{errors.emergencyContact.relationship.message}</p>
                )}
                <Input
                  {...register('emergencyContact.phone')}
                  placeholder="Contact Phone Number"
                />
                {errors.emergencyContact?.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.emergencyContact.phone.message}</p>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Review Your Information</h2>
                {/* Add a summary of all entered information here */}
                <div className="bg-gray-50 p-4 rounded">
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(watch(), null, 2)}
                  </pre>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit">
                  Submit Application
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
} 