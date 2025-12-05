import { z } from 'zod';

// ============================================
// REGISTRATION FORM SCHEMAS
// ============================================

/**
 * Schema for team registration form data
 * Used to validate input on both client and server side
 */
export const registrationFormSchema = z.object({
  teamName: z.string().min(2, 'Team name must be at least 2 characters').max(100),
  division: z.string().min(1, 'Division is required'),
  city: z.string().min(2, 'City is required').max(100),
  state: z.string().length(2, 'State must be 2 characters (e.g., DC)').toUpperCase(),
  contactName: z.string().min(2, 'Contact name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(20),
  playersCount: z.string().optional(),
  notes: z.string().max(1000, 'Notes must be less than 1000 characters').optional(),
});

export type RegistrationFormData = z.infer<typeof registrationFormSchema>;

/**
 * Schema for registration API response
 */
export const registrationResponseSchema = z.object({
  status: z.enum(['success', 'error']),
  message: z.string().optional(),
  registrationId: z.string().optional(),
  paymentDeadline: z.string().optional(),
  teamStatus: z.enum(['pending', 'waitlist', 'confirmed', 'cancelled']).optional(),
});

export type RegistrationResponse = z.infer<typeof registrationResponseSchema>;

// ============================================
// REGISTERED TEAM SCHEMAS
// ============================================

/**
 * Team status types
 */
export const teamStatusSchema = z.enum(['pending', 'confirmed', 'waitlist', 'cancelled']);
export type TeamStatus = z.infer<typeof teamStatusSchema>;

/**
 * Payment status types
 */
export const paymentStatusSchema = z.enum(['paid', 'unpaid']);
export type PaymentStatus = z.infer<typeof paymentStatusSchema>;

/**
 * Schema for a registered team (public data only)
 * This is what gets returned from the Google Sheets API
 */
export const registeredTeamSchema = z.object({
  teamName: z.string(),
  division: z.string(),
  city: z.string(),
  state: z.string(),
  status: teamStatusSchema,
  paymentStatus: paymentStatusSchema,
  registrationDate: z.string(), // ISO 8601 date string
});

export type RegisteredTeam = z.infer<typeof registeredTeamSchema>;

/**
 * Schema for teams API response
 */
export const teamsApiResponseSchema = z.object({
  status: z.enum(['success', 'error']),
  data: z.array(registeredTeamSchema).optional(),
  message: z.string().optional(),
});

export type TeamsApiResponse = z.infer<typeof teamsApiResponseSchema>;

// ============================================
// DIVISION SCHEMAS
// ============================================

/**
 * Division status types
 */
export const divisionStatusSchema = z.enum(['Open', 'Waitlist', 'Closed']);
export type DivisionStatus = z.infer<typeof divisionStatusSchema>;

/**
 * Schema for division statistics
 */
export const divisionStatsSchema = z.object({
  division: z.string(),
  fee: z.number(),
  maxTeams: z.number(),
  currentCount: z.number(),
  format: z.literal('15s'),
  status: divisionStatusSchema,
});

export type DivisionStats = z.infer<typeof divisionStatsSchema>;

/**
 * Schema for division stats API response
 */
export const divisionStatsApiResponseSchema = z.object({
  status: z.enum(['success', 'error']),
  stats: z.array(divisionStatsSchema).optional(),
  message: z.string().optional(),
});

export type DivisionStatsApiResponse = z.infer<typeof divisionStatsApiResponseSchema>;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Safely parse and validate registration form data
 */
export function parseRegistrationForm(data: unknown): RegistrationFormData {
  return registrationFormSchema.parse(data);
}

/**
 * Safely parse and validate teams API response
 */
export function parseTeamsResponse(data: unknown): TeamsApiResponse {
  return teamsApiResponseSchema.parse(data);
}

/**
 * Safely parse and validate division stats API response
 */
export function parseDivisionStatsResponse(data: unknown): DivisionStatsApiResponse {
  return divisionStatsApiResponseSchema.parse(data);
}

/**
 * Get status badge color for team status
 */
export function getStatusBadgeColor(status: TeamStatus): string {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'waitlist':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'cancelled':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
}

/**
 * Get status badge label
 */
export function getStatusLabel(status: TeamStatus, paymentStatus: PaymentStatus): string {
  if (status === 'confirmed' && paymentStatus === 'paid') {
    return 'Confirmed';
  }
  if (status === 'pending' && paymentStatus === 'unpaid') {
    return 'Pending Payment';
  }
  if (status === 'pending' && paymentStatus === 'paid') {
    return 'Payment Received';
  }
  if (status === 'waitlist') {
    return 'Waitlist';
  }
  if (status === 'cancelled') {
    return 'Cancelled';
  }
  return status.charAt(0).toUpperCase() + status.slice(1);
}

/**
 * Format registration date for display
 */
export function formatRegistrationDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}
