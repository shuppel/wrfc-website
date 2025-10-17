'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/portal-badge'
import { useToast } from '@/components/ui/use-toast'
import { 
  User, 
  Phone, 
  Calendar,
  MapPin,
  Briefcase,
  Ruler,
  Weight,
  Hash,
  Save,
  AlertCircle,
  CheckCircle,
  Camera,
  Upload,
  Bug
} from 'lucide-react'
import type { Player } from '@/lib/supabase/types'
import { ProfileLogger } from '@/lib/logger'
import { profileAnalytics } from '@/lib/analytics'

const POSITIONS = [
  'Prop', 'Hooker', 'Lock', 'Flanker', 'Number Eight', 
  'Scrum Half', 'Fly Half', 'Inside Center', 'Outside Center',
  'Wing', 'Fullback'
]

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [player, setPlayer] = useState<Player | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [showDebugPanel, setShowDebugPanel] = useState(false)
  const loggerRef = useRef<ProfileLogger | null>(null)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    display_name: '',
    phone: '',
    date_of_birth: '',
    position: '',
    jersey_number: '',
    height_cm: '',
    weight_kg: '',
    hometown: '',
    occupation: '',
    bio: '',
    member_since: ''
  })

  useEffect(() => {
    loadPlayerData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadPlayerData() {
    const supabase = createClient()
    
    // Initialize logger if not already done
    if (!loggerRef.current) {
      const { data: { user } } = await supabase.auth.getUser()
      loggerRef.current = new ProfileLogger(user?.id, user?.email || undefined)
    }
    
    const logger = loggerRef.current
    logger.setAction('load_player_data')
    
    try {
      // Track page load
      profileAnalytics.trackInteraction('profile_page_load')
      
      logger.auth('Fetching authenticated user')
      const startAuth = performance.now()
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      logger.performance('auth_get_user', performance.now() - startAuth)
      
      if (authError) {
        logger.error('AUTH', {
          message: authError.message,
          code: authError.name,
          supabaseError: authError
        })
        profileAnalytics.trackAuthIssue('get_user_failed', user?.id)
        
        toast({
          title: 'Authentication Error',
          description: authError.message,
          variant: 'destructive'
        })
        router.push('/portal/login')
        return
      }
      
      if (user) {
        logger.auth('User authenticated successfully', { 
          userId: user.id, 
          email: user.email,
          emailVerified: user.email_confirmed_at,
          lastSignIn: user.last_sign_in_at
        })
        
        // First, try to call the RPC function to ensure player exists
        logger.database('Ensuring player record exists via RPC', { userId: user.id })
        const rpcStart = performance.now()
        
        const { data: rpcResult, error: rpcError } = await supabase
          .rpc('get_or_create_player_profile')
        
        const rpcDuration = performance.now() - rpcStart
        logger.performance('ensure_player_rpc', rpcDuration)
        
        if (rpcError) {
          logger.warn('RPC failed, falling back to direct upsert', { error: rpcError.message })
          
          // Fallback: Try direct upsert if RPC fails
          const upsertStart = performance.now()
          
          const { error: upsertError } = await supabase
            .from('players')
            .upsert({
              id: user.id,
              email: user.email!,
              first_name: user.user_metadata?.first_name || user.email?.split('@')[0] || 'New',
              last_name: user.user_metadata?.last_name || 'Player',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'id',
              ignoreDuplicates: false
            })
            .select()
            .single()
          
          const upsertDuration = performance.now() - upsertStart
          logger.performance('upsert_player_record', upsertDuration)
          
          if (upsertError) {
            logger.error('DATABASE', {
              message: `Failed to ensure player record: ${upsertError.message}`,
              code: upsertError.code,
              supabaseError: upsertError
            })
            
            toast({
              title: 'Database Error',
              description: 'Failed to create or load your profile. Please try again or contact support.',
              variant: 'destructive'
            })
            return
          }
        } else {
          logger.database('Player record ensured via RPC', { playerId: rpcResult?.id })
        }
        
        // Now fetch the complete player record
        logger.database('Fetching complete player record', { userId: user.id })
        const startDb = performance.now()
        const { data: playerData, error } = await supabase
          .from('players')
          .select('*')
          .eq('id', user.id)
          .single()
        const dbDuration = performance.now() - startDb
        logger.performance('fetch_player_record', dbDuration)
        profileAnalytics.trackDatabaseOperation('fetch_player', !error, dbDuration, error)
        
        if (error) {
          logger.error('DATABASE', {
            message: error.message,
            code: error.code,
            supabaseError: error
          })
          
          // This shouldn't happen after upsert, but it's a critical error
          toast({
            title: 'Database Error', 
            description: `Failed to load profile: ${error.message}. Please refresh the page.`,
            variant: 'destructive'
          })
          return
        }
        
        if (playerData) {
          logger.database('Player data loaded successfully', { 
            playerId: playerData.id,
            hasProfile: !!playerData.phone || !!playerData.date_of_birth
          })
          profileAnalytics.trackSuccess('player_data_loaded')
          setPlayer(playerData)
          setProfileImageUrl(playerData.profile_image_url)
          setFormData({
            first_name: playerData.first_name || '',
            last_name: playerData.last_name || '',
            display_name: playerData.display_name || '',
            phone: playerData.phone || '',
            date_of_birth: playerData.date_of_birth || '',
            position: playerData.position || '',
            jersey_number: playerData.jersey_number?.toString() || '',
            height_cm: playerData.height_cm?.toString() || '',
            weight_kg: playerData.weight_kg?.toString() || '',
            hometown: playerData.hometown || '',
            occupation: playerData.occupation || '',
            bio: playerData.bio || '',
            member_since: playerData.member_since?.toString() || ''
          })
        }
      }
    } catch (error: any) {
      logger.error('UNEXPECTED', {
        message: error.message || 'Unknown error loading player data',
        stack: error.stack
      })
      profileAnalytics.trackError('unexpected_load_error', {
        error_message: error.message
      })
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try refreshing the page.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const supabase = createClient()
    const logger = loggerRef.current!
    logger.setAction('update_profile')
    
    try {
      profileAnalytics.trackInteraction('form_submit_started')
      const submitStart = performance.now()
      
      logger.auth('Verifying user session for update')
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Prepare update data
        const updateData = {
          ...formData,
          jersey_number: formData.jersey_number ? parseInt(formData.jersey_number) : null,
          height_cm: formData.height_cm ? parseInt(formData.height_cm) : null,
          weight_kg: formData.weight_kg ? parseInt(formData.weight_kg) : null,
          member_since: formData.member_since ? parseInt(formData.member_since) : null,
          updated_at: new Date().toISOString()
        }

        // Log the data being sent
        logger.database('Preparing profile update', {
          userId: user.id,
          fieldsToUpdate: Object.keys(updateData).filter(k => updateData[k as keyof typeof updateData] !== null),
          hasChanges: true
        })
        
        // Track which fields are being updated
        const fieldsBeingUpdated = Object.keys(updateData).filter(
          key => updateData[key as keyof typeof updateData] !== null && 
                 updateData[key as keyof typeof updateData] !== ''
        )
        
        logger.database('Executing database update')
        const updateStart = performance.now()
        
        // Use upsert to ensure the record exists and update it
        const { data: updatedPlayer, error } = await supabase
          .from('players')
          .upsert({
            id: user.id,
            email: user.email!,
            ...updateData
          }, {
            onConflict: 'id',
            ignoreDuplicates: false
          })
          .select()
          .single()
        
        const updateDuration = performance.now() - updateStart
        logger.performance('database_update', updateDuration)

        if (error) {
          logger.error('DATABASE', {
            message: `Update failed: ${error.message}`,
            code: error.code,
            supabaseError: error,
            formData: updateData
          })
          
          profileAnalytics.trackError('update_failed', {
            error_code: error.code,
            error_message: error.message,
            user_id: user.id,
            form_field: fieldsBeingUpdated.join(',')
          })
          
          profileAnalytics.trackDatabaseOperation('update_player', false, updateDuration, error)
          throw error
        }
        
        logger.database('Profile update successful', {
          playerId: updatedPlayer?.id,
          fieldsUpdated: fieldsBeingUpdated,
          responseFields: Object.keys(updatedPlayer || {})
        })
        
        profileAnalytics.trackSuccess('profile_updated', {
          duration: performance.now() - submitStart,
          fields_updated: fieldsBeingUpdated
        })
        
        profileAnalytics.trackDatabaseOperation('update_player', true, updateDuration)

        toast({
          title: 'Success',
          description: 'Profile updated successfully'
        })
        
        // Refresh player data
        await loadPlayerData()
      }
    } catch (error: any) {
      logger.error('UPDATE_FAILED', {
        message: error.message || 'Unknown error during profile update',
        stack: error.stack,
        code: error.code
      })
      
      // Note: submitStart is not available here, using 0 as fallback
      profileAnalytics.trackFormSubmission(false, 0)
      
      toast({
        title: 'Error',
        description: `Failed to update profile: ${error.message || 'Unknown error'}`,
        variant: 'destructive'
      })
    } finally {
      setSaving(false)
    }
  }

  function handleChange(field: string, value: string) {
    const logger = loggerRef.current
    if (logger) {
      logger.validation(`Field changed: ${field}`, { 
        field, 
        hasValue: !!value,
        valueLength: value?.length 
      })
    }
    
    profileAnalytics.trackInteraction('field_change', {
      field_name: field,
      field_value: field.includes('password') ? '[REDACTED]' : value.substring(0, 50)
    })
    
    setFormData(prev => {
      const updated = { ...prev, [field]: value }
      return updated
    })
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return
    
    const file = e.target.files[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${player?.id}/profile-images/${fileName}`
    
    setUploadingImage(true)
    
    try {
      const supabase = createClient()
      
      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('player-profiles')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })
      
      if (uploadError) {
        throw uploadError
      }
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('player-profiles')
        .getPublicUrl(filePath)
      
      // Update player profile with new image URL
      const { error: updateError } = await supabase
        .from('players')
        .update({ profile_image_url: publicUrl })
        .eq('id', player?.id)
      
      if (updateError) {
        throw updateError
      }
      
      setProfileImageUrl(publicUrl)
      toast({
        title: 'Success',
        description: 'Profile photo updated successfully'
      })
      
      // Reload player data to ensure consistency
      await loadPlayerData()
      
    } catch (error) {
      console.error('Error uploading image:', error)
      toast({
        title: 'Error',
        description: 'Failed to upload profile photo',
        variant: 'destructive'
      })
    } finally {
      setUploadingImage(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const profileComplete = player?.phone && player?.date_of_birth && player?.position

  return (
    <div className="space-y-6">
      {/* Debug Panel - Only shown in development or when explicitly enabled */}
      {(showDebugPanel || process.env.NODE_ENV === 'development') && (
        <Card className="border-orange-500 bg-orange-50 dark:bg-orange-950">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Bug className="h-5 w-5" />
                Debug Information
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDebugPanel(false)}
              >
                Hide
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Session Info</h4>
              <pre className="text-xs bg-black text-green-400 p-2 rounded overflow-x-auto">
                {JSON.stringify({
                  userId: player?.id,
                  email: player?.email,
                  hasProfile: !!(player?.phone && player?.date_of_birth && player?.position)
                }, null, 2)}
              </pre>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Recent Logs</h4>
              <pre className="text-xs bg-black text-green-400 p-2 rounded overflow-x-auto max-h-60 overflow-y-auto">
                {loggerRef.current?.getLogs().slice(-10).map(log => 
                  `[${log.level.toUpperCase()}] ${log.category}: ${log.message}`
                ).join('\n') || 'No logs available'}
              </pre>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const logs = loggerRef.current?.exportLogs()
                  if (logs) {
                    navigator.clipboard.writeText(logs)
                    toast({
                      title: 'Logs Copied',
                      description: 'Debug logs copied to clipboard'
                    })
                  }
                }}
              >
                Copy Logs
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  loggerRef.current?.clearStoredErrors()
                  profileAnalytics.clearStoredEvents()
                  toast({
                    title: 'Debug Data Cleared',
                    description: 'Local debug storage cleared'
                  })
                }}
              >
                Clear Debug Data
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const errors = profileAnalytics.getStoredEvents('errors')
                  console.log('Stored Errors:', errors)
                  toast({
                    title: 'Check Console',
                    description: `Found ${errors.length} stored errors in console`
                  })
                }}
              >
                Show Errors
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Toggle Debug Panel Button - Always visible in development */}
      {!showDebugPanel && process.env.NODE_ENV === 'development' && (
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-4 right-4 z-50"
          onClick={() => setShowDebugPanel(true)}
        >
          <Bug className="h-4 w-4 mr-2" />
          Debug
        </Button>
      )}
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* Profile Photo in Header */}
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border-4 border-gray-200 dark:border-gray-700 relative flex-shrink-0">
            {profileImageUrl ? (
              <Image
                src={profileImageUrl}
                alt="Profile"
                fill
                className="object-cover"
                sizes="80px"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-10 h-10 text-gray-400" />
              </div>
            )}
          </div>
          
          {/* Player Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {player?.first_name} {player?.last_name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {player?.position ? `${player.position}` : 'Rugby Player'}
              {player?.member_since && ` • Member since ${player.member_since}`}
            </p>
          </div>
        </div>
        
        {profileComplete ? (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-4 w-4 mr-1" />
            Complete
          </Badge>
        ) : (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            <AlertCircle className="h-4 w-4 mr-1" />
            Incomplete
          </Badge>
        )}
      </div>

      {/* Profile Photo Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Profile Photo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            {/* Profile Image Preview */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border-4 border-gray-200 dark:border-gray-700 relative">
                {profileImageUrl ? (
                  <Image
                    src={profileImageUrl}
                    alt="Profile"
                    fill
                    className="object-cover"
                    sizes="128px"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
              
              {/* Upload overlay */}
              <label
                htmlFor="profile-upload"
                className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Upload className="w-8 h-8 text-white" />
              </label>
            </div>
            
            {/* Upload instructions */}
            <div className="flex-1">
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploadingImage}
              />
              <Label 
                htmlFor="profile-upload" 
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {uploadingImage ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Upload Photo
                  </>
                )}
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Recommended: Square image, at least 400x400px
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => handleChange('first_name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => handleChange('last_name', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="display_name">Display Name (Nickname)</Label>
              <Input
                id="display_name"
                value={formData.display_name}
                onChange={(e) => handleChange('display_name', e.target.value)}
                placeholder="How you want to be called"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="date_of_birth" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Date of Birth
                </Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => handleChange('date_of_birth', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hometown" className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Hometown
                </Label>
                <Input
                  id="hometown"
                  value={formData.hometown}
                  onChange={(e) => handleChange('hometown', e.target.value)}
                  placeholder="City, State/Country"
                />
              </div>
              <div>
                <Label htmlFor="occupation" className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  Occupation
                </Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => handleChange('occupation', e.target.value)}
                  placeholder="Your profession"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rugby Information */}
        <Card>
          <CardHeader>
            <CardTitle>Rugby Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="position">Position</Label>
                <Select
                  value={formData.position}
                  onValueChange={(value) => handleChange('position', value)}
                >
                  <SelectTrigger id="position">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {POSITIONS.map((pos) => (
                      <SelectItem key={pos} value={pos}>
                        {pos}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="jersey_number" className="flex items-center gap-1">
                  <Hash className="h-4 w-4" />
                  Jersey Number
                </Label>
                <Input
                  id="jersey_number"
                  type="number"
                  min="1"
                  max="99"
                  value={formData.jersey_number}
                  onChange={(e) => handleChange('jersey_number', e.target.value)}
                  placeholder="1-99"
                />
              </div>
              <div>
                <Label htmlFor="member_since" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Member Since (Year)
                </Label>
                <Input
                  id="member_since"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.member_since}
                  onChange={(e) => handleChange('member_since', e.target.value)}
                  placeholder={`e.g., ${new Date().getFullYear() - 2}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height_cm" className="flex items-center gap-1">
                  <Ruler className="h-4 w-4" />
                  Height (cm)
                </Label>
                <Input
                  id="height_cm"
                  type="number"
                  min="100"
                  max="250"
                  value={formData.height_cm}
                  onChange={(e) => handleChange('height_cm', e.target.value)}
                  placeholder="e.g., 180"
                />
              </div>
              <div>
                <Label htmlFor="weight_kg" className="flex items-center gap-1">
                  <Weight className="h-4 w-4" />
                  Weight (kg)
                </Label>
                <Input
                  id="weight_kg"
                  type="number"
                  min="40"
                  max="200"
                  value={formData.weight_kg}
                  onChange={(e) => handleChange('weight_kg', e.target.value)}
                  placeholder="e.g., 85"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio / About Me</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('bio', e.target.value)}
                placeholder="Tell us about yourself, your rugby experience, etc."
                rows={4}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button 
            type="submit" 
            disabled={saving}
            className="flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => router.push('/portal/dashboard')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}