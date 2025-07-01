import { Metadata } from 'next'
import Link from 'next/link'
import { generateSEOMetadata } from '../../utils/seo'
import { getAllPlayerProfiles } from '@/lib/contentful'
import PlayerRosterClient from '@/components/PlayerRosterClient'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Player Roster',
  description: 'Meet the players of Washington Rugby Football Club. Our diverse roster includes talented athletes from all backgrounds united by their love of rugby.',
  path: '/teams/players'
})

// Real WRFC player data from roster
interface RosterPlayer {
  id: number;
  name: string;
  position: string;
  number?: number;
  image: string;
  experience?: string;
  division: 'D1' | 'D3' | 'Both';
  height?: string;
  weight?: number;
  d1Caps?: number;
  d3Caps?: number;
  badges?: {
    text: string;
    variant?: "default" | "outline" | "glow";
  }[];
}

const realPlayers: RosterPlayer[] = [
  // Division 1 Leadership
  {
    id: 1,
    name: "Harry Higginbottom",
    position: "Front Row",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    height: "6'4\"",
    weight: 107,
    d1Caps: 8,
    badges: [
      { text: "President", variant: "glow" },
    ]
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
    id: 19,
    name: "Leo Fangmeyer",
    position: "Fly-half",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    badges: [
      { text: "Captain (Early 2024)", variant: "outline" }
    ]
  },

  // D1 Front Row
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
    position: "Hooker",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    height: "5'10\"",
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

  // D1 Forwards
  {
    id: 8,
    name: "Zachary Zuzelo",
    position: "Flanker",
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
    id: 15,
    name: "Samuel Follansbee",
    position: "Flanker",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    height: "6'2\"",
    weight: 240
  },

  // D1 Backs
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

  // D3 Leadership and Key Players
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
    id: 30,
    name: "Austin Mack",
    position: "Prop",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
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
]

export default async function PlayersPage() {
  // Try to fetch from Contentful, fallback to sample data
  const contentfulPlayers = await getAllPlayerProfiles()
  const hasContentfulData = contentfulPlayers.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Player Roster
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet the talented athletes who make up Washington Rugby Football Club. 
            Our players come from diverse backgrounds but share a common passion for rugby excellence.
          </p>
        </div>

        {/* Player Roster with Filtering */}
        <PlayerRosterClient 
          players={realPlayers}
          hasContentfulData={hasContentfulData}
          contentfulPlayers={contentfulPlayers}
        />

        {/* Stats Summary */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              50+
            </div>
            <p className="text-gray-600 dark:text-gray-300">Active Players</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              3
            </div>
            <p className="text-gray-600 dark:text-gray-300">Divisions</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              15+
            </div>
            <p className="text-gray-600 dark:text-gray-300">Nationalities</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
              60+
            </div>
            <p className="text-gray-600 dark:text-gray-300">Years of Rugby</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-8 text-white max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="text-lg mb-6">
              Interested in playing rugby? We welcome players of all skill levels. 
              Come to a practice and see what WRFC is all about!
            </p>
            <Link 
              href="/membership"
              className="inline-block bg-white text-red-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Become a Member
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}