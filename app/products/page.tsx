'use client'

import { Book, Brain, FileCode, GitFork, Settings, ShieldCheck } from 'lucide-react'
import { Card } from "@/app/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion"
import { useState } from 'react'

const products = [
  {
    name: 'AI Prompt Libraries',
    description: 'Curated collections of optimized prompts for various AI applications.',
    icon: Brain,
    categories: [
      {
        name: 'Development Prompts',
        items: [
          'Code Generation & Optimization',
          'Architecture Planning',
          'Testing Strategy',
          'Documentation Generation',
          'Code Review Assistance'
        ]
      },
      {
        name: 'Document Management',
        items: [
          'Content Classification',
          'Information Extraction',
          'Document Summarization',
          'Metadata Generation',
          'Format Conversion'
        ]
      }
    ]
  },
  {
    name: 'Rubrics & Best Practices',
    description: 'Comprehensive evaluation frameworks and industry standards.',
    icon: Book,
    categories: [
      {
        name: 'Development Standards',
        items: [
          'Code Quality Metrics',
          'Architecture Patterns',
          'Security Guidelines',
          'Performance Benchmarks',
          'Accessibility Standards'
        ]
      },
      {
        name: 'Process Guidelines',
        items: [
          'Project Management',
          'Quality Assurance',
          'Documentation Standards',
          'Team Collaboration',
          'Risk Management'
        ]
      }
    ]
  },
  {
    name: 'Methodologies',
    description: 'Structured approaches for efficient development and management.',
    icon: GitFork,
    categories: [
      {
        name: 'Development Methodologies',
        items: [
          'Agile Development',
          'DevOps Practices',
          'CI/CD Implementation',
          'Test-Driven Development',
          'Microservices Architecture'
        ]
      },
      {
        name: 'Management Frameworks',
        items: [
          'Project Lifecycle',
          'Resource Allocation',
          'Risk Assessment',
          'Quality Management',
          'Change Management'
        ]
      }
    ]
  },
  {
    name: 'Code Libraries',
    description: 'Reusable code components and utilities for rapid development.',
    icon: FileCode,
    categories: [
      {
        name: 'Frontend Components',
        items: [
          'UI Component Library',
          'State Management',
          'Form Validation',
          'Data Visualization',
          'Animation Utilities'
        ]
      },
      {
        name: 'Backend Services',
        items: [
          'API Integration',
          'Authentication',
          'Data Processing',
          'Error Handling',
          'Performance Optimization'
        ]
      }
    ]
  },
  {
    name: 'Configurations & Integrations',
    description: 'Advanced configuration templates and integration solutions for development workflows.',
    icon: Settings,
    categories: [
      {
        name: 'Development Configurations',
        items: [
          'Cursor IDE Settings',
          'MCP Integration Templates',
          'Custom Bot Configurations',
          'API Integration Setups',
          'Workflow Automation Scripts'
        ]
      },
      {
        name: 'External Integrations',
        items: [
          'Custom MCP Bot Development',
          'Third-party API Connectors',
          'Authentication Configurations',
          'Data Pipeline Setup',
          'Monitoring & Logging'
        ]
      }
    ]
  },
  {
    name: 'IT Advisory & Acquisitions',
    description: 'Comprehensive evaluation frameworks and risk assessment tools for IT product decisions.',
    icon: ShieldCheck,
    categories: [
      {
        name: 'Product Evaluation',
        items: [
          'SaaS Product Testing',
          'Technical Due Diligence',
          'Feature Compatibility Analysis',
          'Performance Benchmarking',
          'Integration Assessment'
        ]
      },
      {
        name: 'Risk Management',
        items: [
          'Security Risk Analysis',
          'Vendor Assessment',
          'Compliance Verification',
          'Cost-Benefit Analysis',
          'Product Lifecycle Assessment'
        ]
      },
      {
        name: 'Technical Analysis',
        items: [
          'Reverse Engineering Studies',
          'API Security Testing',
          'Data Privacy Evaluation',
          'Scalability Assessment',
          'Architecture Review'
        ]
      }
    ]
  }
]

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 relative overflow-hidden">
      {/* Animated background grid - adjusted for light/dark modes */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,140,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,140,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,140,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,140,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-24 animate-fade-in space-y-8">
          <div className="inline-block">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-[#FFA500] sm:text-6xl mb-4 font-nasalization tracking-wider relative group">
              Our Products
              <sup className="text-[0.4em] font-mono ml-2 text-[#FF8C00] opacity-0 group-hover:opacity-100 transition-opacity duration-300">[solutions]</sup>
              <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF8C00] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </h1>
          </div>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-['Press_Start_2P'] mx-auto max-w-3xl leading-loose relative">
            <span className="absolute -left-4 text-[#FF8C00] opacity-60">&lt;</span>
            Empowering development through structured methodologies and AI-driven solutions
            <span className="absolute -right-4 text-[#FF8C00] opacity-60">/&gt;</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 mt-12 md:grid-cols-2 perspective-1000">
          {products.map((product, idx) => (
            <Card 
              key={product.name} 
              className={`
                group p-8 backdrop-blur-sm 
                bg-white/70 dark:bg-slate-900/70 
                border-slate-200 dark:border-slate-700
                hover:shadow-[0_0_30px_rgba(255,140,0,0.15)] 
                transition-all duration-500 ease-out
                hover:translate-y-[-8px] hover:scale-[1.02]
                ${idx % 2 === 0 ? 'rotate-[-1deg]' : 'rotate-[1deg]'}
                relative overflow-hidden
              `}
            >
              {/* Animated corner accent */}
              <div className="absolute top-0 left-0 w-[100px] h-[100px] opacity-30">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[#FF8C00] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="absolute top-0 left-0 h-full w-[1px] bg-[#FF8C00] transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100" />
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 p-3 bg-[#FF8C00]/5 dark:bg-[#FF8C00]/10 rounded-lg group-hover:bg-[#FF8C00]/10 dark:group-hover:bg-[#FF8C00]/20 transition-colors duration-300">
                  <product.icon className="h-8 w-8 text-[#FF8C00]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 font-nasalization group-hover:text-[#FF8C00] transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 font-mono text-sm leading-relaxed">
                    {product.description}
                  </p>
                  <Accordion 
                    type="single" 
                    collapsible 
                    className="w-full"
                  >
                    {product.categories.map((category, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`item-${index}`}
                        className="border-slate-200/50 dark:border-slate-700/50 last:border-none"
                      >
                        <AccordionTrigger className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-[#FF8C00] transition-colors group">
                          <span className="font-mono mr-2 text-[#FF8C00]/70 group-hover:text-[#FF8C00]">&gt;</span>
                          {category.name}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-3 pt-2">
                            {category.items.map((item, itemIndex) => (
                              <li 
                                key={itemIndex}
                                className="text-sm text-slate-500 dark:text-slate-400 pl-6 border-l-2 border-[#FF8C00]/20
                                          hover:text-slate-900 dark:hover:text-slate-200 hover:border-[#FF8C00] 
                                          transition-all duration-300
                                          cursor-pointer font-mono relative group/item"
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
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

