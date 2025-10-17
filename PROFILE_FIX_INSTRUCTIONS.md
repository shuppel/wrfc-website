# IMMEDIATE FIX FOR PROFILE WRITE ISSUES

## The Problem
The profile page cannot write to the database due to:
1. Missing or incorrect RLS (Row Level Security) policies
2. Missing player records for existing users
3. Possible missing columns in the database

## Quick Fix - Run This SQL Now

Copy and paste this entire SQL script into your Supabase SQL Editor and run it:

```sql
-- ============================================
-- IMMEDIATE FIX FOR PROFILE WRITES
-- ============================================

-- STEP 1: Check what columns actually exist in the players table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'players'
ORDER BY ordinal_position;

-- STEP 2: Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Public profiles are viewable by all" ON players;
DROP POLICY IF EXISTS "Players can view their own profile" ON players;
DROP POLICY IF EXISTS "Players can update their own profile" ON players;
DROP POLICY IF EXISTS "Players can insert their own profile" ON players;
DROP POLICY IF EXISTS "Users can view own profile" ON players;
DROP POLICY IF EXISTS "Users can update own profile" ON players;
DROP POLICY IF EXISTS "Users can insert own profile" ON players;
DROP POLICY IF EXISTS "Public can view active profiles" ON players;
DROP POLICY IF EXISTS "Users can delete own profile" ON players;

-- STEP 3: Create simple, working RLS policies
-- Allow users to do everything with their own profile
CREATE POLICY "Users can manage their own profile" ON players
    FOR ALL USING (auth.uid() = id);

-- STEP 4: Create missing player records for ALL existing users
DO $$
DECLARE
    user_record RECORD;
BEGIN
    FOR user_record IN 
        SELECT u.id, u.email, u.raw_user_meta_data
        FROM auth.users u
        LEFT JOIN public.players p ON u.id = p.id
        WHERE p.id IS NULL
    LOOP
        BEGIN
            INSERT INTO public.players (
                id, 
                email, 
                first_name, 
                last_name,
                created_at,
                updated_at
            )
            VALUES (
                user_record.id,
                user_record.email,
                COALESCE(user_record.raw_user_meta_data->>'first_name', split_part(user_record.email, '@', 1)),
                COALESCE(user_record.raw_user_meta_data->>'last_name', 'Player'),
                NOW(),
                NOW()
            );
            RAISE NOTICE 'Created player record for user %', user_record.email;
        EXCEPTION
            WHEN OTHERS THEN
                RAISE WARNING 'Failed to create player for %: %', user_record.email, SQLERRM;
        END;
    END LOOP;
END $$;

-- STEP 5: Fix the trigger for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.players (
        id, 
        email, 
        first_name, 
        last_name,
        created_at,
        updated_at
    )
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'last_name', 'Player'),
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Failed to create player record: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- STEP 6: Verify the fix
SELECT 
    'Total Users' as metric, 
    COUNT(*) as count 
FROM auth.users
UNION ALL
SELECT 
    'Total Players', 
    COUNT(*) 
FROM public.players
UNION ALL
SELECT 
    'Users Without Players', 
    COUNT(*) 
FROM auth.users u 
LEFT JOIN public.players p ON u.id = p.id 
WHERE p.id IS NULL;

-- STEP 7: Test with current user
SELECT 
    auth.uid() as your_user_id,
    EXISTS(SELECT 1 FROM players WHERE id = auth.uid()) as has_player_record,
    p.*
FROM players p
WHERE p.id = auth.uid();
```

## After Running the SQL

1. The last query should show your user ID and player record
2. The "Users Without Players" count should be 0
3. Go to `/portal/profile` and try updating your profile
4. Check the browser console for any errors

## If It Still Doesn't Work

### Option 1: Temporarily Disable RLS (Testing Only!)
```sql
ALTER TABLE players DISABLE ROW LEVEL SECURITY;
-- Test your profile update
-- Then immediately re-enable:
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
```

### Option 2: Check for Missing Columns
If you get "column does not exist" errors, run:
```sql
-- Add any missing columns
ALTER TABLE players 
ADD COLUMN IF NOT EXISTS member_since INTEGER,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
```

### Option 3: Manual Test
```sql
-- Try to manually update your record
UPDATE players 
SET first_name = 'Test', 
    updated_at = NOW() 
WHERE id = auth.uid();

-- Check if it worked
SELECT * FROM players WHERE id = auth.uid();
```

## Debug Information

To see what's happening:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Try updating profile
4. Look for logs starting with:
   - `[AUTH]` - Authentication issues
   - `[DATABASE]` - Database operation issues
   - `[ERROR]` - Specific errors

## Still Having Issues?

1. Run this diagnostic query:
```sql
SELECT 
    current_setting('request.jwt.claims', true)::json->>'sub' as jwt_user_id,
    auth.uid() as auth_uid,
    auth.role() as auth_role,
    current_user as db_user,
    EXISTS(SELECT 1 FROM players WHERE id = auth.uid()) as has_player;
```

2. Share the output along with:
   - Any error messages from the browser console
   - The debug panel information from the profile page

## Contact for Help

If you need immediate assistance:
1. Take a screenshot of any error messages
2. Copy the console logs
3. Note your Supabase project URL
4. Document what specific field you're trying to update