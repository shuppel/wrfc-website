export interface Player {
  id: number;
  name: string;
  slug: string;
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

function createSlug(name: string): string {
  return name.toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

export const players: Player[] = [
  // Division 1 (Men's D1) Roster
  {
    id: 1,
    name: "Harry Higginbottom",
    slug: createSlug("Harry Higginbottom"),
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
    id: 2,
    name: "Matthew Bainbridge",
    slug: createSlug("Matthew Bainbridge"),
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
    slug: createSlug("Erikk Shupp"),
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
    slug: createSlug("Benjamin Goodlet"),
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
    slug: createSlug("Diamond Jones"),
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
    slug: createSlug("Austin Longo"),
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
    slug: createSlug("Xavier Landreville"),
    position: "Prop",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    height: "6'2\"",
    d1Caps: 5
  },
  {
    id: 8,
    name: "Zachary Zuzelo",
    slug: createSlug("Zachary Zuzelo"),
    position: "Utility Forward [Hooker/Flanker]",
    image: "/assets/art/player_profile_rugby.png",
    division: 'Both',
    d1Caps: 3,
    d3Caps: 5
  },
  {
    id: 9,
    name: "Anton Meyer",
    slug: createSlug("Anton Meyer"),
    position: "Lock",
    image: "/assets/art/player_profile_rugby.png",
    division: 'Both',
    d1Caps: 2,
    d3Caps: 6
  },
  {
    id: 10,
    name: "Raymond Gajkowski",
    slug: createSlug("Raymond Gajkowski"),
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
    slug: createSlug("Douglas Mulliken"),
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
    slug: createSlug("Christopher Miller"),
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
    slug: createSlug("Stephen Okala"),
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
    slug: createSlug("Thomas Demetriou"),
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
    slug: createSlug("Samuel Follansbee"),
    position: "Flanker",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    height: "6'2\"",
    weight: 240
  },
  {
    id: 16,
    name: "Nicholas Barone",
    slug: createSlug("Nicholas Barone"),
    position: "Scrum-half",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1',
    height: "5'7\"",
    weight: 80
  },
  {
    id: 17,
    name: "Nicholas Lami",
    slug: createSlug("Nicholas Lami"),
    position: "Scrum-half",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1'
  },
  {
    id: 18,
    name: "Justin Owens",
    slug: createSlug("Justin Owens"),
    position: "Scrum-half",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1'
  },
  {
    id: 19,
    name: "Leo Fangmeyer",
    slug: createSlug("Leo Fangmeyer"),
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
    slug: createSlug("Gareth Davies"),
    position: "Fly-half",
    image: "/assets/art/player_profile_rugby.png",
    division: 'Both'
  },
  {
    id: 21,
    name: "Tyler Sammann",
    slug: createSlug("Tyler Sammann"),
    position: "Center",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1'
  },
  {
    id: 22,
    name: "Dewayne Jones",
    slug: createSlug("Dewayne Jones"),
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
    slug: createSlug("Joseph Rombalski"),
    position: "Center",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1'
  },
  {
    id: 24,
    name: "Jaehyun Christopher Park",
    slug: createSlug("Jaehyun Christopher Park"),
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1'
  },
  {
    id: 25,
    name: "Andrew Klock",
    slug: createSlug("Andrew Klock"),
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1'
  },
  {
    id: 26,
    name: "Noah Davidson",
    slug: createSlug("Noah Davidson"),
    position: "Fullback",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1'
  },
  {
    id: 27,
    name: "Ryan Dodds",
    slug: createSlug("Ryan Dodds"),
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
    slug: createSlug("Joseph Phiri"),
    position: "Back",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D1'
  },
  {
    id: 29,
    name: "Luke Hoffman",
    slug: createSlug("Luke Hoffman"),
    position: "Forward",
    image: "/assets/art/player_profile_rugby.png",
    division: 'Both'
  },
  
  // Division 3 (Men's D3) Roster - adding new players only (not duplicating D1/Both players)
  {
    id: 30,
    name: "Austin Mack",
    slug: createSlug("Austin Mack"),
    position: "Prop",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 31,
    name: "John Veras",
    slug: createSlug("John Veras"),
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
    slug: createSlug("Joshua Pullman"),
    position: "Hooker",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 33,
    name: "Christopher DeVore",
    slug: createSlug("Christopher DeVore"),
    position: "Prop",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 34,
    name: "Pierre Maltais",
    slug: createSlug("Pierre Maltais"),
    position: "Hooker",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 35,
    name: "Max Humphrey",
    slug: createSlug("Max Humphrey"),
    position: "Lock",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 36,
    name: "Kieran Corcoran",
    slug: createSlug("Kieran Corcoran"),
    position: "Lock",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 37,
    name: "Ashton DeLano",
    slug: createSlug("Ashton DeLano"),
    position: "Lock/Flanker",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 38,
    name: "Casey Ling",
    slug: createSlug("Casey Ling"),
    position: "Flanker",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 39,
    name: "Grant Two Bulls",
    slug: createSlug("Grant Two Bulls"),
    position: "Flanker",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 40,
    name: "Jonathan Fuentecilla",
    slug: createSlug("Jonathan Fuentecilla"),
    position: "Number 8",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 41,
    name: "Roberto Agrusta",
    slug: createSlug("Roberto Agrusta"),
    position: "Flanker",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 42,
    name: "Liam Garven",
    slug: createSlug("Liam Garven"),
    position: "Scrum-half",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 43,
    name: "Wesley Leckie",
    slug: createSlug("Wesley Leckie"),
    position: "Fly-half",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 44,
    name: "Saxon Bryant",
    slug: createSlug("Saxon Bryant"),
    position: "Center",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 45,
    name: "Marcus McIntyre",
    slug: createSlug("Marcus McIntyre"),
    position: "Center",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 46,
    name: "Juwamer Hawrami",
    slug: createSlug("Juwamer Hawrami"),
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
    slug: createSlug("Adrian Vigil-Coello"),
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 48,
    name: "Ryunosuke Hashimoto",
    slug: createSlug("Ryunosuke Hashimoto"),
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 49,
    name: "Rene Esteves",
    slug: createSlug("Rene Esteves"),
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 50,
    name: "Nicholas Cipollone",
    slug: createSlug("Nicholas Cipollone"),
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 51,
    name: "Domenic Boresta",
    slug: createSlug("Domenic Boresta"),
    position: "Fullback",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 52,
    name: "Ian Elzinga",
    slug: createSlug("Ian Elzinga"),
    position: "Wing/Fullback",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 53,
    name: "Koki Mori",
    slug: createSlug("Koki Mori"),
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  },
  {
    id: 54,
    name: "Benjamin Sando",
    slug: createSlug("Benjamin Sando"),
    position: "Wing",
    image: "/assets/art/player_profile_rugby.png",
    division: 'D3'
  }
];

export function getPlayerBySlug(slug: string): Player | undefined {
  return players.find(player => player.slug === slug);
}

export function getAllPlayerSlugs(): string[] {
  return players.map(player => player.slug);
}