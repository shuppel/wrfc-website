'use client'

import { Gift, Code, Database, Clipboard, Calculator, Lightbulb } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion"
import { Card } from "@/app/components/ui/card"
import { useState } from 'react'

interface ServiceItem {
  category: string;
  items: string[];
}

interface CoreCompetency {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  services: ServiceItem[];
}

const coreCompetencies: CoreCompetency[] = [
  {
    id: 'audit',
    title: 'IT Audit & Advisory',
    icon: Clipboard,
    description: 'Comprehensive IT audit and advisory services',
    services: [
      {
        category: 'IT Audit',
        items: [
          'SaaS Product Testing, Validation and Benchmarking',
          'Transformation & Organizational Architecture Discovery',
          'Analysis of Alternatives and Product Procurement Advisory',
          'Functional Requirements Mapping and System Engineering',
          'IT Product Risk Analysis & Assessments'
        ]
      },
      {
        category: 'Advisory/Consulting Services',
        items: [
          'U3 (User Experience, Interaction Design, Research)',
          'Customer Experience (CX) and IT Service Management (ITSM)',
          'FinOps and IT Spend Modernization'
        ]
      }
    ]
  },
  // ... rest of the core competencies remain the same
]

export default function CoreCompetencies() {
  // Track expanded sections for each competency
  const [expandedSections, setExpandedSections] = useState<Record<string, string[]>>({})

  const handleAccordionChange = (competencyId: string, values: string[]) => {
    setExpandedSections(prev => ({
      ...prev,
      [competencyId]: values
    }))
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background-light to-white dark:from-background-dark dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-right mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-[#FF8C00] dark:text-[#FF8C00] sm:text-4xl mb-4 font-nasalization">
            Core Competencies<sup className="text-[0.6em] font-mono">expertise</sup>
          </h2>
          <p className="text-xl text-text-light dark:text-text-dark sm:text-lg md:text-xl font-mono ml-auto max-w-2xl">
            Transforming federal IT through strategic innovation and operational excellence. 
            Where vision meets execution in government technology solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreCompetencies.map((competency, index) => (
            <div
              key={competency.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 border-primary-light dark:border-primary-dark border-opacity-20">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FF8C00] bg-opacity-20 mr-4">
                      <competency.icon className="w-6 h-6 text-[#FF8C00]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#FF8C00]">{competency.title}</h3>
                  </div>
                  <p className="text-text-light dark:text-text-dark mb-4">{competency.description}</p>
                  <Accordion 
                    type="multiple" 
                    className="w-full"
                    value={expandedSections[competency.id] || []}
                    onValueChange={(value) => handleAccordionChange(competency.id, value)}
                  >
                    {competency.services.map((service, serviceIndex) => (
                      <AccordionItem 
                        key={serviceIndex} 
                        value={`${competency.id}-${serviceIndex}`}
                        className="border-b border-slate-200 dark:border-slate-700 last:border-0"
                      >
                        <AccordionTrigger className="text-left text-slate-800 dark:text-slate-200 hover:text-[#FF8C00] dark:hover:text-[#FF8C00] transition-colors duration-300">
                          {service.category}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            {service.items.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="flex items-center text-text-light dark:text-text-dark animate-slide-in"
                                style={{ animationDelay: `${itemIndex * 50}ms` }}
                              >
                                <span className="w-1.5 h-1.5 bg-[#FF8C00] rounded-full mr-2"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}