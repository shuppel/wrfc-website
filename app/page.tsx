import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Trophy, Users, ArrowRight, ChevronRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/pictures/huddle_2025_irish.jpg"
            alt="WRFC Team Huddle"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/95 via-blue-900/85 to-black/90" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="relative w-32 h-32">
                <Image
                  src="/logos/wrfc_logo.png"
                  alt="WRFC Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-nasalization mb-6 animate-fade-in">
              Washington Rugby
              <span className="block text-wrfc-red">Football Club</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-quantico opacity-90">
              Tradition. Excellence. Community.
              <span className="block text-lg mt-2 text-gray-300">Est. 1963</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/membership" 
                className="bg-wrfc-red hover:bg-wrfc-red/90 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center group"
              >
                Join WRFC
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/schedule" 
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 hover:shadow-lg"
              >
                View Schedule
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-8 h-8 text-white rotate-90" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Trophy className="w-12 h-12 text-wrfc-red" />}
              title="Growing Legacy"
              description="Former D II Capitol Region Champions, building towards new heights with a world-class coaching staff and dedicated players."
              image="/assets/pictures/2025_irish_ruck.jpg"
            />
            <FeatureCard 
              icon={<Users className="w-12 h-12 text-wrfc-navy" />}
              title="Strong Community"
              description="Join a brotherhood of passionate rugby players and supporters in the heart of DC."
              image="/assets/pictures/huddle_2025_irish.jpg"
            />
            <FeatureCard 
              icon={<Calendar className="w-12 h-12 text-wrfc-teal" />}
              title="Year-Round Action"
              description="Compete in both 15s and 7s seasons with opportunities for players of all levels."
              image="/assets/pictures/2025_irish_lami.jpg"
            />
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-nasalization">
            Get Involved
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <QuickLinkCard 
              title="Tournaments"
              description="View upcoming tournaments and register your team to compete"
              href="/tournaments"
              image="/assets/pictures/2025_irish_ox.jpg"
            />
            <QuickLinkCard 
              title="Team Roster"
              description="Meet our current squad and coaching staff"
              href="/roster"
              image="/assets/pictures/2025_irish_zach.jpg"
            />
            <QuickLinkCard 
              title="Contact Us"
              description="Get in touch with WRFC management"
              href="/contact"
              image="/assets/pictures/throw_skill_2025.png"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/pictures/huddle_2025_irish.jpg"
            alt="WRFC Team Huddle"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wrfc-navy/95 to-wrfc-navy/90" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-nasalization text-white">
            Ready to Join the Legacy?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            Whether you&apos;re an experienced player or new to rugby, WRFC welcomes athletes of all levels. 
            Join us and be part of Washington&apos;s premier rugby club.
          </p>
          <Link 
            href="/membership" 
            className="inline-flex items-center bg-wrfc-red px-8 py-4 rounded-lg font-bold hover:bg-wrfc-red/90 transition-all transform hover:scale-105 hover:shadow-lg group text-white"
          >
            Become a Member
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description, image }: { 
  icon: React.ReactNode
  title: string
  description: string
  image: string
}) {
  return (
    <div className="relative group overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-xl transition-all">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
      </div>
      <div className="p-8 relative">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-700 rounded-full p-4 shadow-lg">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-4 font-nasalization text-center pt-8">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-center">{description}</p>
      </div>
    </div>
  )
}

function QuickLinkCard({ title, description, href, image }: { 
  title: string
  description: string
  href: string
  image: string
}) {
  return (
    <Link href={href}>
      <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 hover:shadow-xl transition-all h-full">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2 group-hover:text-wrfc-red transition-colors font-nasalization">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
          
          {/* Arrow indicator */}
          <div className="mt-4 flex items-center text-wrfc-red font-semibold">
            Learn More
            <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
} 