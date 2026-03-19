import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  subscription_status: 'Elite' | 'Standard' | 'None';
  quota_kg: number;
  pickup_count_this_week: number;
};

export type Order = {
  id: string;
  user_id: string;
  subscription_id?: string | null;
  address_id: string;
  driver_id?: string | null;
  service: string;
  status: 'scheduled' | 'driver_assigned' | 'picked_up' | 'weighed' | 'washing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  weight_kg: number | null;
  final_price?: number | null;
  pickup_time: string;
  otp_code?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at?: string;
};

// Real Database Helpers
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*, subscriptions(*)')
    .eq('id', userId)
    .single();
    
  if (error) throw error;
  return data;
};

export const getActiveOrders = async (userId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .neq('status', 'Completed')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createOrder = async (orderData: Partial<Order>) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single();

  if (error) throw error;
  return data;
};
