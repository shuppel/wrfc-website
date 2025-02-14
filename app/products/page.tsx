'use client'

import { Book, Brain, FileCode, GitFork, Settings, ShieldCheck, Boxes, Sparkles, Rocket } from 'lucide-react'
import { HeroCard } from "@/app/components/ui/HeroCard"
import { ChevronCard } from "@/app/components/ui/chevron-card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion"

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
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,140,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,140,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,140,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,140,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-left mb-12">
          <HeroCard
            icon="🚀"
            title="Our Products"
            subtitle="solutions"
            description="Empowering development through structured methodologies and AI-driven solutions"
            badges={[
              { text: "6 Product Lines", icon: <Boxes className="w-4 h-4" />, variant: "default" },
              { text: "AI-Powered", icon: <Sparkles className="w-4 h-4" />, variant: "glow" },
              { text: "Enterprise Ready", icon: <Rocket className="w-4 h-4" />, variant: "outline" }
            ]}
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {products.map((product, idx) => (
            <ChevronCard
              key={product.name}
              icon={<product.icon className="h-8 w-8 text-[#FF8C00]" />}
              title={product.name}
              description={product.description}
              index={idx}
            >
              <Accordion type="single" collapsible className="w-full">
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
            </ChevronCard>
          ))}
        </div>
      </div>
    </div>
  )
}

