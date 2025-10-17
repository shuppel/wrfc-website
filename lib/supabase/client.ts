import { createBrowserClient } from '@supabase/ssr'
import { Database } from './types'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables. Please check your .env.local file.')
    throw new Error('Supabase configuration is missing. Please contact the administrator.')
  }

  // Validate URL format
  try {
    new URL(supabaseUrl)
  } catch {
    console.error('Invalid Supabase URL format:', supabaseUrl)
    throw new Error('Invalid Supabase configuration. Please contact the administrator.')
  }

  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseAnonKey
  )
}