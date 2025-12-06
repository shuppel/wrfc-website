// Zeffy Payment Links Configuration
// Update these links with your actual Zeffy payment forms

export const ZEFFY_LINKS = {
  cherryBlossom: {
    registration: 'https://www.zeffy.com/en-US/ticketing/cherry-blossom-tournament--2026',
    description: 'Cherry Blossom Tournament 2026 Registration'
  },
  membership: {
    full: 'https://www.zeffy.com/en-US/membership/your-full-membership-link', // TODO: Replace with actual Zeffy link
    social: 'https://www.zeffy.com/en-US/membership/your-social-membership-link', // TODO: Replace with actual Zeffy link
    description: 'WRFC Membership'
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