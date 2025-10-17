/**
 * Feature Flags Configuration
 * Centralized system for controlling feature visibility
 */

export interface FeatureFlags {
  PORTAL_LOGIN_DISCLAIMER: boolean
}

// Default feature flag values
const DEFAULT_FLAGS: FeatureFlags = {
  PORTAL_LOGIN_DISCLAIMER: false, // Disabled by default
}

/**
 * Get feature flag value from environment variables or default
 */
export function getFeatureFlag<K extends keyof FeatureFlags>(
  flag: K
): FeatureFlags[K] {
  const envKey = `NEXT_PUBLIC_FF_${flag}`
  const envValue = process.env[envKey]
  
  if (envValue !== undefined) {
    // Convert string to boolean for boolean flags
    if (typeof DEFAULT_FLAGS[flag] === 'boolean') {
      return (envValue.toLowerCase() === 'true') as FeatureFlags[K]
    }
    return envValue as unknown as FeatureFlags[K]
  }
  
  return DEFAULT_FLAGS[flag]
}

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(flag: keyof FeatureFlags): boolean {
  return getFeatureFlag(flag) as boolean
}