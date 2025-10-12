# Portal Feature Flags - Usage Guide

## Overview
This document explains how to use the new feature flag system for the player portal disclaimer and maintenance mode.

## Feature Flags Available

### 1. Portal Login Disclaimer
- **Flag**: `NEXT_PUBLIC_FF_PORTAL_LOGIN_DISCLAIMER`
- **Default**: `false` (disabled)
- **Purpose**: Shows/hides a disclaimer message on the login page



## How to Enable/Disable

### Method 1: Environment Variables (Recommended)
Add to your `.env.local` file:

```bash
# Enable disclaimer (redirects /portal to disclaimer page)
NEXT_PUBLIC_FF_PORTAL_LOGIN_DISCLAIMER=true
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
- Portal (`/portal`) redirects directly to login page (`/portal/login`)
- No disclaimer shown

### Disclaimer Mode  
- `PORTAL_LOGIN_DISCLAIMER=true`
- Portal (`/portal`) redirects to disclaimer page (`/portal/disclaimer`)
- Disclaimer page shows warning and "Continue to Portal" button
- Users can proceed to login after acknowledging the disclaimer

## Files Created/Modified

### New Files
- `lib/feature-flags.ts` - Feature flag system
- `components/portal/PortalDisclaimer.tsx` - Disclaimer component
- `app/(portal)/portal/in-progress/page.tsx` - Full maintenance page
- `app/(portal)/portal/disclaimer/page.tsx` - Disclaimer landing page

### Modified Files
- `app/(portal)/portal/page.tsx` - Added feature flag routing logic
- `app/(portal)/portal/login/page.tsx` - Added disclaimer integration  
- `components/layout/HeaderImproved.tsx` - Updated portal links to use `/portal`
- `.env.example` - Added feature flag examples

## Testing

1. **Test Normal Flow**: Keep flag `false` and visit `/portal` → should redirect to `/portal/login`
2. **Test Disclaimer**: Set `NEXT_PUBLIC_FF_PORTAL_LOGIN_DISCLAIMER=true` and visit `/portal` → should redirect to `/portal/disclaimer`

## Current Status
- ✅ Feature flag system implemented
- ✅ Disclaimer component created and integrated
- ✅ In-progress fallback page created
- ✅ Header portal buttons updated to use `/portal` (universal routing)
- ✅ Both flags are **disabled by default** as requested

## How It Works
All portal links (header buttons, direct links) now point to `/portal` which acts as a simple router:

1. **Header Portal Button** → `/portal` 
2. **Portal Page Logic** checks the disclaimer flag and redirects accordingly:
   - Disclaimer flag ON → `/portal/disclaimer` 
   - Disclaimer flag OFF → `/portal/login` (default)

This ensures consistent behavior across all entry points to the portal.