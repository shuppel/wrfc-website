import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Trophy, Users, ArrowRight, CaretDown, MapPin, Ticket } from '@phosphor-icons/react/dist/ssr'
import { BreadcrumbJsonLd } from '../components/JsonLd'
import { generateMetadata, getStructuredData } from './utils/seo'
import JsonLd from '../components/JsonLd'
import WelcomeModal from '@/components/feature/promotion/WelcomeModal'

// Generate metadata for the home page
export const metadata = generateMetadata('home');

export default function Home() {
  // Additional structured data specific to the home page
  const structuredData = getStructuredData('home', {
    '@type': 'SportsOrganization',
    foundingDate: '1963',
    sport: {
      '@type': 'Sport',
      name: 'Rugby',
      description: 'Rugby Union Football'
    },
    location: {
      '@type': 'Place',
      name: 'Washington, DC',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Washington',
        addressRegion: 'DC',
        addressCountry: 'US'
      }
    }
  });

  return (
    <div className="flex flex-col w-full">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' }
        ]} 
      />
      <JsonLd type="Organization" data={structuredData} />
      
      {/* Welcome Modal */}
      <WelcomeModal />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/pictures/138A3717.jpg"
            alt="WRFC Team Photo"
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
            <h1 className="text-5xl md:text-7xl font-bold  mb-6 animate-fade-in">
              Washington Rugby
              <span className="block text-wrfc-red">Football Club</span>
            </h1>
            <p className="text-xl md:text-2xl mb-6 font-quantico opacity-90">
              DC&apos;s Premier Rugby Club - Tradition. Excellence. Community.
              <span className="block text-lg mt-2 text-gray-300">Est. 1963 - Leading DC Rugby Since Day One</span>
            </p>

            {/* Cherry Blossom Tournament 2026 Banner */}
            <a 
              href="https://www.zeffy.com/en-US/ticketing/cherry-blossom-tournament--2026"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mb-8 mx-auto max-w-2xl block"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-wrfc-red to-pink-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-gradient-to-r from-wrfc-navy/95 to-blue-900/95 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 shadow-2xl">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="flex-shrink-0 text-4xl">
                    🌸
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-pink-300">58th Annual CBT in Aldie, VA!</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                      58th Annual Cherry Blossom Tournament
                    </h3>
                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 sm:gap-4 text-sm text-gray-300">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        April 11, 2026
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Aldie, VA
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center gap-2 bg-wrfc-red hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all group-hover:scale-105 group-hover:shadow-lg">
                      <Ticket className="w-4 h-4" />
                      Register Team
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </a>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/membership" 
                className="bg-wrfc-red hover:bg-wrfc-red/90 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center group"
              >
                Join WRFC
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/donate" 
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 hover:shadow-lg"
              >
                Donate
              </Link>
              <a 
                href="https://www.zeffy.com/en-US/ticketing/wrfc-player-dues" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 hover:shadow-lg"
              >
                Pay Dues
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <CaretDown className="w-8 h-8 text-white" weight="bold" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <FeatureCard 
                icon={<Trophy className="w-12 h-12 text-wrfc-red" weight="duotone" />}
              title="Growing Legacy"
              description="Former D II Capitol Region Champions, building towards new heights with a world-class coaching staff and dedicated players."
              image="/assets/pictures/2025_irish_ruck.jpg"
            />
              <FeatureCard 
                icon={<Users className="w-12 h-12 text-wrfc-navy" weight="duotone" />}
              title="DC Rugby Community"
              description="Join the strongest DC rugby brotherhood of passionate men's rugby players and supporters in the heart of Washington DC."
              image="/assets/pictures/huddle_2025_irish.jpg"
            />
              <FeatureCard 
                icon={<Calendar className="w-12 h-12 text-wrfc-teal" weight="duotone" />}
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 ">
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
              href="/teams/players"
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
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6  text-white text-center">
            Ready to Join the Legacy?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200 text-center">
            Whether you&apos;re an experienced player or new to DC rugby, WRFC welcomes athletes of all levels. 
            Join us and be part of Washington DC&apos;s premier men&apos;s rugby club and the top DC rugby team.
          </p>
          
          {/* Embedded Google Form */}
          <div className="max-w-4xl mx-auto">
            <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSfrwiFB_oUzIvE8UHwtv9lz9JAACoPjDpWJ2LCo4xq_P01Atg/viewform?embedded=true" 
                className="w-full h-[600px] md:h-[800px] lg:h-[1000px]"
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0}
                loading="lazy"
                title="WRFC Membership Form"
              >
                Loading…
              </iframe>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Having trouble viewing the form? 
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfrwiFB_oUzIvE8UHwtv9lz9JAACoPjDpWJ2LCo4xq_P01Atg/viewform" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-1 text-blue-600 hover:underline"
                >
                  Open in new tab
                </a>
              </p>
            </div>
          </div>
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
    <div className="relative group overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900 hover:shadow-xl transition-all">
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
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 rounded-full p-4 shadow-lg">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-4  text-center pt-8">{title}</h3>
        <p className="text-gray-600 dark:text-gray-100 text-center">{description}</p>
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
      <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 hover:shadow-xl transition-all h-full">
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
          <h3 className="text-2xl font-bold mb-2 group-hover:text-wrfc-red transition-colors ">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-100">{description}</p>
          
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