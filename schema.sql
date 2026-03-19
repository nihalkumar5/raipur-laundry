
-- SmartWash Database Schema

-- 1. Users table (Extending Supabase Auth metadata or Custom table)
-- Supabase creates a 'users' table in the 'auth' schema. 
-- We'll create a public profile table.

CREATE TYPE user_role AS ENUM ('user', 'admin', 'driver');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  phone TEXT,
  full_name TEXT,
  role user_role DEFAULT 'user',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Subscriptions table
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_name TEXT DEFAULT 'Standard Subscription (₹999)',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_kg_allowed FLOAT DEFAULT 20.0,
  kg_used FLOAT DEFAULT 0.0,
  pickups_per_week INT DEFAULT 2,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'expired')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Weekly Quotas (to enforce 2-pickup/week)
CREATE TABLE public.weekly_quotas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL, -- e.g. the Monday of the week
  pickups_used INT DEFAULT 0,
  UNIQUE(subscription_id, week_start_date)
);

-- 4. Addresses
CREATE TABLE public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  label TEXT, -- e.g. 'Home', 'Work'
  full_address TEXT NOT NULL,
  lat FLOAT8,
  lng FLOAT8,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Orders
CREATE TYPE order_status AS ENUM (
  'scheduled', 
  'driver_assigned', 
  'picked_up', 
  'weighed', -- Admin adds weight here
  'washing', 
  'out_for_delivery', 
  'delivered', 
  'cancelled'
);

CREATE TYPE service_type AS ENUM (
  'subscription_wash',
  'one_time_standard',
  'one_time_ironing'
);

CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  subscription_id UUID REFERENCES public.subscriptions(id), 
  address_id UUID NOT NULL REFERENCES public.addresses(id),
  driver_id UUID REFERENCES auth.users(id), -- driver is just a user with role='driver'
  service service_type NOT NULL,
  status order_status DEFAULT 'scheduled',
  weight_kg FLOAT, -- updated by admin
  final_price DECIMAL(10,2), -- for one-time orders
  pickup_time TIMESTAMPTZ NOT NULL,
  otp_code TEXT, -- for driver verification
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Row Level Security (Initial Policies)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_quotas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Simple select policies for users
CREATE POLICY "Users can view their own profiles" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can view their own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);

-- Admin policies
-- (In practice, you'd check a role in the profiles table)
-- CREATE POLICY "Admins can view all" ...

-- 7. Automated Weekly Reset (Concept)
-- In Supabase, you would use a 'pg_cron' extension or an Edge Function.
-- This function would be triggered every Monday to seed new 'weekly_quotas' 
-- rows for active subscriptions.
