import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllPlayerProfiles, getPlayerProfileBySlug } from '@/lib/contentful';
import { formatDate } from '@/lib/utils';
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
  // Try Contentful first
  const contentfulPlayer = await getPlayerProfileBySlug(params.slug);
  
  if (contentfulPlayer) {
    const { name, position, bio } = contentfulPlayer.fields;
    const imageUrl = contentfulPlayer.fields.picture?.fields?.file?.url;

    return {
      title: `${name} | WRFC Player`,
      description: bio?.substring(0, 160) || `${name} is a ${position} for Washington Rugby Football Club.`,
      openGraph: {
        title: `${name} - ${position} | Washington Rugby Football Club`,
        description: bio?.substring(0, 160) || `${name} is a ${position} for Washington Rugby Football Club.`,
        images: imageUrl ? [`https:${imageUrl}`] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${name} | WRFC Player`,
        description: bio?.substring(0, 160) || `${name} is a ${position} for Washington Rugby Football Club.`,
        images: imageUrl ? [`https:${imageUrl}`] : [],
      },
    };
  }

  // Try hardcoded data
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
  try {
    const contentfulPlayers = await getAllPlayerProfiles();
    const hardcodedPlayerSlugs = getAllPlayerSlugs();
    
    const contentfulSlugs = contentfulPlayers.map((player) => ({
      slug: player.fields.slug,
    }));
    
    const hardcodedSlugs = hardcodedPlayerSlugs.map((slug) => ({
      slug: slug,
    }));
    
    return [...contentfulSlugs, ...hardcodedSlugs];
  } catch (error) {
    console.warn('Failed to fetch Contentful players for static generation:', error);
    // Fall back to hardcoded players only
    const hardcodedPlayerSlugs = getAllPlayerSlugs();
    return hardcodedPlayerSlugs.map((slug) => ({
      slug: slug,
    }));
  }
}

export default async function PlayerProfilePage({ params }: PlayerProfilePageProps) {
  // Try Contentful first
  const contentfulPlayer = await getPlayerProfileBySlug(params.slug);
  
  if (contentfulPlayer) {
    const { 
      name, 
      position, 
      number,
      picture,
      bio,
      joinDate,
      hometown,
      college,
      highlights
    } = contentfulPlayer.fields;

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
                  {picture ? (
                    <Image
                      src={`https:${picture.fields.file.url}`}
                      alt={name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <Image 
                        src="/assets/art/player_profile_rugby.png"
                        alt={name}
                        width={150}
                        height={150}
                        className="opacity-40"
                      />
                    </div>
                  )}
                </div>
                
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-wrfc-red text-white flex items-center justify-center font-bold text-3xl shadow-lg">
                  {number}
                </div>
              </div>
              
              <div className="md:w-2/3 p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{name}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{position}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8">
                  {joinDate && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Member Since</h3>
                      <p>{formatDate(joinDate, 'MMM yyyy')}</p>
                    </div>
                  )}
                  
                  {hometown && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Hometown</h3>
                      <p>{hometown}</p>
                    </div>
                  )}
                  
                  {college && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">College</h3>
                      <p>{college}</p>
                    </div>
                  )}
                </div>
                
                {bio && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-3">Bio</h2>
                    <p className="text-gray-700 dark:text-gray-300">{bio}</p>
                  </div>
                )}
                
                {highlights && highlights.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-3">Career Highlights</h2>
                    <ul className="list-disc pl-5 space-y-1">
                      {highlights.map((highlight, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Try hardcoded data
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