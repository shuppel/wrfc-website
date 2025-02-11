'use client'

import CoreCompetencies from '@/app/components/CoreCompetencies'
import { Card } from "@/app/components/ui/card"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/app/components/ui/tooltip'
import { Code, Database, Building2, FileCode, Network, Brain, Users, GraduationCap, Cog, PenTool, Calculator, LineChart, Camera, Briefcase, ClipboardList, UserCheck, FileText, School, BookOpen } from 'lucide-react'
import Image from 'next/image'

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
  return (
    <main className="bg-background dark:bg-background transition-colors duration-300 min-h-screen">
      <div className="bg-paper dark:bg-paper relative">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12 animate-fade-in">
            <div className="w-64 h-64 relative flex-shrink-0 rounded-lg overflow-hidden shadow-2xl ring-4 ring-[#FF8C00]/30">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 to-gray-900/30 group-hover:opacity-80 transition-opacity duration-300" />
              <Image
                src="/assets/services-hero.png"
                alt="Federal IT Services Pixel Art"
                width={256}
                height={256}
                className="object-contain scale-100 hover:scale-110 transition-transform duration-500"
                priority
              />
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-4xl font-bold text-[#FF8C00] dark:text-[#FF8C00] sm:text-5xl mb-4 font-nasalization">
                Our Services<sup className="text-[0.6em] font-mono">capabilities</sup>
              </h1>
              <p className="text-xl text-text-light dark:text-text-dark sm:text-lg md:text-xl font-mono max-w-2xl">
                Comprehensive IT solutions tailored for federal agencies and contractors.
              </p>
            </div>
          </div>

          {/* Core Competencies Section */}
          <CoreCompetencies />

          {/* NAICS Codes Section */}
          <section className="mt-16">
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
                              ? 'border-2 border-[#FF8C00] bg-gray-900/90' 
                              : naics.relevance === 'secondary'
                              ? 'border border-orange-300 bg-gray-900/80'
                              : 'border border-orange-200 bg-gray-900/70'}
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
                              <p className="text-text-light dark:text-text-dark">
                                {naics.description}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="right" 
                        sideOffset={20}
                        className="z-[9999] w-80 bg-gray-900 border border-[#FF8C00]/20 shadow-xl"
                        style={{
                          position: 'absolute',
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
      </div>
    </main>
  )
} 