import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, AlertTriangle, Clock } from 'lucide-react'
import PortalDisclaimer from '@/components/portal/PortalDisclaimer'

export default function PortalDisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Back to Website Link */}
        <Link
          href="/"
          className="absolute top-4 left-4 inline-flex items-center text-sm text-gray-600 hover:text-wrfc-red dark:text-gray-400 dark:hover:text-wrfc-red transition-colors"
          aria-label="Back to WRFC website"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to website
        </Link>

        {/* Logo */}
        <div className="mb-8 flex items-center justify-center">
          <div className="relative h-20 w-20 overflow-hidden rounded-full bg-white shadow-lg dark:bg-gray-800">
            <Image
              src="/logos/wrfc_logo.png"
              alt="WRFC Logo"
              fill
              className="object-contain p-2"
              priority
            />
          </div>
        </div>

        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
              <AlertTriangle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Player Portal
            </CardTitle>
            <CardTitle className="text-xl font-medium text-orange-600 dark:text-orange-400">
              Important Notice
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <PortalDisclaimer />
            
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
              <Clock className="h-5 w-5" />
              <span>Maintenance in Progress</span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-center">
              You can still access the portal, but some features may be temporarily limited.
            </p>

            <div className="space-y-3">
              <Link href="/portal/login">
                <Button
                  className="w-full bg-wrfc-red hover:bg-red-700 text-white font-semibold transition-all duration-200"
                  size="lg"
                >
                  Continue to Portal
                </Button>
              </Link>
              
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                  size="lg"
                >
                  Return to Main Site
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Questions about the portal?{' '}
          <Link href="/contact" className="text-wrfc-red hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  )
}