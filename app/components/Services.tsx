'use client'

import { Cloud, Code, Database, Lock } from 'lucide-react'
import { Card } from "@/app/components/ui/card"

const services = [
  {
    name: 'Cloud Services',
    description: 'Scalable and secure cloud solutions to power your business.',
    icon: Cloud,
    items: [
      'Cloud Migration',
      'Cloud Architecture Design',
      'Cloud Security',
      'Cloud Cost Optimization'
    ]
  },
  {
    name: 'Custom Software Development',
    description: 'Tailored software solutions to meet your unique needs.',
    icon: Code,
    items: [
      'Web Applications',
      'Mobile Applications',
      'API Development',
      'Legacy System Modernization'
    ]
  },
  {
    name: 'Data Management',
    description: 'Efficient data storage, processing, and analytics solutions.',
    icon: Database,
    items: [
      'Database Design',
      'Data Warehousing',
      'Data Analytics',
      'Business Intelligence'
    ]
  },
  {
    name: 'Cybersecurity',
    description: 'Protect your digital assets with our advanced security measures.',
    icon: Lock,
    items: [
      'Security Assessments',
      'Threat Detection',
      'Compliance Management',
      'Security Training'
    ]
  },
]

export default function Services() {
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-right mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-[#FF8C00] dark:text-[#FF8C00] sm:text-4xl mb-4 font-nasalization">
            Our Services<sup className="text-[0.6em] font-mono">capabilities</sup>
          </h2>
          <p className="text-xl text-slate-800 dark:text-slate-200 sm:text-lg md:text-xl font-mono ml-auto max-w-2xl">
            Discover how Nodetus can transform your business with our range of services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.name}
              className="bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FF8C00] bg-opacity-20 mr-4">
                    <service.icon className="h-6 w-6 text-[#FF8C00]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#FF8C00]">{service.name}</h3>
                    <p className="text-sm text-slate-800 dark:text-slate-200 opacity-75">{service.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-2 text-slate-800 dark:text-slate-200"
                    >
                      <span className="w-1.5 h-1.5 bg-[#FF8C00] rounded-full mt-2"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

