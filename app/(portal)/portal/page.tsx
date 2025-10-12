import { redirect } from 'next/navigation'
import { isFeatureEnabled } from '@/lib/feature-flags'

export default function PortalPage() {
  // Check if portal is in maintenance mode
  const showInProgress = !isFeatureEnabled('PORTAL_LOGIN_DISCLAIMER') && process.env.NEXT_PUBLIC_PORTAL_MAINTENANCE === 'true'
  
  if (showInProgress) {
    redirect('/portal/in-progress')
  }
  
  // Redirect to login by default
  redirect('/portal/login')
}