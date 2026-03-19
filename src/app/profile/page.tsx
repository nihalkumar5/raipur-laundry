"use client";

import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Package, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Home, 
  User,
  Wallet,
  ArrowRight,
  Shield,
  MessageCircle,
  LogOut,
  Sparkles,
  Settings,
  Bell
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const { user, profile, setUser, setProfile } = useAppStore();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    router.push('/');
  };

  if (!user || !profile) return null;

  const quickActions = [
    { name: 'My Wallet', icon: Wallet, desc: 'Balance: ₹0.00', color: 'text-blue-600', bg: 'bg-blue-50', link: '/wallet' },
    { name: 'Subscription', icon: Sparkles, desc: 'Plan: Standard', color: 'text-purple-600', bg: 'bg-purple-50', link: '/subscription' },
    { name: 'Addresses', icon: MapPin, desc: '2 saved locations', color: 'text-green-600', bg: 'bg-green-50', link: '#' },
    { name: 'Notifications', icon: Bell, desc: 'Offers & Status', color: 'text-orange-600', bg: 'bg-orange-50', link: '#' },
  ];

  return (
    <div className="bg-[#F1F5F9] min-h-screen">
      <div className="app-shell pb-24">
        
        {/* Profile Card Header */}
        <header className="px-8 pt-16 pb-10 bg-white rounded-b-[3rem] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="h-24 w-24 rounded-[2rem] bg-slate-50 border-4 border-white shadow-xl overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="Avatar" />
              </div>
              <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-primary rounded-xl flex items-center justify-center text-white border-4 border-white">
                <Settings size={14} />
              </div>
            </div>
            <h1 className="text-2xl font-black text-slate-800">{profile.full_name || 'DhobiGuru Member'}</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{user.email}</p>
          </div>
        </header>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          
          {/* Quick Stats / Actions Grid */}
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <button 
                key={action.name}
                onClick={() => action.link !== '#' && router.push(action.link)}
                className="bg-white p-5 rounded-[2rem] border border-slate-100 text-left space-y-3 shadow-sm active:scale-95 transition-all"
              >
                <div className={`${action.bg} ${action.color} h-10 w-10 rounded-xl flex items-center justify-center`}>
                  <action.icon size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-black text-slate-800 block">{action.name}</span>
                  <span className="text-[9px] font-medium text-slate-400">{action.desc}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Support Section */}
          <section className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Support & Feedback</h3>
            <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden">
              <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="bg-green-50 text-green-600 h-10 w-10 rounded-xl flex items-center justify-center">
                    <MessageCircle size={20} />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-black text-slate-800 block">WhatsApp Support</span>
                    <span className="text-[10px] text-slate-400 font-medium">Chat with our Raipur team</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
              </button>
              <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-50 text-slate-400 h-10 w-10 rounded-xl flex items-center justify-center">
                    <Info size={20} />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-black text-slate-800 block">About DhobiGuru</span>
                    <span className="text-[10px] text-slate-400 font-medium">Team, Privacy & Terms</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
              </button>
            </div>
          </section>

          {/* Logout */}
          <button 
            onClick={handleLogout}
            className="w-full bg-red-50 text-red-600 p-5 rounded-[2rem] flex items-center justify-center gap-3 font-black text-sm active:scale-95 transition-all"
          >
            <LogOut size={20} />
            Logout from Ritual
          </button>

          <div className="text-center py-4">
            <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">DhobiGuru Raipur v1.0.4</p>
          </div>

        </div>

        {/* Bottom Nav */}
        <nav className="bottom-nav">
          <button onClick={() => router.push('/dashboard')} className="flex flex-col items-center gap-1 text-slate-400">
            <Home size={22} />
            <span className="text-[10px] font-black uppercase tracking-tighter">Home</span>
          </button>
          <button onClick={() => router.push('/orders')} className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <Package size={22} />
            <span className="text-[10px] font-black uppercase tracking-tighter">Orders</span>
          </button>
          <button onClick={() => router.push('/wallet')} className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <Wallet size={22} />
            <span className="text-[10px] font-black uppercase tracking-tighter">Wallet</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-primary">
            <User size={22} className="stroke-[2.5px]" />
            <span className="text-[10px] font-black uppercase tracking-tighter italic">Profile</span>
          </button>
        </nav>

      </div>
    </div>
  );
}
