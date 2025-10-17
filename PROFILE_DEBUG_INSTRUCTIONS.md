# Profile Database Write Issues - Debug & Fix Instructions

## Quick Fix Steps

### 1. Run the Enhanced RLS Fix Script

1. Open your Supabase Dashboard
2. Go to **SQL Editor**
3. Copy the entire contents of `fix-profile-rls-enhanced.sql`
4. Paste and run the script
5. Review the output for any errors

### 2. Verify the Fix

After running the script, check:
- The "users_without_player_records" count should be 0
- All RLS policies should be created (should show 5 policies)
- The trigger "on_auth_user_created" should exist

### 3. Test Profile Updates

1. Go to `/portal/profile`
2. Open browser Developer Console (F12)
3. Try updating a field
4. Check the console for detailed logging output

## Debug Information Available

### In Development Mode

The profile page now includes:

1. **Debug Panel** - Shows:
   - Current session info
   - Recent logs
   - Error tracking

2. **Console Logging** - Detailed logs for:
   - Authentication steps
   - Database operations
   - Form field changes
   - Performance metrics

3. **Local Storage** - Stores:
   - Recent errors (`profile_errors`)
   - Analytics events (`profile_analytics_*`)

### How to Access Debug Info

1. **Show Debug Panel**: 
   - Click the "Debug" button (bottom-right in development)
   - Or set `showDebugPanel` to `true` in the component

2. **Copy Logs**:
   - Click "Copy Logs" button in debug panel
   - Paste into a text file for analysis

3. **View Stored Errors**:
   - Click "Show Errors" button
   - Check browser console for detailed error history

## Common Issues and Solutions

### Issue 1: "Policy violation" error

**Symptom**: Database returns policy violation error when updating profile

**Solution**:
```sql
-- Check if user has a player record
SELECT * FROM players WHERE id = auth.uid();

-- If no record exists, create one manually
INSERT INTO players (id, email, first_name, last_name)
VALUES (auth.uid(), 'user@email.com', 'FirstName', 'LastName');
```

### Issue 2: "User not authenticated" error

**Symptom**: auth.uid() returns null

**Solution**:
1. Log out completely
2. Clear browser cache/cookies
3. Log in again
4. Try updating profile

### Issue 3: Profile photo upload fails

**Symptom**: Image upload returns error

**Solution**:
1. Check if `player-profiles` bucket exists in Supabase Storage
2. Verify bucket is set to public
3. Run the storage RLS fix: `fix-storage-rls.sql`

### Issue 4: Some fields don't save

**Symptom**: Specific fields return null after save

**Solution**:
- Check field constraints in database
- Verify data types match (e.g., integers for height/weight)
- Look for validation errors in debug logs

## Testing Checklist

After implementing fixes, test:

- [ ] Can create new user and auto-create player record
- [ ] Can update basic fields (name, phone, email)
- [ ] Can update numeric fields (height, weight, jersey)
- [ ] Can upload profile photo
- [ ] Changes persist after page refresh
- [ ] No errors in console during update
- [ ] Debug panel shows successful operations

## Emergency Procedures

### Temporarily Disable RLS (Testing Only!)

If you need to test without RLS restrictions:

```sql
-- DISABLE (testing only!)
ALTER TABLE players DISABLE ROW LEVEL SECURITY;

-- Your tests here...

-- RE-ENABLE (important!)
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
```

**WARNING**: Never leave RLS disabled in production!

### Clear All Debug Data

To reset all debug information:

1. Open browser console
2. Run: `localStorage.clear()`
3. Refresh the page

### Export Full Debug Report

1. Open profile page
2. Try to reproduce the issue
3. Open debug panel
4. Click "Copy Logs"
5. Save to a file with timestamp

## Contact Support

If issues persist after trying these fixes:

1. Collect debug logs using the steps above
2. Note your Supabase project URL
3. Document exact steps to reproduce
4. Include browser and OS information

## Additional SQL Debugging Queries

```sql
-- Check current user context
SELECT auth.uid(), auth.role(), auth.email();

-- Test if current user can update their profile
SELECT * FROM test_profile_update(auth.uid());

-- View all policies on players table
SELECT * FROM pg_policies WHERE tablename = 'players';

-- Check trigger status
SELECT * FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';
```