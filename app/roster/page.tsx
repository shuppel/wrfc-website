import { generateMetadata } from '../utils/seo'
import { BreadcrumbJsonLd } from '../../components/JsonLd'
import JsonLd from '../../components/JsonLd'
import RosterList from '../../components/RosterList';

export interface Player {
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
    type: 'website',
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
    url: 'https://washingtonrugby.org/roster',
    logo: {
      '@type': 'ImageObject',
      url: 'https://washingtonrugby.org/logos/wrfc-logo.png'
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
        name: `Washington Rugby Football Club ${player.division === 'Both' ? 'D1/D3' : player.division}`
      }
    }))
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Structured Data */}
      <BreadcrumbJsonLd 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Roster', item: '/roster' }
        ]} 
      />
      <JsonLd type="SportsTeam" data={structuredData} />

      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="hero-title mb-6">Team Roster</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Meet the Washington Rugby Football Club players for the 2024 season. 
          Our roster features talented athletes across both our Division 1 and Division 3 teams.
        </p>
      </div>

      {/* Roster List - Client Component */}
      <RosterList players={players} />
    </div>
  );
} 