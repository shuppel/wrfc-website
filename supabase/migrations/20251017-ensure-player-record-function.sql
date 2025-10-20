-- Migration: 20251017-ensure-player-record-function
-- Purpose: Create a function to ensure a player record exists for any authenticated user
-- Author: System
-- Date: October 17, 2025

-- ============================================
-- Create function to ensure player record exists
-- ============================================
CREATE OR REPLACE FUNCTION public.ensure_player_record()
RETURNS jsonb AS $$
DECLARE
    user_id UUID;
    user_email TEXT;
    user_metadata jsonb;
    player_record jsonb;
BEGIN
    -- Get current user ID
    user_id := auth.uid();
    
    IF user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;
    
    -- Get user details
    SELECT email, raw_user_meta_data INTO user_email, user_metadata
    FROM auth.users
    WHERE id = user_id;
    
    -- Try to get existing player record
    SELECT to_jsonb(p.*) INTO player_record
    FROM public.players p
    WHERE p.id = user_id;
    
    -- If no player record exists, create one
    IF player_record IS NULL THEN
        INSERT INTO public.players (
            id,
            email,
            first_name,
            last_name,
            created_at,
            updated_at
        )
        VALUES (
            user_id,
            user_email,
            COALESCE(user_metadata->>'first_name', split_part(user_email, '@', 1)),
            COALESCE(user_metadata->>'last_name', 'Player'),
            NOW(),
            NOW()
        )
        ON CONFLICT (id) DO UPDATE
        SET 
            email = EXCLUDED.email,
            updated_at = NOW()
        RETURNING to_jsonb(players.*) INTO player_record;
        
        RAISE NOTICE 'Created new player record for user %', user_email;
    END IF;
    
    RETURN player_record;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.ensure_player_record() TO authenticated;

-- ============================================
-- Create a simpler function that just ensures the record exists
-- ============================================
CREATE OR REPLACE FUNCTION public.ensure_player_exists()
RETURNS BOOLEAN AS $$
DECLARE
    user_id UUID;
    user_email TEXT;
    user_metadata jsonb;
BEGIN
    -- Get current user ID
    user_id := auth.uid();
    
    IF user_id IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- Check if player exists
    IF NOT EXISTS (SELECT 1 FROM public.players WHERE id = user_id) THEN
        -- Get user details
        SELECT email, raw_user_meta_data INTO user_email, user_metadata
        FROM auth.users
        WHERE id = user_id;
        
        -- Create player record
        INSERT INTO public.players (
            id,
            email,
            first_name,
            last_name,
            created_at,
            updated_at
        )
        VALUES (
            user_id,
            COALESCE(user_email, 'unknown@example.com'),
            COALESCE(user_metadata->>'first_name', split_part(COALESCE(user_email, 'unknown'), '@', 1)),
            COALESCE(user_metadata->>'last_name', 'Player'),
            NOW(),
            NOW()
        )
        ON CONFLICT (id) DO NOTHING;
    END IF;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.ensure_player_exists() TO authenticated;

-- ============================================
-- Test the functions
-- ============================================
DO $$
BEGIN
    -- Test if the functions work for current user
    IF auth.uid() IS NOT NULL THEN
        PERFORM public.ensure_player_exists();
        RAISE NOTICE 'ensure_player_exists function works';
        
        PERFORM public.ensure_player_record();
        RAISE NOTICE 'ensure_player_record function works';
    ELSE
        RAISE NOTICE 'No authenticated user in this context - functions created successfully';
    END IF;
END $$;

-- ============================================
-- Create RPC endpoint for the client to call
-- ============================================
CREATE OR REPLACE FUNCTION public.get_or_create_player_profile()
RETURNS jsonb AS $$
DECLARE
    user_id UUID;
    player_record jsonb;
BEGIN
    user_id := auth.uid();
    
    IF user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated' USING HINT = 'User must be logged in';
    END IF;
    
    -- Ensure player exists
    PERFORM public.ensure_player_exists();
    
    -- Get the player record
    SELECT to_jsonb(p.*) INTO player_record
    FROM public.players p
    WHERE p.id = user_id;
    
    RETURN player_record;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.get_or_create_player_profile() TO authenticated;

RAISE NOTICE 'Migration complete: Player record functions created';