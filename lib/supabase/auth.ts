import { createClient } from './client'

export async function signUp(email: string, password: string, metadata?: { first_name: string, last_name: string }) {
  const supabase = createClient()
  
  const redirectTo = typeof window !== 'undefined' 
    ? `${window.location.origin}/portal/auth/callback`
    : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/portal/auth/callback`
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
      emailRedirectTo: redirectTo
    }
  })
  
  return { data, error }
}

export async function signIn(email: string, password: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  return { data, error }
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function resetPassword(email: string) {
  const supabase = createClient()
  
  const redirectTo = typeof window !== 'undefined' 
    ? `${window.location.origin}/portal/reset-password`
    : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/portal/reset-password`
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo
  })
  
  return { data, error }
}

export async function updatePassword(newPassword: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  })
  
  return { data, error }
}

export async function getSession() {
  const supabase = createClient()
  const { data: { session }, error } = await supabase.auth.getSession()
  return { session, error }
}

export async function getUser() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}