"use client";

import { useEffect } from 'react';
import { supabase, getProfile, getActiveOrders } from '@/lib/supabase';
import { useAppStore } from '@/lib/store';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setProfile, setActiveOrders, setLoading } = useAppStore();

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          const profileData = await getProfile(session.user.id);
          setProfile(profileData);
          
          const orders = await getActiveOrders(session.user.id);
          setActiveOrders(orders);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          const profileData = await getProfile(session.user.id);
          setProfile(profileData);
          
          const orders = await getActiveOrders(session.user.id);
          setActiveOrders(orders);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          setActiveOrders([]);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setProfile, setActiveOrders, setLoading]);

  return <>{children}</>;
}
