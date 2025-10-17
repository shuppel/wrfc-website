-- TEST SCRIPT: Verify Profile Fix
-- Run this in Supabase SQL Editor to verify the migration worked

-- ============================================
-- TEST 1: Check if all columns exist
-- ============================================
SELECT 
    'Column Check' as test,
    COUNT(*) as total_columns,
    COUNT(*) FILTER (WHERE column_name IN (
        'id', 'email', 'first_name', 'last_name', 
        'display_name', 'phone', 'date_of_birth', 
        'position', 'jersey_number', 'height_cm', 
        'weight_kg', 'bio', 'profile_image_url', 
        'hometown', 'occupation', 'member_since', 
        'join_date', 'created_at', 'updated_at'
    )) as expected_columns
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'players';

-- ============================================
-- TEST 2: Check your player record
-- ============================================
SELECT 
    'Your Player Record' as test,
    CASE 
        WHEN EXISTS(SELECT 1 FROM players WHERE id = auth.uid())
        THEN '✅ EXISTS'
        ELSE '❌ MISSING'
    END as status,
    auth.uid() as your_id;

-- Show your actual record
SELECT * FROM players WHERE id = auth.uid();

-- ============================================
-- TEST 3: Test if you can update your profile
-- ============================================
DO $$
DECLARE
    test_result TEXT;
BEGIN
    -- Try to update a field
    UPDATE players 
    SET bio = COALESCE(bio, '') || ' [Test: ' || NOW()::text || ']'
    WHERE id = auth.uid();
    
    IF FOUND THEN
        test_result := '✅ UPDATE WORKS';
    ELSE
        test_result := '❌ UPDATE FAILED';
    END IF;
    
    RAISE NOTICE 'Update Test: %', test_result;
END $$;

-- ============================================
-- TEST 4: Check RLS policies
-- ============================================
SELECT 
    'RLS Status' as test,
    CASE 
        WHEN rowsecurity THEN '✅ ENABLED'
        ELSE '❌ DISABLED'
    END as status
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'players';

-- Show active policies
SELECT 
    policyname,
    cmd,
    CASE 
        WHEN policyname LIKE '%manage%' THEN '✅ Full access policy exists'
        ELSE 'Policy exists'
    END as status
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'players';

-- ============================================
-- TEST 5: Check trigger exists
-- ============================================
SELECT 
    'Auto-create Trigger' as test,
    CASE 
        WHEN EXISTS(
            SELECT 1 FROM information_schema.triggers 
            WHERE trigger_name = 'on_auth_user_created'
        ) THEN '✅ EXISTS'
        ELSE '❌ MISSING'
    END as status;

-- ============================================
-- TEST 6: Summary
-- ============================================
DO $$
DECLARE
    has_columns BOOLEAN;
    has_player BOOLEAN;
    has_rls BOOLEAN;
    has_trigger BOOLEAN;
    all_good BOOLEAN;
BEGIN
    -- Check columns
    SELECT COUNT(*) = 19 INTO has_columns
    FROM information_schema.columns
    WHERE table_schema = 'public' 
    AND table_name = 'players'
    AND column_name IN (
        'id', 'email', 'first_name', 'last_name', 
        'display_name', 'phone', 'date_of_birth', 
        'position', 'jersey_number', 'height_cm', 
        'weight_kg', 'bio', 'profile_image_url', 
        'hometown', 'occupation', 'member_since', 
        'join_date', 'created_at', 'updated_at'
    );
    
    -- Check player record
    SELECT EXISTS(SELECT 1 FROM players WHERE id = auth.uid()) INTO has_player;
    
    -- Check RLS
    SELECT rowsecurity INTO has_rls
    FROM pg_tables 
    WHERE schemaname = 'public' AND tablename = 'players';
    
    -- Check trigger
    SELECT EXISTS(
        SELECT 1 FROM information_schema.triggers 
        WHERE trigger_name = 'on_auth_user_created'
    ) INTO has_trigger;
    
    all_good := has_columns AND has_player AND has_rls AND has_trigger;
    
    RAISE NOTICE '';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'TEST RESULTS:';
    RAISE NOTICE '  All columns exist: %', CASE WHEN has_columns THEN '✅' ELSE '❌' END;
    RAISE NOTICE '  Your player record: %', CASE WHEN has_player THEN '✅' ELSE '❌' END;
    RAISE NOTICE '  RLS enabled: %', CASE WHEN has_rls THEN '✅' ELSE '❌' END;
    RAISE NOTICE '  Auto-create trigger: %', CASE WHEN has_trigger THEN '✅' ELSE '❌' END;
    RAISE NOTICE '========================================';
    
    IF all_good THEN
        RAISE NOTICE '🎉 ALL TESTS PASSED! Profile should work!';
    ELSE
        RAISE NOTICE '⚠️ Some tests failed. Check details above.';
    END IF;
END $$;