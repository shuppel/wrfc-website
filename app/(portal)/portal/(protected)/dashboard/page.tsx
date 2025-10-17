'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/portal-badge'
import Link from 'next/link'
import { 
  User, 
  CreditCard, 
  AlertCircle, 
  CheckCircle,
  Calendar,
  FileText
} from 'lucide-react'
import type { Player, PlayerStanding } from '@/lib/supabase/types'

export default function DashboardPage() {
  const [player, setPlayer] = useState<Player | null>(null)
  const [standing, setStanding] = useState<PlayerStanding | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPlayerData()
  }, [])

  async function loadPlayerData() {
    const supabase = createClient()
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Get player profile
        const { data: playerData } = await supabase
          .from('players')
          .select('*')
          .eq('id', user.id)
          .single()
        
        if (playerData) {
          setPlayer(playerData)
          
          // Get player standing
          const { data: standingData } = await supabase
            .from('player_standings')
            .select('*')
            .eq('player_id', user.id)
            .single()
          
          setStanding(standingData)
        }
      }
    } catch (error) {
      console.error('Error loading player data:', error)
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

  const duesStatus = standing?.current_season_paid ? 'paid' : 'unpaid'
  const profileComplete = player?.phone && player?.date_of_birth && player?.position

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {player?.first_name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your WRFC player profile and stay up to date with the team.
        </p>
      </div>

      {/* Quick Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <User className="h-8 w-8 text-blue-600" />
            {profileComplete ? (
              <Badge className="bg-green-100 text-green-800">Complete</Badge>
            ) : (
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">Incomplete</Badge>
            )}
          </div>
          <h3 className="font-semibold text-lg mb-2">Profile Status</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {profileComplete 
              ? 'Your profile is complete' 
              : 'Some information is missing'
            }
          </p>
          <Button asChild variant={profileComplete ? 'outline' : 'default'} className="w-full">
            <Link href="/portal/profile">
              {profileComplete ? 'View Profile' : 'Complete Profile'}
            </Link>
          </Button>
        </Card>

        {/* Dues Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <CreditCard className="h-8 w-8 text-green-600" />
            {duesStatus === 'paid' ? (
              <Badge className="bg-green-100 text-green-800">Paid</Badge>
            ) : (
              <Badge variant="outline" className="text-red-600 border-red-600">Unpaid</Badge>
            )}
          </div>
          <h3 className="font-semibold text-lg mb-2">2025 Dues</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {duesStatus === 'paid' 
              ? `Paid on ${standing?.last_payment_date ? new Date(standing.last_payment_date).toLocaleDateString() : 'N/A'}`
              : 'Payment required to participate'
            }
          </p>
          <Button asChild variant={duesStatus === 'paid' ? 'outline' : 'default'} className="w-full">
            <Link href="/portal/dues">
              {duesStatus === 'paid' ? 'View History' : 'Pay Dues'}
            </Link>
          </Button>
        </Card>

        {/* Emergency Contacts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
            <Badge variant="outline">Required</Badge>
          </div>
          <h3 className="font-semibold text-lg mb-2">Emergency Contacts</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Keep your emergency contacts up to date
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/portal/emergency-contacts">
              Manage Contacts
            </Link>
          </Button>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <p className="font-medium">Next Practice</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tuesday, 7:00 PM at Langdon Park
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <FileText className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <p className="font-medium">New Team Document</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                2025 Season Schedule posted
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/portal/resources">View</Link>
            </Button>
          </div>
          
          {duesStatus === 'paid' && (
            <div className="flex items-center gap-4">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="font-medium">Dues Payment Confirmed</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Thank you for your payment
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Quick Links */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button asChild variant="outline">
            <Link href="/schedule">Team Schedule</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/portal/resources">Team Resources</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Coaches</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">WRFC Website</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}