"use client";

import { useEffect } from 'react';
import { supabase, getProfile, getActiveOrders } from '@/lib/supabase';
import { useAppStore } from '@/lib/store';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setProfile, setActiveOrders, setLoading } = useAppStore();

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('Initializing Auth...');
      setLoading(true);
      try {
        console.log('Fetching session...');
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          return;
        }

        if (session?.user) {
          console.log('User found:', session.user.id);
          setUser(session.user);
          
          console.log('Fetching profile...');
          const profileData = await getProfile(session.user.id);
          console.log('Profile found:', !!profileData);
          setProfile(profileData);
          
          console.log('Fetching active orders...');
          const orders = await getActiveOrders(session.user.id);
          setActiveOrders(orders);
        } else {
          console.log('No active session found');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        console.log('Auth initialization complete');
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
