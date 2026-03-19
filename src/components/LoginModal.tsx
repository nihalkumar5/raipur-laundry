"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, ShieldCheck, ChevronRight, Loader2, UserPlus, LogIn } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { supabase, getProfile } from '@/lib/supabase';

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  // ... rest of state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, setProfile } = useAppStore();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName }
          }
        });
        if (error) throw error;
        if (data.user) {
          setUser(data.user);
          const mockProfile = {
            id: data.user.id,
            full_name: fullName,
            email,
            phone: '',
            role: 'user',
            subscription_status: 'None',
            quota_kg: 0,
            pickup_count_this_week: 0
          };
          setProfile(mockProfile as any);
          onClose();
          router.push('/dashboard');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          setUser(data.user);
          try {
            const profileData = await getProfile(data.user.id);
            setProfile(profileData as any);
          } catch (pErr) {
            console.warn("Profile fetch failed, using default:", pErr);
            setProfile({
              id: data.user.id,
              full_name: 'Valued Member',
              email,
              phone: '',
              role: 'user',
              subscription_status: 'None',
              quota_kg: 0,
              pickup_count_this_week: 0
            } as any);
          }
          onClose();
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err.message);
      setError(err.message);
      
      // MOCK FALLBACK for development
      if (email.includes('test') && password === 'password123') {
        setUser({ id: 'mock-user-123', email });
        setProfile({
          id: 'mock-user-123',
          full_name: fullName || 'Test Member',
          email,
          phone: '9999999999',
          role: 'user',
          subscription_status: 'Elite',
          quota_kg: 20,
          pickup_count_this_week: 1,
        });
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-[#0F172A]/40 backdrop-blur-sm px-4">
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-full max-w-md bg-[#F7F5F2] rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden relative shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/50 text-[#0F172A] active:scale-95 transition-all"
        >
          <X size={20} />
        </button>

        <div className="p-10 pt-16">
          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <h2 className="text-3xl font-serif font-black text-[#0F172A] mb-2">
                {isSignUp ? "Join the Ritual." : "Welcome Back."}
              </h2>
              <p className="text-slate-500 font-medium">
                {isSignUp ? "Create your account to elevate your lifestyle." : "Verify your identity to access your ritual."}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {isSignUp && (
                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                    <UserPlus size={20} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border border-slate-200 py-6 pl-16 pr-8 rounded-[1.5rem] font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#8BA88E]/20 transition-all"
                    required={isSignUp}
                  />
                </div>
              )}

              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail size={20} />
                </div>
                <input 
                  type="email" 
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-slate-200 py-6 pl-16 pr-8 rounded-[1.5rem] font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#8BA88E]/20 transition-all"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={20} />
                </div>
                <input 
                  type="password" 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-slate-200 py-6 pl-16 pr-8 rounded-[1.5rem] font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#8BA88E]/20 transition-all"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F172A] text-white py-6 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-slate-900/10 mt-4"
              >
                {loading ? <Loader2 className="animate-spin" /> : (isSignUp ? "Create Account" : "Access Ritual")}
                {!loading && (isSignUp ? <UserPlus size={20} /> : <LogIn size={20} />)}
              </button>
            </div>

            <div className="text-center">
              <button 
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                }}
                className="text-sm font-bold text-[#8BA88E] hover:text-[#0F172A] transition-colors"
              >
                {isSignUp ? "Already a member? Sign In" : "New to SmartWash? Create Account"}
              </button>
            </div>
          </form>
        </div>
        
        <div className="bg-[#0F172A] py-6 px-10 flex items-center justify-center">
          <p className="text-[10px] font-black text-[#8BA88E] tracking-[0.2em] uppercase">SmartWash Signature Encryption</p>
        </div>
      </motion.div>
    </div>
  );
}
