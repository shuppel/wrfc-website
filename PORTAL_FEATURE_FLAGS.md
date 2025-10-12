# Portal Feature Flags - Usage Guide

## Overview
This document explains how to use the new feature flag system for the player portal disclaimer and maintenance mode.

## Feature Flags Available

### 1. Portal Login Disclaimer
- **Flag**: `NEXT_PUBLIC_FF_PORTAL_LOGIN_DISCLAIMER`
- **Default**: `false` (disabled)
- **Purpose**: Shows/hides a disclaimer message on the login page

### 2. Portal Maintenance Mode  
- **Flag**: `NEXT_PUBLIC_PORTAL_MAINTENANCE`
- **Default**: `false` (disabled)
- **Purpose**: Redirects portal users to an "in-progress" page instead of login

## How to Enable/Disable

### Method 1: Environment Variables (Recommended)
Add to your `.env.local` file:

```bash
# Enable disclaimer on login page
NEXT_PUBLIC_FF_PORTAL_LOGIN_DISCLAIMER=true

# Enable maintenance mode (redirects to in-progress page)
NEXT_PUBLIC_PORTAL_MAINTENANCE=true
```

### Method 2: Update Default Values
Edit `lib/feature-flags.ts` and change the `DEFAULT_FLAGS` object:

```typescript
const DEFAULT_FLAGS: FeatureFlags = {
  PORTAL_LOGIN_DISCLAIMER: true, // Enable by default
}
```

## Portal Behavior

### Normal Operation (Default)
- `PORTAL_LOGIN_DISCLAIMER=false`
- `PORTAL_MAINTENANCE=false`
- Portal redirects to login page
- No disclaimer shown

### Disclaimer Mode
- `PORTAL_LOGIN_DISCLAIMER=true`
- `PORTAL_MAINTENANCE=false`
- Portal redirects to login page
- Orange disclaimer banner shown on login page

### Maintenance Mode
- `PORTAL_MAINTENANCE=true`
- Portal redirects to `/portal/in-progress` page
- Users see "Under Development" message with links back to main site

## Files Created/Modified

### New Files
- `lib/feature-flags.ts` - Feature flag system
- `components/portal/PortalDisclaimer.tsx` - Disclaimer component
- `app/(portal)/portal/in-progress/page.tsx` - Maintenance page

### Modified Files
- `app/(portal)/portal/page.tsx` - Added maintenance mode redirect
- `app/(portal)/portal/login/page.tsx` - Added disclaimer integration
- `.env.example` - Added feature flag examples

## Testing

1. **Test Disclaimer**: Set `NEXT_PUBLIC_FF_PORTAL_LOGIN_DISCLAIMER=true` and visit `/portal`
2. **Test Maintenance**: Set `NEXT_PUBLIC_PORTAL_MAINTENANCE=true` and visit `/portal`
3. **Test Normal**: Keep both flags `false` and verify normal login flow

## Current Status
- ✅ Feature flag system implemented
- ✅ Disclaimer component created and integrated
- ✅ In-progress fallback page created
- ✅ Both flags are **disabled by default** as requested