'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from 'components/ui/card';
import { Badge } from 'components/ui/badge';
import { generateMetadata, getStructuredData } from '../utils/seo'
import { BreadcrumbJsonLd } from '../../components/JsonLd'
import JsonLd from '../../components/JsonLd'

interface Player {
  id: number;
  name: string;
  position: string;
  number?: number;
  image: string;
  experience?: string;
  division: 'D1' | 'D3' | 'Both';
  height?: string; // in format '6\'2"' or similar
  weight?: number; // in kg
  d1Caps?: number;
  d3Caps?: number;
  badges?: {
    text: string;
    variant?: "default" | "outline" | "glow";
  }[];
}

// This would typically come from an API or database
const players: Player[] = [
  // Division 1 (Men's D1) Roster
  {
    id: 1,
    name: "Harry Higginbottom",
    position: "Front Row",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    height: "6'1\"",
    weight: 107,
    d1Caps: 8,
    badges: [
      { text: "President", variant: "glow" },
    ]
  },
  {
    id: 2,
    name: "Matthew Bainbridge",
    position: "Front Row",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    height: "6'0\"",
    weight: 109,
    d1Caps: 4
  },
  {
    id: 3,
    name: "Erikk Shupp",
    position: "Front Row",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    height: "5'9.5\"",
    weight: 113,
    d1Caps: 6
  },
  {
    id: 4,
    name: "Benjamin Goodlet",
    position: "Prop",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    height: "6'0\"",
    weight: 120,
    d1Caps: 4
  },
  {
    id: 5,
    name: "Diamond Jones",
    position: "Prop",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    height: "5'9\"",
    weight: 260,
    d1Caps: 3
  },
  {
    id: 6,
    name: "Austin Longo",
    position: "Prop",
    image: "/assets/art/player_profile_rugby.png",
    division: 'Both',
    height: "5'11\"",
    weight: 280,
    d1Caps: 2,
    d3Caps: 4
  },
  {
    id: 7,
    name: "Xavier Landreville",
    position: "Prop",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    height: "6'2\"",
    d1Caps: 5
  },
  {
    id: 8,
    name: "Zachary Zuzelo",
    position: "Utility Forward [Hooker/Flanker]",
    image: "/assets/art/player_profile_rugby.png",
    division: 'Both',
    d1Caps: 3,
    d3Caps: 5
  },
  {
    id: 9,
    name: "Anton Meyer",
    position: "Lock",
    image: "/assets/art/player_profile_rugby.png",
    division: 'Both',
    d1Caps: 2,
    d3Caps: 6
  },
  {
    id: 10,
    name: "Raymond Gajkowski",
    position: "Lock",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    height: "6'6\"",
    weight: 109,
    d1Caps: 5
  },
  {
    id: 11,
    name: "Douglas Mulliken",
    position: "Lock",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    height: "6'4\"",
    weight: 113,
    d1Caps: 4
  },
  {
    id: 12,
    name: "Christopher Miller",
    position: "Flanker/Number 8",
    image: "/assets/art/player_profile_rugby.png",
    division: 'Both',
    height: "5'10\"",
    weight: 90,
    d1Caps: 7,
    d3Caps: 3,
    badges: [
      { text: "Club Captain", variant: "glow" }
    ]
  },
  {
    id: 13,
    name: "Stephen Okala",
    position: "Flanker/Center",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    height: "5'10\"",
    weight: 195,
    d1Caps: 6
  },
  {
    id: 14,
    name: "Thomas Demetriou",
    position: "Number 8",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    height: "6'2\"",
    weight: 109,
    d1Caps: 5,
    badges: [
      { text: "Vice Captain", variant: "outline" }
    ]
  },
  {
    id: 15,
    name: "Samuel Follansbee",
    position: "Flanker",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    height: "6'2\"",
    weight: 240
  },
  {
    id: 16,
    name: "Nicholas Barone",
    position: "Scrum-half",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    height: "5'7\"",
    weight: 80
  },
  {
    id: 17,
    name: "Nicholas Lami",
    position: "Scrum-half",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1'
  },
  {
    id: 18,
    name: "Justin Owens",
    position: "Scrum-half",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1'
  },
  {
    id: 19,
    name: "Leo Fangmeyer",
    position: "Fly-half",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    badges: [
      { text: "Captain (Early 2024)", variant: "outline" }
    ]
  },
  {
    id: 20,
    name: "Gareth Davies",
    position: "Fly-half",
    image: "/assets/art/player_profile_rugby.png",
    division: 'Both'
  },
  {
    id: 21,
    name: "Tyler Sammann",
    position: "Center",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1'
  },
  {
    id: 22,
    name: "Dewayne Jones",
    position: "Center",
    image: "/assets/art/player_profile_rugby.png",
    division: 'Both',
    badges: [
      { text: "Young Glory Academy", variant: "default" }
    ]
  },
  {
    id: 23,
    name: "Joseph Rombalski",
    position: "Center",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1'
  },
  {
    id: 24,
    name: "Jaehyun Christopher Park",
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1'
  },
  {
    id: 25,
    name: "Andrew Klock",
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1'
  },
  {
    id: 26,
    name: "Noah Davidson",
    position: "Fullback",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1'
  },
  {
    id: 27,
    name: "Ryan Dodds",
    position: "Utility Back",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    badges: [
      { text: "Young Glory Academy", variant: "default" }
    ]
  },
  {
    id: 28,
    name: "Joseph Phiri",
    position: "Back",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1'
  },
  {
    id: 29,
    name: "Luke Hoffman",
    position: "Forward",
    image: "/assets/art/player_profile_rugby.png",
    division: 'Both'
  },
  
  // Division 3 (Men's D3) Roster - adding new players only (not duplicating D1/Both players)
  {
    id: 30,
    name: "Austin Mack",
    position: "Prop",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 31,
    name: "John Veras",
    position: "Prop",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3',
    badges: [
      { text: "D3 Captain", variant: "outline" }
    ]
  },
  {
    id: 32,
    name: "Joshua Pullman",
    position: "Hooker",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 33,
    name: "Christopher DeVore",
    position: "Prop",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 34,
    name: "Pierre Maltais",
    position: "Hooker",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 35,
    name: "Max Humphrey",
    position: "Lock",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 36,
    name: "Kieran Corcoran",
    position: "Lock",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 37,
    name: "Ashton DeLano",
    position: "Lock/Flanker",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 38,
    name: "Casey Ling",
    position: "Flanker",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 39,
    name: "Grant Two Bulls",
    position: "Flanker",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 40,
    name: "Jonathan Fuentecilla",
    position: "Number 8",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 41,
    name: "Roberto Agrusta",
    position: "Flanker",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 42,
    name: "Liam Garven",
    position: "Scrum-half",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 43,
    name: "Wesley Leckie",
    position: "Fly-half",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 44,
    name: "Saxon Bryant",
    position: "Center",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 45,
    name: "Marcus McIntyre",
    position: "Center",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 46,
    name: "Juwamer Hawrami",
    position: "Center/Fullback",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3',
    badges: [
      { text: "Young Glory Academy", variant: "default" }
    ]
  },
  {
    id: 47,
    name: "Adrian Vigil-Coello",
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 48,
    name: "Ryunosuke Hashimoto",
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 49,
    name: "Rene Esteves",
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 50,
    name: "Nicholas Cipollone",
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 51,
    name: "Domenic Boresta",
    position: "Fullback",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 52,
    name: "Ian Elzinga",
    position: "Wing/Fullback",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 53,
    name: "Koki Mori",
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 54,
    name: "Benjamin Sando",
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  }
];

// Generate metadata for the roster page
export const metadata = {
  ...generateMetadata('roster'),
  openGraph: {
    ...generateMetadata('roster').openGraph,
    type: 'sports.team',
    title: 'WRFC Team Roster 2024 | Division 1 & Division 3 Players',
    description: 'Meet the Washington Rugby Football Club players - featuring our Division 1 and Division 3 teams. View player profiles, positions, and stats for the 2024 season.',
    images: [
      {
        url: '/assets/pictures/team_roster.jpg',
        width: 1200,
        height: 630,
        alt: 'WRFC 2024 Team Roster'
      },
      {
        url: '/assets/pictures/team_action.jpg',
        width: 1200,
        height: 630,
        alt: 'WRFC Match Action'
      }
    ]
  }
};

export default function RosterPage() {
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

  // Enhanced structured data for the roster page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: 'Washington Rugby Football Club',
    sport: {
      '@type': 'Sport',
      name: 'Rugby Union',
      description: 'Rugby Union Football'
    },
    description: 'Washington Rugby Football Club roster featuring Division 1 and Division 3 teams for the 2024 season',
    url: 'https://wrfc.org/roster',
    logo: {
      '@type': 'ImageObject',
      url: 'https://wrfc.org/logos/wrfc-logo.png'
    },
    coach: {
      '@type': 'Person',
      name: 'WRFC Coaching Staff'
    },
    athlete: players.map(player => ({
      '@type': 'Person',
      name: player.name,
      height: player.height,
      weight: player.weight ? `${player.weight}kg` : undefined,
      jobTitle: player.position,
      memberOf: {
        '@type': 'SportsTeam',
        name: `WRFC ${player.division === 'Both' ? 'D1 & D3' : player.division} Team`
      }
    })),
    member: players.map(player => ({
      '@type': 'Person',
      name: player.name,
      jobTitle: player.position
    }))
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Roster', item: '/roster' }
        ]} 
      />
      <JsonLd type="SportsTeam" data={structuredData} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2">Team Roster</h1>
        <h2 className="text-2xl text-center mb-8 text-slate-600 dark:text-slate-300">2024 Season</h2>
        
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
                  <h3 className="text-xl font-semibold">{player.name}</h3>
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
      </div>
    </div>
  );
} 