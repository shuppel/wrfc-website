-- Add member_since column to players table
ALTER TABLE players 
ADD COLUMN IF NOT EXISTS member_since INTEGER;

-- Add a check constraint to ensure reasonable years
ALTER TABLE players 
ADD CONSTRAINT member_since_reasonable 
CHECK (member_since IS NULL OR (member_since >= 1960 AND member_since <= EXTRACT(YEAR FROM CURRENT_DATE)));

-- Update existing players to use their join_date year as member_since if not set
UPDATE players 
SET member_since = EXTRACT(YEAR FROM join_date)::INTEGER 
WHERE member_since IS NULL AND join_date IS NOT NULL;

-- Add comment to describe the column
COMMENT ON COLUMN players.member_since IS 'Year the player joined the club (YYYY format)';