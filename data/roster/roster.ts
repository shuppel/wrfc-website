import type { Player } from './types';

/**
 * WASHINGTON RUGBY FOOTBALL CLUB — PLAYER ROSTER
 *
 * ---------------------------------------------------------------------------
 * PRIVACY — READ BEFORE ADDING A FIELD
 * ---------------------------------------------------------------------------
 * This file is compiled into a public, indexed website. The season sign-up form
 * this roster was built from also collects email addresses, cell numbers, dates
 * of birth, dues and payment-assistance status, CIPP registration numbers,
 * injury detail and per-match availability. NONE of that belongs here and none
 * of it is in here.
 *
 * What is published is limited to what a player would expect to see on a team
 * sheet: name, playing positions, height and weight, seasons at the club, the
 * club they came from, and honours they chose to declare.
 *
 * Two deliberate omissions:
 *   - Date of birth. Age is not published, and DOB is an identity-theft vector.
 *     It is also the field players most often mistype.
 *   - Injury detail. A player who is out for the season is marked `unavailable`
 *     with a neutral note. The site never states why.
 *
 * ---------------------------------------------------------------------------
 * SOURCING
 * ---------------------------------------------------------------------------
 * Accolades are marked `self-reported` where they come from a player's own
 * sign-up entry, and `club-verified` where the club has direct knowledge (club
 * roles, and selections the club itself put a player forward for). Nothing is
 * asserted about a named player on the strength of a search result — see the
 * sourcing rule in ./accolades.ts.
 *
 * Players are welcome to correct their own entry or add socials; the profile
 * pages carry a link for that.
 */

export const players: Player[] = [
  // ===========================================================================
  // FALL 2026 SQUAD
  // ===========================================================================

  // --- Front row -----------------------------------------------------------
  {
    id: 1,
    name: 'Erikk Shupp',
    slug: 'erikk-shupp',
    squad: 'fall-2026',
    positions: ['prop', 'hooker'],
    division: 'D1',
    photo: '/assets/pictures/2025_irish_shupp.jpg',
    photoCredit: 'WRFC v Washington Irish, 2025',
    heightCm: 177,
    weightKg: 125,
    seasons: 6,
    accolades: [
      { id: 'capital-selects', verification: 'self-reported' },
      { id: 'alexandria-selects', verification: 'self-reported' },
      { id: 'club-veteran', verification: 'club-verified' },
    ],
  },
  {
    id: 2,
    name: 'Matthew Bainbridge',
    slug: 'matthew-bainbridge',
    squad: 'fall-2026',
    positions: ['prop', 'hooker'],
    division: 'D1',
    heightCm: 180,
    weightKg: 104,
    seasons: 3.5,
    previousClub: 'Upper Eden RUFC (Cumbria, England)',
    accolades: [{ id: 'capital-selects', verification: 'self-reported' }],
  },
  {
    id: 3,
    name: 'Ben Goodlet',
    slug: 'benjamin-goodlet',
    squad: 'fall-2026',
    positions: ['prop'],
    division: 'D1',
    heightCm: 180,
    weightKg: 116,
    seasons: 5,
    previousClub: 'Waverley Rugby Club (Sydney, Australia)',
    accolades: [{ id: 'nsw-suburban-finalist', verification: 'self-reported' }],
  },
  {
    id: 4,
    name: 'Jack Tessier',
    slug: 'jack-tessier',
    squad: 'fall-2026',
    positions: ['prop', 'hooker'],
    heightCm: 178,
    weightKg: 113,
    seasons: 0,
    previousClub: 'Dallas Harlequins',
    accolades: [
      { id: 'free-jacks-academy', verification: 'self-reported' },
      { id: 'ncr-all-american', verification: 'self-reported' },
      { id: 'collegiate-all-stars', verification: 'self-reported' },
      { id: 'rookie', detail: 'First season at WRFC', verification: 'club-verified' },
    ],
  },
  {
    id: 5,
    name: 'Joshua Pullman',
    slug: 'joshua-pullman',
    squad: 'fall-2026',
    positions: ['prop', 'hooker'],
    division: 'D3',
    heightCm: 173,
    weightKg: 104,
    seasons: 2.5,
  },
  {
    id: 6,
    name: 'Jose Carreno',
    slug: 'jose-carreno',
    squad: 'fall-2026',
    positions: ['prop'],
    heightCm: 173,
    weightKg: 99,
    seasons: 1.5,
  },
  {
    id: 7,
    name: 'Josh Quick',
    slug: 'josh-quick',
    squad: 'fall-2026',
    positions: ['prop', 'lock'],
    heightCm: 188,
    weightKg: 113,
    seasons: 2,
  },
  {
    id: 8,
    name: 'Gus Arndt',
    slug: 'gus-arndt',
    squad: 'fall-2026',
    positions: ['prop', 'lock'],
    heightCm: 188,
    weightKg: 100,
    seasons: 0,
    previousClub: 'Fordham University RFC',
    collegeProgram: 'Fordham University',
    accolades: [
      { id: 'rookie', detail: 'First season at WRFC', verification: 'club-verified' },
    ],
  },
  {
    id: 9,
    name: 'Jonathan Benkoe',
    slug: 'jonathan-benkoe',
    squad: 'fall-2026',
    positions: ['prop', 'hooker', 'flanker'],
    heightCm: 178,
    weightKg: 100,
    seasons: 0,
    previousClub: 'Vienna International School (Austria)',
    collegeProgram: 'Vienna International School',
    accolades: [
      { id: 'rookie', detail: 'First season at WRFC', verification: 'club-verified' },
    ],
  },
  {
    id: 10,
    name: 'Joshua Levine',
    slug: 'joshua-levine',
    squad: 'fall-2026',
    positions: ['hooker', 'lock'],
    heightCm: 180,
    weightKg: 104,
    seasons: 4.5,
  },
  {
    id: 11,
    name: 'Christopher DeVore',
    slug: 'christopher-devore',
    squad: 'fall-2026',
    positions: ['hooker', 'flanker', 'center'],
    division: 'D3',
    heightCm: 175,
    weightKg: 93,
    seasons: 6,
    availability: 'unavailable',
    availabilityNote:
      'Out for the Fall 2026 season. Will be at matches supporting the squad and helping the club off the field.',
    accolades: [
      { id: 'maharlikans-7s', detail: '2x selection', verification: 'self-reported' },
      { id: 'club-veteran', verification: 'club-verified' },
    ],
  },

  // --- Second row ----------------------------------------------------------
  {
    id: 12,
    name: 'Ryan Vollmer',
    slug: 'ryan-vollmer',
    squad: 'fall-2026',
    positions: ['lock', 'number-8'],
    heightCm: 196,
    weightKg: 132,
    seasons: 3,
    previousClub: 'Cleveland Rovers',
  },
  {
    id: 13,
    name: 'Thomas Demetriou',
    slug: 'thomas-demetriou',
    squad: 'fall-2026',
    positions: ['lock', 'flanker', 'number-8'],
    division: 'D1',
    photo: '/assets/pictures/2025_irish_tom.jpg',
    photoCredit: 'WRFC v Washington Irish, 2025',
    heightCm: 188,
    weightKg: 116,
    seasons: 6,
    accolades: [
      // TODO(club): confirm the exact figures before this ships. They came in
      // as approximations ("like 12"), and a count on a public profile should
      // be the real one — the club has the match records, the roster does not.
      { id: 'capital-selects', detail: '12 selections', verification: 'club-verified' },
      { id: 'match-captain', detail: '9 matches', verification: 'club-verified' },
      { id: 'man-of-the-match', detail: '3x', verification: 'club-verified' },
      { id: 'old-glory-inaugural', verification: 'self-reported' },
      { id: 'vice-captain', verification: 'club-verified' },
      { id: 'club-veteran', verification: 'club-verified' },
    ],
  },
  {
    id: 14,
    name: 'Trey Kierl',
    slug: 'trey-kierl',
    squad: 'fall-2026',
    positions: ['lock', 'flanker', 'number-8'],
    heightCm: 185,
    weightKg: 105,
    seasons: 6,
    previousClub: 'Park City Haggis (Utah)',
    accolades: [
      { id: 'player-coach', verification: 'club-verified' },
      { id: 'club-veteran', verification: 'club-verified' },
    ],
  },
  {
    id: 15,
    name: 'Benjamin Rossi',
    slug: 'benjamin-rossi',
    squad: 'fall-2026',
    positions: ['lock', 'flanker'],
    heightCm: 193,
    weightKg: 95,
    seasons: 0,
    previousClub: 'Seacoast Men\'s RFC',
    accolades: [{ id: 'rookie', detail: 'First season at WRFC', verification: 'club-verified' }],
  },
  {
    id: 16,
    name: 'Jack Wilson',
    slug: 'jack-wilson',
    squad: 'fall-2026',
    positions: ['lock', 'flanker'],
    heightCm: 188,
    weightKg: 91,
    seasons: 0,
    previousClub: 'Happy Valley RFC (State College, PA)',
    accolades: [{ id: 'rookie', detail: 'First season at WRFC', verification: 'club-verified' }],
  },
  {
    id: 17,
    name: 'Timothy Palmer',
    slug: 'timothy-palmer',
    squad: 'fall-2026',
    positions: ['lock', 'flanker'],
    heightCm: 183,
    weightKg: 98,
    seasons: 1.5,
  },
  {
    id: 18,
    name: 'Max Humphrey',
    slug: 'max-humphrey',
    squad: 'fall-2026',
    positions: ['lock', 'flanker', 'number-8'],
    division: 'D3',
    heightCm: 178,
    weightKg: 91,
    seasons: 3,
  },
  {
    id: 19,
    name: 'Eversley Sifontes',
    slug: 'eversley-sifontes',
    squad: 'fall-2026',
    positions: ['lock', 'flanker', 'scrum-half'],
    heightCm: 180,
    weightKg: 93,
    seasons: 6,
    accolades: [{ id: 'club-veteran', verification: 'club-verified' }],
  },

  // --- Back row ------------------------------------------------------------
  {
    id: 20,
    name: 'Harry Higginbottom',
    slug: 'harry-higginbottom',
    squad: 'fall-2026',
    positions: ['prop', 'flanker', 'number-8'],
    division: 'D1',
    photo: '/assets/pictures/2025_irish_harry.jpg',
    photoCredit: 'WRFC v Washington Irish, 2025',
    heightCm: 190,
    weightKg: 109,
    seasons: 4,
    accolades: [{ id: 'capital-selects', verification: 'club-verified' }],
  },
  {
    id: 21,
    name: 'Zack Zuzelo',
    slug: 'zachary-zuzelo',
    squad: 'fall-2026',
    positions: ['flanker'],
    division: 'Both',
    photo: '/assets/pictures/2025_irish_zach.jpg',
    photoCredit: 'WRFC v Washington Irish, 2025',
    heightCm: 180,
    weightKg: 88,
    seasons: 3.5,
  },
  {
    id: 22,
    name: 'Dike Ukwuani',
    slug: 'dike-ukwuani',
    squad: 'fall-2026',
    positions: ['flanker', 'number-8'],
    heightCm: 178,
    weightKg: 100,
    seasons: 2,
  },
  {
    id: 23,
    name: 'Nate Santa Maria',
    slug: 'nate-santa-maria',
    squad: 'fall-2026',
    positions: ['flanker'],
    heightCm: 178,
    weightKg: 83,
    seasons: 1.5,
  },
  {
    id: 24,
    name: 'Isack Oswaga',
    slug: 'isack-oswaga',
    squad: 'fall-2026',
    positions: ['flanker', 'wing'],
    heightCm: 180,
    weightKg: 89,
    seasons: 4,
  },
  {
    id: 25,
    name: 'Kwon Dailey',
    slug: 'kwon-dailey',
    squad: 'fall-2026',
    positions: ['flanker', 'wing', 'full-back'],
    heightCm: 183,
    weightKg: 92,
    seasons: 3.5,
    previousClub: 'Mount St. Mary\'s University',
    collegeProgram: 'Mount St. Mary\'s University',
  },
  {
    id: 26,
    name: 'Anthony Arias',
    slug: 'anthony-arias',
    squad: 'fall-2026',
    positions: ['number-8', 'fly-half', 'center'],
    heightCm: 183,
    weightKg: 97,
    seasons: 0,
    previousClub: 'Renegades',
    accolades: [{ id: 'rookie', detail: 'First season at WRFC', verification: 'club-verified' }],
  },

  // --- Half backs ----------------------------------------------------------
  {
    id: 27,
    name: 'Sam Lehman',
    slug: 'sam-lehman',
    squad: 'fall-2026',
    positions: ['scrum-half', 'wing'],
    heightCm: 170,
    weightKg: 73,
    seasons: 1.5,
    previousClub: 'Frederiksberg Rugby Klub (Copenhagen, Denmark)',
  },
  {
    id: 28,
    name: 'Joseph Ponte',
    slug: 'joseph-ponte',
    squad: 'fall-2026',
    positions: ['scrum-half', 'full-back'],
    heightCm: 175,
    weightKg: 79,
    seasons: 0,
    previousClub: 'NOVA Rugby',
    accolades: [{ id: 'rookie', detail: 'First season at WRFC', verification: 'club-verified' }],
  },
  {
    id: 29,
    name: 'Dave Ginnetty',
    slug: 'dave-ginnetty',
    squad: 'fall-2026',
    positions: ['fly-half', 'center'],
    heightCm: 185,
    weightKg: 100,
    seasons: 1.5,
  },
  {
    id: 30,
    name: 'Isaac Greenspan',
    slug: 'isaac-greenspan',
    squad: 'fall-2026',
    positions: ['fly-half', 'center', 'wing'],
    heightCm: 180,
    weightKg: 88,
    seasons: 2,
    previousClub: 'Georgetown University Rugby',
    collegeProgram: 'Georgetown University',
  },

  // --- Centers -------------------------------------------------------------
  {
    id: 31,
    name: 'Domenic Boresta',
    slug: 'domenic-boresta',
    squad: 'fall-2026',
    positions: ['center', 'wing', 'full-back'],
    division: 'D3',
    heightCm: 178,
    weightKg: 95,
    seasons: 2,
    previousClub: 'Cornell University RFC',
    collegeProgram: 'Cornell University',
  },
  {
    id: 32,
    name: 'Austin Park',
    slug: 'austin-park',
    squad: 'fall-2026',
    positions: ['center', 'wing', 'full-back'],
    weightKg: 134,
    seasons: 4,
  },

  // --- Back three ----------------------------------------------------------
  {
    id: 33,
    name: 'Ryan Cooper',
    slug: 'ryan-cooper',
    squad: 'fall-2026',
    positions: ['wing', 'full-back'],
    heightCm: 180,
    weightKg: 68,
    seasons: 1.5,
  },
  {
    id: 34,
    name: 'Kyle Rodewald',
    slug: 'kyle-rodewald',
    squad: 'fall-2026',
    positions: ['wing'],
    heightCm: 185,
    weightKg: 91,
    seasons: 0,
    accolades: [
      { id: 'rookie', detail: 'First season of rugby, ever', verification: 'club-verified' },
    ],
  },
  {
    id: 35,
    name: 'Mussa Seman',
    slug: 'mussa-seman',
    squad: 'fall-2026',
    positions: ['wing'],
    heightCm: 173,
    weightKg: 91,
    seasons: 0,
    previousClub: 'Alexandria City High School',
    accolades: [{ id: 'rookie', detail: 'First season at WRFC', verification: 'club-verified' }],
  },

  // ===========================================================================
  // PREVIOUS PLAYERS
  //
  // Players from earlier rosters who are not on the Fall 2026 squad. Kept so
  // their profile URLs keep resolving rather than 404ing, and so the club's
  // recent history stays on the site.
  // ===========================================================================

  { id: 101, name: 'Christopher Miller', slug: 'christopher-miller', squad: 'past', positions: ['flanker', 'number-8'], division: 'Both', heightCm: 178, weightKg: 90 },
  { id: 102, name: 'Douglas Mulliken', slug: 'douglas-mulliken', squad: 'past', positions: ['lock'], division: 'D1', heightCm: 193, weightKg: 113, accolades: [{ id: 'player-coach', verification: 'club-verified' }] },
  { id: 103, name: 'John Veras', slug: 'john-veras', squad: 'past', positions: ['prop'], division: 'D3', accolades: [{ id: 'club-captain', detail: 'D3 side', verification: 'club-verified' }] },
  { id: 104, name: 'Leo Fangmeyer', slug: 'leo-fangmeyer', squad: 'past', positions: ['fly-half'], division: 'D1', accolades: [{ id: 'club-captain', detail: 'Early 2024', verification: 'club-verified' }] },
  { id: 105, name: 'Dewayne Jones', slug: 'dewayne-jones', squad: 'past', positions: ['center'], division: 'Both', accolades: [{ id: 'old-glory-academy', verification: 'club-verified' }] },
  { id: 106, name: 'Ryan Dodds', slug: 'ryan-dodds', squad: 'past', positions: ['center', 'wing'], positionLabel: 'Utility Back', division: 'D1', accolades: [{ id: 'old-glory-academy', verification: 'club-verified' }] },
  { id: 107, name: 'Juwamer Hawrami', slug: 'juwamer-hawrami', squad: 'past', positions: ['center', 'full-back'], division: 'D3', accolades: [{ id: 'old-glory-academy', verification: 'club-verified' }] },
  { id: 108, name: 'Diamond Jones', slug: 'diamond-jones', squad: 'past', positions: ['prop'], division: 'D1', heightCm: 175, weightKg: 118 },
  { id: 109, name: 'Austin Longo', slug: 'austin-longo', squad: 'past', positions: ['prop'], division: 'Both', photo: '/assets/pictures/2025_irish_ox.jpg', photoCredit: 'WRFC v Washington Irish, 2025', heightCm: 180, weightKg: 127 },
  { id: 110, name: 'Xavier Landreville', slug: 'xavier-landreville', squad: 'past', positions: ['prop'], division: 'D1', heightCm: 188 },
  { id: 111, name: 'Anton Meyer', slug: 'anton-meyer', squad: 'past', positions: ['lock'], division: 'Both' },
  { id: 112, name: 'Raymond Gajkowski', slug: 'raymond-gajkowski', squad: 'past', positions: ['lock'], division: 'D1', heightCm: 198, weightKg: 109 },
  { id: 113, name: 'Stephen Okala', slug: 'stephen-okala', squad: 'past', positions: ['flanker', 'center'], division: 'D1', heightCm: 178, weightKg: 88 },
  { id: 114, name: 'Samuel Follansbee', slug: 'samuel-follansbee', squad: 'past', positions: ['flanker'], division: 'D1', heightCm: 188, weightKg: 109 },
  { id: 115, name: 'Nicholas Barone', slug: 'nicholas-barone', squad: 'past', positions: ['scrum-half'], division: 'D1', heightCm: 170, weightKg: 80 },
  { id: 116, name: 'Nicholas Lami', slug: 'nicholas-lami', squad: 'past', positions: ['scrum-half'], division: 'D1', photo: '/assets/pictures/2025_irish_lami.jpg', photoCredit: 'WRFC v Washington Irish, 2025' },
  { id: 117, name: 'Justin Owens', slug: 'justin-owens', squad: 'past', positions: ['scrum-half'], division: 'D1' },
  { id: 118, name: 'Gareth Davies', slug: 'gareth-davies', squad: 'past', positions: ['fly-half'], division: 'Both', photo: '/assets/pictures/gareth_wrfc_2024.png', photoCredit: 'WRFC, 2024' },
  { id: 119, name: 'Tyler Sammann', slug: 'tyler-sammann', squad: 'past', positions: ['center'], division: 'D1' },
  { id: 120, name: 'Joseph Rombalski', slug: 'joseph-rombalski', squad: 'past', positions: ['center'], division: 'D1' },
  { id: 121, name: 'Jaehyun Christopher Park', slug: 'jaehyun-christopher-park', squad: 'past', positions: ['wing'], division: 'D1' },
  { id: 122, name: 'Andrew Klock', slug: 'andrew-klock', squad: 'past', positions: ['wing'], division: 'D1' },
  { id: 123, name: 'Noah Davidson', slug: 'noah-davidson', squad: 'past', positions: ['full-back'], division: 'D1' },
  { id: 124, name: 'Joseph Phiri', slug: 'joseph-phiri', squad: 'past', positions: ['center'], positionLabel: 'Back', division: 'D1' },
  { id: 125, name: 'Luke Hoffman', slug: 'luke-hoffman', squad: 'past', positions: ['flanker'], positionLabel: 'Forward', division: 'Both' },
  { id: 126, name: 'Austin Mack', slug: 'austin-mack', squad: 'past', positions: ['prop'], division: 'D3' },
  { id: 127, name: 'Pierre Maltais', slug: 'pierre-maltais', squad: 'past', positions: ['hooker'], division: 'D3' },
  { id: 128, name: 'Kieran Corcoran', slug: 'kieran-corcoran', squad: 'past', positions: ['lock'], division: 'D3' },
  { id: 129, name: 'Ashton DeLano', slug: 'ashton-delano', squad: 'past', positions: ['lock', 'flanker'], division: 'D3' },
  { id: 130, name: 'Casey Ling', slug: 'casey-ling', squad: 'past', positions: ['flanker'], division: 'D3' },
  { id: 131, name: 'Grant Two Bulls', slug: 'grant-two-bulls', squad: 'past', positions: ['flanker'], division: 'D3' },
  { id: 132, name: 'Roberto Agrusta', slug: 'roberto-agrusta', squad: 'past', positions: ['flanker'], division: 'D3' },
  { id: 133, name: 'Jonathan Fuentecilla', slug: 'jonathan-fuentecilla', squad: 'past', positions: ['number-8'], division: 'D3' },
  { id: 134, name: 'Liam Garven', slug: 'liam-garven', squad: 'past', positions: ['scrum-half'], division: 'D3' },
  { id: 135, name: 'Wesley Leckie', slug: 'wesley-leckie', squad: 'past', positions: ['fly-half'], division: 'D3' },
  { id: 136, name: 'Saxon Bryant', slug: 'saxon-bryant', squad: 'past', positions: ['center'], division: 'D3' },
  { id: 137, name: 'Marcus McIntyre', slug: 'marcus-mcintyre', squad: 'past', positions: ['center'], division: 'D3' },
  { id: 138, name: 'Adrian Vigil-Coello', slug: 'adrian-vigilcoello', squad: 'past', positions: ['wing'], division: 'D3' },
  { id: 139, name: 'Ryunosuke Hashimoto', slug: 'ryunosuke-hashimoto', squad: 'past', positions: ['wing'], division: 'D3' },
  { id: 140, name: 'Rene Esteves', slug: 'rene-esteves', squad: 'past', positions: ['wing'], division: 'D3' },
  { id: 141, name: 'Nicholas Cipollone', slug: 'nicholas-cipollone', squad: 'past', positions: ['wing'], division: 'D3' },
  { id: 142, name: 'Ian Elzinga', slug: 'ian-elzinga', squad: 'past', positions: ['wing', 'full-back'], division: 'D3' },
  { id: 143, name: 'Koki Mori', slug: 'koki-mori', squad: 'past', positions: ['wing'], division: 'D3' },
  { id: 144, name: 'Benjamin Sando', slug: 'benjamin-sando', squad: 'past', positions: ['wing'], division: 'D3' },
];
