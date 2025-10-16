# Profile Page Database Fix Instructions

The profile page is not saving or reading data because of Row Level Security (RLS) policies in Supabase. Here's how to fix it:

## Quick Fix (Development)

If you're in development and want to quickly test, you can temporarily disable RLS:

```sql
-- Run this in Supabase SQL Editor
ALTER TABLE players DISABLE ROW LEVEL SECURITY;
ALTER TABLE dues_payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE player_roles DISABLE ROW LEVEL SECURITY;
```

**Warning**: This disables all security. Only use for development/testing!

## Proper Fix (Production)

### 1. First, check if the tables exist

Run this in your Supabase SQL Editor:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('players', 'dues_payments', 'emergency_contacts', 'player_roles');
```

### 2. If tables don't exist, run the schema

If the tables don't exist, run the entire `supabase-schema.sql` file in your Supabase SQL Editor.

### 3. Add missing RLS policies

Run these additional policies that were missing from the original schema:

```sql
-- Allow players to insert their own profile (for auto-creation)
CREATE POLICY "Players can insert their own profile" ON players
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow service role full access (for triggers)
CREATE POLICY "Service role can manage all players" ON players
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');
```

### 4. Verify the trigger exists

Check if the trigger that auto-creates player records exists:

```sql
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
AND trigger_name = 'on_auth_user_created';
```

If it doesn't exist, create it:

```sql
-- Create trigger to automatically create player record on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO players (id, email, first_name, last_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'first_name', 'New'),
        COALESCE(NEW.raw_user_meta_data->>'last_name', 'Player')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();
```

### 5. For existing users without player records

If you already have users who signed up before the trigger was created, create their player records manually:

```sql
-- Create player records for existing users
INSERT INTO players (id, email, first_name, last_name)
SELECT 
    id,
    email,
    COALESCE(raw_user_meta_data->>'first_name', split_part(email, '@', 1)),
    COALESCE(raw_user_meta_data->>'last_name', 'Player')
FROM auth.users
WHERE id NOT IN (SELECT id FROM players);
```

### 6. Test the profile page

After running these fixes:

1. Log out and log back in
2. Go to `/portal/profile`
3. Try updating your profile information
4. The data should now save and persist

## Debugging

If it's still not working, check the browser console for errors. The profile page logs detailed information:

- "User found: [id] [email]" - Confirms authentication is working
- "Player data loaded: [data]" - Shows if data was retrieved
- "Update successful: [data]" - Shows if update worked
- Error messages with details if something fails

## Common Issues

1. **"PGRST116" error**: Player record doesn't exist. The code tries to create one automatically.
2. **"42501" error**: Permission denied. RLS policies are blocking the operation.
3. **No error but data doesn't persist**: Check if RLS is enabled but policies are missing.

## Alternative: Use Supabase Dashboard

You can also manually check/edit player data in the Supabase Dashboard:
1. Go to Table Editor
2. Select the `players` table
3. Find the user by their email
4. Edit the record directly

This helps verify if the issue is with the database or the application code.