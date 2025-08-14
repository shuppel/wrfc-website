'use client'

import { useEffect, useState } from 'react'
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
  Upload
} from 'lucide-react'
import type { Player } from '@/lib/supabase/types'

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
    
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError) {
        console.error('Auth error:', authError)
        toast({
          title: 'Authentication Error',
          description: authError.message,
          variant: 'destructive'
        })
        router.push('/portal/login')
        return
      }
      
      if (user) {
        console.log('User found:', user.id, user.email)
        
        const { data: playerData, error } = await supabase
          .from('players')
          .select('*')
          .eq('id', user.id)
          .single()
        
        if (error) {
          console.error('Database error:', error)
          
          // If player record doesn't exist, try to create one
          if (error.code === 'PGRST116') {
            console.log('Player record not found, attempting to create...')
            
            const { data: newPlayer, error: insertError } = await supabase
              .from('players')
              .insert({
                id: user.id,
                email: user.email!,
                first_name: user.user_metadata?.first_name || 'New',
                last_name: user.user_metadata?.last_name || 'Player'
              })
              .select()
              .single()
            
            if (insertError) {
              console.error('Failed to create player record:', insertError)
              toast({
                title: 'Database Error',
                description: 'Failed to create player profile. Please contact support.',
                variant: 'destructive'
              })
            } else {
              console.log('Player record created:', newPlayer)
              setPlayer(newPlayer)
              setFormData({
                first_name: newPlayer.first_name || '',
                last_name: newPlayer.last_name || '',
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
              toast({
                title: 'Profile Created',
                description: 'Your player profile has been created. Please update your information.',
              })
            }
          } else {
            toast({
              title: 'Database Error',
              description: `Error: ${error.message}`,
              variant: 'destructive'
            })
          }
          return
        }
        
        if (playerData) {
          console.log('Player data loaded:', playerData)
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
    } catch (error) {
      console.error('Unexpected error loading player data:', error)
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
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const updateData = {
          ...formData,
          jersey_number: formData.jersey_number ? parseInt(formData.jersey_number) : null,
          height_cm: formData.height_cm ? parseInt(formData.height_cm) : null,
          weight_kg: formData.weight_kg ? parseInt(formData.weight_kg) : null,
          member_since: formData.member_since ? parseInt(formData.member_since) : null,
          updated_at: new Date().toISOString()
        }

        console.log('FormData before update:', formData)
        console.log('UpdateData being sent:', updateData)
        console.log('User ID:', user.id)
        
        const { data: updatedPlayer, error } = await supabase
          .from('players')
          .update(updateData)
          .eq('id', user.id)
          .select()
          .single()

        if (error) {
          console.error('Update error:', error)
          console.error('Error details:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          })
          throw error
        }
        
        console.log('Update response from Supabase:', updatedPlayer)
        console.log('Fields that were sent:', Object.keys(updateData))
        console.log('Fields in response:', Object.keys(updatedPlayer || {}))

        toast({
          title: 'Success',
          description: 'Profile updated successfully'
        })
        
        // Refresh player data
        await loadPlayerData()
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive'
      })
    } finally {
      setSaving(false)
    }
  }

  function handleChange(field: string, value: string) {
    console.log(`Changing ${field} to:`, value)
    setFormData(prev => {
      const updated = { ...prev, [field]: value }
      console.log('Updated formData:', updated)
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