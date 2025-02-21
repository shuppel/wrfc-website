export interface Team {
  id: string
  name: string
  logo?: string
  shortName?: string
  city?: string
  state?: string
}

export interface Venue {
  id: string
  name: string
  city: string
  state: string
  address: string // Making address required since we need it for directions
  coordinates: {
    lat: number
    lng: number
  }
}

export interface GameResult {
  homeScore: number
  awayScore: number
  status: 'FINAL' | 'FORFEIT' | 'CANCELLED' | 'POSTPONED'
  notes?: string
}

export interface Game {
  id: string
  homeTeam: Team
  awayTeam: Team
  date: string // ISO date string
  time: string
  venue: Venue
  season: string
  competition: 'LEAGUE' | 'FRIENDLY' | 'PLAYOFF' | 'TOURNAMENT' | 'SOCIAL'
  isHome: boolean
  ticketsUrl?: string
  broadcastUrl?: string
  result?: GameResult
}

export interface Season {
  id: string
  name: string
  startDate: string // ISO date string
  endDate: string // ISO date string
  isActive: boolean
}

// Helper function to generate Google Maps URL
export function getGoogleMapsUrl(venue: Venue): string {
  if (venue.coordinates) {
    return `https://www.google.com/maps?q=${venue.coordinates.lat},${venue.coordinates.lng}`
  }
  // Fallback to address search if no coordinates
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venue.name}, ${venue.address}, ${venue.city}, ${venue.state}`
  )}`
}

// Sample data structure
export const SAMPLE_DATA = {
  teams: [
    {
      id: 'wrfc',
      name: 'Washington Rugby Football Club',
      shortName: 'WRFC',
      logo: '/logos/wrfc_logo.png',
      city: 'Washington',
      state: 'DC'
    },
    {
      id: 'renegades',
      name: 'Washington Renegades',
      shortName: 'Renegades',
      city: 'Washington',
      state: 'DC'
    },
    {
      id: 'irish',
      name: 'Washington Irish',
      shortName: 'Irish',
      city: 'Washington',
      state: 'DC'
    },
    {
      id: 'perc',
      name: 'Potomac Exiles Rugby Club',
      shortName: 'PERC',
      city: 'Washington',
      state: 'DC'
    },
    {
      id: 'raleigh',
      name: 'Raleigh Rugby Football Club',
      shortName: 'Raleigh RFC',
      city: 'Raleigh',
      state: 'NC'
    },
    {
      id: 'virginia',
      name: 'Virginia Rugby',
      shortName: 'Virginia',
      city: 'Virginia Beach',
      state: 'VA'
    },
    {
      id: 'wi',
      name: 'Washington Irish',
      shortName: 'Irish',
      logo: '/logos/washington-irish.png',
      city: 'Washington',
      state: 'DC'
    },
    {
      id: 'norfolk',
      name: 'Norfolk Blues',
      shortName: 'Norfolk Blues',
      logo: '/logos/norfolk-blues.png',
      city: 'Norfolk',
      state: 'VA'
    },
    {
      id: 'perc',
      name: 'Potomac Exiles',
      shortName: 'Potomac',
      logo: '/logos/potomac-exiles.png',
      city: 'Washington',
      state: 'DC'
    },
    {
      id: 'schuylkill',
      name: 'Schuylkill River',
      shortName: 'Schuylkill',
      logo: '/logos/schuylkill-river.png',
      city: 'Philadelphia',
      state: 'PA'
    },
    {
      id: 'nova',
      name: 'NOVA Rugby',
      shortName: 'NOVA',
      logo: '/logos/nova-rugby.png',
      city: 'Northern Virginia',
      state: 'VA'
    },
    {
      id: 'baltimore',
      name: 'Baltimore Chesapeake',
      shortName: 'Baltimore',
      logo: '/logos/baltimore-chesapeake.png',
      city: 'Baltimore',
      state: 'MD'
    },
    {
      id: 'rocky-gorge',
      name: 'Rocky Gorge',
      shortName: 'Rocky Gorge',
      logo: '/logos/rocky-gorge.png',
      city: 'Columbia',
      state: 'MD'
    }
  ],
  venues: [
    {
      id: 'home',
      name: 'WRFC Home Field',
      city: 'Washington',
      state: 'DC',
      address: 'TBD',
      coordinates: {
        lat: 38.8977,
        lng: -77.0365
      }
    },
    {
      id: 'tba',
      name: 'TBD',
      city: 'TBD',
      state: 'TBD',
      address: 'TBD',
      coordinates: {
        lat: 0,
        lng: 0
      }
    }
  ],
  seasons: [
    {
      id: '2025',
      name: '2025 Season',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: true
    }
  ],
  games: [
    {
      id: '2025-01',
      homeTeam: {
        id: 'renegades',
        name: 'Washington Renegades',
        shortName: 'Renegades'
      },
      awayTeam: {
        id: 'wrfc',
        name: 'Washington Rugby Football Club',
        shortName: 'WRFC',
        logo: '/logos/wrfc_logo.png'
      },
      date: '2025-02-22',
      time: '13:00',
      venue: {
        id: 'home',
        name: 'TBD',
        city: 'Washington',
        state: 'DC',
        address: 'TBD',
        coordinates: {
          lat: 38.8977,
          lng: -77.0365
        }
      },
      season: '2025',
      competition: 'SOCIAL',
      isHome: false
    },
    {
      id: '2025-02',
      homeTeam: {
        id: 'irish',
        name: 'Washington Irish',
        shortName: 'Irish'
      },
      awayTeam: {
        id: 'wrfc',
        name: 'Washington Rugby Football Club',
        shortName: 'WRFC',
        logo: '/logos/wrfc_logo.png'
      },
      date: '2025-03-15',
      time: '13:00',
      venue: {
        id: 'home',
        name: 'TBD',
        city: 'Washington',
        state: 'DC',
        address: 'TBD',
        coordinates: {
          lat: 38.8977,
          lng: -77.0365
        }
      },
      season: '2025',
      competition: 'D1/D3',
      isHome: false
    },
    {
      id: '2025-03',
      homeTeam: {
        id: 'perc',
        name: 'Potomac Exiles Rugby Club',
        shortName: 'PERC'
      },
      awayTeam: {
        id: 'wrfc',
        name: 'Washington Rugby Football Club',
        shortName: 'WRFC',
        logo: '/logos/wrfc_logo.png'
      },
      date: '2025-03-22',
      time: '13:00',
      venue: {
        id: 'home',
        name: 'TBD',
        city: 'Washington',
        state: 'DC',
        address: 'TBD',
        coordinates: {
          lat: 38.8977,
          lng: -77.0365
        }
      },
      season: '2025',
      competition: 'D1/D3',
      isHome: false
    },
    {
      id: '2025-04',
      homeTeam: {
        id: 'wrfc',
        name: 'Washington Rugby Football Club',
        shortName: 'WRFC',
        logo: '/logos/wrfc_logo.png'
      },
      awayTeam: {
        id: 'raleigh',
        name: 'Raleigh Rugby Football Club',
        shortName: 'Raleigh RFC'
      },
      date: '2025-03-29',
      time: '13:00',
      venue: {
        id: 'home',
        name: 'WRFC Home Field',
        city: 'Washington',
        state: 'DC',
        address: 'TBD',
        coordinates: {
          lat: 38.8977,
          lng: -77.0365
        }
      },
      season: '2025',
      competition: 'SOCIAL',
      isHome: true
    },
    {
      id: '2025-05',
      homeTeam: {
        id: 'virginia',
        name: 'Virginia Rugby',
        shortName: 'Virginia'
      },
      awayTeam: {
        id: 'wrfc',
        name: 'Washington Rugby Football Club',
        shortName: 'WRFC',
        logo: '/logos/wrfc_logo.png'
      },
      date: '2025-04-05',
      time: '13:00',
      venue: {
        id: 'home',
        name: 'TBD',
        city: 'Virginia Beach',
        state: 'VA',
        address: 'TBD',
        coordinates: {
          lat: 36.8529,
          lng: -75.9780
        }
      },
      season: '2025',
      competition: 'SOCIAL',
      isHome: false
    },
    {
      id: '2024-09-14-d1',
      homeTeam: {
        id: 'rocky-gorge',
        name: 'Rocky Gorge',
        shortName: 'Rocky Gorge',
        logo: '/logos/rocky-gorge.png'
      },
      awayTeam: {
        id: 'wrfc',
        name: 'Washington Rugby Football Club',
        shortName: 'Washington MD1',
        logo: '/logos/wrfc_logo.png'
      },
      date: '2024-09-14',
      time: '13:00',
      venue: {
        id: 'tba',
        name: 'TBD',
        city: 'TBD',
        state: 'TBD',
        address: 'TBD',
        coordinates: { lat: 0, lng: 0 }
      },
      season: '2024',
      competition: 'MAC Men D1',
      isHome: false,
      result: {
        homeScore: 50,
        awayScore: 0,
        status: 'FINAL'
      }
    },
    {
      id: '2024-09-14-d3',
      homeTeam: {
        id: 'rocky-gorge',
        name: 'Rocky Gorge',
        shortName: 'Rocky Gorge',
        logo: '/logos/rocky-gorge.png'
      },
      awayTeam: {
        id: 'wrfc',
        name: 'Washington Rugby Football Club',
        shortName: 'Washington MD3',
        logo: '/logos/wrfc_logo.png'
      },
      date: '2024-09-14',
      time: '13:00',
      venue: {
        id: 'tba',
        name: 'TBD',
        city: 'TBD',
        state: 'TBD',
        address: 'TBD',
        coordinates: { lat: 0, lng: 0 }
      },
      season: '2024',
      competition: 'Capital Men D3 Challenger',
      isHome: false,
      result: {
        homeScore: 101,
        awayScore: 0,
        status: 'FINAL'
      }
    },
    {
      id: '2024-09-21-d1',
      homeTeam: {
        id: 'wrfc',
        name: 'Washington Rugby Football Club',
        shortName: 'Washington MD1',
        logo: '/logos/wrfc_logo.png'
      },
      awayTeam: {
        id: 'baltimore',
        name: 'Baltimore Chesapeake',
        shortName: 'Baltimore',
        logo: '/logos/baltimore-chesapeake.png'
      },
      date: '2024-09-21',
      time: '13:00',
      venue: {
        id: 'tba',
        name: 'TBD',
        city: 'TBD',
        state: 'TBD',
        address: 'TBD',
        coordinates: { lat: 0, lng: 0 }
      },
      season: '2024',
      competition: 'MAC Men D1',
      isHome: true,
      result: {
        homeScore: 27,
        awayScore: 7,
        status: 'FINAL'
      }
    },
    {
      id: '2024-09-28-d1',
      homeTeam: {
        id: 'wrfc',
        name: 'Washington Rugby Football Club',
        shortName: 'Washington MD1',
        logo: '/logos/wrfc_logo.png'
      },
      awayTeam: {
        id: 'nova',
        name: 'NOVA Rugby',
        shortName: 'NOVA MD1',
        logo: '/logos/nova-rugby.png'
      },
      date: '2024-09-28',
      time: '13:00',
      venue: {
        id: 'tba',
        name: 'TBD',
        city: 'TBD',
        state: 'TBD',
        address: 'TBD',
        coordinates: { lat: 0, lng: 0 }
      },
      season: '2024',
      competition: 'MAC Men D1',
      isHome: true,
      result: {
        homeScore: 17,
        awayScore: 24,
        status: 'FINAL'
      }
    },
    {
      id: '2024-09-28-d3',
      homeTeam: {
        id: 'wrfc',
        name: 'Washington Rugby Football Club',
        shortName: 'Washington MD3',
        logo: '/logos/wrfc_logo.png'
      },
      awayTeam: {
        id: 'nova',
        name: 'NOVA Rugby',
        shortName: 'NOVA MD3',
        logo: '/logos/nova-rugby.png'
      },
      date: '2024-09-28',
      time: '13:00',
      venue: {
        id: 'tba',
        name: 'TBD',
        city: 'TBD',
        state: 'TBD',
        address: 'TBD',
        coordinates: { lat: 0, lng: 0 }
      },
      season: '2024',
      competition: 'Capital Men D3 Challenger',
      isHome: true,
      result: {
        homeScore: 13,
        awayScore: 89,
        status: 'FINAL'
      }
    },
    {
      id: '2024-10-12-d1',
      homeTeam: {
        id: 'wrfc',
        name: 'Washington Rugby Football Club',
        shortName: 'Washington MD1',
        logo: '/logos/wrfc_logo.png'
      },
      awayTeam: {
        id: 'schuylkill',
        name: 'Schuylkill River',
        shortName: 'Schuylkill MD1',
        logo: '/logos/schuylkill-river.png'
      },
      date: '2024-10-12',
      time: '13:00',
      venue: {
        id: 'tba',
        name: 'TBD',
        city: 'TBD',
        state: 'TBD',
        address: 'TBD',
        coordinates: { lat: 0, lng: 0 }
      },
      season: '2024',
      competition: 'MAC Men D1',
      isHome: true,
      result: {
        homeScore: 31,
        awayScore: 38,
        status: 'FINAL'
      }
    },
    {
      id: '2024-10-12-d3',
      homeTeam: {
        id: 'wrfc',
        name: 'Washington Rugby Football Club',
        shortName: 'Washington MD3',
        logo: '/logos/wrfc_logo.png'
      },
      awayTeam: {
        id: 'schuylkill',
        name: 'Schuylkill River',
        shortName: 'Schuylkill MD3',
        logo: '/logos/schuylkill-river.png'
      },
      date: '2024-10-12',
      time: '13:00',
      venue: {
        id: 'tba',
        name: 'TBD',
        city: 'TBD',
        state: 'TBD',
        address: 'TBD',
        coordinates: { lat: 0, lng: 0 }
      },
      season: '2024',
      competition: 'Capital Men D3 Challenger',
      isHome: true,
      result: {
        homeScore: 42,
        awayScore: 25,
        status: 'FINAL'
      }
    },
    {
      id: '2024-10-19-d1',
      homeTeam: {
        id: 'wi',
        name: 'Washington Irish',
        shortName: 'Irish MD1',
        logo: '/logos/washington-irish.png'
      },
      awayTeam: {
        id: 'wrfc',
        name: 'Washington Rugby Football Club',
        shortName: 'Washington MD1',
        logo: '/logos/wrfc_logo.png'
      },
      date: '2024-10-19',
      time: '13:00',
      venue: {
        id: 'tba',
        name: 'TBD',
        city: 'TBD',
        state: 'TBD',
        address: 'TBD',
        coordinates: { lat: 0, lng: 0 }
      },
      season: '2024',
      competition: 'MAC Men D1',
      isHome: false,
      result: {
        homeScore: 46,
        awayScore: 14,
        status: 'FINAL'
      }
    },
    {
      id: '2024-10-19-d3',
      homeTeam: {
        id: 'wi',
        name: 'Washington Irish',
        shortName: 'Irish MD3',
        logo: '/logos/washington-irish.png'
      },
      awayTeam: {
        id: 'wrfc',
        name: 'Washington Rugby Football Club',
        shortName: 'Washington MD3',
        logo: '/logos/wrfc_logo.png'
      },
      date: '2024-10-19',
      time: '13:00',
      venue: {
        id: 'tba',
        name: 'TBD',
        city: 'TBD',
        state: 'TBD',
        address: 'TBD',
        coordinates: { lat: 0, lng: 0 }
      },
      season: '2024',
      competition: 'Capital Men D3 Challenger',
      isHome: false,
      result: {
        homeScore: 38,
        awayScore: 15,
        status: 'FINAL'
      }
    },
    {
      id: '2024-10-26-d1',
      homeTeam: {
        id: 'wrfc',
        name: 'Washington Rugby Football Club',
        shortName: 'Washington MD1',
        logo: '/logos/wrfc_logo.png'
      },
      awayTeam: {
        id: 'norfolk',
        name: 'Norfolk Blues',
        shortName: 'Norfolk Blues MD1',
        logo: '/logos/norfolk-blues.png'
      },
      date: '2024-10-26',
      time: '13:00',
      venue: {
        id: 'tba',
        name: 'TBD',
        city: 'TBD',
        state: 'TBD',
        address: 'TBD',
        coordinates: { lat: 0, lng: 0 }
      },
      season: '2024',
      competition: 'MAC Men D1',
      isHome: true,
      result: {
        homeScore: 84,
        awayScore: 0,
        status: 'FINAL'
      }
    },
    {
      id: '2024-11-02-d1',
      homeTeam: {
        id: 'perc',
        name: 'Potomac Exiles',
        shortName: 'Potomac MD1',
        logo: '/logos/potomac-exiles.png'
      },
      awayTeam: {
        id: 'wrfc',
        name: 'Washington Rugby Football Club',
        shortName: 'Washington MD1',
        logo: '/logos/wrfc_logo.png'
      },
      date: '2024-11-02',
      time: '13:00',
      venue: {
        id: 'tba',
        name: 'TBD',
        city: 'TBD',
        state: 'TBD',
        address: 'TBD',
        coordinates: { lat: 0, lng: 0 }
      },
      season: '2024',
      competition: 'MAC Men D1',
      isHome: false,
      result: {
        homeScore: 39,
        awayScore: 22,
        status: 'FINAL'
      }
    },
    {
      id: '2024-11-02-d3',
      homeTeam: {
        id: 'perc',
        name: 'Potomac Exiles',
        shortName: 'Potomac MD3',
        logo: '/logos/potomac-exiles.png'
      },
      awayTeam: {
        id: 'wrfc',
        name: 'Washington Rugby Football Club',
        shortName: 'Washington MD3',
        logo: '/logos/wrfc_logo.png'
      },
      date: '2024-11-02',
      time: '13:00',
      venue: {
        id: 'tba',
        name: 'TBD',
        city: 'TBD',
        state: 'TBD',
        address: 'TBD',
        coordinates: { lat: 0, lng: 0 }
      },
      season: '2024',
      competition: 'Capital Men D3 Challenger',
      isHome: false,
      result: {
        homeScore: 53,
        awayScore: 19,
        status: 'FINAL'
      }
    }
  ] as Game[]
} 