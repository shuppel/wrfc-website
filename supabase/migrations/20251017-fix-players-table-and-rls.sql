-- Migration: 20251017-fix-players-table-and-rls
-- Purpose: Fix players table structure, add missing columns, fix RLS policies, and ensure all users have player records
-- Author: System
-- Date: October 17, 2025

-- ============================================
-- STEP 1: Ensure players table exists with proper structure
-- ============================================
CREATE TABLE IF NOT EXISTS public.players (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STEP 2: Add all required columns (idempotent - safe to run multiple times)
-- ============================================
ALTER TABLE public.players 
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS display_name TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS position TEXT,
ADD COLUMN IF NOT EXISTS jersey_number INTEGER,
ADD COLUMN IF NOT EXISTS height_cm INTEGER,
ADD COLUMN IF NOT EXISTS weight_kg INTEGER,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS profile_image_url TEXT,
ADD COLUMN IF NOT EXISTS hometown TEXT,
ADD COLUMN IF NOT EXISTS occupation TEXT,
ADD COLUMN IF NOT EXISTS member_since INTEGER,
ADD COLUMN IF NOT EXISTS join_date DATE DEFAULT CURRENT_DATE,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- ============================================
-- STEP 3: Add constraints (with error handling for duplicates)
-- ============================================
DO $$
BEGIN
    ALTER TABLE public.players 
        ADD CONSTRAINT check_jersey_number CHECK (jersey_number IS NULL OR (jersey_number >= 1 AND jersey_number <= 99));
EXCEPTION
    WHEN duplicate_object THEN 
        RAISE NOTICE 'Constraint check_jersey_number already exists';
END $$;

DO $$
BEGIN
    ALTER TABLE public.players 
        ADD CONSTRAINT check_height_cm CHECK (height_cm IS NULL OR (height_cm >= 100 AND height_cm <= 250));
EXCEPTION
    WHEN duplicate_object THEN 
        RAISE NOTICE 'Constraint check_height_cm already exists';
END $$;

DO $$
BEGIN
    ALTER TABLE public.players 
        ADD CONSTRAINT check_weight_kg CHECK (weight_kg IS NULL OR (weight_kg >= 40 AND weight_kg <= 200));
EXCEPTION
    WHEN duplicate_object THEN 
        RAISE NOTICE 'Constraint check_weight_kg already exists';
END $$;

DO $$
BEGIN
    ALTER TABLE public.players 
        ADD CONSTRAINT check_member_since CHECK (member_since IS NULL OR (member_since >= 1960 AND member_since <= EXTRACT(YEAR FROM CURRENT_DATE)));
EXCEPTION
    WHEN duplicate_object THEN 
        RAISE NOTICE 'Constraint check_member_since already exists';
END $$;

-- ============================================
-- STEP 4: Set default values for required fields in existing records
-- ============================================
UPDATE public.players 
SET 
    first_name = COALESCE(first_name, split_part(email, '@', 1)),
    last_name = COALESCE(last_name, 'Player'),
    updated_at = COALESCE(updated_at, NOW())
WHERE first_name IS NULL OR last_name IS NULL OR updated_at IS NULL;

-- ============================================
-- STEP 5: Make required columns NOT NULL (with error handling)
-- ============================================
DO $$
BEGIN
    ALTER TABLE public.players ALTER COLUMN first_name SET NOT NULL;
    RAISE NOTICE 'Set first_name to NOT NULL';
EXCEPTION
    WHEN OTHERS THEN 
        RAISE NOTICE 'Could not set first_name to NOT NULL: %', SQLERRM;
END $$;

DO $$
BEGIN
    ALTER TABLE public.players ALTER COLUMN last_name SET NOT NULL;
    RAISE NOTICE 'Set last_name to NOT NULL';
EXCEPTION
    WHEN OTHERS THEN 
        RAISE NOTICE 'Could not set last_name to NOT NULL: %', SQLERRM;
END $$;

-- ============================================
-- STEP 6: Create trigger for automatic updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_players_updated_at ON public.players;
CREATE TRIGGER update_players_updated_at 
    BEFORE UPDATE ON public.players
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STEP 7: Enable RLS and set up policies
-- ============================================
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to avoid conflicts
DO $$ 
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'players'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.players', pol.policyname);
        RAISE NOTICE 'Dropped policy: %', pol.policyname;
    END LOOP;
END $$;

-- Create single comprehensive policy for users to manage their own profiles
CREATE POLICY "Users can fully manage their own profile" 
ON public.players 
FOR ALL 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

DO $$
BEGIN
    RAISE NOTICE 'Created RLS policy for user profile management';
END $$;

-- ============================================
-- STEP 8: Create player records for all existing users
-- ============================================
DO $$
DECLARE
    user_record RECORD;
    created_count INTEGER := 0;
BEGIN
    FOR user_record IN 
        SELECT u.id, u.email, u.raw_user_meta_data, u.created_at
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
                COALESCE(user_record.created_at, NOW()),
                NOW()
            );
            created_count := created_count + 1;
            RAISE NOTICE 'Created player record for: %', user_record.email;
        EXCEPTION
            WHEN OTHERS THEN
                RAISE WARNING 'Failed to create player for %: %', user_record.email, SQLERRM;
        END;
    END LOOP;
    
    IF created_count > 0 THEN
        RAISE NOTICE 'Created % new player records', created_count;
    ELSE
        RAISE NOTICE 'No new player records needed';
    END IF;
END $$;

-- ============================================
-- STEP 9: Set up trigger for future user registrations
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
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
        RAISE WARNING 'Failed to create player record for new user %: %', NEW.email, SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

DO $$
BEGIN
    RAISE NOTICE 'Set up trigger for automatic player record creation';
END $$;

-- ============================================
-- STEP 10: Create indexes for performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_players_email ON public.players(email);
CREATE INDEX IF NOT EXISTS idx_players_created_at ON public.players(created_at);
CREATE INDEX IF NOT EXISTS idx_players_updated_at ON public.players(updated_at);

-- ============================================
-- VERIFICATION
-- ============================================
DO $$
DECLARE
    total_users INTEGER;
    total_players INTEGER;
    users_without_players INTEGER;
    current_user_has_player BOOLEAN;
BEGIN
    SELECT COUNT(*) INTO total_users FROM auth.users;
    SELECT COUNT(*) INTO total_players FROM public.players;
    SELECT COUNT(*) INTO users_without_players 
    FROM auth.users u 
    LEFT JOIN public.players p ON u.id = p.id 
    WHERE p.id IS NULL;
    
    SELECT EXISTS(SELECT 1 FROM public.players WHERE id = auth.uid()) 
    INTO current_user_has_player;
    
    RAISE NOTICE '';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Migration Complete - Summary:';
    RAISE NOTICE '  Total Users: %', total_users;
    RAISE NOTICE '  Total Players: %', total_players;
    RAISE NOTICE '  Users without players: %', users_without_players;
    RAISE NOTICE '  Current user has player: %', current_user_has_player;
    RAISE NOTICE '========================================';
    
    IF users_without_players > 0 THEN
        RAISE WARNING 'There are still % users without player records!', users_without_players;
    ELSE
        RAISE NOTICE '✅ SUCCESS: All users have player records!';
    END IF;
    
    IF current_user_has_player THEN
        RAISE NOTICE '✅ Your player record exists and is ready!';
    END IF;
END $$;

-- Show the current user's player record
SELECT 
    '✅ Migration 20251017-fix-players-table-and-rls completed successfully' as status,
    auth.uid() as your_user_id,
    p.*
FROM public.players p
WHERE p.id = auth.uid();