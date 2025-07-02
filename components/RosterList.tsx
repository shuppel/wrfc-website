'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Player } from '@/data/players';

interface RosterListProps {
  players: Player[];
}

export default function RosterList({ players }: RosterListProps) {
  const [selectedPosition, setSelectedPosition] = useState<string>('all');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  
  const positions = ['all', 'Prop', 'Hooker', 'Lock', 'Flanker', 'Number 8', 'Scrum-half', 'Fly-half', 'Center', 'Wing', 'Fullback'];
  const divisions = ['all', 'D1', 'D3'];
  
  const filteredPlayers = players
    .filter(player => selectedPosition === 'all' || player.position.includes(selectedPosition))
    .filter(player => {
      if (selectedDivision === 'all') return true;
      if (selectedDivision === 'D1' && (player.division === 'D1' || player.division === 'Both')) return true;
      if (selectedDivision === 'D3' && (player.division === 'D3' || player.division === 'Both')) return true;
      return false;
    });

  return (
    <>
      {/* Division Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <p className="w-full text-center font-semibold mb-2">Filter by Division:</p>
        {divisions.map((division) => (
          <button
            key={division}
            onClick={() => setSelectedDivision(division)}
            className={`px-4 py-2 rounded-full ${
              selectedDivision === division
                ? 'bg-primary text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {division === 'all' ? 'All Divisions' : `Men's ${division}`}
          </button>
        ))}
      </div>
      
      {/* Position Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <p className="w-full text-center font-semibold mb-2">Filter by Position:</p>
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
            {position === 'all' ? 'All Positions' : position}
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
                <Link 
                  href={`/roster/players/${player.slug}`}
                  className="text-xl font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {player.name}
                </Link>
                {player.number && (
                <span className="text-2xl font-bold text-primary">#{player.number}</span>
                )}
              </div>
              <p className="text-gray-600 mb-2">{player.position}</p>
              
              {/* Physical stats */}
              {(player.height || player.weight) && (
                <div className="flex gap-4 text-sm text-gray-500 mb-2">
                  {player.height && (
                    <span>Height: {player.height}</span>
                  )}
                  {player.weight && (
                    <span>Weight: {player.weight}kg</span>
                  )}
                </div>
              )}
              
              {/* Caps information */}
              {(player.d1Caps || player.d3Caps) && (
                <div className="flex gap-4 text-sm font-medium mb-2">
                  {player.d1Caps && (
                    <span className="text-blue-600 dark:text-blue-400">D1 Caps: {player.d1Caps}</span>
                  )}
                  {player.d3Caps && (
                    <span className="text-green-600 dark:text-green-400">D3 Caps: {player.d3Caps}</span>
                  )}
                </div>
              )}
              
              {/* Badges for special roles */}
              {player.badges && player.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {player.badges.map((badge, index) => (
                    <Badge 
                      key={index}
                      text={badge.text}
                      variant={badge.variant || "default"}
                      index={index}
                    />
                  ))}
                </div>
              )}
              
              <p className="text-sm text-gray-500">{player.experience}</p>
              
              {/* Division indicator */}
              <div className="mt-3 pt-2 border-t border-gray-200">
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  player.division === 'D1' 
                    ? 'bg-blue-100 text-blue-800'
                    : player.division === 'D3'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-purple-100 text-purple-800'
                }`}>
                  {player.division === 'Both' ? 'D1 & D3 Teams' : `Men's ${player.division} Team`}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredPlayers.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No players found with the selected filters.</p>
      )}
    </>
  );
} 