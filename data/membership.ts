export interface MembershipPlan {
  id: string;
  title: string;
  description: string;
  price: number;
  benefits: string[];
  paymentLink?: string;
  featured?: boolean;
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: 'player-d1',
    title: 'Division 1 Player',
    description: 'Full membership for competitive D1 players',
    price: 200,
    benefits: [
      'Full season participation',
      'Match eligibility',
      'Training sessions',
      'Team gear package',
      'Social event access',
      'USA Rugby registration included'
    ],
    paymentLink: '/contact',
    featured: true
  },
  {
    id: 'player-d3',
    title: 'Division 3 Player',
    description: 'Full membership for D3 players',
    price: 150,
    benefits: [
      'Full season participation',
      'Match eligibility',
      'Training sessions',
      'Team gear package',
      'Social event access',
      'USA Rugby registration included'
    ],
    paymentLink: '/contact'
  },
  {
    id: 'social',
    title: 'Social Member',
    description: 'Stay connected with the club',
    price: 50,
    benefits: [
      'Social event access',
      'Newsletter updates',
      'Club merchandise discounts',
      'Networking opportunities'
    ],
    paymentLink: '/contact'
  }
];

export function getAllMembershipPlans(): MembershipPlan[] {
  return membershipPlans;
}

export function getMembershipPlanById(id: string): MembershipPlan | undefined {
  return membershipPlans.find(plan => plan.id === id);
}
