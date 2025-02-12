'use client'

import { Gift, Database, Clipboard, Calculator, Lightbulb, Workflow } from 'lucide-react'
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
    description: 'Comprehensive IT assessment and advisory services focusing on security, compliance, and modernization strategies',
    services: [
      {
        category: 'IT Audit',
        items: [
          'SaaS Product Testing & Validation',
          'IT Architecture Assessment',
          'Product Selection & Integration Strategy',
          'System Engineering & Requirements Analysis'
        ]
      },
      {
        category: 'Cybersecurity',
        items: [
          'Security Architecture Assessment',
          'Zero Trust Implementation',
          'Security Compliance Consulting (NIST, FedRAMP)',
          'Cloud Security Posture Management'
        ]
      },
      {
        category: 'AI/ML Services',
        items: [
          'LLM Implementation & Integration',
          'AI Model Validation & Testing',
          'Responsible AI Framework Development',
          'AI Security & Compliance'
        ]
      }
    ]
  },
  {
    id: 'process',
    title: 'Process Excellence',
    icon: Workflow,
    description: 'Transformative business process optimization and customer experience enhancement through modern methodologies',
    services: [
      {
        category: 'Process Optimization',
        items: [
          'Business Process Re-engineering',
          'Workflow Automation',
          'Process Mining & Analysis',
          'Quality Management Systems'
        ]
      },
      {
        category: 'Customer Experience',
        items: [
          'Service Design & Journey Mapping',
          'User Research & Analytics',
          'Experience Strategy Development',
          'Digital Transformation Consulting'
        ]
      },
      {
        category: 'Change Management',
        items: [
          'Organizational Change Strategy',
          'Training & Adoption Programs',
          'Process Documentation',
          'Performance Metrics & KPIs'
        ]
      }
    ]
  },
  {
    id: 'proacq',
    title: 'ProAcq & Finance',
    icon: Calculator,
    description: 'Strategic procurement and financial management services optimizing federal IT investments and acquisition processes',
    services: [
      {
        category: 'IT Procurement',
        items: [
          'Pre-Award Strategy & Solicitation',
          'FAR & Contracting Office Support',
          'Clause Mapping and Logic Building',
          'IT Acquisition Risk Management'
        ]
      },
      {
        category: 'IT Financial Management',
        items: [
          'IT Cost Optimization',
          'FinOps Implementation',
          'IT Investment Strategy',
          'Cloud Cost Management'
        ]
      }
    ]
  },
  {
    id: 'emergent',
    title: 'Emergent Tech',
    icon: Lightbulb,
    description: 'Cutting-edge technology integration and innovation services leveraging AI, mixed reality, and cloud-native solutions',
    services: [
      {
        category: 'Innovation Services',
        items: [
          'AI Prompt Engineering Consulting',
          'Mixed Reality/AR Solutions',
          '3D Printing/Modeling R&D',
          'Zero Trust Architecture',
          'Cloud Native Transformation'
        ]
      }
    ]
  },
  {
    id: 'product',
    title: 'Product & Program',
    icon: Gift,
    description: 'Comprehensive program management and technical leadership delivering successful federal IT initiatives through agile methodologies',
    services: [
      {
        category: 'Management Services',
        items: [
          'Federal IT Portfolio Management',
          'Agile Program Management',
          'DevSecOps Implementation',
          'Technical Risk Management'
        ]
      }
    ]
  },
  {
    id: 'data',
    title: 'Data Engineering',
    icon: Database,
    description: 'Advanced data architecture and analytics solutions enabling data-driven decision making and AI/ML capabilities',
    services: [
      {
        category: 'Data Services',
        items: [
          'Data Architecture & Engineering',
          'AI/ML Pipeline Development',
          'Data Security & Governance',
          'Business Intelligence Solutions',
          'Quantitative Analysis'
        ]
      }
    ]
  }
]

export default function CoreCompetencies() {
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
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreCompetencies.map((competency, index) => (
            <div
              key={competency.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FF8C00] bg-opacity-20 mr-4">
                      <competency.icon className="w-6 h-6 text-[#FF8C00]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#FF8C00]">{competency.title}</h3>
                      <p className="text-sm text-text-light dark:text-text-dark opacity-75">{competency.description}</p>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <Accordion 
                      type="multiple" 
                      value={expandedSections[competency.id] || []}
                      onValueChange={(value) => handleAccordionChange(competency.id, value)}
                      className="w-full"
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
                          <AccordionContent className="overflow-hidden transition-all duration-300">
                            <ul className="space-y-2">
                              {service.items.map((item, itemIndex) => (
                                <li
                                  key={itemIndex}
                                  className="flex items-start gap-2 text-text-light dark:text-text-dark"
                                >
                                  <span className="w-1.5 h-1.5 bg-[#FF8C00] rounded-full mt-2"></span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}