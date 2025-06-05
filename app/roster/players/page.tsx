import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPlayerProfiles } from '@/lib/contentful';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Player Profiles | Washington Rugby Football Club',
  description: 'Meet the Washington Rugby Football Club players - profiles, stats, and information about our team members.',
};

export default async function PlayerProfilesPage() {
  // Fetch player profiles from Contentful
  const players = await getAllPlayerProfiles();

  // Group players by position
  const positionGroups = players.reduce((groups: Record<string, typeof players>, player) => {
    const position = player.fields.position;
    if (!groups[position]) {
      groups[position] = [];
    }
    groups[position].push(player);
    return groups;
  }, {});

  // Sort position groups in a rugby-logical order
  const positionOrder = [
    'Props', 'Hooker', 'Locks', 'Flankers', 'Number 8', 
    'Scrum-half', 'Fly-half', 'Centers', 'Wings', 'Fullback', 'Utility Backs', 'Coaches'
  ];

  const sortedPositionGroups = Object.keys(positionGroups)
    .sort((a, b) => {
      const aIndex = positionOrder.indexOf(a);
      const bIndex = positionOrder.indexOf(b);
      if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });

  // Show featured players at the top
  const featuredPlayers = players.filter(player => player.fields.featured);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Roster', item: '/roster' },
          { name: 'Player Profiles', item: '/roster/players' }
        ]}
      />

      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Player Profiles</h1>
        
        {/* Featured Players Section */}
        {featuredPlayers.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-wrfc-navy border-b pb-2">Featured Players</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPlayers.map((player) => (
                <PlayerCard 
                  key={player.sys.id}
                  slug={player.fields.slug}
                  name={player.fields.name}
                  position={player.fields.position}
                  number={player.fields.number}
                  imageUrl={player.fields.picture?.fields?.file?.url || ''}
                  featured={true}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Players By Position */}
        {sortedPositionGroups.map((position) => (
          <div key={position} className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-wrfc-navy border-b pb-2">{position}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {positionGroups[position].map((player) => (
                <PlayerCard 
                  key={player.sys.id}
                  slug={player.fields.slug}
                  name={player.fields.name}
                  position={player.fields.position}
                  number={player.fields.number}
                  imageUrl={player.fields.picture?.fields?.file?.url || ''}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface PlayerCardProps {
  slug: string;
  name: string;
  position: string;
  number: number;
  imageUrl: string;
  featured?: boolean;
}

function PlayerCard({ slug, name, position, number, imageUrl, featured = false }: PlayerCardProps) {
  return (
    <Link href={`/roster/players/${slug}`} className="group">
      <div className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all ${featured ? 'transform-gpu hover:scale-105' : ''}`}>
        {/* Player Image */}
        <div className="relative h-60 overflow-hidden bg-gray-200 dark:bg-gray-700">
          {imageUrl ? (
            <Image
              src={`https:${imageUrl}`}
              alt={name}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Image 
                src="/assets/art/player_profile_rugby.png"
                alt={name}
                width={150}
                height={150}
                className="opacity-30"
              />
            </div>
          )}
          
          {/* Player Number */}
          <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-wrfc-red text-white flex items-center justify-center font-bold text-xl shadow-lg">
            {number}
          </div>
        </div>
        
        {/* Player Info */}
        <div className="p-4">
          <h3 className="text-lg font-bold group-hover:text-wrfc-red transition-colors">{name}</h3>
          <p className="text-gray-600 dark:text-gray-400">{position}</p>
        </div>
      </div>
    </Link>
  );
}