import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | WRFC Player Portal',
    default: 'Player Portal | WRFC',
  },
  description: 'Washington Rugby Football Club player portal for managing profiles, dues, and team resources.',
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {children}
    </div>
  )
}