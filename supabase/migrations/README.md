# Supabase Migrations

This folder contains SQL migrations for the WRFC website database.

## Migration Naming Convention

All migrations follow the format: `YYYYMMDD-description-of-change.sql`

Example: `20251017-fix-players-table-and-rls.sql`

## Current Migrations

| Date | File | Description |
|------|------|-------------|
| 2025-10-17 | `20251017-fix-players-table-and-rls.sql` | Fixes players table structure, adds missing columns, fixes RLS policies |

## Running Migrations

### To Fix Current Profile Issues

1. Open your Supabase Dashboard
2. Go to **SQL Editor**
3. Copy the ENTIRE contents of `20251017-fix-players-table-and-rls.sql`
4. Paste and run it
5. Check the output messages - you should see:
   - `✅ SUCCESS: All users have player records!`
   - `✅ Your player record exists and is ready!`

### Important Notes

- Migrations are designed to be **idempotent** (safe to run multiple times)
- Each migration handles its own error cases
- Migrations should be run in date order, but each is self-contained
- All migrations provide status output and verification

## What the Current Migration Fixes

The `20251017-fix-players-table-and-rls.sql` migration fixes:

1. **Missing columns error** (`column "first_name" does not exist`)
   - Adds all required columns to the players table
   
2. **PGRST116 error** (`0 rows returned`)
   - Creates player records for all existing users
   
3. **RLS policy violations** 
   - Sets up proper policies so users can read/write their own profiles
   
4. **New user registration**
   - Sets up trigger to auto-create player records for new users

5. **Updated_at tracking**
   - Adds automatic timestamp updates

## Creating New Migrations

When creating a new migration:

1. Use the naming format: `YYYYMMDD-brief-description.sql`
2. Include a header comment with:
   - Migration name
   - Purpose
   - Author
   - Date
3. Make it idempotent using:
   - `CREATE TABLE IF NOT EXISTS`
   - `ADD COLUMN IF NOT EXISTS`
   - `ON CONFLICT DO NOTHING`
   - Error handling blocks
4. Include verification queries at the end
5. Provide clear status messages using `RAISE NOTICE`

## Example Migration Structure

```sql
-- Migration: YYYYMMDD-description
-- Purpose: What this migration does
-- Author: Your name
-- Date: Month DD, YYYY

-- Step 1: Make changes
ALTER TABLE ...

-- Step 2: Verify changes
SELECT ...

-- Verification
DO $$
BEGIN
    RAISE NOTICE 'Migration complete';
END $$;
```

## Troubleshooting

If a migration fails:

1. Check the error message in the SQL Editor output
2. Verify you're running it in the correct database
3. Ensure you have the necessary permissions
4. Check if previous migrations have been run

### Common Issues and Solutions

| Error | Solution |
|-------|----------|
| `column "X" does not exist` | Run the migration - it adds all missing columns |
| `PGRST116: 0 rows` | Run the migration - it creates missing player records |
| `permission denied` | Run the migration - it fixes RLS policies |
| `duplicate key value` | Safe to ignore - migration handles duplicates |

## Migration History

To check which migrations have been applied, you can query the table structures and policies directly:

```sql
-- Check players table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'players'
ORDER BY ordinal_position;

-- Check RLS policies
SELECT policyname, cmd, qual
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'players';

-- Check if all users have player records
SELECT 
    COUNT(*) FILTER (WHERE p.id IS NULL) as users_without_players,
    COUNT(*) as total_users
FROM auth.users u
LEFT JOIN public.players p ON u.id = p.id;
```

## Development vs Production

- **Development**: Safe to run migrations multiple times for testing
- **Production**: Review migration output carefully, but migrations are designed to be safe

## Need Help?

If issues persist after running migrations:

1. Check the browser console at `/portal/profile` for detailed logs
2. The enhanced logging will show exactly what's failing
3. Review the migration output for any WARNING messages
4. Ensure your Supabase project has the correct permissions set