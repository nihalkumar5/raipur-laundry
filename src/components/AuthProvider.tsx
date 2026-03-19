"use client";

import { useEffect } from 'react';
import { supabase, getProfile, getActiveOrders } from '@/lib/supabase';
import { useAppStore } from '@/lib/store';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setProfile, setActiveOrders, setLoading } = useAppStore();

  useEffect(() => {
    console.log('AuthProvider mounted. Setting up listener...');
    setLoading(true);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth Event:', event, session?.user?.id);
        
        try {
          if (session?.user) {
            setUser(session.user);
            const profileData = await getProfile(session.user.id);
            setProfile(profileData);
            
            const orders = await getActiveOrders(session.user.id);
            setActiveOrders(orders);
          } else {
            setUser(null);
            setProfile(null);
            setActiveOrders([]);
          }
        } catch (err) {
          console.error('Error in auth state change handler:', err);
        } finally {
          setLoading(false);
          console.log('Auth processed for event:', event);
        }
      }
    );

    return () => {
      console.log('AuthProvider unmounting. unsubscribing...');
      subscription.unsubscribe();
    };
  }, [setUser, setProfile, setActiveOrders, setLoading]);

  return <>{children}</>;
}
