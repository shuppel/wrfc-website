import { redirect } from 'next/navigation'

export default function PortalPage() {
  // Check if disclaimer should be shown - direct env check
  const showDisclaimer = process.env.NEXT_PUBLIC_FF_PORTAL_LOGIN_DISCLAIMER === 'true'
  
  if (showDisclaimer) {
    redirect('/portal/disclaimer')
  }
  
  // Default: redirect to login
  redirect('/portal/login')
}