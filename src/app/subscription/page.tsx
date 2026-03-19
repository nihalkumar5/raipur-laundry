"use client";

import React from "react";
import { 
  ArrowLeft,
  Sparkles,
  Check,
  ChevronRight,
  Home,
  Package,
  Wallet,
  User,
  Zap,
  Shield,
  Clock
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function SubscriptionPage() {
  const router = useRouter();

  const plans = [
    { 
      name: 'Starter Plan', 
      price: 999, 
      kg: 15, 
      features: ['2 Pickups Per Week', 'Standard Wash & Fold', 'Free Delivery'],
      color: 'blue'
    },
    { 
      name: 'Family Pack', 
      price: 1799, 
      kg: 30, 
      features: ['3 Pickups Per Week', 'Wash & Steam Iron', 'Priority Service', 'Free Delivery'],
      color: 'green'
    }
  ];

  return (
    <div className="bg-[#F1F5F9] min-h-screen">
      <div className="app-shell pb-24">
        
        {/* Header */}
        <header className="px-6 pt-10 pb-4 bg-white sticky top-0 z-20 flex items-center gap-4 border-b border-slate-100">
          <button onClick={() => router.push('/profile')} className="p-2 bg-slate-50 rounded-full text-slate-400">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-black text-slate-800">DhobiGuru Plans</h1>
        </header>

        <div className="p-6 space-y-8 flex-1 overflow-y-auto">
          
          <div className="text-center space-y-2">
            <div className="bg-primary/10 text-primary w-fit mx-auto px-4 py-1 rounded-full flex items-center gap-2">
              <Sparkles size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest italic">Lifestyle Upgraded</span>
            </div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tighter">Choose Your Plan</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Wash more, pay less!</p>
          </div>

          <div className="space-y-6">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`bg-white rounded-[2.5rem] p-8 border-2 shadow-xl shadow-slate-900/5 transition-all active:scale-95 ${plan.color === 'blue' ? 'border-blue-100' : 'border-green-100'}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-black text-slate-800">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-black text-slate-800 tracking-tighter italic">₹{plan.price}</span>
                      <span className="text-xs font-bold text-slate-400 uppercase">/ Month</span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-3xl ${plan.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                    {plan.color === 'blue' ? <Package size={24} /> : <Zap size={24} />}
                  </div>
                </div>

                <div className={`bg-slate-50 p-4 rounded-2xl flex items-center gap-3 mb-6`}>
                   <div className={`${plan.color === 'blue' ? 'text-blue-600' : 'text-green-600'} flex-shrink-0`}>
                     <Shield size={20} />
                   </div>
                   <span className="text-sm font-black text-slate-800">{plan.kg} KG Clean Laundry</span>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="h-5 w-5 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                        <Check size={12} className="stroke-[3px]" />
                      </div>
                      <span className="text-xs font-bold text-slate-600 tracking-tight">{f}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-5 rounded-2xl font-black text-white text-lg shadow-lg ${plan.color === 'blue' ? 'bg-blue-600 shadow-blue-500/20' : 'bg-green-600 shadow-green-500/20'}`}>
                  Subscribe Now
                </button>
              </div>
            ))}
          </div>

          {/* Need per product? */}
          <div className="bg-slate-100 p-8 rounded-[2rem] text-center space-y-4">
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">Single Wash?</h4>
            <p className="text-[11px] text-slate-400 font-medium">No worries! You can book a one-time pick up anytime starting at just ₹70/kg.</p>
            <button className="text-xs font-black text-primary uppercase tracking-widest border-b-2 border-primary pb-1">
               See Pricing
            </button>
          </div>

        </div>

        {/* Navigation is Profile-centric */}
      </div>
    </div>
  );
}
