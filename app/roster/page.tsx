'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from 'components/ui/card';
import { Badge } from 'components/ui/badge';

interface Player {
  id: number;
  name: string;
  position: string;
  number?: number;
  image: string;
  bio: string;
  experience?: string;
  division: 'D1' | 'D3' | 'Both';
  height?: string; // in format '6\'2"' or similar
  weight?: number; // in kg
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
    position: "Loose Head Prop",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Club president and long-time club member. Captained the side in 2024. Tough. High work rate. Defensive menace.",
    division: 'D1',
    badges: [
      { text: "President", variant: "glow" },
      { text: "Captain", variant: "outline" }
    ]
  },
  {
    id: 2,
    name: "Matthew Bainbridge",
    position: "Hooker/Front Row",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Front row specialist, durable, balanced skillset.",
    division: 'D1'
  },
  {
    id: 3,
    name: "Erikk Shupp",
    position: "Prop/Hooker",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Front row specialist with 6 DI caps. Anchors the scrum and scored a try in 2022 league win. Noted as a stocky, powerful prop in the scrum. Designated thrower and hard runner, played for club since 2017.",
    division: 'D1',
    height: "5'9.5\"",
    weight: 113
  },
  {
    id: 4,
    name: "Benjamin Goodlet",
    position: "Prop",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Strong prop with 4 DI caps. Scrummaging helped Washington's pack dominate in shutout wins, including 31-0 vs. Pittsburgh Harlequins in 2022. Noted as a strong, low-built prop.",
    division: 'D1',
    height: "6'0\"",
    weight: 120
  },
  {
    id: 5,
    name: "Diamond Jones",
    position: "Prop",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Front row specialist, hard runner, quick step, slippery",
    division: 'D1',
    height: "5'9\"",
    weight: 260
  },
  {
    id: 6,
    name: "Austin Longo",
    position: "Prop",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Front row specialist who plays for both D1 and D3 teams. Big body, big hits",
    division: 'Both',
    height: "5'11\"",
    weight: 280
  },
  {
    id: 7,
    name: "Xavier Landreville",
    position: "Hooker",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Young lock/flanker with 5 DI caps since 2022. High work rate in rucks earned him starts in key games. Tall frame with moderate build typical of a mobile lock.",
    division: 'D1',
    height: "6'2\""
  },
  {
    id: 8,
    name: "Zachary Zuzelo",
    position: "Hooker/Flanker",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Versatile forward who plays for both D1 and D3 teams. Main thrower for D1 team. Good tackle, scrappy.",
    division: 'Both'
  },
  {
    id: 9,
    name: "Anton Meyer",
    position: "Lock",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Second row specialist who provides size in the lineup and engine room of the scrum",
    division: 'Both'
  },
  {
    id: 10,
    name: "Raymond Gajkowski",
    position: "Lock",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Core lineout jumper with 5 DI caps. Contributed to 2021 Division II championship run. High skill, high IQ lineout specialist.",
    division: 'D1',
    height: "6'6\"",
    weight: 109
  },
  {
    id: 11,
    name: "Douglas Mulliken",
    position: "Lock",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Second row specialist. tough, ",
    division: 'D1',
    height: "6'4\"",
    weight: 113
  },
  {
    id: 12,
    name: "Christopher Miller",
    position: "Flanker/Number 8",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Versatile back row player. Key to the club's ball-carrying and defense",
    division: 'Both',
    height: "5'10\"",
    weight: 90
  },
  {
    id: 13,
    name: "Stephen Okala",
    position: "Flanker/Center",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Versatile forward with 6 official DI caps. Scored a try in 2022 DI match. Impact player known for athleticism and tackling. Appeared in both pack and backline positions.",
    division: 'D1',
    height: "5'10\"",
    weight: 195
  },
  {
    id: 14,
    name: "Thomas Demetriou",
    position: "Number 8",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Dynamic flanker/No.8 and mainstay with Washington RFC. Has 5 official caps in Division I since 2022. Power and ball-carrying earned him Man of the Match honors in select Capital GU fixtures.",
    division: 'D1',
    height: "6'2\"",
    weight: 109,
    badges: [
      { text: "Vice Captain", variant: "outline" }
    ]
  },
  {
    id: 15,
    name: "Samuel Follansbee",
    position: "Flanker",
    image: "/assets/art/player_profile_rugby.png",
    bio: "No.7 specialist with 2 caps. Scored a try in 2022.",
    division: 'D1',
    height: "6'2\"",
    weight: 240
  },
  {
    id: 16,
    name: "Nicholas Barone",
    position: "Scrum-half",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Scrum-half with 3 DI caps.",
    division: 'D1',
    height: "5'7\"",
    weight: 80
  },
  {
    id: 17,
    name: "Nicholas Lami",
    position: "Scrum-half",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Scrum-half/wing with 5 caps. Stepped up as starting scrum-half in 2023 DI matches. Known for quick service from the base.",
    division: 'D1'
  },
  {
    id: 18,
    name: "Justin Owens",
    position: "Scrum-half",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Fullback/wing with 3 caps in DIII and DI. Part of D3 squad before earning DI start in 2023. Known for counter-attacking ability.",
    division: 'D1'
  },
  {
    id: 19,
    name: "Leo Fangmeyer",
    position: "Fly-half",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Club's first-choice fly-half and frequent captain. Has 7 caps in DI since 2022. Reliable playmaker and goal-kicker with multiple successful conversions in league matches. Known for solid build and field vision.",
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
    bio: "Took over the #10 role later in the year. Also featured in D3 matches",
    division: 'Both'
  },
  {
    id: 21,
    name: "Tyler Sammann",
    position: "Center",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Inside center specialist",
    division: 'D1'
  },
  {
    id: 22,
    name: "Dewayne Jones",
    position: "Center",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Young Glory Academy alum. Earned a starting center spot in the fall",
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
    bio: "Center with 6 official caps in DIII and DI. Stalwart during the 2021-22 Division II title run and continued as a playmaking center in DI.",
    division: 'D1'
  },
  {
    id: 24,
    name: "Jaehyun Christopher Park",
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Wing specialist with 3 caps.",
    division: 'D1'
  },
  {
    id: 25,
    name: "Andrew Klock",
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Wing specialist",
    division: 'D1'
  },
  {
    id: 26,
    name: "Noah Davidson",
    position: "Fullback",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Fullback specialist",
    division: 'D1'
  },
  {
    id: 27,
    name: "Ryan Dodds",
    position: "Utility Back",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Center with 3 caps. Young Glory academy graduate. Featured as a reserve in 2024.",
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
    bio: "Featured as a reserve in 2024",
    division: 'D1'
  },
  {
    id: 29,
    name: "Luke Hoffman",
    position: "Forward",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Featured for both D1 and D3 sides. Primary jumper in the D3 lineout during spring",
    division: 'Both'
  },
  
  // Division 3 (Men's D3) Roster - adding new players only (not duplicating D1/Both players)
  {
    id: 30,
    name: "Austin Mack",
    position: "Prop",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Front row specialist with experience",
    division: 'D3'
  },
  {
    id: 31,
    name: "John Veras",
    position: "Prop",
    image: "/assets/art/player_profile_rugby.png",
    bio: "D3 captain who anchored the front row",
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
    bio: "Newer addition to the front row",
    division: 'D3'
  },
  {
    id: 33,
    name: "Christopher DeVore",
    position: "Prop",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Front row specialist",
    division: 'D3'
  },
  {
    id: 34,
    name: "Pierre Maltais",
    position: "Hooker",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Newer addition to the front row",
    division: 'D3'
  },
  {
    id: 35,
    name: "Max Humphrey",
    position: "Lock",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Primary jumper in the lineout during the spring",
    division: 'D3'
  },
  {
    id: 36,
    name: "Kieran Corcoran",
    position: "Lock",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Bolstered the second row in the fall season",
    division: 'D3'
  },
  {
    id: 37,
    name: "Ashton DeLano",
    position: "Lock/Flanker",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Bolstered the second row in the fall season",
    division: 'D3'
  },
  {
    id: 38,
    name: "Casey Ling",
    position: "Flanker",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Starting flanker in many D3 matches",
    division: 'D3'
  },
  {
    id: 39,
    name: "Grant Two Bulls",
    position: "Flanker",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Starting flanker in many D3 matches",
    division: 'D3'
  },
  {
    id: 40,
    name: "Jonathan Fuentecilla",
    position: "Number 8",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Back row specialist",
    division: 'D3'
  },
  {
    id: 41,
    name: "Roberto Agrusta",
    position: "Flanker",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Back row specialist",
    division: 'D3'
  },
  {
    id: 42,
    name: "Liam Garven",
    position: "Scrum-half",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Utility back with 4 caps in both DIII and DI. Featured in the back-three during the 2022 season. Fall starter at scrum-half.",
    division: 'D3'
  },
  {
    id: 43,
    name: "Wesley Leckie",
    position: "Fly-half",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Ran the backline at fly-half in the spring season",
    division: 'D3'
  },
  {
    id: 44,
    name: "Saxon Bryant",
    position: "Center",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Inside center who patrolled the midfield in spring matches",
    division: 'D3'
  },
  {
    id: 45,
    name: "Marcus McIntyre",
    position: "Center",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Outside center who patrolled the midfield in spring matches",
    division: 'D3'
  },
  {
    id: 46,
    name: "Juwamer Hawrami",
    position: "Center/Fullback",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Young Glory product who played fullback in early 2024 and moved to center in the fall",
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
    bio: "Starting wing in spring 2024",
    division: 'D3'
  },
  {
    id: 48,
    name: "Ryunosuke Hashimoto",
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Starting wing in spring 2024",
    division: 'D3'
  },
  {
    id: 49,
    name: "Rene Esteves",
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Featured in the back three in fall 2024",
    division: 'D3'
  },
  {
    id: 50,
    name: "Nicholas Cipollone",
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Featured in the back three in fall 2024",
    division: 'D3'
  },
  {
    id: 51,
    name: "Domenic Boresta",
    position: "Fullback",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Featured in the back three in fall 2024",
    division: 'D3'
  },
  {
    id: 52,
    name: "Ian Elzinga",
    position: "Wing/Fullback",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Back three specialist",
    division: 'D3'
  },
  {
    id: 53,
    name: "Koki Mori",
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Back three specialist",
    division: 'D3'
  },
  {
    id: 54,
    name: "Benjamin Sando",
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    bio: "Back three specialist",
    division: 'D3'
  }
];

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

  return (
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
              
              <p className="text-sm text-gray-500">{player.bio}</p>
              
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
              
              {player.experience && (
              <p className="text-sm text-gray-500 mt-2">Experience: {player.experience}</p>
              )}
            </div>
          </Card>
        ))}
      </div>
      
      {filteredPlayers.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No players found with the selected filters.</p>
      )}
    </div>
  );
} 