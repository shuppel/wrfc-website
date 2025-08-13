export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      players: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          display_name: string | null
          phone: string | null
          date_of_birth: string | null
          position: string | null
          jersey_number: number | null
          height_cm: number | null
          weight_kg: number | null
          bio: string | null
          profile_image_url: string | null
          hometown: string | null
          occupation: string | null
          member_since: number | null
          status: 'active' | 'inactive' | 'injured' | 'alumni'
          join_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name: string
          last_name: string
          display_name?: string | null
          phone?: string | null
          date_of_birth?: string | null
          position?: string | null
          jersey_number?: number | null
          height_cm?: number | null
          weight_kg?: number | null
          bio?: string | null
          profile_image_url?: string | null
          hometown?: string | null
          occupation?: string | null
          member_since?: number | null
          status?: 'active' | 'inactive' | 'injured' | 'alumni'
          join_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          display_name?: string | null
          phone?: string | null
          date_of_birth?: string | null
          position?: string | null
          jersey_number?: number | null
          height_cm?: number | null
          weight_kg?: number | null
          bio?: string | null
          profile_image_url?: string | null
          hometown?: string | null
          occupation?: string | null
          member_since?: number | null
          status?: 'active' | 'inactive' | 'injured' | 'alumni'
          join_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      dues_payments: {
        Row: {
          id: string
          player_id: string
          amount: number
          payment_date: string
          payment_method: 'zeffy' | 'cash' | 'check' | 'other'
          payment_reference: string | null
          season_year: number
          season_type: 'spring' | 'fall' | 'full'
          notes: string | null
          created_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          player_id: string
          amount: number
          payment_date?: string
          payment_method: 'zeffy' | 'cash' | 'check' | 'other'
          payment_reference?: string | null
          season_year: number
          season_type: 'spring' | 'fall' | 'full'
          notes?: string | null
          created_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          player_id?: string
          amount?: number
          payment_date?: string
          payment_method?: 'zeffy' | 'cash' | 'check' | 'other'
          payment_reference?: string | null
          season_year?: number
          season_type?: 'spring' | 'fall' | 'full'
          notes?: string | null
          created_at?: string
          created_by?: string | null
        }
      }
      emergency_contacts: {
        Row: {
          id: string
          player_id: string
          name: string
          relationship: string
          phone: string
          email: string | null
          is_primary: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          player_id: string
          name: string
          relationship: string
          phone: string
          email?: string | null
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          player_id?: string
          name?: string
          relationship?: string
          phone?: string
          email?: string | null
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      player_roles: {
        Row: {
          id: string
          player_id: string
          role: 'admin' | 'captain' | 'vice_captain' | 'treasurer' | 'secretary' | 'player'
          division: 'D1' | 'D3' | 'both' | null
          assigned_at: string
          assigned_by: string | null
        }
        Insert: {
          id?: string
          player_id: string
          role: 'admin' | 'captain' | 'vice_captain' | 'treasurer' | 'secretary' | 'player'
          division?: 'D1' | 'D3' | 'both' | null
          assigned_at?: string
          assigned_by?: string | null
        }
        Update: {
          id?: string
          player_id?: string
          role?: 'admin' | 'captain' | 'vice_captain' | 'treasurer' | 'secretary' | 'player'
          division?: 'D1' | 'D3' | 'both' | null
          assigned_at?: string
          assigned_by?: string | null
        }
      }
    }
    Views: {
      player_standings: {
        Row: {
          player_id: string | null
          first_name: string | null
          last_name: string | null
          email: string | null
          status: string | null
          current_season_paid: boolean | null
          last_payment_date: string | null
          total_paid: number | null
        }
      }
    }
    Functions: {
      is_dues_current: {
        Args: {
          player_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      player_status: 'active' | 'inactive' | 'injured' | 'alumni'
      payment_method: 'zeffy' | 'cash' | 'check' | 'other'
      season_type: 'spring' | 'fall' | 'full'
      player_role: 'admin' | 'captain' | 'vice_captain' | 'treasurer' | 'secretary' | 'player'
      division: 'D1' | 'D3' | 'both'
    }
  }
}

export type Player = Database['public']['Tables']['players']['Row']
export type NewPlayer = Database['public']['Tables']['players']['Insert']
export type PlayerUpdate = Database['public']['Tables']['players']['Update']

export type DuesPayment = Database['public']['Tables']['dues_payments']['Row']
export type NewDuesPayment = Database['public']['Tables']['dues_payments']['Insert']

export type EmergencyContact = Database['public']['Tables']['emergency_contacts']['Row']
export type NewEmergencyContact = Database['public']['Tables']['emergency_contacts']['Insert']

export type PlayerRole = Database['public']['Tables']['player_roles']['Row']
export type PlayerStanding = Database['public']['Views']['player_standings']['Row']