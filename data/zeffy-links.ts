// Zeffy Payment Links Configuration
// Update these links with your actual Zeffy payment forms

export const ZEFFY_LINKS = {
  cherryBlossom: {
    // CBT 2026 (58th) is complete. Replace with the CBT 2027 (59th) Zeffy form
    // once the tournament committee opens registration, then flip
    // `registrationOpen` to true on the 2027 entry in
    // /data/cherry-blossom-tournaments.ts and activate the promotion in
    // /data/promotions/cherry-blossom.ts.
    registration: '',
    description: 'Cherry Blossom Tournament 2027 Registration (not yet open)'
  },
  membership: {
    full: 'https://www.zeffy.com/en-US/membership/your-full-membership-link', // TODO: Replace with actual Zeffy link
    social: 'https://www.zeffy.com/en-US/membership/your-social-membership-link', // TODO: Replace with actual Zeffy link
    description: 'WRFC Membership'
  },
  capitalsRugbyNight: {
    // Time-boxed event — remove after game night (see docs/PROMOTIONS.md).
    ticketing: 'https://www.zeffy.com/en-US/ticketing/rugby-night-with-the-washington-capitals',
    embed: 'https://www.zeffy.com/embed/ticketing/rugby-night-with-the-washington-capitals?modal=true',
    description: 'Rugby Night with the Washington Capitals tickets'
  },
  donations: {
    general: 'https://www.zeffy.com/en-US/donation-form/wrfc-donations',
    description: 'Support WRFC'
  }
};

// Zeffy is 100% free for nonprofits - no transaction fees, no platform fees
export const ZEFFY_INFO = {
  feeStructure: '100% free - no fees',
  donorTips: 'Optional donor tips support the platform',
  paymentMethods: ['Credit/Debit Cards', 'Apple Pay', 'Google Pay', 'ACH Bank Transfer']
};