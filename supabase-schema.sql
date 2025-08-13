-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE player_status AS ENUM ('active', 'inactive', 'injured', 'alumni');
CREATE TYPE payment_method AS ENUM ('zeffy', 'cash', 'check', 'other');
CREATE TYPE season_type AS ENUM ('spring', 'fall', 'full');
CREATE TYPE player_role AS ENUM ('admin', 'captain', 'vice_captain', 'treasurer', 'secretary', 'player');
CREATE TYPE division AS ENUM ('D1', 'D3', 'both');

-- Players table
CREATE TABLE players (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    display_name TEXT,
    phone TEXT,
    date_of_birth DATE,
    position TEXT,
    jersey_number INTEGER CHECK (jersey_number >= 1 AND jersey_number <= 99),
    height_cm INTEGER CHECK (height_cm >= 100 AND height_cm <= 250),
    weight_kg INTEGER CHECK (weight_kg >= 40 AND weight_kg <= 200),
    bio TEXT,
    profile_image_url TEXT,
    hometown TEXT,
    occupation TEXT,
    member_since INTEGER CHECK (member_since IS NULL OR (member_since >= 1960 AND member_since <= EXTRACT(YEAR FROM CURRENT_DATE))),
    status player_status DEFAULT 'active',
    join_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Dues payments table
CREATE TABLE dues_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    payment_date DATE DEFAULT CURRENT_DATE,
    payment_method payment_method NOT NULL,
    payment_reference TEXT,
    season_year INTEGER NOT NULL,
    season_type season_type NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Emergency contacts table
CREATE TABLE emergency_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    relationship TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Player roles table
CREATE TABLE player_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    role player_role NOT NULL DEFAULT 'player',
    division division,
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    assigned_by UUID REFERENCES auth.users(id)
);

-- Create indexes for better performance
CREATE INDEX idx_players_email ON players(email);
CREATE INDEX idx_players_status ON players(status);
CREATE INDEX idx_dues_payments_player_id ON dues_payments(player_id);
CREATE INDEX idx_dues_payments_season ON dues_payments(season_year, season_type);
CREATE INDEX idx_emergency_contacts_player_id ON emergency_contacts(player_id);
CREATE INDEX idx_player_roles_player_id ON player_roles(player_id);

-- Create player standings view
CREATE OR REPLACE VIEW player_standings AS
SELECT 
    p.id as player_id,
    p.first_name,
    p.last_name,
    p.email,
    p.status::text,
    EXISTS (
        SELECT 1 
        FROM dues_payments dp 
        WHERE dp.player_id = p.id 
        AND dp.season_year = EXTRACT(YEAR FROM CURRENT_DATE)
    ) as current_season_paid,
    (
        SELECT MAX(dp.payment_date)::text
        FROM dues_payments dp 
        WHERE dp.player_id = p.id
    ) as last_payment_date,
    (
        SELECT SUM(dp.amount)::numeric
        FROM dues_payments dp 
        WHERE dp.player_id = p.id
    ) as total_paid
FROM players p;

-- Create function to check if dues are current
CREATE OR REPLACE FUNCTION is_dues_current(player_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM dues_payments 
        WHERE dues_payments.player_id = is_dues_current.player_id 
        AND season_year = EXTRACT(YEAR FROM CURRENT_DATE)
    );
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) Policies
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE dues_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_roles ENABLE ROW LEVEL SECURITY;

-- Players policies
CREATE POLICY "Players can view their own profile" ON players
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Players can update their own profile" ON players
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Players can insert their own profile" ON players
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by all" ON players
    FOR SELECT USING (status = 'active');

-- Dues payments policies
CREATE POLICY "Players can view their own payments" ON dues_payments
    FOR SELECT USING (auth.uid() = player_id);

CREATE POLICY "Admins can insert payments" ON dues_payments
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM player_roles 
            WHERE player_id = auth.uid() 
            AND role IN ('admin', 'treasurer')
        )
    );

-- Emergency contacts policies
CREATE POLICY "Players can manage their own emergency contacts" ON emergency_contacts
    FOR ALL USING (auth.uid() = player_id);

-- Player roles policies
CREATE POLICY "Everyone can view player roles" ON player_roles
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage roles" ON player_roles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM player_roles 
            WHERE player_id = auth.uid() 
            AND role = 'admin'
        )
    );

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

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_players_updated_at BEFORE UPDATE ON players
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_emergency_contacts_updated_at BEFORE UPDATE ON emergency_contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();