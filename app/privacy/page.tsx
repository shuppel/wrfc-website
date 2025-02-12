import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header Section with Visual Impact */}
        <div className="text-center space-y-4">
          <div className="inline-block p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg mb-4">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 sm:text-5xl">
              Privacy Policy
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        </div>
        
        {/* Main Content with Enhanced Typography and Layout */}
        <div className="mt-16 prose dark:prose-invert prose-lg max-w-none">
          {/* Introduction with Card Style */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-12 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              At Nodetus Integrators LLC, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </div>

          {/* Information Collection Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-12 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </span>
              Information We Collect
            </h2>
            
            <div className="space-y-8">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We may collect personal information that you voluntarily provide when interacting with Nodetus Integrators LLC&apos;s website, including:
                </p>
                <ul className="list-none space-y-2">
                  {[
                    'Name and contact information',
                    'Email address',
                    'Company information',
                    'Any other information you choose to provide'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                      <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Automatically Collected Information</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  When you visit our website, Nodetus Integrators LLC may automatically collect certain information about your device, including:
                </p>
                <ul className="list-none space-y-2">
                  {[
                    'IP address',
                    'Browser type',
                    'Operating system',
                    'Access times and pages viewed'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                      <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Information Usage Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-12 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              How We Use Your Information
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Nodetus Integrators LLC may use the information we collect for various purposes, including:
              </p>
              <ul className="list-none space-y-2">
                {[
                  'Providing and maintaining our services',
                  'Responding to your inquiries and requests',
                  'Sending you technical notices and updates',
                  'Improving our website and services',
                  'Complying with legal obligations'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              Contact Us
            </h2>
            <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <address className="not-italic text-gray-600 dark:text-gray-300 font-medium">
                <span className="font-semibold">Nodetus Integrators LLC</span><br />
                2833 S Wakefield St Unit C<br />
                Arlington, VA 22206<br />
                United States
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 