interface LogContext {
  userId?: string;
  userEmail?: string;
  action?: string;
  timestamp: string;
  sessionId?: string;
}

interface ErrorDetails {
  code?: string;
  message: string;
  stack?: string;
  supabaseError?: any;
  formData?: any;
  userAgent?: string;
}

interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error';
  category: string;
  message: string;
  context: LogContext;
  data?: any;
}

class ProfileLogger {
  private context: LogContext;
  private logs: LogEntry[] = [];
  private isDevelopment: boolean;

  constructor(userId?: string, userEmail?: string) {
    this.context = {
      userId,
      userEmail,
      timestamp: new Date().toISOString(),
      sessionId: this.generateSessionId()
    };
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  private log(level: LogEntry['level'], category: string, message: string, data?: any) {
    const entry: LogEntry = {
      level,
      category,
      message,
      context: {
        ...this.context,
        timestamp: new Date().toISOString(),
        action: this.context.action
      },
      data
    };

    this.logs.push(entry);

    // Console output with color coding for development
    if (this.isDevelopment || level === 'error') {
      const prefix = `[${entry.context.timestamp}] [${level.toUpperCase()}] [${category}]`;
      const fullMessage = `${prefix} ${message}`;
      
      switch (level) {
        case 'error':
          console.error(fullMessage, data || '');
          break;
        case 'warn':
          console.warn(fullMessage, data || '');
          break;
        case 'info':
          console.info(fullMessage, data || '');
          break;
        case 'debug':
          console.log(fullMessage, data || '');
          break;
      }
    }

    // Store critical errors in localStorage for debugging
    if (level === 'error') {
      this.storeErrorForDebugging(entry);
    }
  }

  private storeErrorForDebugging(entry: LogEntry) {
    try {
      const existingErrors = JSON.parse(
        localStorage.getItem('profile_errors') || '[]'
      );
      existingErrors.push(entry);
      // Keep only last 10 errors
      if (existingErrors.length > 10) {
        existingErrors.shift();
      }
      localStorage.setItem('profile_errors', JSON.stringify(existingErrors));
    } catch (e) {
      // Silently fail if localStorage is not available
    }
  }

  setAction(action: string) {
    this.context.action = action;
  }

  auth(message: string, data?: any) {
    this.log('info', 'AUTH', message, data);
  }

  database(message: string, data?: any) {
    this.log('info', 'DATABASE', message, data);
  }

  validation(message: string, data?: any) {
    this.log('info', 'VALIDATION', message, data);
  }

  error(category: string, error: ErrorDetails) {
    this.log('error', category.toUpperCase(), error.message, {
      code: error.code,
      stack: error.stack,
      supabaseError: error.supabaseError,
      formData: error.formData,
      userAgent: error.userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown')
    });
  }

  performance(action: string, duration: number) {
    this.log('info', 'PERFORMANCE', `${action} completed`, {
      action,
      duration: `${duration.toFixed(2)}ms`,
      slow: duration > 1000
    });
  }

  debug(message: string, data?: any) {
    this.log('debug', 'DEBUG', message, data);
  }

  warn(message: string, data?: any) {
    this.log('warn', 'WARNING', message, data);
  }

  // Get all logs for debugging
  getLogs(): LogEntry[] {
    return this.logs;
  }

  // Export logs as JSON for support
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  // Clear stored errors
  clearStoredErrors() {
    try {
      localStorage.removeItem('profile_errors');
    } catch (e) {
      // Silently fail if localStorage is not available
    }
  }
}

export { ProfileLogger };
export type { LogContext, ErrorDetails, LogEntry };