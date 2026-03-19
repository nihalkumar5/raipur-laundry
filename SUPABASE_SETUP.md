# Supabase Setup Guide for SmartWash

Follow these steps to connect your SmartWash application to a real persistent database.

## 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Note your **Project URL** and **Anon Key** from the Project Settings -> API.

## 2. Deploy the Schema
1. Open the **SQL Editor** in your Supabase dashboard.
2. Copy the contents of [schema.sql](file:///Users/nihalkumar/.gemini/antigravity/brain/8c3b486e-963d-488c-bc2e-8f06df39e281/schema.sql).
3. Paste and **Run** the script. This will create all tables (profiles, subscriptions, orders, etc.) and set up initial RLS policies.

## 3. Configure Authentication
1. Go to **Authentication -> Providers**.
2. **Enable Email**.
3. **Enable "Allow signup"**.
4. (Recommended) Disable "Confirm Email" for immediate access during development.

## 4. Environment Variables
Create a `.env.local` file in `smartwash-web/` and add your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 5. Enable Real-time
The application uses real-time sync for the dashboard.
1. Go to **Database -> Replication**.
2. Enable replication for the `orders` and `profiles` tables in the `public` schema.
