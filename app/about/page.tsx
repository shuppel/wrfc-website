'use client'

import Image from 'next/image'
import { Linkedin, Rocket, Shield, Binary, Target, Zap, AlertCircle, DollarSign, Clock, Book, Users, GraduationCap, Code, Brain, Github } from 'lucide-react'
import { Card } from "@/app/components/ui/card"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion"
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
                              href="https://github.com/shuppel"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-all duration-300 group hover:shadow-[0_0_10px_rgba(36,41,47,0.3)]"
                            >
                              <Github className="w-7 h-7 text-gray-400 group-hover:text-[#24292F] dark:group-hover:text-white" />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Check out my GitHub</p>
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

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a 
                              href="https://open.spotify.com/playlist/78PSlJ2q5NuRaJ8tsG8TqX?si=ok3aQv7ZRiioLpwevsyC3Q"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 rounded-full hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 group hover:shadow-[0_0_10px_rgba(29,185,84,0.3)]"
                            >
                              <svg 
                                className="w-7 h-7 text-gray-400 group-hover:text-[#1DB954]" 
                                viewBox="0 0 24 24" 
                                fill="currentColor"
                              >
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                              </svg>
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Listen to my NodeLabs playlist</p>
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
                  &quot;I think the beautiful thing about the United States, is we are a group of people from all over the world, 
                  who have integrated into melting pot of culture, band together and compete (latin for strive together).&quot;
                </p>
                <p className="leading-relaxed">
                  At Nodetus, we&apos;ve built our foundation on the principles of diligence, precision, and 
                  unwavering commitment to excellence - values I always taken the best features of different cultures being in the diverse Northern Virginia area my whole life, I was lucky to be exposed to numerous cultures and have taken the east meets west mentality when it comes to technology. It&apos;s what makes us great, reinvention in the apperceptive lens.
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
                        desc: 'Overpriced software with minimal value',
                        icon: DollarSign
                      },
                      {
                        title: 'Innovation Theater',
                        desc: 'Companies that prioritize appearing innovative over delivering real value',
                        icon: Clock
                      }
                    ].map((peeve, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-600"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
                            <peeve.icon className="w-5 h-5 text-red-500" />
                          </div>
                          <div>
                            <span className="font-medium text-gray-800 dark:text-gray-200">{peeve.title}</span>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{peeve.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#FF8C00] mb-6">Professional Journey</h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  I&apos;m passionate about leveraging technology to enhance transparency and accountability. My journey began with &ldquo;FoiaQuest&rdquo; - a tool I developed to streamline FOIA requests. I&apos;ve also created &ldquo;NodeTus&rdquo;, and I&apos;m excited about its potential to revolutionize file uploads.
                </p>
                <div className="mt-6">
                  <h4 className="text-xl font-semibold text-[#FF8C00] mb-4">Core Values</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      {
                        value: 'Innovation with Purpose',
                        icon: Rocket,
                        desc: 'Driving meaningful technological advancement'
                      },
                      {
                        value: 'Relentless Perseverance ("Grit")',
                        icon: Shield,
                        desc: 'Unwavering dedication to excellence'
                      },
                      {
                        value: 'Rapid Problem Resolution',
                        icon: Zap,
                        desc: 'Swift, effective solutions to complex challenges'
                      },
                      {
                        value: 'Mission-Driven Operandum',
                        icon: Target,
                        desc: 'Purpose-driven approach to every project'
                      }
                    ].map((item, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-600"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#FF8C00]/10 dark:bg-[#FF8C00]/20">
                            <item.icon className="w-5 h-5 text-[#FF8C00]" />
                          </div>
                          <div>
                            <span className="font-medium text-gray-800 dark:text-gray-200">{item.value}</span>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                          </div>
                        </div>
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
                      year: '2020-Present'
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

                  {/* Classified Project Card */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-[#FF8C00]/20 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-[#FF8C00] flex items-center gap-2">
                          <span className="text-base">🕵️‍♂️</span> Classified Project
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">2025-2026</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                        Currently assisting a federal agency with secure web application development. 
                        Details classified.
                      </p>
                    </div>

                    {/* Centered Watermark with Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/10 to-gray-900/30 dark:from-gray-900/30 dark:to-gray-900/50 group-hover:opacity-80 transition-opacity duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="transform rotate-[-15deg] opacity-20 group-hover:opacity-30 transition-all duration-300">
                          <span className="text-6xl">🔒</span>
                        </div>
                      </div>
                    </div>

                    {/* Additional Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                      <div className="w-full h-full bg-[linear-gradient(45deg,transparent_40%,rgba(255,140,0,0.1)_45%,rgba(255,140,0,0.1)_55%,transparent_60%)] bg-[length:300%_300%] animate-gradient"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics Section */}
              <div className="lg:col-span-3 mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <TooltipProvider delayDuration={100}>
                    {[
                      {
                        metric: '$32M+',
                        label: 'Portfolio Managed',
                        icon: DollarSign,
                        tooltip: "Erikk either managed or provided subject matter expertise over four projects with a combined value over ~32M for VA, TSA and NIH over the past 6 years."
                      },
                      {
                        metric: '6+',
                        label: 'Federal Programs',
                        icon: Binary,
                        tooltip: "Erikk has provided services as a subK on over 8 task orders, and six different government initiatives, not to mention the 15+ interfaces he's helped push to production over the past six years."
                      },
                      {
                        metric: '5/5',
                        label: 'Perfect Score on CPARS',
                        icon: Target,
                        tooltip: "During one task order, where Nodetus notified and mitigated a potential risk of losing valuable time downstream. Due to this effective use of time-savings and risk mitigiation using scope within a current contract, the services rendered were completed and mitigated a large risk. Due to this, the Prime had recieved its first ever perfect CPARs (with over 40+ historical contracts)."
                      },
                      {
                        metric: '$4M+',
                        label: 'Potential Cost Savings/Risk Mitigiation',
                        icon: Rocket,
                        tooltip: "While other modernization cost benefits can't be credibly verified, one cost that can be mentioned was the ability to complete a T&M Contract with 11.5% cost savings to total value, giving the government a 11.5% cost reduction. On the NIH contract, Nodetus had notified the leadership at OALM about potential down stream issues if the current configurations of the system were not properly mapped when migrated. Since the migration tool and team did not have an ETL or quick conversion tool, there was a risk of losing valuable time (estimated 6 to 12 months delay mitgated) by using a prexisting contract and scope to peform those tasks."
                      }
                    ].map((stat, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center cursor-help hover:shadow-md transition-shadow duration-300">
                            <stat.icon className="w-6 h-6 text-[#FF8C00] mx-auto mb-2" />
                            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stat.metric}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent 
                          className="max-w-xs p-3 bg-[#FFF9F0] dark:bg-[#2A2520] shadow-lg rounded-lg animate-tooltip-fade"
                          sideOffset={5}
                        >
                          <p className="text-sm text-gray-700 dark:text-gray-200">{stat.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </div>
              </div>

              {/* Professional Organizations Section */}
              <div className="lg:col-span-3 mt-8">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#FF8C00]" />
                  Professional Organizations
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    {
                      org: 'Project Management Institute (PMI)',
                      roles: [
                        'Member'
                      ],
                      status: 'Active Member'
                    },
                    {
                      org: 'Washington Rugby Football Club',
                      roles: [
                        'Media Chair (2019-2020)',
                        'Vice President (2021-2022)',
                        'Fundraising Chair (2021-2023)',
                        'Treasurer (2023-2025)'
                      ],
                      status: 'Executive Council'
                    }
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

              {/* Learning Transcript Section */}
              <div className="lg:col-span-3 mt-8">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-4">
                  <GraduationCap className="w-5 h-5 text-[#FF8C00]" />
                  Open Source Learning Journey
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-none">
                  {/* Technical Learning */}
                  <div className="space-y-4 w-full">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg w-full">
                      <div className="mb-6">
                        <h5 className="font-medium text-[#FF8C00] flex items-center gap-2 mb-2">
                          <Code className="w-4 h-4" />
                          Technical Stack
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                          <span className="font-bold">{66}</span> courses open-sourced and assimilated across <span className="font-bold">{11}</span> disciplines
                        </p>
                      </div>
                      <div className="space-y-3">
                        <Accordion type="single" collapsible className="w-full">
                          {[
                            {
                              platform: 'Acquisition & Procurement',
                              progress: '3/3',
                              courses: [
                                { name: 'Market Research CON 0040', org: 'Defense Acquisition Institute' },
                                { name: 'IT Cost Estimation', org: 'Defense Acquisition Institute' },
                                { name: 'Independent Government Cost Estimates (IGCE)', org: 'Defense Acquisition Institute' }
                              ]
                            },
                            {
                              platform: 'AI & Machine Learning',
                              progress: '1/1',
                              courses: [
                                { name: 'Large Language Models (LLMs) - Level 2', org: 'Brillient' }
                              ]
                            },
                            {
                              platform: 'Automation & Development',
                              progress: '8/8',
                              courses: [
                                { name: 'RPA Basics and Introduction to UiPath', org: 'UiPath' },
                                { name: 'UiPath Orchestrator and Capstone Projects', org: 'UiPath' },
                                { name: 'Data Manipulation in RPA', org: 'UiPath' },
                                { name: 'UI Automation and Selectors', org: 'UiPath' },
                                { name: 'Control Flow in RPA', org: 'UiPath' },
                                { name: 'Automation Techniques in RPA', org: 'UiPath' },
                                { name: 'Animation with JavaScript and jQuery', org: 'University of California, Davis' },
                                { name: 'Implementing Page Navigation in a Flutter Application', org: 'Google Cloud' }
                              ]
                            },
                            {
                              platform: 'Cloud & Infrastructure',
                              progress: '5/5',
                              courses: [
                                { name: 'Google Cloud Fundamentals: Core Infrastructure', org: 'Google Cloud' },
                                { name: 'Essential Google Cloud Infrastructure: Foundation', org: 'Google Cloud' },
                                { name: 'Linux: SSH to remote server & Networking basics for DevOps', org: 'Guided Projects' },
                                { name: 'Peer-to-Peer Protocols and Local Area Networks', org: 'University of Colorado' },
                                { name: 'Fundamentals of Network Communication', org: 'University of Colorado' }
                              ]
                            },
                            {
                              platform: 'Computer Science Foundations',
                              progress: '3/3',
                              courses: [
                                { name: 'Introduction to Computer Science and Programming Specialization', org: 'University of London' },
                                { name: 'How Computers Work', org: 'University of London' },
                                { name: 'Introduction to Computer Programming', org: 'University of London' }
                              ]
                            },
                            {
                              platform: 'Cybersecurity',
                              progress: '9/9',
                              courses: [
                                { name: 'Introduction to Cyber Security', org: 'TryHackMe', desc: 'Defense Security & Core Concepts' },
                                { name: 'Network Fundamentals', org: 'TryHackMe', desc: 'OSI Model, LAN, Packets & Frames' },
                                { name: 'How the Web Works', org: 'TryHackMe', desc: 'DNS, HTTP, Web Architecture' },
                                { name: 'Linux Fundamentals', org: 'TryHackMe', desc: 'Parts I, II, III & Linux Shells' },
                                { name: 'Windows & AD Fundamentals', org: 'TryHackMe', desc: 'Windows I, II, III & Active Directory Basics' },
                                { name: 'Command Line Mastery', org: 'TryHackMe', desc: 'Windows Command Line, PowerShell & Search Skills' },
                                { name: 'Networking', org: 'TryHackMe', desc: 'Concepts, Essentials & Core Protocols' },
                                { name: 'Cryptography', org: 'TryHackMe', desc: 'Basic cryptography & encryption concepts' },
                                { name: 'Exploitation Basics', org: 'TryHackMe', desc: 'Offensive Security Introduction' }
                              ]
                            },
                            {
                              platform: 'Data Engineering & Analytics',
                              progress: '11/11',
                              courses: [
                                { name: 'Data Visualization', org: 'University of Illinois Chicago' },
                                { name: 'Introduction to Statistics', org: 'Stanford University' },
                                { name: 'Capstone: Retrieving, Processing, and Visualizing Data with Python', org: 'University of Michigan' },
                                { name: 'Database Architecture, Scale, and NoSQL with Elasticsearch', org: 'University of Michigan' },
                                { name: 'JSON and Natural Language Processing in PostgreSQL', org: 'University of Michigan' },
                                { name: 'Intermediate PostgreSQL', org: 'University of Michigan' },
                                { name: 'Database Design and Basic SQL in PostgreSQL', org: 'University of Michigan' },
                                { name: 'Using Python to Access Web Data', org: 'University of Michigan' },
                                { name: 'Using Databases with Python', org: 'University of Michigan' },
                                { name: 'Python Data Structures', org: 'University of Michigan' },
                                { name: 'Programming for Everybody (Getting Started with Python)', org: 'University of Michigan' }
                              ]
                            },
                            {
                              platform: 'Embedded Systems',
                              progress: '3/3',
                              courses: [
                                { name: 'Embedded Interface Design', org: 'University of Colorado Boulder' },
                                { name: 'Arduino Project Development', org: 'Self-Directed Learning' },
                                { name: 'Raspberry Pi Project Development', org: 'Self-Directed Learning' }
                              ]
                            },
                            {
                              platform: 'Mathematics & Modeling',
                              progress: '7/7',
                              courses: [
                                { name: 'Calculus - Level 3', org: 'Brillient' },
                                { name: 'Linear Algebra - Level 3', org: 'Brillient' },
                                { name: 'Fundamentals of Quantitative Modeling', org: 'University of Pennsylvania' },
                                { name: 'Precalculus through Data and Modelling', org: 'Johns Hopkins University' },
                                { name: 'Precalculus: Mathematical Modeling', org: 'Johns Hopkins University' },
                                { name: 'Precalculus: Relations and Functions', org: 'Johns Hopkins University' },
                                { name: 'Precalculus: Periodic Functions', org: 'Johns Hopkins University' }
                              ]
                            },
                            {
                              platform: 'Neuropsychology & Productivity',
                              progress: '1/1',
                              courses: [
                                { name: 'Learning How to Learn: Powerful mental tools', org: 'Deep Teaching Solutions' }
                              ]
                            },
                            {
                              platform: 'UX/UI Design',
                              progress: '12/12',
                              courses: [
                                { name: 'Interaction Design: 3-Day Course - Day 1', org: 'Nielsen Norman Group' },
                                { name: 'Interaction Design: 3-Day Course - Day 2', org: 'Nielsen Norman Group' },
                                { name: 'Interaction Design: 3-Day Course - Day 3', org: 'Nielsen Norman Group' },
                                { name: 'Information Architecture', org: 'Nielsen Norman Group' },
                                { name: 'Omnichannel Journeys and Customer Experience', org: 'Nielsen Norman Group' },
                                { name: 'Managing User Experience Strategy', org: 'Nielsen Norman Group' },
                                { name: 'DesignOps: Scaling UX Design and User Research', org: 'Nielsen Norman Group' },
                                { name: 'UX Roadmaps', org: 'Nielsen Norman Group' },
                                { name: 'Customer Journey Management', org: 'Nielsen Norman Group' },
                                { name: 'User Research Methods: From Strategy to Requirements to Design', org: 'Nielsen Norman Group' },
                                { name: 'Discoveries: Building the Right Thing', org: 'Nielsen Norman Group' },
                                { name: 'Product and UX: Building Partnerships for Better Outcomes', org: 'Nielsen Norman Group' }
                              ]
                            },
                            {
                              platform: 'Virtual Reality Development',
                              progress: '3/3',
                              courses: [
                                { name: 'Introduction to Virtual Reality', org: 'University of London' },
                                { name: '3D Models for Virtual Reality', org: 'University of London' },
                                { name: 'Virtual Reality Development', org: 'University of London' }
                              ]
                            }
                          ].map((edu, index) => (
                            <AccordionItem 
                              key={index} 
                              value={`item-${index}`}
                              className="border-l-2 border-[#FF8C00]/20 pl-3 mb-4"
                            >
                              <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center justify-between w-full pr-4">
                                  <div className="font-medium text-gray-700 dark:text-gray-300">{edu.platform}</div>
                                  <div className="text-sm text-[#FF8C00] font-mono">{edu.progress}</div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="mt-1 space-y-2">
                                  {edu.courses.map((course, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                                      <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]" />
                                        <span>{course.name}</span>
                                      </div>
                                      <div className="text-xs text-gray-500 ml-3 mt-0.5">{course.org}</div>
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    </div>
                  </div>

                  {/* Business & Leadership Learning */}
                  <div className="space-y-4 w-full">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg w-full">
                      <h5 className="font-medium text-[#FF8C00] flex items-center gap-2 mb-3">
                        <Brain className="w-4 h-4" />
                        Auxiliary Cognitive Regeneration
                      </h5>
                      <div className="space-y-3">
                        {[
                          {
                            category: 'Key Books',
                            items: [
                              'Learning How to Learn - Barbara Oakley',
                              'Designing Data-Intensive Applications - Martin Kleppmann',
                              'Clean Code: A Handbook of Agile Software Craftsmanship - Robert Martin',
                              'The Visual Display of Quantitative Information - Edward Tufte',
                              'Visualization Analysis and Design - Tamara Munzner',
                              'Introduction to Graph Theory - Richard Trudeau',
                              'Calculus: An Intuitive and Physical Approach - Morris Kline',
                            ]
                          },
                          {
                            category: 'Industry Certifications',
                            items: [
                              'Nielsen Norman Group (NN/G) Master Certificate (UXMC)',
                              'SAFe 4 Practitioner',
                              'ITIL v4 Foundation',
                              'Scrum Master Professional',
                              'DAI Market Research CON 0040',
                              'DAI IT Cost Estimation',
                              'DAI Independent Government Cost Estimates (IGCE)',
                              'TryHackMe - Pre-Security Learning Path Certificate'
                            ]
                          }
                        ].map((section, index) => (
                          <div key={index} className="border-l-2 border-[#FF8C00]/20 pl-3">
                            <div className="font-medium text-gray-700 dark:text-gray-300">{section.category}</div>
                            <ul className="mt-1 space-y-1">
                              {section.items.map((item, idx) => (
                                <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 