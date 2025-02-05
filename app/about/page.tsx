'use client'

import Image from 'next/image'
import { Linkedin, Rocket, Shield, Binary, Target, Zap, AlertCircle, DollarSign, Clock, Book, Users } from 'lucide-react'
import { Card } from "@/app/components/ui/card"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/app/components/ui/tooltip'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background-light to-white dark:from-background-dark dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {/* Profile Section */}
          <Card className="p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl ring-4 ring-[#FF8C00]/30 hover:ring-[#FF8C00]/50 transition-all duration-300">
                <div className="absolute inset-0 w-full h-full animate-float">
                  <Image
                    src="/assets/founder.jpg"
                    alt="Erikk Shupp"
                    width={300}
                    height={300}
                    className="object-cover object-center scale-125 hover:scale-135 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
              <div className="flex-grow text-center md:text-left">
                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-between">
                    <div>
                      <h2 className="text-4xl font-bold bg-gradient-to-r from-[#FF8C00] to-[#FFA500] bg-clip-text text-transparent">
                        Erikk Shupp
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-300 font-mono mt-1">Founder & CEO</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a 
                              href="https://www.linkedin.com/in/shupp-erikk/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group hover:shadow-[0_0_10px_rgba(10,102,194,0.3)]"
                            >
                              <Linkedin className="w-7 h-7 text-gray-400 group-hover:text-[#0A66C2]" />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Connect on LinkedIn</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a 
                              href="https://www.goodreads.com/shupp-erikk"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 rounded-full hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-300 group hover:shadow-[0_0_10px_rgba(55,34,19,0.3)]"
                            >
                              <Book className="w-7 h-7 text-gray-400 group-hover:text-[#372213]" />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Follow my reading list on Goodreads</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <p className="text-xl font-light text-gray-600 dark:text-gray-300 italic">
                    2nd Generation Korean-American entrepreneur revolutionizing IT Acquisition and Federal Technology Solutions
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Bio Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#FF8C00] mb-6">Vision & Leadership</h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p className="leading-relaxed">
                  "I think the beautiful thing about the United States, is we are a group of people from all over the world, 
                  who have integrated into melting pot of culture, band together and compete (latin for strive together)."
                </p>
                <p className="leading-relaxed">
                  At Nodetus, we've built our foundation on the principles of diligence, precision, and 
                  unwavering commitment to excellence - values I always applauded the east meets west mentality when it comes to technology. It's what makes us great, reinvention in the apperceptive lens.
                </p>

                {/* Pet Peeves Section */}
                <div className="mt-8">
                  <h4 className="text-xl font-semibold text-[#FF8C00] mb-4">Industry Pet Peeves</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      {
                        title: 'Vaporware Hype Cycles',
                        desc: 'Products that promise the world but deliver empty solutions',
                        icon: AlertCircle
                      },
                      {
                        title: 'Gold-Plated SaaS',
                        desc: 'Overpriced software with .blems',
                        icon: DollarSign
                      },
                      {
                        title: 'Innovation Theater',
                        desc: 'Companies that prioritize appearing innovative over delivering real value',
                        icon: Clock
                      }
                    ].map((peeve, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <peeve.icon className="w-5 h-5 text-red-500" />
                          <span className="font-medium text-gray-800 dark:text-gray-200">{peeve.title}</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 ml-8">{peeve.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#FF8C00] mb-6">Professional Journey</h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p className="leading-relaxed">
                  Erikk started with an English degree, then got a Master's in Technology Management and has since evolved into technology through open source learning. His unique journey from soft-skills to hard-skills shaped a holistic perspective spanning design, development and business. "The evolution of artificial intelligence - from LLMs to agentic models with human-in-the-loop, to models with human-like authenticators, and ultimately AGI - will dictate technology's future. Yet technology, however revolutionary, must remain secondary to human experience. In this sense, I am not a technologist - my heart forever resides with humanity." Erikk's focus is still the people, the people who propel agencies and missions that benefit the people built by the people.
                </p>
                <div className="mt-6">
                  <h4 className="text-xl font-semibold text-[#FF8C00] mb-4">Core Values</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        value: 'Innovation with Purpose',
                        icon: Rocket
                      },
                      {
                        value: 'Relentless Perseverance ("Grit")',
                        icon: Shield
                      },
                      {
                        value: 'Rapid Problem Resolution',
                        icon: Zap
                      },
                      {
                        value: 'Mission-Driven Operandum',
                        icon: Target
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <item.icon className="w-5 h-5 text-[#FF8C00]" />
                        <span className="text-sm font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Past Performance Card */}
          <Card className="p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-[#FF8C00] mb-6">Professional Experience</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Federal Agencies Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#FF8C00]" />
                  Federal Agencies
                </h4>
                <div className="space-y-3">
                  {[
                    'Department of Homeland Security',
                    'Transportation Security Administration',
                    'Department of Veterans Affairs',
                    'National Institutes of Health'
                  ].map((agency, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]" />
                      <span>{agency}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Projects Section */}
              <div className="space-y-4 lg:col-span-2">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#FF8C00]" />
                  Professional Experience
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'VA EHRM Interface Management',
                      description: 'Led agile management of 15+ critical healthcare system interfaces for the Electronic Health Record Modernization program. Orchestrated successful go-live implementations across multiple VA facilities, ensuring seamless integration with legacy systems while maintaining strict compliance with HIPAA and VA security protocols.',
                      year: '2020-2025'
                    },
                    {
                      title: 'NIH OALM Document Generation System Modernization',
                      description: 'Subject matter expert in legacy system, who developed functional requirements, reverse engineered legacy product, led data migration (over 80k data fields), and worked with NBS/PRIMS Implementation team to ensure business logic successfully migrated.',
                      year: '2021-2024'
                    },
                    {
                      title: 'TSA Contracts & Procurement Support',
                      description: 'Project Manager supporting TSA C&P office, implementing best practices and process improvements that were subsequently adopted by other DHS component offices. Led initiatives in procurement standardization and efficiency improvements.',
                      year: '2018-2019'
                    },
                    {
                      title: 'NIH OALM Online Learning Platform',
                      description: 'Pioneered first-ever automated testing and virtual learning platform for official OLPS during COVID-19 response. Implemented innovative solutions that maintained training continuity during pandemic restrictions.',
                      year: '2020'
                    }
                  ].map((project, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-[#FF8C00]">{project.title}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{project.year}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics Section */}
              <div className="lg:col-span-3 mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      metric: '$8M+',
                      label: 'Portfolio Managed',
                      icon: DollarSign
                    },
                    {
                      metric: '6+',
                      label: 'Federal Programs',
                      icon: Binary
                    },
                    {
                      metric: '5/5',
                      label: 'Perfect Score on CPARS as Key Personnel and SubK',
                      icon: Target
                    },
                    {
                      metric: '11.5%',
                      label: 'Avg Cost Reduction',
                      icon: Rocket
                    }
                  ].map((stat, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
                      <stat.icon className="w-6 h-6 text-[#FF8C00] mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stat.metric}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Organizations Section */}
              <div className="space-y-4 mt-8">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#FF8C00]" />
                  Professional Organizations
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      org: 'ACT-IAC',
                      roles: [
                        'IT Modernization Community of Interest',
                        'Acquisitions Community of Interest',
                        'Emerging Technology Community of Interest'
                      ],
                      status: 'Active Member'
                    },
                    {
                      org: 'Asian American Chamber of Commerce',
                      roles: [
                        'Member'
                      ],
                      status: 'Active Member'
                    },
                  ].map((org, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-medium text-[#FF8C00]">{org.org}</h5>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{org.status}</span>
                        </div>
                      </div>
                      <div className="mt-2 space-y-1">
                        {org.roles.map((role, roleIndex) => (
                          <div key={roleIndex} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 