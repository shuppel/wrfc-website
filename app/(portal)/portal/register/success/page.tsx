import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  ArrowRight, 
  Trophy,
  Users,
  Calendar,
  Sparkles,
  MessageSquare,
  CreditCard,
  Smartphone,
  ExternalLink,
  ClipboardCheck
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
              {/* Important Next Steps - Highlighted */}
              <div className="bg-gradient-to-br from-wrfc-red/10 to-red-50 dark:from-wrfc-red/20 dark:to-red-950/20 rounded-xl p-6 mb-8 border-2 border-wrfc-red/30">
                <div className="flex items-start gap-4">
                  <div className="bg-wrfc-red rounded-full p-3">
                    <ClipboardCheck className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-wrfc-red mb-3">
                      ⚠️ Important: Complete These Steps to Join WRFC
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                        <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          Step 1: Register on Rugby Xplorer (CIPP)
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          All players must be CIPP registered to participate in USA Rugby sanctioned activities
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                        <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          Step 2: Pay Your Club Dues
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Complete your membership by paying annual dues
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two Main CTAs */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {/* Rugby Xplorer CTA */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 dark:bg-blue-800/50 rounded-full p-2">
                      <Smartphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-bold text-lg">Register on Rugby Xplorer</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Complete your USA Rugby CIPP registration by joining <strong>&quot;Washington Rugby Football Club&quot;</strong> on Rugby Xplorer.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 italic">
                    CIPP registration is required for all players to participate in USA Rugby sanctioned activities.
                  </p>
                  <Button 
                    asChild 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <a 
                      href="https://xplorer.rugby/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Go to Rugby Xplorer
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                    Search for: <strong>Washington Rugby Football Club</strong>
                  </p>
                </div>

                {/* Pay Dues CTA */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-100 dark:bg-green-800/50 rounded-full p-2">
                      <CreditCard className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="font-bold text-lg">Pay Your Dues</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Complete your membership by paying your annual dues to participate in team activities and matches.
                  </p>
                  <Button 
                    asChild 
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <a 
                      href="https://www.zeffy.com/en-US/ticketing/wrfc-player-dues" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Pay Dues Now
                      <CreditCard className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    Secure payment via Zeffy
                  </p>
                </div>
              </div>

              {/* Additional Steps */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-6 text-center">After Registration & Payment</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                      <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Complete Your Profile</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Add your rugby experience, position preferences, and emergency contacts
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                      <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Join Practice</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Check the schedule and come to your first training session
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                      <Trophy className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Order Your Kit</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        WRFC kit information will be provided at practice
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Action Buttons */}
              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white dark:bg-gray-950 px-4 text-gray-500">Or continue to</span>
                  </div>
                </div>
                
                <Button asChild variant="outline" className="w-full" size="lg">
                  <Link href="/portal/login">
                    Login to Player Portal
                    <ArrowRight className="ml-2 h-4 w-4" />
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