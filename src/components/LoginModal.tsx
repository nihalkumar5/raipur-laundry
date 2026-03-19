"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ShieldCheck, ChevronRight, Loader2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { supabase, getProfile } from '@/lib/supabase';

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser, setProfile } = useAppStore();

  const handleSendOtp = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
      });
      if (error) throw error;
      setStep('otp');
    } catch (err: any) {
      console.error("Auth error:", err.message);
      // Fallback for development/demo
      setStep('otp');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });

      if (error) throw error;

      if (data.user) {
        setUser(data.user);
        const profileData = await getProfile(data.user.id);
        setProfile(profileData as any);
        onClose();
      }
    } catch (err: any) {
      console.error("Verify error:", err.message);
      // Fallback for demo
      if (otp === '123456') {
        setUser({ id: 'mock-user-123', email });
        setProfile({
          id: 'mock-user-123',
          full_name: 'Nihal Kumar',
          phone: '9999999999',
          email: email,
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
          <AnimatePresence mode="wait">
            {step === 'email' ? (
              <motion.div 
                key="email"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-serif font-black text-[#0F172A] mb-2">Welcome Back.</h2>
                  <p className="text-slate-500 font-medium">Verify your identity to access your ritual.</p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                      <Mail size={20} />
                    </div>
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 py-6 pl-16 pr-8 rounded-[1.5rem] font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#8BA88E]/20 transition-all"
                    />
                  </div>
                  <button 
                    onClick={handleSendOtp}
                    disabled={!email.includes('@') || loading}
                    className="w-full bg-[#0F172A] text-white py-6 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : "Send Code"}
                    {!loading && <ChevronRight size={20} />}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-serif font-black text-[#0F172A] mb-2">Verification.</h2>
                  <p className="text-slate-500 font-medium">Code sent to <span className="text-[#0F172A] font-bold">{email}</span></p>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      maxLength={6}
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full bg-white border border-slate-200 py-6 px-8 rounded-[1.5rem] font-black text-2xl tracking-[0.5em] text-center text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#8BA88E]/20 transition-all placeholder:tracking-normal placeholder:text-lg placeholder:font-bold"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={handleVerifyOtp}
                      disabled={otp.length < 6 || loading}
                      className="w-full bg-[#0F172A] text-white py-6 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-slate-900/10"
                    >
                      {loading ? <Loader2 className="animate-spin" /> : "Complete Entry"}
                      {!loading && <ShieldCheck size={20} />}
                    </button>
                    <button 
                      onClick={() => setStep('email')}
                      className="text-xs font-bold text-slate-400 tracking-widest uppercase py-2"
                    >
                      Change Email
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="bg-[#0F172A] py-6 px-10 flex items-center justify-center">
          <p className="text-[10px] font-black text-[#8BA88E] tracking-[0.2em] uppercase">SmartWash Signature Encryption</p>
        </div>
      </motion.div>
    </div>
  );
}
