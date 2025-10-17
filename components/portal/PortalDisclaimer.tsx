import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'

interface PortalDisclaimerProps {
  className?: string
}

export default function PortalDisclaimer({ className }: PortalDisclaimerProps) {
  return (
    <Alert className={`border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20 ${className || ''}`}>
      <Info className="h-4 w-4 text-orange-600 dark:text-orange-400" />
      <AlertDescription className="text-orange-800 dark:text-orange-200">
        <strong>Portal Notice:</strong> The player portal is currently undergoing maintenance and improvements. 
        Some features may be temporarily unavailable. We appreciate your patience as we enhance your experience.
      </AlertDescription>
    </Alert>
  )
}