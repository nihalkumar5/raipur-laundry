"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, Plus, Package, ShieldCheck, Heart, Star, Shield, Zap } from "lucide-react";
import LoginModal from "@/components/LoginModal";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user } = useAppStore();
  const router = useRouter();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="bg-[#F7F5F2] selection:bg-primary selection:text-white min-h-screen">
      <div className="app-shell bg-[#F7F5F2] shadow-none md:shadow-2xl overflow-hidden flex flex-col border-x border-slate-200/20">
        
        {/* Editorial Header */}
        <nav className="px-8 py-8 flex items-center justify-between sticky top-0 bg-[#F7F5F2]/90 backdrop-blur-md z-30">
          <div className="flex items-center gap-2">
            <span className="text-xl font-serif font-black tracking-tight text-[#0F172A]">SmartWash</span>
          </div>
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="text-xs font-bold text-[#0F172A] px-5 py-2.5 rounded-full border border-slate-200 active:scale-95 transition-all"
          >
            Login
          </button>
        </nav>

        <main className="flex-1 overflow-y-auto hide-scrollbar pb-32">
          
          {/* High-Authority Hero */}
          <section className="px-8 pt-6 pb-16">
            <h1 className="text-[54px] font-serif font-black tracking-tighter leading-[0.85] text-[#0F172A] mb-8">
              Laundry, <br />
              <span className="italic text-[#8BA88E]">handled.</span>
            </h1>
            <p className="text-slate-500 font-medium text-base max-w-[280px] mb-10 leading-snug">
              Effortless fabric care for people who value their time.
            </p>

            {/* Trust Trifecta */}
            <div className="flex items-center gap-6 mb-12 opacity-80">
                <div className="flex items-center gap-1.5 backdrop-blur-sm">
                    <Star size={14} className="text-[#C5A059] fill-[#C5A059]" />
                    <span className="text-[10px] font-black tracking-widest text-[#0F172A]">4.9 RATING</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Shield size={14} className="text-[#8BA88E]" />
                    <span className="text-[10px] font-black tracking-widest text-[#0F172A]">INSURED CARE</span>
                </div>
            </div>
            
            {/* Lifestyle Hero Image */}
            <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl shadow-slate-900/10">
              <Image 
                src="/images/smartwash_3d_student_hero.png" 
                alt="3D Student Hero" 
                fill 
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-4">
                <button 
                  onClick={() => setIsLoginOpen(true)}
                  className="w-full bg-[#0F172A] text-white py-6 rounded-3xl font-black text-lg active:scale-[0.98] transition-all shadow-xl shadow-slate-900/10"
                >
                Schedule Pickup
                </button>
                <p className="text-center text-[10px] font-bold text-slate-400 tracking-wide">
                    No commitment. Cancel anytime.
                </p>
            </div>
          </section>

          {/* Process Section - Z-Pattern / Story Flow */}
          <section className="px-8 space-y-24 mb-24">
            
            {/* Step 1 */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-serif italic text-[#8BA88E] font-bold">01</span>
                <h2 className="text-2xl font-serif font-extrabold text-[#0F172A]">Schedule in seconds</h2>
              </div>
              <div className="relative h-64 rounded-[2rem] overflow-hidden shadow-lg">
                <Image src="/images/smartwash_3d_student_pickup.png" alt="Pickup" fill className="object-cover" />
              </div>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Choose a window that suits your lifestyle. Our concierge handles the rest from your doorstep.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-serif italic text-[#8BA88E] font-bold">02</span>
                <h2 className="text-2xl font-serif font-extrabold text-[#0F172A]">Expert fabric care</h2>
              </div>
              <div className="relative h-64 rounded-[2rem] overflow-hidden shadow-lg">
                <Image src="/images/smartwash_3d_cleaning.png" alt="Care" fill className="object-cover" />
              </div>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Every thread is treated with chemical-free minerals, preserving life and vibrancy.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-serif italic text-[#8BA88E] font-bold">03</span>
                <h2 className="text-2xl font-serif font-extrabold text-[#0F172A]">Returned perfected</h2>
              </div>
              <div className="relative h-64 rounded-[2rem] overflow-hidden shadow-lg border border-slate-100">
                <Image src="/images/smartwash_3d_delivery_v2.png" alt="Delivery" fill className="object-cover" />
              </div>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Packaged beautifully and delivered within 24–48 hours. Laundry, finally effortless.
              </p>
            </div>

          </section>

          {/* Pricing Section */}
          <section className="px-8 pb-20">
            <div className="membership-card !bg-[#0F172A] p-10 !text-white relative overflow-hidden shadow-2xl shadow-slate-900/40">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Heart size={120} fill="white" />
              </div>
              <div className="flex items-center gap-2 mb-10 relative z-10">
                <div className="h-2 w-2 rounded-full bg-[#8BA88E] animate-pulse" />
                <span className="text-[10px] font-black tracking-widest uppercase text-[#8BA88E]">The Elite Membership</span>
              </div>
              <h3 className="text-3xl font-serif font-black mb-1 relative z-10 !text-white">Elevate your routine.</h3>
              <div className="flex items-baseline gap-2 mb-12 relative z-10">
                <span className="text-6xl font-black tracking-tighter !text-white">₹999</span>
                <span className="text-slate-400 font-bold text-lg">/mo</span>
              </div>
              
              <ul className="space-y-6 mb-12 relative z-10">
                <li className="flex items-center gap-4 text-xs font-bold text-white/90 uppercase tracking-widest">
                  <div className="h-5 w-5 rounded-full border border-white/20 flex items-center justify-center text-[#8BA88E] text-[10px]">✓</div>
                  20kg Monthly Limit
                </li>
                <li className="flex items-center gap-4 text-xs font-bold text-white/90 uppercase tracking-widest">
                  <div className="h-5 w-5 rounded-full border border-white/20 flex items-center justify-center text-[#8BA88E] text-[10px]">✓</div>
                  8 doorstep sessions
                </li>
              </ul>
              
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="w-full bg-[#F7F5F2] text-[#0F172A] py-6 rounded-2xl font-black text-lg active:scale-95 transition-all shadow-lg relative z-10"
              >
                Book Your First Pickup
              </button>
            </div>
          </section>

          <LoginModal 
            isOpen={isLoginOpen} 
            onClose={() => setIsLoginOpen(false)} 
          />

          <footer className="px-8 py-20 text-center opacity-40">
            <p className="text-[10px] font-black tracking-[0.5em] uppercase text-[#0F172A] mb-3">SmartWash Protocol</p>
            <p className="text-xs font-serif italic text-slate-500">Excellence in every thread.</p>
          </footer>
        </main>

        <div className="bottom-nav border-t border-slate-200/50 bg-[#F7F5F2]/80">
            <div className="h-1.5 w-32 bg-slate-300 rounded-full mb-[-40px]" />
        </div>

      </div>
    </div>
  );
}
