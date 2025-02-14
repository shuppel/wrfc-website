'use client'

import { Gift, Database, Clipboard, Calculator, Lightbulb, Workflow } from 'lucide-react'
import { ChevronCard } from "@/app/components/ui/chevron-card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion"
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
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-right mb-12">
          <h2 className="text-3xl font-bold text-[#FF8C00] dark:text-[#FF8C00] sm:text-4xl mb-4 font-nasalization">
            Core Competencies<sup className="text-[0.6em] font-mono">expertise</sup>
          </h2>
          <p className="text-xl text-text-light dark:text-text-dark sm:text-lg md:text-xl font-mono ml-auto max-w-2xl">
            Transforming federal IT through strategic innovation and operational excellence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coreCompetencies.map((competency, idx) => (
            <ChevronCard
              key={competency.id}
              icon={<competency.icon className="h-8 w-8 text-[#FF8C00]" />}
              title={competency.title}
              description={competency.description}
              index={idx}
            >
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
                    className="border-b border-slate-200/50 dark:border-slate-700/50 last:border-none"
                  >
                    <AccordionTrigger
                      className="accordion-trigger flex items-center justify-between w-full py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-[#FF8C00] transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 shrink-0 text-[#FF8C00]/70 group-hover:text-[#FF8C00]"
                        >
                          <path d="m9 18 6-6-6-6"/>
                        </svg>
                        {service.category}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="accordion-content pt-2 overflow-hidden">
                      <ul className="space-y-2">
                        {service.items.map((item, itemIndex) => (
                          <li 
                            key={itemIndex}
                            className="text-sm text-slate-500 dark:text-slate-400 pl-6 border-l-2 border-[#FF8C00]/20
                                      hover:text-slate-900 dark:hover:text-slate-200 hover:border-[#FF8C00] 
                                      transition-all duration-300
                                      font-mono relative group/item"
                          >
                            <span className="absolute left-2 text-[#FF8C00]/70 group-hover/item:text-[#FF8C00]">$</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ChevronCard>
          ))}
        </div>
      </div>
    </section>
  )
}