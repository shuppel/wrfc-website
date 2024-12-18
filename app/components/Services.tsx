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
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Services</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Comprehensive IT Solutions
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Discover how Nodetus can transform your business with our range of services.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {services.map((service, index) => (
              <Card
                key={service.name}
                className="relative animate-fade-in p-6 hover:shadow-lg transition-shadow duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <service.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{service.name}</p>
                </dt>
                <dd className="mt-2 ml-16">
                  <p className="text-base text-gray-500 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-2 text-gray-500"
                      >
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </Card>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

