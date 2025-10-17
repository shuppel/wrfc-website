import { track } from '@vercel/analytics';

// Helper to filter out undefined values for Vercel Analytics
function cleanEventData(data: Record<string, any>): Record<string, any> {
  const cleaned: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null) {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

interface ProfileErrorEvent {
  error_type: string;
  error_code?: string;
  error_message?: string;
  user_id?: string;
  form_field?: string;
  timestamp: string;
  session_id?: string;
}

interface ProfileSuccessEvent {
  action: string;
  duration?: number;
  fields_updated?: string[];
  timestamp: string;
  session_id?: string;
}

interface ProfileInteractionEvent {
  interaction_type: string;
  field_name?: string;
  field_value?: string;
  timestamp: string;
  session_id?: string;
}

class ProfileAnalytics {
  private sessionId: string;

  constructor() {
    this.sessionId = `analytics_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  trackError(errorType: string, errorDetails: Partial<ProfileErrorEvent>) {
    const event: ProfileErrorEvent = {
      error_type: errorType,
      ...errorDetails,
      timestamp: new Date().toISOString(),
      session_id: this.sessionId
    };
    
    // Track in Vercel Analytics - use cleanEventData helper
    track('profile_error', cleanEventData({
      error_type: event.error_type,
      error_code: event.error_code,
      error_message: event.error_message,
      user_id: event.user_id,
      form_field: event.form_field,
      timestamp: event.timestamp,
      session_id: event.session_id
    }));
    
    // Also store in localStorage for debugging
    this.storeEvent('errors', event);
  }

  trackSuccess(action: string, details?: Partial<ProfileSuccessEvent>) {
    const event: ProfileSuccessEvent = {
      action,
      ...details,
      timestamp: new Date().toISOString(),
      session_id: this.sessionId
    };
    
    track('profile_success', cleanEventData({
      action: event.action,
      duration: event.duration,
      fields_updated: event.fields_updated?.join(','),
      timestamp: event.timestamp,
      session_id: event.session_id
    }));
    this.storeEvent('successes', event);
  }

  trackInteraction(interactionType: string, details?: Partial<ProfileInteractionEvent>) {
    const event: ProfileInteractionEvent = {
      interaction_type: interactionType,
      ...details,
      timestamp: new Date().toISOString(),
      session_id: this.sessionId
    };
    
    track('profile_interaction', cleanEventData({
      interaction_type: event.interaction_type,
      field_name: event.field_name,
      field_value: event.field_value,
      timestamp: event.timestamp,
      session_id: event.session_id
    }));
  }

  trackFormSubmission(success: boolean, duration: number, fieldsUpdated?: string[]) {
    const event = {
      success,
      duration,
      fields_updated: fieldsUpdated?.join(','),
      timestamp: new Date().toISOString(),
      session_id: this.sessionId
    };
    
    track('profile_form_submission', cleanEventData(event));
  }

  trackAuthIssue(issue: string, userId?: string) {
    track('profile_auth_issue', cleanEventData({
      issue,
      user_id: userId,
      timestamp: new Date().toISOString(),
      session_id: this.sessionId
    }));
  }

  trackDatabaseOperation(operation: string, success: boolean, duration: number, error?: any) {
    track('profile_database_operation', cleanEventData({
      operation,
      success,
      duration,
      error_code: error?.code,
      error_message: error?.message,
      timestamp: new Date().toISOString(),
      session_id: this.sessionId
    }));
  }

  private storeEvent(category: string, event: any) {
    try {
      const key = `profile_analytics_${category}`;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push(event);
      
      // Keep only last 20 events per category
      if (existing.length > 20) {
        existing.shift();
      }
      
      localStorage.setItem(key, JSON.stringify(existing));
    } catch (e) {
      // Silently fail if localStorage is not available
    }
  }

  getStoredEvents(category: string): any[] {
    try {
      const key = `profile_analytics_${category}`;
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (e) {
      return [];
    }
  }

  clearStoredEvents(category?: string) {
    try {
      if (category) {
        localStorage.removeItem(`profile_analytics_${category}`);
      } else {
        // Clear all analytics events
        ['errors', 'successes', 'interactions'].forEach(cat => {
          localStorage.removeItem(`profile_analytics_${cat}`);
        });
      }
    } catch (e) {
      // Silently fail
    }
  }
}

export const profileAnalytics = new ProfileAnalytics();
export { ProfileAnalytics };
export type { ProfileErrorEvent, ProfileSuccessEvent, ProfileInteractionEvent };