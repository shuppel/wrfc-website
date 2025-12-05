import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { getPlayerBySlug, getAllPlayerSlugs } from '@/data/players';
import { Badge } from '@/components/ui/badge';

interface PlayerProfilePageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the player profile
export async function generateMetadata({ params }: PlayerProfilePageProps): Promise<Metadata> {
  const hardcodedPlayer = getPlayerBySlug(params.slug);
  
  if (hardcodedPlayer) {
    const { name, position } = hardcodedPlayer;
    return {
      title: `${name} | WRFC Player`,
      description: `${name} is a ${position} for Washington Rugby Football Club.`,
      openGraph: {
        title: `${name} - ${position} | Washington Rugby Football Club`,
        description: `${name} is a ${position} for Washington Rugby Football Club.`,
        images: [hardcodedPlayer.image],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${name} | WRFC Player`,
        description: `${name} is a ${position} for Washington Rugby Football Club.`,
        images: [hardcodedPlayer.image],
      },
    };
  }

  return {
    title: 'Player Not Found',
  };
}

// Generate static paths for all player profiles
export async function generateStaticParams() {
  const hardcodedPlayerSlugs = getAllPlayerSlugs();
  return hardcodedPlayerSlugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function PlayerProfilePage({ params }: PlayerProfilePageProps) {
  const hardcodedPlayer = getPlayerBySlug(params.slug);
  
  if (hardcodedPlayer) {
    const { 
      name, 
      position, 
      number,
      image,
      division,
      height,
      weight,
      d1Caps,
      d3Caps,
      badges
    } = hardcodedPlayer;

    return (
      <div className="container mx-auto px-4 py-12">
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', item: '/' },
            { name: 'Teams', item: '/teams' },
            { name: 'Players', item: '/teams/players' },
            { name: name, item: `/teams/players/${params.slug}` }
          ]}
        />

        <div className="max-w-4xl mx-auto">
          <Link 
            href="/teams/players" 
            className="inline-flex items-center text-wrfc-red hover:text-wrfc-red/80 mb-8"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Back to All Players
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 relative">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {number && (
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-wrfc-red text-white flex items-center justify-center font-bold text-3xl shadow-lg">
                    {number}
                  </div>
                )}
              </div>
              
              <div className="md:w-2/3 p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{name}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{position}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Division</h3>
                    <p>{division === 'Both' ? 'D1 & D3 Teams' : `Men's ${division} Team`}</p>
                  </div>
                  
                  {height && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Height</h3>
                      <p>{height}</p>
                    </div>
                  )}
                  
                  {weight && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Weight</h3>
                      <p>{weight}kg</p>
                    </div>
                  )}
                </div>
                
                {/* Caps information */}
                {(d1Caps || d3Caps) && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-3">Club Experience</h2>
                    <div className="flex gap-6">
                      {d1Caps && (
                        <div>
                          <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">D1 Caps</h3>
                          <p className="text-2xl font-bold">{d1Caps}</p>
                        </div>
                      )}
                      {d3Caps && (
                        <div>
                          <h3 className="text-sm font-semibold text-green-600 dark:text-green-400">D3 Caps</h3>
                          <p className="text-2xl font-bold">{d3Caps}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Badges for special roles */}
                {badges && badges.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-3">Roles & Achievements</h2>
                    <div className="flex flex-wrap gap-2">
                      {badges.map((badge, index) => (
                        <Badge 
                          key={index}
                          text={badge.text}
                          variant={badge.variant || "default"}
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Player not found
  notFound();
}