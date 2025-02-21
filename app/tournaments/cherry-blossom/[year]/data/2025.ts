export const tournament2025 = {
  year: 2025,
  date: 'April 12-13, 2025',
  location: {
    name: 'Liberty Sports Park',
    address: '220 Prince George\'s Boulevard Upper Marlboro, MD 20774'
  },
  email: 'cherryblossomrugby@gmail.com',
  divisions: [
    { name: 'Senior Men\'s 15s', description: 'Premier division for club teams' },
    { name: 'Collegiate Men\'s 7s', description: 'CRC Qualifier' },
    { name: 'High School Boy\'s 15s', description: 'Youth competition' },
    { name: 'Old Boy\'s 15s', description: 'Veterans division' }
  ],
  schedule: [
    { time: '8:00 AM', event: 'Team Check-in & Registration' },
    { time: '9:00 AM', event: 'Opening Ceremony' },
    { time: '9:30 AM', event: 'Pool Play Begins' },
    { time: '4:00 PM', event: 'Knockout Rounds' },
    { time: '6:00 PM', event: 'Finals' },
    { time: '7:00 PM', event: 'Awards Ceremony' }
  ],
  sponsors: [
    {
      name: 'Carlsberg',
      description: 'Official Beer Sponsor',
      logo: '/assets/sponsors/carlsberg-logo.png',
      website: 'https://www.carlsberg.com'
    },
    {
      name: 'Queen Vic',
      description: 'Official Bar Partner - H Street DC',
      logo: '/assets/sponsors/queen-vic-logo.png',
      website: 'https://www.thequeenvicdc.com'
    },
    {
      name: 'Matets Kitchen',
      description: 'Official Food Partner',
      logo: '/assets/sponsors/matets-kitchen-logo.jpg'
    }
  ],
  coverImage: '/assets/pictures/tournament_banner_watercolor.png',
  galleryImages: [
    '/assets/pictures/2022_d2_champs.png',
    '/assets/pictures/gareth_wrfc_2024.png'
  ]
}; 