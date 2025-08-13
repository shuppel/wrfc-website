import { redirect } from 'next/navigation'

export default function PortalPage() {
  // Redirect to login by default
  redirect('/portal/login')
}