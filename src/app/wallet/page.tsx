"use client";

import React from "react";
import { 
  ArrowLeft,
  Wallet,
  Plus,
  History,
  TrendingUp,
  CreditCard,
  ChevronRight,
  Home,
  Package,
  User,
  Zap
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function WalletPage() {
  const { profile } = useAppStore();
  const router = useRouter();

  const amounts = [500, 1000, 2000, 5000];

  return (
    <div className="bg-[#F1F5F9] min-h-screen">
      <div className="app-shell pb-24">
        
        {/* Header */}
        <header className="px-6 pt-10 pb-4 bg-white sticky top-0 z-20 flex items-center gap-4 border-b border-slate-100">
          <button onClick={() => router.push('/profile')} className="p-2 bg-slate-50 rounded-full text-slate-400">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-black text-slate-800">My Wallet</h1>
        </header>

        <div className="p-6 space-y-8 flex-1 overflow-y-auto">
          
          {/* Balance Card */}
          <section className="animate-fade-in">
            <div className="bg-slate-800 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Wallet size={20} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Balance</span>
                </div>
                <h2 className="text-5xl font-black italic tracking-tighter">₹0.00</h2>
                <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full border border-white/10">
                  <TrendingUp size={12} className="text-green-400" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">No overage charges</span>
                </div>
              </div>
            </div>
          </section>

          {/* Recharge Section */}
          <section className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Quick Recharge</h3>
            <div className="grid grid-cols-2 gap-3">
              {amounts.map(amt => (
                <button 
                  key={amt}
                  className="bg-white p-5 rounded-2xl border-2 border-slate-50 text-center space-y-1 hover:border-primary transition-all active:scale-95"
                >
                  <span className="text-lg font-black text-slate-800">₹{amt}</span>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Top Up</p>
                </button>
              ))}
            </div>
            <button className="big-btn mt-2">
              <Plus size={20} />
              Recharge Wallet
            </button>
          </section>

          {/* Transactions */}
          <section className="space-y-4 pt-2">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Recent Activity</h3>
              <button className="text-[10px] font-black text-primary uppercase tracking-widest">View All</button>
            </div>
            
            <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden">
               <div className="p-5 flex items-center justify-between border-b border-slate-50 opacity-40">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-50 text-slate-400 h-10 w-10 rounded-xl flex items-center justify-center">
                    <History size={20} />
                  </div>
                  <div>
                    <span className="text-sm font-black text-slate-800 block">System Reset</span>
                    <span className="text-[10px] text-slate-400 font-medium">19 Mar 2026</span>
                  </div>
                </div>
                <span className="text-xs font-black text-slate-400">₹0</span>
              </div>
              <div className="p-10 text-center space-y-2">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Your transactions will appear here</p>
              </div>
            </div>
          </section>

        </div>

        {/* Bottom Nav */}
        <nav className="bottom-nav">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 text-slate-400">
            <Home size={22} />
            <span className="text-[10px] font-black uppercase tracking-tighter">Home</span>
          </Link>
          <Link href="/orders" className="flex flex-col items-center gap-1 text-slate-400">
            <Package size={22} />
            <span className="text-[10px] font-black uppercase tracking-tighter">Orders</span>
          </Link>
          <Link href="/wallet" className="flex flex-col items-center gap-1 text-primary">
            <Wallet size={22} className="stroke-[2.5px]" />
            <span className="text-[10px] font-black uppercase tracking-tighter italic">Wallet</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-slate-400">
            <User size={22} />
            <span className="text-[10px] font-black uppercase tracking-tighter">Profile</span>
          </Link>
        </nav>

      </div>
    </div>
  );
}
