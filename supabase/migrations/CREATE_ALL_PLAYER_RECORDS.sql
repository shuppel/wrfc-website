-- IMMEDIATE FIX: Create player records for ALL users
-- Run this if users are getting PGRST116 errors

-- Create player records for ALL existing users
DO $$
DECLARE
    user_record RECORD;
    created_count INTEGER := 0;
    failed_count INTEGER := 0;
BEGIN
    RAISE NOTICE 'Starting to create player records for all users...';
    
    FOR user_record IN 
        SELECT 
            u.id,
            u.email,
            u.raw_user_meta_data,
            u.created_at
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
                COALESCE(
                    user_record.raw_user_meta_data->>'first_name',
                    split_part(user_record.email, '@', 1),
                    'User'
                ),
                COALESCE(
                    user_record.raw_user_meta_data->>'last_name',
                    'Player'
                ),
                COALESCE(user_record.created_at, NOW()),
                NOW()
            );
            
            created_count := created_count + 1;
            RAISE NOTICE 'Created player for: %', user_record.email;
            
        EXCEPTION
            WHEN OTHERS THEN
                failed_count := failed_count + 1;
                RAISE WARNING 'Failed to create player for %: %', user_record.email, SQLERRM;
        END;
    END LOOP;
    
    RAISE NOTICE '';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'RESULTS:';
    RAISE NOTICE '  Created: % player records', created_count;
    RAISE NOTICE '  Failed: % attempts', failed_count;
    RAISE NOTICE '========================================';
END $$;

-- Verify all users now have player records
SELECT 
    'Users without player records' as check,
    COUNT(*) as count
FROM auth.users u
LEFT JOIN public.players p ON u.id = p.id
WHERE p.id IS NULL;

-- Show sample of player records
SELECT 
    'Sample player records' as info,
    id,
    email,
    first_name,
    last_name,
    created_at
FROM public.players
ORDER BY created_at DESC
LIMIT 5;

-- Test if current user can access their record
DO $$
DECLARE
    user_id UUID;
    has_record BOOLEAN;
BEGIN
    user_id := auth.uid();
    
    IF user_id IS NOT NULL THEN
        SELECT EXISTS(
            SELECT 1 FROM public.players WHERE id = user_id
        ) INTO has_record;
        
        IF has_record THEN
            RAISE NOTICE '✅ Current user has a player record!';
        ELSE
            RAISE WARNING '❌ Current user does NOT have a player record!';
            
            -- Try to create it
            INSERT INTO public.players (
                id,
                email,
                first_name,
                last_name,
                created_at,
                updated_at
            )
            SELECT 
                id,
                email,
                COALESCE(raw_user_meta_data->>'first_name', split_part(email, '@', 1)),
                COALESCE(raw_user_meta_data->>'last_name', 'Player'),
                NOW(),
                NOW()
            FROM auth.users
            WHERE id = user_id
            ON CONFLICT (id) DO NOTHING;
            
            RAISE NOTICE 'Created player record for current user';
        END IF;
    ELSE
        RAISE NOTICE 'No authenticated user in this SQL context';
    END IF;
END $$;