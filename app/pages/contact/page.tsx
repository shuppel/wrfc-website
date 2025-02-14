'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Building2, User, Send, CheckCircle2, XCircle, Clock4, Zap, Shield } from 'lucide-react';
import { HeroCard } from "@/app/components/ui/HeroCard";

interface FormData {
  name: string;
  email: string;
  company?: string;
  sector: 'federal' | 'state' | 'local' | 'commercial' | 'non-profit' | 'other';
  service: 'project-management' | 'ai-consulting' | 'acquisition-it' | 'data-engineering' | 
          'app-development' | 'mobile-development' | 'design-ux' | 'process-engineering' |
          'change-management' | 'other';
  message: string;
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      sector: undefined,
      service: undefined,
      message: ''
    }
  });

  const onSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Replace with actual API endpoint
      console.log('Form submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      reset();
    } catch (err) {
      console.error('Form submission error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,140,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,140,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,140,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,140,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroCard
          icon="📧"
          title="Contact Us"
          subtitle="connect"
          description="Let&apos;s discuss how we can help transform your organization with innovative technology solutions"
          badges={[
            { text: "24/7 Support", icon: <Clock4 className="w-4 h-4" />, variant: "glow" },
            { text: "Quick Response", icon: <Zap className="w-4 h-4" />, variant: "outline" },
            { text: "Secure Communication", icon: <Shield className="w-4 h-4" />, variant: "default" }
          ]}
        />

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg 
                       border border-orange-100/50 dark:border-orange-500/10
                       hover:shadow-[0_0_30px_rgba(255,140,0,0.15)] 
                       transition-all duration-500 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Name Field */}
                <div className="group">
                  <label htmlFor="name" className="input-label">
                    <div className="flex items-center">
                      <div className="icon-container">
                        <User className="icon-base icon-sm" />
                      </div>
                      Full Name
                    </div>
                  </label>
                  <input
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                      maxLength: { value: 50, message: 'Name must be less than 50 characters' }
                    })}
                    type="text"
                    id="name"
                    className="input-base hover:border-[#FF8C00] focus:border-[#FF8C00] transition-colors duration-300"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-2 text-red-500 dark:text-red-400 animate-slide-in text-sm">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="group">
                  <label htmlFor="email" className="input-label">
                    <div className="flex items-center">
                      <div className="icon-container">
                        <Mail className="icon-base icon-sm" />
                      </div>
                      Email Address
                    </div>
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    type="email"
                    id="email"
                    className="input-base hover:border-[#FF8C00] focus:border-[#FF8C00] transition-colors duration-300"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-red-500 dark:text-red-400 animate-slide-in text-sm">{errors.email.message}</p>
                  )}
                </div>

                {/* Company Field */}
                <div className="group">
                  <label htmlFor="company" className="input-label">
                    <div className="flex items-center">
                      <div className="icon-container">
                        <Building2 className="icon-base icon-sm" />
                      </div>
                      Company Name
                    </div>
                  </label>
                  <input
                    {...register('company', {
                      maxLength: { value: 100, message: 'Company name must be less than 100 characters' }
                    })}
                    type="text"
                    id="company"
                    className="input-base hover:border-[#FF8C00] focus:border-[#FF8C00] transition-colors duration-300"
                    placeholder="Your Company (Optional)"
                  />
                  {errors.company && (
                    <p className="mt-2 text-red-500 dark:text-red-400 animate-slide-in text-sm">{errors.company.message}</p>
                  )}
                </div>

                {/* Sector Field */}
                <div className="group">
                  <label htmlFor="sector" className="input-label">
                    <div className="flex items-center">
                      <div className="icon-container">
                        <Building2 className="icon-base icon-sm" />
                      </div>
                      Sector
                    </div>
                  </label>
                  <select
                    {...register('sector', {
                      required: 'Please select a sector'
                    })}
                    id="sector"
                    className="input-base hover:border-[#FF8C00] focus:border-[#FF8C00] transition-colors duration-300"
                  >
                    <option value="">Select your sector</option>
                    <option value="federal">Federal Government</option>
                    <option value="state">State Government</option>
                    <option value="local">Local Government</option>
                    <option value="commercial">Commercial</option>
                    <option value="non-profit">Non-Profit</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.sector && (
                    <p className="mt-2 text-red-500 dark:text-red-400 animate-slide-in text-sm">{errors.sector.message}</p>
                  )}
                </div>

                {/* Service Field */}
                <div className="group">
                  <label htmlFor="service" className="input-label">
                    <div className="flex items-center">
                      <div className="icon-container">
                        <Send className="icon-base icon-sm" />
                      </div>
                      Service Needed
                    </div>
                  </label>
                  <select
                    {...register('service', {
                      required: 'Please select a service'
                    })}
                    id="service"
                    className="input-base hover:border-[#FF8C00] focus:border-[#FF8C00] transition-colors duration-300"
                  >
                    <option value="">Select a service</option>
                    <optgroup label="Core Services">
                      <option value="project-management">Project Management</option>
                      <option value="process-engineering">Process Engineering</option>
                      <option value="change-management">Change Management</option>
                    </optgroup>
                    <optgroup label="Technology">
                      <option value="ai-consulting">AI Consulting</option>
                      <option value="acquisition-it">Acquisition IT</option>
                      <option value="data-engineering">Data Engineering</option>
                    </optgroup>
                    <optgroup label="Development">
                      <option value="app-development">App Development</option>
                      <option value="mobile-development">Mobile Development</option>
                    </optgroup>
                    <optgroup label="Design">
                      <option value="design-ux">Design & UX</option>
                    </optgroup>
                    <optgroup label="Other">
                      <option value="other">Other Services</option>
                    </optgroup>
                  </select>
                  {errors.service && (
                    <p className="mt-2 text-red-500 dark:text-red-400 animate-slide-in text-sm">{errors.service.message}</p>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div className="group">
                <label htmlFor="message" className="input-label">
                  <div className="flex items-center">
                    <div className="icon-container">
                      <Mail className="icon-base icon-sm" />
                    </div>
                    Project Details
                  </div>
                </label>
                <textarea
                  {...register('message', {
                    required: 'Message is required',
                    minLength: { value: 10, message: 'Message must be at least 10 characters' },
                    maxLength: { value: 1000, message: 'Message must be less than 1000 characters' }
                  })}
                  id="message"
                  rows={4}
                  className="input-base resize-none hover:border-[#FF8C00] focus:border-[#FF8C00] transition-colors duration-300"
                  placeholder="Tell us about your project..."
                />
                {errors.message && (
                  <p className="mt-2 text-red-500 dark:text-red-400 animate-slide-in text-sm">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="button-primary"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <span>Submit Request</span>
                  )}
                </button>
              </div>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="text-center p-4 rounded-lg animate-fade-in card-gradient">
                  <div className="flex items-center justify-center space-x-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="icon-base text-emerald-600 dark:text-emerald-400" />
                    <span>Thank you! We&apos;ll be in touch soon.</span>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="text-center p-4 rounded-lg animate-fade-in bg-red-50 dark:bg-red-900/20">
                  <div className="flex items-center justify-center space-x-2 text-red-600 dark:text-red-400">
                    <XCircle className="icon-base text-red-600 dark:text-red-400" />
                    <span>Something went wrong. Please try again later.</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 