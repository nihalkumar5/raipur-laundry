"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Plus, 
  Package, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Home, 
  User,
  Wallet,
  Tag,
  ArrowRight,
  Info,
  Zap,
  Shield
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

  return (
    <div className="bg-[#F1F5F9] min-h-screen">
      <div className="app-shell pb-24">
        
        {/* Top: Location Bar */}
        <header className="px-6 pt-10 pb-4 bg-white sticky top-0 z-20 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <MapPin size={20} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Your Location</p>
              <h1 className="text-sm font-black flex items-center gap-1">
                Raipur Civil Lines <ChevronRight size={14} className="text-primary" />
              </h1>
            </div>
          </div>
          <div className="h-10 w-10 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow-sm">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="Avatar" />
          </div>
        </header>

        <div className="flex-1 p-6 space-y-8 overflow-y-auto">
          
          {/* Middle: MASSIVE Book Pickup Button */}
          <section className="animate-fade-in">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="big-btn h-48 flex-col text-center"
            >
              <div className="bg-white/20 p-4 rounded-full mb-2">
                <Plus size={40} className="stroke-[3px]" />
              </div>
              <div>
                <span className="text-2xl block">Book Pickup</span>
                <span className="text-[11px] font-medium opacity-80 uppercase tracking-widest">Tap to start booking</span>
              </div>
            </button>
          </section>

          {/* Services Grid */}
          <section className="space-y-4">
            <h3 className="text-lg font-black text-slate-800 px-1">Our Services</h3>
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="service-card"
              >
                <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 mb-2">
                  <Package size={24} />
                </div>
                <span className="text-[11px] font-black text-center leading-tight">Wash & Fold</span>
              </button>
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="service-card"
              >
                <div className="bg-green-50 p-3 rounded-2xl text-green-600 mb-2">
                  <Zap size={24} />
                </div>
                <span className="text-[11px] font-black text-center leading-tight">Wash & Iron</span>
              </button>
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="service-card"
              >
                <div className="bg-purple-50 p-3 rounded-2xl text-purple-600 mb-2">
                  <Shield size={24} />
                </div>
                <span className="text-[11px] font-black text-center leading-tight">Dry Clean</span>
              </button>
            </div>
          </section>

          {/* Active Order Banner (If any) */}
          {activeOrders.length > 0 && (
            <section className="animate-fade-in">
              <Link 
                href="/orders"
                className="bg-white border-2 border-primary/10 rounded-3xl p-5 flex items-center justify-between shadow-sm active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/5 h-12 w-12 rounded-2xl flex items-center justify-center text-primary">
                    <Clock size={24} />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{activeOrders[0].status.replace('_', ' ')}</span>
                    <h4 className="font-bold text-slate-800">Arriving Tomorrow</h4>
                  </div>
                </div>
                <div className="bg-slate-50 p-2 rounded-full text-slate-400 font-bold">
                  <ArrowRight size={20} />
                </div>
              </Link>
            </section>
          )}

          {/* Bottom: Offers Banner */}
          <section>
            <div className="offer-banner">
              <div className="relative z-10 space-y-2 text-left">
                <div className="bg-white/20 px-3 py-1 rounded-full w-fit">
                  <span className="text-[10px] font-black uppercase text-white tracking-widest">Mega Offer</span>
                </div>
                <h3 className="text-2xl font-black">Get 20% OFF</h3>
                <p className="text-xs font-medium opacity-90">On your first booking this week!</p>
                <button className="bg-white text-primary px-4 py-2 rounded-xl text-xs font-black mt-2">
                  REDEEM NOW
                </button>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-10">
                <Tag size={160} />
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
            <div className="bg-slate-50 h-10 w-10 rounded-full flex items-center justify-center text-slate-400 flex-shrink-0">
              <Info size={20} />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-800">Free Pickup & Delivery</p>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight">On all orders above ₹499 in Raipur.</p>
            </div>
          </section>

        </div>

        <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

        {/* Bottom Nav */}
        <nav className="bottom-nav">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 text-primary">
            <Home size={22} className="stroke-[2.5px]" />
            <span className="text-[10px] font-black uppercase tracking-tighter">Home</span>
          </Link>
          <Link 
            href="/orders"
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors"
          >
            <Package size={22} />
            <span className="text-[10px] font-black uppercase tracking-tighter">Orders</span>
          </Link>
          <Link 
            href="/wallet"
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors"
          >
            <Wallet size={22} />
            <span className="text-[10px] font-black uppercase tracking-tighter">Wallet</span>
          </Link>
          <Link 
            href="/profile"
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors"
          >
            <User size={22} />
            <span className="text-[10px] font-black uppercase tracking-tighter">Profile</span>
          </Link>
        </nav>

      </div>
    </div>
  );
}
