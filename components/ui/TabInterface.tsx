'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TabData {
  id: string;
  title: string;
  content: {
    heading: string;
    paragraphs: string[];
  };
}

const tabs: TabData[] = [
  {
    id: 'about',
    title: 'About',
    content: {
      heading: 'About',
      paragraphs: [
        'This is an about section about my company',
        'This is what I am about'
      ]
    }
  },
  {
    id: 'services',
    title: 'Services',
    content: {
      heading: 'Services',
      paragraphs: [
        'This is an about section about my services company',
        'This is what we are about'
      ]
    }
  },
  {
    id: 'clients',
    title: 'Clients',
    content: {
      heading: 'Clients',
      paragraphs: [
        'These are the people that I have helped.',
        'They were happy with my service.'
      ]
    }
  },
  {
    id: 'OSU',
    title: 'Open Source Learning',
    content: {
      heading: 'Open Source University',
      paragraphs: [
        'These are my credentials from using open source content.',
        'Look at me learn.'
      ]
    }
  }
];

export default function TabInterface() {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Prevents hydration issues
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar Navigation */}
      <nav className="md:w-64 bg-gray-800 text-white p-6">
        <ul className="space-y-4">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white'
                    : 'hover:bg-gray-700'
                }`}
              >
                {tab.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content Area */}
      <main className="flex-1 p-8">
        <AnimatePresence mode="wait">
          {tabs.map((tab) => (
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="max-w-3xl mx-auto"
              >
                <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
                  {tab.content.heading}
                </h1>
                {tab.content.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg mb-4 text-gray-600 dark:text-gray-100"
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </main>
    </div>
  );
} 