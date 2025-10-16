# Supabase Configuration Setup

## Environment Variables Required

The application requires the following environment variables to be set in your `.env.local` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Optional: Site URL for email redirects (defaults to localhost:3000)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Getting Your Supabase Credentials

1. **Create a Supabase Project**:
   - Go to [https://supabase.com](https://supabase.com)
   - Sign up or log in
   - Create a new project

2. **Find Your Project URL and Anon Key**:
   - Go to your project dashboard
   - Navigate to Settings > API
   - Copy the "Project URL" - this is your `NEXT_PUBLIC_SUPABASE_URL`
   - Copy the "anon public" key - this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Create `.env.local` file**:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and add your credentials.

## Common Issues and Solutions

### Error: "Failed to fetch" or "ERR_NAME_NOT_RESOLVED"

**Cause**: The Supabase URL is missing or incorrect.

**Solution**: 
1. Check that `.env.local` exists and contains the correct Supabase URL
2. Verify the URL format is correct: `https://[project-ref].supabase.co`
3. Restart the development server after adding environment variables

### Error: "Invalid Supabase configuration"

**Cause**: The environment variables are present but incorrectly formatted.

**Solution**:
1. Ensure there are no extra spaces or quotes in the environment variables
2. Verify the URL starts with `https://` and ends with `.supabase.co`
3. Check that the anon key is the full key string without any truncation

### Error: "Authentication service unavailable"

**Cause**: Network issues or Supabase service downtime.

**Solution**:
1. Check your internet connection
2. Verify Supabase service status at [status.supabase.com](https://status.supabase.com)
3. Try again in a few minutes

## Testing the Configuration

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Check the browser console**:
   - Open Developer Tools (F12)
   - Look for any error messages related to Supabase
   - If you see "Missing Supabase environment variables", check your `.env.local` file

3. **Test registration**:
   - Navigate to `/portal/register`
   - Try creating a new account
   - If successful, you should be redirected to a success page

## Production Deployment

For production deployment (e.g., on Vercel):

1. Add the same environment variables to your deployment platform
2. Ensure the `NEXT_PUBLIC_SITE_URL` is set to your production domain
3. Update Supabase authentication settings to allow your production domain

## Database Setup

If you haven't set up the database schema yet, see `supabase-schema.sql` for the required tables and run them in your Supabase SQL editor.

## Support

If you continue to experience issues:
1. Check the browser console for detailed error messages
2. Verify all environment variables are correctly set
3. Ensure your Supabase project is active and not paused
4. Contact support at admin@wrfc.org with the specific error message