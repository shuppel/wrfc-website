import Image from 'next/image'
import { Shield, Users, History, Star, Trophy, Beer } from 'lucide-react'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { generateMetadata, getStructuredData } from '../utils/seo'
import JsonLd from '@/components/JsonLd'

// Generate metadata for the about page
export const metadata = generateMetadata('about');

export default function AboutPage() {
  // Additional structured data specific to the about page
  const structuredData = getStructuredData('about', {
    foundingDate: '1963',
    description: 'Washington Rugby Football Club (WRFC) was founded in 1963 and has grown to become one of the premier rugby clubs in the DC area.',
    mainEntity: {
      '@type': 'SportsOrganization',
      name: 'Washington Rugby Football Club',
      foundingDate: '1963',
      description: 'Premier rugby club in Washington DC area, established in 1963',
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
    }
  });

  return (
    <div className="flex flex-col items-center w-full">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'About', item: '/about' }
        ]} 
      />
      <JsonLd type="WebPage" data={structuredData} />

      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
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
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-nasalization">
              About WRFC
            </h1>
            <p className="text-xl md:text-2xl font-quantico opacity-90">
              A legacy of excellence in Washington rugby since 1963
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
          <Trophy className="w-full h-full text-wrfc-navy dark:text-blue-400" />
        </div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Shield className="w-8 h-8 text-wrfc-navy dark:text-blue-400" />
              <h2 className="text-3xl font-bold font-nasalization text-blue-900 dark:text-blue-400">
                Our Mission
              </h2>
            </div>
            <p className="text-xl leading-relaxed font-jetbrains text-gray-700 dark:text-gray-300">
              To foster and promote the growth of rugby in the Washington area while maintaining 
              the highest standards of sportsmanship and athletic excellence.
            </p>
          </div>
        </div>
      </section>

      {/* History Section with Image Gallery */}
      <section className="w-full py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <History className="w-8 h-8 text-wrfc-navy dark:text-blue-400" />
              <h2 className="text-3xl font-bold font-nasalization text-blue-900 dark:text-blue-400">
                Our History
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6 font-jetbrains text-gray-700 dark:text-gray-300">
                <p className="text-lg leading-relaxed">
                  Founded in 1963, Washington Rugby Football Club is the oldest rugby club in the DC metro area 
                  and has been a cornerstone of rugby in the nation&apos;s capital for over half a century. 
                  What began as a small group of dedicated players has grown into one of the most respected 
                  rugby clubs in the region.
                </p>
                <p className="text-lg leading-relaxed">
                  Throughout our history, WRFC has competed at the highest levels of American 
                  rugby, producing numerous representative players and achieving significant 
                  success in both regional and national competitions.
                </p>
                <p className="text-lg leading-relaxed">
                  In 2022, we captured the D II Capitol Region Championship, marking a significant milestone 
                  in our club&apos;s journey. Today, with our world-class coaching staff and growing roster of 
                  talented players, we&apos;re building on this success and setting our sights on even greater achievements.
                </p>
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/assets/pictures/2022_d2_champs.png"
                    alt="WRFC D2 Championship Celebration"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-bold">
                    D2 Capitol Champions
                  </div>
                </div>
                <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/assets/pictures/turkscaicosdc2025.png"
                    alt="WRFC Team Photo"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-bold">
                    Team Unity
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-12 justify-center">
            <Star className="w-8 h-8 text-wrfc-navy dark:text-blue-400" />
            <h2 className="text-3xl font-bold font-nasalization text-blue-900 dark:text-blue-400 text-center">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ValueCard 
              title="Excellence"
              description="Striving for the highest standards in everything we do, both on and off the field."
              icon={<Trophy className="w-12 h-12 text-wrfc-navy dark:text-blue-400" />}
              image="/assets/pictures/2022_d2_champs.png"
            />
            <ValueCard 
              title="Community"
              description="We compete together, celebrate together, and support each other as a rugby family. From the pitch to the pub, we believe in the power of unity."
              icon={<Users className="w-12 h-12 text-wrfc-navy dark:text-blue-400" />}
              image="/assets/pictures/turkscaicosdc2025.png"
            />
            <ValueCard 
              title="Tradition"
              description="Honoring our heritage while embracing the future of rugby in Washington."
              icon={<Shield className="w-12 h-12 text-wrfc-navy dark:text-blue-400" />}
              image="/assets/pictures/silly_santa_barcrawl_2024.png"
            />
          </div>
        </div>
      </section>

      {/* Club Life Section */}
      <section className="w-full py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Beer className="w-8 h-8 text-wrfc-navy dark:text-blue-400" />
              <h2 className="text-3xl font-bold font-nasalization text-blue-900 dark:text-blue-400">
                Club Life
              </h2>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/pictures/silly_santa_barcrawl_2024.png"
                alt="WRFC Social Events"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white max-w-xl">
                <h3 className="text-2xl font-bold mb-4 font-nasalization">Community & Competition</h3>
                <p className="text-lg opacity-90 mb-4">
                  At WRFC, we believe that &quot;compete&quot; means to strive together. We are a club built on both 
                  community and competition, where bonds are forged through shared effort and celebration.
                </p>
                <p className="text-lg opacity-90">
                  Every Thursday practice ends with a pint at the pub - because rugby culture isn&apos;t just about 
                  what happens on the pitch. It&apos;s about the unity, brotherhood, and lasting friendships that 
                  make us more than just a team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ValueCard({ title, description, icon, image }: { 
  title: string
  description: string
  icon: React.ReactNode
  image: string 
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 transition-all hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
      </div>
      <div className="p-8 text-center relative">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-700 rounded-full p-4 shadow-lg">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-4 font-nasalization text-blue-900 dark:text-blue-400 pt-8">
          {title}
        </h3>
        <p className="font-jetbrains text-gray-700 dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  )
} 