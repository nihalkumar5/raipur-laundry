"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Plus, 
  Package, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Home, 
  User,
  Star,
  Shield,
  Zap,
  ShieldCheck
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import BookingModal from "@/components/BookingModal";
import { getProfile, getActiveOrders } from "@/lib/supabase";

export default function Dashboard() {
  const { user, profile, activeOrders, setProfile, setActiveOrders } = useAppStore();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    // Fetch live data from Supabase
    const fetchDashboardData = async () => {
      try {
        const [profileData, ordersData] = await Promise.all([
          getProfile(user.id),
          getActiveOrders(user.id)
        ]);
        if (profileData) setProfile(profileData as any);
        if (ordersData) setActiveOrders(ordersData as any);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchDashboardData();
  }, [user, router, setProfile, setActiveOrders]);

  if (!user || !profile) return null;
  const [pickupsUsed, setPickupsUsed] = useState(0);
  const totalPickups = 2;

  return (
    <div className="bg-[#F7F5F2] min-h-screen selection:bg-[#0F172A] selection:text-white">
      <div className="app-shell bg-[#F7F5F2] shadow-none md:shadow-2xl overflow-hidden flex flex-col border-x border-slate-200/20">
        
        {/* Editorial Header */}
        <header className="px-8 pt-12 pb-8 flex items-center justify-between sticky top-0 bg-[#F7F5F2]/90 backdrop-blur-md z-20">
          <div>
            <p className="text-[10px] font-black tracking-[0.2em] text-[#8BA88E] uppercase mb-1">Ritual Status</p>
            <h1 className="text-3xl font-serif font-black tracking-tight text-[#0F172A]">Bonjour, {profile.full_name?.split(' ')[0] || 'Member'}.</h1>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-white overflow-hidden border border-slate-200 shadow-sm p-0.5">
            <div className="h-full w-full rounded-[14px] overflow-hidden bg-slate-50">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nihal" alt="Avatar" />
            </div>
          </div>
        </header>

        <div className="flex-1 px-8 pb-32 space-y-10 overflow-y-auto hide-scrollbar">
          
          {/* High-Impact CTA */}
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="w-full bg-[#0F172A] text-white p-8 rounded-[2.5rem] flex items-center justify-between mb-10 shadow-2xl shadow-slate-900/20 active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-6">
              <div className="h-14 w-14 rounded-2xl bg-[#8BA88E] flex items-center justify-center text-white shadow-lg">
                <Plus size={32} />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-serif font-black tracking-tight">Book Pickup</h2>
                <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest mt-0.5">Your concierge is ready</p>
              </div>
            </div>
            <ChevronRight className="opacity-20" />
          </button>
          {/* Consumption Card */}
          <section className="px-8 mb-10">
            <div className="membership-card bg-white p-8 shadow-xl shadow-slate-900/5 border border-white">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Monthly Quota</span>
                <Shield size={14} className="text-[#8BA88E]" />
              </div>
              
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-black tracking-tighter text-[#0F172A]">{profile.quota_kg.toFixed(1)}</span>
                <span className="text-slate-300 font-bold text-xl">/ 20 KG</span>
              </div>

              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-8">
                <div 
                  className="h-full bg-[#8BA88E] rounded-full" 
                  style={{ width: `${(profile.quota_kg / 20) * 100}%` }} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F7F5F2] p-4 rounded-2xl">
                    <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase mb-1 block">Available</span>
                    <span className="text-sm font-black text-[#0F172A]">{8 - profile.pickup_count_this_week} Shifts</span>
                </div>
                <div className="bg-[#F7F5F2] p-4 rounded-2xl">
                    <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase mb-1 block">Next Reset</span>
                    <span className="text-sm font-black text-[#0F172A]">4 Days</span>
                </div>
              </div>
            </div>
          </section>
          {/* Activity Section */}
          <section className="px-8 pb-10">
            <div className="flex items-center justify-between mb-6 px-1">
              <h3 className="text-xl font-serif font-black text-[#0F172A]">Active Rituals</h3>
              {activeOrders.length > 0 && <span className="text-[10px] font-black text-[#8BA88E] uppercase tracking-widest">{activeOrders.length} Orders</span>}
            </div>

            <div className="space-y-4">
              {activeOrders.length === 0 ? (
                <div className="bg-white p-10 rounded-[2.5rem] text-center border border-slate-100 shadow-sm">
                  <Package size={40} className="mx-auto text-slate-100 mb-4" />
                  <p className="text-xs font-bold text-slate-300 uppercase tracking-widest leading-relaxed"> No active orders. <br /> Your wardrobe is in perfect order.</p>
                </div>
              ) : (
                activeOrders.map((order) => (
                  <div key={order.id} className="membership-card bg-white p-6 shadow-xl shadow-slate-900/5 border border-white flex items-center justify-between animate-fade-in">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-[#F7F5F2] flex items-center justify-center text-[#8BA88E]">
                        <Clock size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-1">{order.status}</span>
                        <h4 className="font-bold text-[#0F172A]">{new Date(order.pickup_time).toLocaleDateString()} • {new Date(order.pickup_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h4>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-200" />
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Trust Insight */}
          <div className="premium-card p-8 bg-white border-none shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-5">
                <Star size={100} fill="#C5A059" />
            </div>
            <div className="flex items-center gap-2 mb-4 text-[#C5A059]">
              <ShieldCheck size={18} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">Fabric Protection</p>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed italic font-serif">
              "We've handled 42kg of your garments with zero color fade. Excellence is our only standard."
            </p>
          </div>

        </div>

        <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

        {/* Global Bottom Nav */}
        <nav className="bottom-nav border-t border-slate-200/50 bg-[#F7F5F2]/80 backdrop-blur-xl">
          <button className="flex flex-col items-center gap-1.5 text-[#0F172A]">
            <Home size={22} className="stroke-[2.5px]" />
            <span className="text-[9px] font-black uppercase tracking-tighter">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 text-slate-300 hover:text-[#8BA88E] transition-colors">
            <Package size={22} />
            <span className="text-[9px] font-black uppercase tracking-tighter">Orders</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 text-slate-300 hover:text-[#8BA88E] transition-colors">
            <Zap size={22} />
            <span className="text-[9px] font-black uppercase tracking-tighter">FastPass</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 text-slate-300 hover:text-[#8BA88E] transition-colors">
            <User size={22} />
            <span className="text-[9px] font-black uppercase tracking-tighter">Profile</span>
          </button>
        </nav>

      </div>
    </div>
  );
}
