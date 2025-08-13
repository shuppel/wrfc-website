'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/portal-badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/components/ui/use-toast'

import { 
  CreditCard, 
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  History,
  Info
} from 'lucide-react'
import type { DuesPayment, PlayerStanding } from '@/lib/supabase/types'

const ZEFFY_DUES_LINK = 'https://www.zeffy.com/en-US/membership/wrfc-player-dues' // TODO: Replace with actual link
const SEASON_YEAR = new Date().getFullYear()
const DUES_AMOUNT = {
  full: 300,
  spring: 150,
  fall: 150
}

export default function DuesPage() {
  const { toast } = useToast()
  const [standing, setStanding] = useState<PlayerStanding | null>(null)
  const [payments, setPayments] = useState<DuesPayment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDuesData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadDuesData() {
    const supabase = createClient()
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Get player standing
        const { data: standingData } = await supabase
          .from('player_standings')
          .select('*')
          .eq('player_id', user.id)
          .single()
        
        setStanding(standingData)
        
        // Get payment history
        const { data: paymentsData, error } = await supabase
          .from('dues_payments')
          .select('*')
          .eq('player_id', user.id)
          .order('payment_date', { ascending: false })
        
        if (error) throw error
        
        if (paymentsData) {
          setPayments(paymentsData)
        }
      }
    } catch (error) {
      console.error('Error loading dues data:', error)
      toast({
        title: 'Error',
        description: 'Failed to load dues information',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const currentSeasonPaid = standing?.current_season_paid || false
  const currentSeasonPayment = payments.find(p => p.season_year === SEASON_YEAR)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Membership Dues
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your WRFC membership dues and payment history
        </p>
      </div>

      {/* Current Season Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {SEASON_YEAR} Season Dues
            </span>
            {currentSeasonPaid ? (
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-4 w-4 mr-1" />
                Paid
              </Badge>
            ) : (
              <Badge variant="outline" className="text-red-600 border-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                Unpaid
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentSeasonPaid ? (
            <>
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Your {SEASON_YEAR} dues are paid. Thank you for your support!
                </AlertDescription>
              </Alert>
              
              {currentSeasonPayment && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Payment Date</p>
                    <p className="font-medium">
                      {new Date(currentSeasonPayment.payment_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Amount</p>
                    <p className="font-medium">${currentSeasonPayment.amount}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Season Type</p>
                    <p className="font-medium capitalize">{currentSeasonPayment.season_type}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Method</p>
                    <p className="font-medium capitalize">{currentSeasonPayment.payment_method}</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  Your {SEASON_YEAR} dues are not yet paid. Payment is required to participate in team activities.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Dues Options:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between">
                      <span>Full Season (Spring + Fall)</span>
                      <span className="font-semibold">${DUES_AMOUNT.full}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Spring Season Only</span>
                      <span className="font-semibold">${DUES_AMOUNT.spring}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Fall Season Only</span>
                      <span className="font-semibold">${DUES_AMOUNT.fall}</span>
                    </li>
                  </ul>
                </div>

                <Button 
                  asChild 
                  size="lg" 
                  className="w-full bg-wrfc-red hover:bg-red-700"
                >
                  <a 
                    href={ZEFFY_DUES_LINK} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <CreditCard className="h-5 w-5" />
                    Pay Dues Online
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>

                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>
                    Payment is processed through Zeffy, our secure payment partner. 
                    Zeffy charges no fees - 100% of your payment goes to WRFC.
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length > 0 ? (
            <div className="space-y-3">
              {payments.map((payment) => (
                <div 
                  key={payment.id}
                  className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {payment.season_year} {payment.season_type === 'full' ? 'Full Season' : `${payment.season_type} Season`}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {payment.payment_method}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(payment.payment_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {payment.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <History className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No payment history found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Important Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <p>
              Dues cover insurance, field rentals, equipment, referee fees, and league registration.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <p>
              Players must have current dues paid to participate in practices and matches.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <p>
              Financial assistance is available. Please contact the treasurer for more information.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Questions about dues? Contact our treasurer at{' '}
          <a href="mailto:treasurer@wrfc.org" className="font-medium underline">
            treasurer@wrfc.org
          </a>
          {' '}or speak with them at practice.
        </AlertDescription>
      </Alert>
    </div>
  )
}