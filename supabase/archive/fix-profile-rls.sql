-- Fix for profile page not saving/reading data
-- Run this in your Supabase SQL Editor

-- 1. Add missing INSERT policy for players
CREATE POLICY "Players can insert their own profile" ON players
    FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. Check if any existing users don't have player records
-- This will show you which users need player records created
SELECT 
    u.id,
    u.email,
    u.created_at as user_created,
    p.id as player_id
FROM auth.users u
LEFT JOIN players p ON u.id = p.id
WHERE p.id IS NULL;

-- 3. Create player records for existing users who don't have them
-- This will create player records for all users who signed up but don't have a player record
INSERT INTO players (id, email, first_name, last_name)
SELECT 
    u.id,
    u.email,
    COALESCE(u.raw_user_meta_data->>'first_name', split_part(u.email, '@', 1)),
    COALESCE(u.raw_user_meta_data->>'last_name', 'Player')
FROM auth.users u
LEFT JOIN players p ON u.id = p.id
WHERE p.id IS NULL;

-- 4. Verify the trigger exists and is working
-- This should return one row if the trigger exists
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
AND trigger_name = 'on_auth_user_created';

-- 5. Test if RLS policies are working correctly
-- Run this as a logged-in user to see if you can see your own profile
-- You can test this in Supabase by using the "Run as" feature
SELECT current_setting('request.jwt.claims', true)::json->>'sub' as current_user_id;

-- 6. Optional: Temporarily disable RLS for debugging (DEVELOPMENT ONLY!)
-- Uncomment these lines only if you need to debug without RLS
-- ALTER TABLE players DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE dues_payments DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE emergency_contacts DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE player_roles DISABLE ROW LEVEL SECURITY;

-- 7. To re-enable RLS after debugging:
-- ALTER TABLE players ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE dues_payments ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE player_roles ENABLE ROW LEVEL SECURITY;