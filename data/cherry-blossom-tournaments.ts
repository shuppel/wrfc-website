export interface RegisteredTeam {
  id: string;
  teamName: string;
  division: string;
  city: string;
  state: string;
  status: 'pending' | 'waitlist' | 'confirmed' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid';
  registrationDate: string;
}

export interface Division {
  name: string;
  description: string;
  fee: number;
  format: '15s' | '7s';
  maxTeams: number;
}

export interface TournamentYear {
  year: number;
  edition: number;
  date: string;
  datePending: boolean;
  status: 'upcoming' | 'completed';
  location: {
    name: string;
    address: string;
  };
  divisions: Division[];
  registrationOpen: boolean;
  registrationOpens?: string;
  registrationCloses?: string;
  paymentDeadlineDays: number;
  champions?: {
    division: string;
    team: string;
  }[];
  highlights?: string[];
  teamsCount?: number;
}

export const cherryBlossomTournaments: TournamentYear[] = [
  {
    year: 2026,
    edition: 58,
    date: 'April 11, 2026',
    datePending: false,
    status: 'upcoming',
    location: {
      name: 'The Fields at RFK',
      address: 'Washington, DC'
    },
    divisions: [
      {
        name: 'Club 15s',
        description: 'Men\'s & Women\'s Club teams',
        fee: 485,
        format: '15s',
        maxTeams: 12
      },
      {
        name: 'College 15s',
        description: 'Men\'s & Women\'s College teams',
        fee: 450,
        format: '15s',
        maxTeams: 12
      },
      {
        name: 'High School 15s',
        description: 'Men\'s & Women\'s High School teams',
        fee: 485,
        format: '15s',
        maxTeams: 8
      },
      {
        name: 'Two Teams Bundle',
        description: 'Register two sides at a discount',
        fee: 650,
        format: '15s',
        maxTeams: 8
      }
    ],
    registrationOpen: true,
    registrationOpens: 'December 1, 2025',
    registrationCloses: 'April 1, 2026',
    paymentDeadlineDays: 14,
    highlights: [
      '58th Annual Cherry Blossom Tournament',
      'We\'re back in DC at The Fields at RFK!',
      'Premier East Coast spring rugby event',
      '5 divisions across all levels of play'
    ]
  },
  {
    year: 2025,
    edition: 57,
    date: 'April 12-13, 2025',
    datePending: false,
    status: 'completed',
    location: {
      name: 'Liberty Sports Park',
      address: '220 Prince George\'s Boulevard, Upper Marlboro, MD 20774'
    },
    divisions: [
      {
        name: 'Senior Men\'s 15s',
        description: 'Premier division for club teams',
        fee: 400,
        format: '15s',
        maxTeams: 8
      },
      {
        name: 'Collegiate Men\'s 7s',
        description: 'CRC Qualifier',
        fee: 400,
        format: '7s',
        maxTeams: 8
      },
      {
        name: 'High School Boy\'s 15s',
        description: 'Youth competition',
        fee: 350,
        format: '15s',
        maxTeams: 8
      },
      {
        name: 'Old Boy\'s 15s',
        description: 'Veterans division',
        fee: 350,
        format: '15s',
        maxTeams: 6
      }
    ],
    registrationOpen: false,
    paymentDeadlineDays: 14,
    champions: [
      {
        division: 'Senior Men\'s 15s',
        team: 'White Plains'
      }
    ],
    teamsCount: 31,
    highlights: [
      '31 teams competed across 4 divisions',
      'Over 600 players participated',
      'Perfect spring weather'
    ]
  },
  {
    year: 2024,
    edition: 56,
    date: 'April 13-14, 2024',
    datePending: false,
    status: 'completed',
    location: {
      name: 'Liberty Sports Park',
      address: '220 Prince George\'s Boulevard, Upper Marlboro, MD 20774'
    },
    divisions: [
      {
        name: 'Men\'s Division 1',
        description: 'Premier men\'s division',
        fee: 750,
        format: '15s',
        maxTeams: 8
      },
      {
        name: 'Men\'s Division 2',
        description: 'Competitive men\'s division',
        fee: 650,
        format: '15s',
        maxTeams: 8
      }
    ],
    registrationOpen: false,
    paymentDeadlineDays: 14,
    teamsCount: 16,
    highlights: [
      '16 teams competed',
      'Competitive matches throughout',
      'Great community atmosphere'
    ]
  }
];

export function getCurrentTournament(): TournamentYear {
  return cherryBlossomTournaments.find(t => t.status === 'upcoming') || cherryBlossomTournaments[0];
}

export function getTournamentByYear(year: number): TournamentYear | undefined {
  return cherryBlossomTournaments.find(t => t.year === year);
}

export function getHistoricalTournaments(): TournamentYear[] {
  return cherryBlossomTournaments.filter(t => t.status === 'completed');
}

export function getDivisionOptions(year: number = 2026): { value: string; label: string; fee: number }[] {
  const tournament = getTournamentByYear(year);
  if (!tournament) return [];
  
  return tournament.divisions.map(d => ({
    value: d.name,
    label: `${d.name} - $${d.fee} (${d.format})`,
    fee: d.fee
  }));
}
