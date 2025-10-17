-- Add INSERT policy for players to create their own profile
CREATE POLICY "Players can insert their own profile" ON players
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Also, let's add a policy for service role to handle the trigger
CREATE POLICY "Service role can manage all players" ON players
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');