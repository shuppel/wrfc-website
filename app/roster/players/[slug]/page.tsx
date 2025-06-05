import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllPlayerProfiles, getPlayerProfileBySlug } from '@/lib/contentful';
import { formatDate } from '@/lib/utils';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

interface PlayerProfilePageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the player profile
export async function generateMetadata({ params }: PlayerProfilePageProps): Promise<Metadata> {
  const player = await getPlayerProfileBySlug(params.slug);
  
  if (!player) {
    return {
      title: 'Player Not Found',
    };
  }

  const { name, position, bio } = player.fields;
  const imageUrl = player.fields.picture?.fields?.file?.url;

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

// Generate static paths for all player profiles
export async function generateStaticParams() {
  const players = await getAllPlayerProfiles();
  
  return players.map((player) => ({
    slug: player.fields.slug,
  }));
}

export default async function PlayerProfilePage({ params }: PlayerProfilePageProps) {
  const player = await getPlayerProfileBySlug(params.slug);
  
  if (!player) {
    notFound();
  }

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
  } = player.fields;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Roster', item: '/roster' },
          { name: 'Player Profiles', item: '/roster/players' },
          { name: name, item: `/roster/players/${params.slug}` }
        ]}
      />

      <div className="max-w-4xl mx-auto">
        {/* Back to players link */}
        <Link 
          href="/roster/players" 
          className="inline-flex items-center text-wrfc-red hover:text-wrfc-red/80 mb-8"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Back to All Players
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Player Image */}
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
              
              {/* Player Number */}
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-wrfc-red text-white flex items-center justify-center font-bold text-3xl shadow-lg">
                {number}
              </div>
            </div>
            
            {/* Player Info */}
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