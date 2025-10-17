-- Enhanced Profile RLS Fix with Debugging
-- Run this in your Supabase SQL Editor
-- This script includes comprehensive fixes and debugging queries

-- ============================================
-- STEP 1: CHECK CURRENT STATE
-- ============================================

-- Check if RLS is enabled on the players table
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE schemaname = 'public' 
AND tablename = 'players';

-- List all existing policies on players table
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE schemaname = 'public' 
AND tablename = 'players';

-- ============================================
-- STEP 2: FIX RLS POLICIES
-- ============================================

-- Drop potentially conflicting policies
DROP POLICY IF EXISTS "Public profiles are viewable by all" ON players;
DROP POLICY IF EXISTS "Players can view their own profile" ON players;
DROP POLICY IF EXISTS "Players can update their own profile" ON players;
DROP POLICY IF EXISTS "Players can insert their own profile" ON players;

-- Create comprehensive policies with proper permissions
-- Policy 1: Users can see their own profile (most specific)
CREATE POLICY "Users can view own profile" ON players
    FOR SELECT USING (auth.uid() = id);

-- Policy 2: Users can update their own profile
CREATE POLICY "Users can update own profile" ON players
    FOR UPDATE USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Policy 3: Users can insert their own profile (critical for new users)
CREATE POLICY "Users can insert own profile" ON players
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Policy 4: Public can view active profiles (less specific)
CREATE POLICY "Public can view active profiles" ON players
    FOR SELECT USING (status = 'active');

-- Policy 5: Users can delete their own profile (if needed)
CREATE POLICY "Users can delete own profile" ON players
    FOR DELETE USING (auth.uid() = id);

-- ============================================
-- STEP 3: FIX TRIGGER FOR AUTO-CREATION
-- ============================================

-- Drop and recreate the trigger function with better error handling
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    player_exists boolean;
BEGIN
    -- Check if player already exists
    SELECT EXISTS (
        SELECT 1 FROM public.players WHERE id = NEW.id
    ) INTO player_exists;
    
    -- Only create if doesn't exist
    IF NOT player_exists THEN
        INSERT INTO public.players (
            id, 
            email, 
            first_name, 
            last_name,
            status,
            created_at,
            updated_at
        )
        VALUES (
            NEW.id,
            NEW.email,
            COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(NEW.email, '@', 1)),
            COALESCE(NEW.raw_user_meta_data->>'last_name', 'Player'),
            'active',
            NOW(),
            NOW()
        )
        ON CONFLICT (id) DO NOTHING; -- Extra safety
    END IF;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log error but don't fail user creation
        RAISE WARNING 'Failed to create player record for user %: %', NEW.id, SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- ============================================
-- STEP 4: CREATE MISSING PLAYER RECORDS
-- ============================================

-- Create player records for all existing users who don't have them
INSERT INTO players (
    id, 
    email, 
    first_name, 
    last_name,
    status,
    created_at,
    updated_at
)
SELECT 
    u.id,
    u.email,
    COALESCE(u.raw_user_meta_data->>'first_name', split_part(u.email, '@', 1)),
    COALESCE(u.raw_user_meta_data->>'last_name', 'Player'),
    'active',
    NOW(),
    NOW()
FROM auth.users u
LEFT JOIN players p ON u.id = p.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- STEP 5: VERIFICATION QUERIES
-- ============================================

-- Count users without player records (should be 0 after fixes)
SELECT COUNT(*) as users_without_player_records
FROM auth.users u
LEFT JOIN players p ON u.id = p.id
WHERE p.id IS NULL;

-- Show all users and their player record status
SELECT 
    u.id,
    u.email,
    u.created_at as user_created,
    p.id IS NOT NULL as has_player_record,
    p.first_name,
    p.last_name,
    p.status
FROM auth.users u
LEFT JOIN players p ON u.id = p.id
ORDER BY u.created_at DESC
LIMIT 20;

-- Test RLS policies (run this as different users to test)
-- You can use Supabase Dashboard's "Run as" feature to test this
SELECT 
    current_setting('request.jwt.claims', true)::json->>'sub' as current_user_id,
    auth.uid() as auth_uid,
    auth.role() as auth_role;

-- ============================================
-- STEP 6: DEBUGGING HELPERS
-- ============================================

-- Create a function to test if a specific user can update their profile
CREATE OR REPLACE FUNCTION test_profile_update(user_id uuid)
RETURNS TABLE (
    can_select boolean,
    can_update boolean,
    can_insert boolean,
    can_delete boolean
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        EXISTS (
            SELECT 1 FROM players 
            WHERE id = user_id 
            AND auth.uid() = user_id
        ) as can_select,
        EXISTS (
            SELECT 1 FROM players 
            WHERE id = user_id 
            AND auth.uid() = user_id
        ) as can_update,
        auth.uid() = user_id as can_insert,
        auth.uid() = user_id as can_delete;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- STEP 7: FINAL STATUS CHECK
-- ============================================

-- Summary of current state
SELECT 
    'Total Users' as metric, 
    COUNT(*) as count 
FROM auth.users
UNION ALL
SELECT 
    'Total Players', 
    COUNT(*) 
FROM players
UNION ALL
SELECT 
    'Users Without Players', 
    COUNT(*) 
FROM auth.users u 
LEFT JOIN players p ON u.id = p.id 
WHERE p.id IS NULL
UNION ALL
SELECT 
    'Active Players', 
    COUNT(*) 
FROM players 
WHERE status = 'active'
UNION ALL
SELECT 
    'RLS Policies', 
    COUNT(*) 
FROM pg_policies 
WHERE tablename = 'players';

-- ============================================
-- EMERGENCY: DISABLE RLS FOR TESTING
-- ============================================
-- ONLY uncomment these if you need to test without RLS
-- Remember to re-enable immediately after testing!

-- ALTER TABLE players DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE dues_payments DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE emergency_contacts DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE player_roles DISABLE ROW LEVEL SECURITY;

-- To re-enable:
-- ALTER TABLE players ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE dues_payments ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE player_roles ENABLE ROW LEVEL SECURITY;