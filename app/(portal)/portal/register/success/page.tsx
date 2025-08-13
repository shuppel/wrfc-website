import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  Mail, 
  ArrowRight, 
  Trophy,
  Users,
  Calendar,
  Sparkles,
  MessageSquare,
  Shield
} from 'lucide-react'

export default function RegisterSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-gray-100 dark:from-gray-900 dark:via-green-900/20 dark:to-gray-800">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-green-200/30 dark:bg-green-700/20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-wrfc-red/20 blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Success Animation */}
          <div className="mb-8 text-center">
            <div className="relative inline-flex">
              <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-60 animate-ping"></div>
              <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-full p-6 shadow-2xl">
                <CheckCircle className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>

          <Card className="shadow-2xl border-0 overflow-hidden">
            {/* Confetti Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-1">
              <div className="bg-white dark:bg-gray-950 rounded-t-lg">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <Sparkles className="h-8 w-8 text-yellow-500 animate-pulse" />
                  </div>
                  <CardTitle className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 dark:from-green-400 dark:to-green-500 bg-clip-text text-transparent">
                    Welcome to WRFC!
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    You&apos;re almost ready to join the field
                  </CardDescription>
                </CardHeader>
              </div>
            </div>

            <CardContent className="pt-8 px-8 pb-8">
              {/* Email Verification Notice */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-800/50 rounded-full p-3">
                    <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-blue-900 dark:text-blue-100 mb-2">
                      Check Your Email
                    </h3>
                    <p className="text-blue-800 dark:text-blue-200 mb-3">
                      We&apos;ve sent a verification email to your inbox. Please click the link to activate your account.
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300 italic">
                      Can&apos;t find it? Check your spam folder or request a new email below.
                    </p>
                  </div>
                </div>
              </div>

              {/* What's Next Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-6 text-center">What Happens Next?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="bg-wrfc-red/10 rounded-full p-2">
                      <Shield className="h-5 w-5 text-wrfc-red" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">1. Verify Your Email</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Click the link in your email to activate your account
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="bg-wrfc-red/10 rounded-full p-2">
                      <Users className="h-5 w-5 text-wrfc-red" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">2. Complete Your Profile</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Add your rugby experience, position preferences, and contact info
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="bg-wrfc-red/10 rounded-full p-2">
                      <Calendar className="h-5 w-5 text-wrfc-red" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">3. Join Practice</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Check the schedule and come to your first training session
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="bg-wrfc-red/10 rounded-full p-2">
                      <Trophy className="h-5 w-5 text-wrfc-red" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">4. Get Your Gear</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Order your WRFC kit and join the team on the field
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button asChild className="w-full bg-wrfc-red hover:bg-red-700 text-white" size="lg">
                  <Link href="/portal/login">
                    Go to Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full" size="lg">
                  <Link href="/">
                    Return to Website
                  </Link>
                </Button>
              </div>

              {/* Support Section */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MessageSquare className="h-4 w-4" />
                  <span>Need help?</span>
                  <Link 
                    href="/contact" 
                    className="text-wrfc-red hover:underline font-medium"
                  >
                    Contact our membership team
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fun Facts */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-lg p-4 text-center">
              <Trophy className="h-8 w-8 text-wrfc-red mx-auto mb-2" />
              <p className="text-sm font-semibold">60+ Years</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">of Rugby Excellence</p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-lg p-4 text-center">
              <Users className="h-8 w-8 text-wrfc-red mx-auto mb-2" />
              <p className="text-sm font-semibold">100+ Players</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Active Members</p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-lg p-4 text-center">
              <Calendar className="h-8 w-8 text-wrfc-red mx-auto mb-2" />
              <p className="text-sm font-semibold">Year Round</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Training & Matches</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}