'use client'

import CoreCompetencies from '@/app/components/content-blocks/CoreCompetencies'
import { Card } from "@/app/components/ui/card"
import { HeroCard } from "@/app/components/ui/HeroCard"
import QuickNav from '@/app/components/ui/QuickNav'
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/app/components/ui/tooltip'
import { Code, Database, Building2, FileCode, Network, Brain, Users, GraduationCap, Cog, PenTool, Calculator, LineChart, Camera, Briefcase, ClipboardList, UserCheck, FileText, School, BookOpen, ListChecks, Building, Cpu } from 'lucide-react'

interface NAICSCode {
  code: string;
  description: string;
  relevance: 'primary' | 'secondary' | 'tertiary';
  icon: React.ElementType;
  category: string;
}

interface RelevanceInfo {
  title: string;
  description: string;
  capabilities: string[];
}

const relevanceDescriptions: Record<'primary' | 'secondary' | 'tertiary', RelevanceInfo> = {
  primary: {
    title: 'Core Technology Services',
    description: 'Direct alignment with our primary mission of federal IT modernization',
    capabilities: [
      'Custom Software Development',
      'Cloud Architecture & Migration',
      'System Integration',
      'IT Infrastructure Management'
    ]
  },
  secondary: {
    title: 'Technical Support Services',
    description: 'Essential capabilities that enhance our core technology offerings',
    capabilities: [
      'Engineering & Design',
      'Technical Consulting',
      'Process Optimization',
      'Research & Development'
    ]
  },
  tertiary: {
    title: 'Auxiliary Services',
    description: 'Supporting services that complete our comprehensive solution portfolio',
    capabilities: [
      'Training & Education',
      'Administrative Support',
      'Documentation Services',
      'Professional Development'
    ]
  }
}

const naicsCodes: NAICSCode[] = [
  // Primary Relevance - Core IT Services
  {
    code: '541511',
    description: 'Custom Computer Programming Services',
    relevance: 'primary',
    icon: Code,
    category: 'Core Technology'
  },
  {
    code: '541513',
    description: 'Computer Facilities Management Services',
    relevance: 'primary',
    icon: Database,
    category: 'Core Technology'
  },
  {
    code: '541519',
    description: 'Other Computer Related Services',
    relevance: 'primary',
    icon: Cog,
    category: 'Core Technology'
  },
  
  // Secondary Relevance - Technical Services
  {
    code: '541330',
    description: 'Engineering Services',
    relevance: 'secondary',
    icon: FileCode,
    category: 'Engineering'
  },
  {
    code: '541430',
    description: 'Graphic Design Services',
    relevance: 'secondary',
    icon: PenTool,
    category: 'Design'
  },
  {
    code: '541611',
    description: 'Administrative Management Consulting Services',
    relevance: 'secondary',
    icon: Building2,
    category: 'Consulting'
  },
  {
    code: '541612',
    description: 'Human Resources Consulting Services',
    relevance: 'secondary',
    icon: Users,
    category: 'Consulting'
  },
  {
    code: '541614',
    description: 'Process & Logistics Consulting Services',
    relevance: 'secondary',
    icon: Network,
    category: 'Consulting'
  },
  {
    code: '541618',
    description: 'Other Management Consulting Services',
    relevance: 'secondary',
    icon: Briefcase,
    category: 'Consulting'
  },
  {
    code: '541690',
    description: 'Other Scientific & Technical Consulting Services',
    relevance: 'secondary',
    icon: Brain,
    category: 'Technical Services'
  },
  {
    code: '541720',
    description: 'Research & Development in Social Sciences',
    relevance: 'secondary',
    icon: LineChart,
    category: 'Research'
  },
  
  // Tertiary Relevance - Support Services
  {
    code: '522320',
    description: 'Financial Transaction Processing',
    relevance: 'tertiary',
    icon: Calculator,
    category: 'Financial Services'
  },
  {
    code: '541921',
    description: 'Photography Services',
    relevance: 'tertiary',
    icon: Camera,
    category: 'Media Services'
  },
  {
    code: '541990',
    description: 'All Other Professional Services',
    relevance: 'tertiary',
    icon: Briefcase,
    category: 'Professional Services'
  },
  {
    code: '561110',
    description: 'Office Administrative Services',
    relevance: 'tertiary',
    icon: ClipboardList,
    category: 'Administrative'
  },
  {
    code: '561320',
    description: 'Temporary Help Services',
    relevance: 'tertiary',
    icon: UserCheck,
    category: 'Staffing'
  },
  {
    code: '561410',
    description: 'Document Preparation Services',
    relevance: 'tertiary',
    icon: FileText,
    category: 'Administrative'
  },
  {
    code: '561421',
    description: 'Telephone Answering Services',
    relevance: 'tertiary',
    icon: Network,
    category: 'Support Services'
  },
  {
    code: '561499',
    description: 'All Other Business Support Services',
    relevance: 'tertiary',
    icon: Briefcase,
    category: 'Support Services'
  },
  {
    code: '611420',
    description: 'Computer Training',
    relevance: 'tertiary',
    icon: GraduationCap,
    category: 'Education'
  },
  {
    code: '611430',
    description: 'Professional Development Training',
    relevance: 'tertiary',
    icon: School,
    category: 'Education'
  },
  {
    code: '611710',
    description: 'Educational Support Services',
    relevance: 'tertiary',
    icon: BookOpen,
    category: 'Education'
  }
]

export default function ServicesPage() {
  const serviceLinks = [
    { href: '#top', icon: '🏠', label: 'Top' },
    { href: '#competencies', icon: '💡', label: 'Core Competencies' },
    { href: '#naics', icon: '📋', label: 'NAICS Codes' },
  ]

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,140,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,140,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,140,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,140,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div id="top">
            <HeroCard
              imageSrc="/assets/services-hero.png"
              imageAlt="Federal IT Services Pixel Art"
              title="Our Services"
              subtitle="capabilities"
              description="Comprehensive IT solutions tailored for federal agencies and contractors, delivering cutting-edge technology services with proven expertise"
              badges={[
                { text: "20+ NAICS Codes", icon: <ListChecks className="w-4 h-4" />, variant: "default" },
                { text: "Federal Contractor", icon: <Building className="w-4 h-4" />, variant: "outline" },
                { text: "IT Modernization", icon: <Cpu className="w-4 h-4" />, variant: "glow" }
              ]}
            />
          </div>

          {/* Core Competencies Section */}
          <div id="competencies" className="scroll-mt-16">
            <CoreCompetencies />
          </div>

          {/* NAICS Codes Section */}
          <section id="naics" className="mt-16 scroll-mt-16">
            <div className="text-right mb-12">
              <h2 className="text-3xl font-bold text-[#FF8C00] dark:text-[#FF8C00] sm:text-4xl mb-4 font-nasalization">
                NAICS Codes<sup className="text-[0.6em] font-mono">classification</sup>
              </h2>
              <p className="text-lg text-text-light dark:text-text-dark font-mono ml-auto max-w-2xl">
                Federal classification codes defining our service categories
              </p>
            </div>
            
            <TooltipProvider>
              <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                style={{ position: 'static' }}
              >
                {naicsCodes.map((naics, index) => (
                  <div
                    key={naics.code}
                    className="animate-fade-in"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      position: 'relative'
                    }}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Card 
                          className={`
                            p-6 hover:shadow-lg transition-all duration-300 cursor-help
                            ${naics.relevance === 'primary' 
                              ? 'border-2 border-[#FF8C00] bg-gray-50 dark:bg-gray-900/90' 
                              : naics.relevance === 'secondary'
                              ? 'border border-orange-300 bg-gray-100 dark:bg-gray-900/80'
                              : 'border border-orange-200 bg-gray-100 dark:bg-gray-900/70'}
                          `}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FF8C00] bg-opacity-20">
                              <naics.icon className="w-6 h-6 text-[#FF8C00]" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-mono font-bold text-[#FF8C00] mb-2">
                                {naics.code}
                              </h3>
                              <p className="text-gray-700 dark:text-gray-300">
                                {naics.description}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="top" 
                        align="center"
                        sideOffset={5}
                        className="z-[100] w-80 bg-white dark:bg-gray-900 border border-[#FF8C00]/20 shadow-xl"
                        style={{
                          position: 'relative',
                          pointerEvents: 'auto'
                        }}
                      >
                        <div className="relative space-y-2">
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-gray-900/10 dark:from-gray-900/20 dark:to-gray-900/30" />
                          
                          <div className="relative z-10">
                            <h4 className="font-nasalization text-[#FF8C00]">
                              {relevanceDescriptions[naics.relevance].title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                              {relevanceDescriptions[naics.relevance].description}
                            </p>
                            <div className="pt-2">
                              <div className="text-xs text-gray-500 dark:text-gray-400 font-mono mb-1">
                                Core Capabilities:
                              </div>
                              <ul className="space-y-1">
                                {relevanceDescriptions[naics.relevance].capabilities.map((capability, idx) => (
                                  <li 
                                    key={idx} 
                                    className="text-sm flex items-start gap-2 text-gray-600 dark:text-gray-300"
                                  >
                                    <span className="w-1.5 h-1.5 bg-[#FF8C00] rounded-full mt-2"></span>
                                    <span>{capability}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </TooltipProvider>
          </section>
        </div>

        <QuickNav links={serviceLinks} />
      </div>
    </>
  )
} 