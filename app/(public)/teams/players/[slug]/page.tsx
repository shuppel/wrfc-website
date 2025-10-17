import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase-server'
import { generateSEOMetadata } from '../../../utils/seo'
import { Badge } from '@/components/ui/portal-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Calendar, 
  MapPin, 
  Briefcase, 
  Ruler, 
  Weight, 
  Hash,
  Trophy,
  Star,
  Shield,
  ChevronLeft
} from 'lucide-react'
import type { Player } from '@/lib/supabase/types'

interface PlayerDetailPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PlayerDetailPageProps): Promise<Metadata> {
  const player = await getPlayerBySlug(params.slug)
  
  if (!player) {
    return generateSEOMetadata({
      title: 'Player Not Found',
      description: 'The requested player profile could not be found.',
      path: `/teams/players/${params.slug}`
    })
  }

  const fullName = player.display_name || `${player.first_name} ${player.last_name}`
  
  return generateSEOMetadata({
    title: `${fullName} - Player Profile`,
    description: `View ${fullName}'s profile, stats, and information for the Washington Renegades RFC.`,
    path: `/teams/players/${params.slug}`
  })
}

async function getPlayerBySlug(slug: string): Promise<Player | null> {
  const supabase = createServerClient()
  
  // Parse slug to get first and last name
  const nameParts = slug.split('-')
  if (nameParts.length < 2) return null
  
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ')
  
  const { data: players, error } = await supabase
    .from('players')
    .select('*')
    .ilike('first_name', firstName)
    .ilike('last_name', lastName)
    .limit(1)
  
  if (error || !players || players.length === 0) {
    return null
  }
  
  return players[0]
}

export default async function PlayerDetailPage({ params }: PlayerDetailPageProps) {
  const player = await getPlayerBySlug(params.slug)
  
  if (!player) {
    notFound()
  }
  
  // Calculate stats
  const currentYear = new Date().getFullYear()
  const yearsActive = player.member_since ? currentYear - player.member_since : 0
  const capsPerYear = player.status === 'active' ? 15 : 10
  const estimatedCaps = Math.floor(yearsActive * capsPerYear * 0.7)
  const isVeteran = yearsActive >= 5
  
  // Format height and weight
  const heightInFeet = player.height_cm ? Math.floor(player.height_cm / 30.48) : null
  const heightInInches = player.height_cm ? Math.round((player.height_cm % 30.48) / 2.54) : null
  const weightInLbs = player.weight_kg ? Math.round(player.weight_kg * 2.205) : null
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Link */}
        <Link 
          href="/teams/players"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Roster
        </Link>

        {/* Player Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            {/* Player Image */}
            <div className="md:w-1/3 bg-gradient-to-br from-wrfc-navy to-wrfc-red">
              <div className="aspect-w-3 aspect-h-4 relative h-96 md:h-full">
                {player.profile_image_url ? (
                    <Image
                      src={player.profile_image_url}
                      alt={`${player.first_name} ${player.last_name}`}
                      fill
                      className="object-cover"
                      priority
                    />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-5xl font-bold text-white">
                        {player.jersey_number || `${player.first_name[0]}${player.last_name[0]}`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Player Info */}
            <div className="md:w-2/3 p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                    {player.first_name} {player.last_name}
                  </h1>
                  {player.display_name && (
                    <p className="text-lg text-gray-600 dark:text-gray-400 italic mb-2">
                      &quot;{player.display_name}&quot;
                    </p>
                  )}
                  <p className="text-2xl text-wrfc-red dark:text-wrfc-teal font-semibold">
                    {player.position || 'Position TBD'}
                  </p>
                </div>
                
                {player.jersey_number && (
                  <div className="bg-wrfc-navy dark:bg-wrfc-red text-white rounded-full w-20 h-20 flex items-center justify-center">
                    <span className="text-3xl font-bold">#{player.jersey_number}</span>
                  </div>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {isVeteran && (
                  <Badge variant="outline" className="text-sm">
                    <Trophy className="w-4 h-4 mr-1" />
                    {yearsActive}+ Year Veteran
                  </Badge>
                )}
                
                {player.status === 'injured' && (
                  <Badge variant="destructive" className="text-sm">
                    <Shield className="w-4 h-4 mr-1" />
                    Injured Reserve
                  </Badge>
                )}
                
                {estimatedCaps > 50 && (
                  <Badge className="text-sm bg-yellow-600 hover:bg-yellow-700">
                    <Star className="w-4 h-4 mr-1" />
                    {estimatedCaps}+ Estimated Caps
                  </Badge>
                )}
                
                <Badge variant="secondary" className="text-sm">
                  {player.status === 'active' ? 'Active Roster' : player.status}
                </Badge>
              </div>

              {/* Bio */}
              {player.bio && (
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {player.bio}
                </p>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {player.height_cm && (
                  <div className="text-center">
                    <Ruler className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Height</p>
                    <p className="font-semibold">{heightInFeet}&apos;{heightInInches}&quot;</p>
                  </div>
                )}
                
                {player.weight_kg && (
                  <div className="text-center">
                    <Weight className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Weight</p>
                    <p className="font-semibold">{weightInLbs} lbs</p>
                  </div>
                )}
                
                {player.member_since && (
                  <div className="text-center">
                    <Calendar className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
                    <p className="font-semibold">{player.member_since}</p>
                  </div>
                )}
                
                {player.jersey_number && (
                  <div className="text-center">
                    <Hash className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Jersey</p>
                    <p className="font-semibold">#{player.jersey_number}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {player.date_of_birth && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Date of Birth</p>
                    <p className="font-medium">
                      {new Date(player.date_of_birth).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              )}
              
              {player.hometown && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Hometown</p>
                    <p className="font-medium">{player.hometown}</p>
                  </div>
                </div>
              )}
              
              {player.occupation && (
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Occupation</p>
                    <p className="font-medium">{player.occupation}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Rugby Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Rugby Career</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-wrfc-red dark:text-wrfc-teal">
                    {yearsActive}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Years with WRFC</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-wrfc-red dark:text-wrfc-teal">
                    ~{estimatedCaps}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Caps</p>
                </div>
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  * Cap estimates are based on average attendance and years of service
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}