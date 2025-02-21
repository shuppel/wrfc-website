'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from 'components/ui/card';

interface Player {
  id: number;
  name: string;
  position: string;
  number: number;
  image: string;
  bio: string;
  experience: string;
}

// This would typically come from an API or database
const players: Player[] = [
  {
    id: 1,
    name: "John Smith",
    position: "Prop",
    number: 1,
    image: "/images/players/placeholder.jpg",
    bio: "Team captain with 10 years of rugby experience",
    experience: "10 years"
  },
  // Add more players here
];

export default function RosterPage() {
  const [selectedPosition, setSelectedPosition] = useState<string>('all');
  
  const positions = ['all', 'Prop', 'Hooker', 'Lock', 'Flanker', 'Number 8', 'Scrum-half', 'Fly-half', 'Center', 'Wing', 'Fullback'];
  
  const filteredPlayers = selectedPosition === 'all' 
    ? players 
    : players.filter(player => player.position === selectedPosition);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Team Roster</h1>
      
      {/* Position Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {positions.map((position) => (
          <button
            key={position}
            onClick={() => setSelectedPosition(position)}
            className={`px-4 py-2 rounded-full ${
              selectedPosition === position
                ? 'bg-primary text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {position.charAt(0).toUpperCase() + position.slice(1)}
          </button>
        ))}
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlayers.map((player) => (
          <Card key={player.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-64">
              <Image
                src={player.image}
                alt={player.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{player.name}</h3>
                <span className="text-2xl font-bold text-primary">#{player.number}</span>
              </div>
              <p className="text-gray-600 mb-2">{player.position}</p>
              <p className="text-sm text-gray-500">{player.bio}</p>
              <p className="text-sm text-gray-500 mt-2">Experience: {player.experience}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 