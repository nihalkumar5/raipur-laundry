"use client";

import React, { useEffect, useState } from "react";
import { 
  Package, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Home, 
  User,
  Wallet,
  ArrowLeft,
  Phone,
  CheckCircle2,
  Search
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { getActiveOrders } from "@/lib/supabase";

export default function OrdersPage() {
  const { user, activeOrders, setActiveOrders } = useAppStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getActiveOrders(user.id);
        setActiveOrders(data as any);
      } catch (err) {
        console.error("Orders fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, router, setActiveOrders]);

  return (
    <div className="bg-[#F1F5F9] min-h-screen">
      <div className="app-shell pb-24">
        
        {/* Header */}
        <header className="px-6 pt-10 pb-4 bg-white sticky top-0 z-20 flex items-center gap-4 border-b border-slate-100">
          <button onClick={() => router.push('/dashboard')} className="p-2 bg-slate-50 rounded-full text-slate-400">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-black text-slate-800">My Orders</h1>
        </header>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          
          {/* Active Order / Live Tracking */}
          {activeOrders.length > 0 ? (
            <div className="space-y-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Live Tracking</h3>
              {activeOrders.map((order, idx) => (
                <div key={order.id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">Order #{order.id.slice(-6).toUpperCase()}</span>
                      <h4 className="font-black text-slate-800 text-lg">{order.service}</h4>
                    </div>
                    <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                      {order.status.replace('_', ' ')}
                    </div>
                  </div>

                  {/* High-level Timeline */}
                  <div className="relative pt-2 pb-2">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100" />
                    <div className="space-y-8">
                      <div className="flex gap-4 relative">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white z-10">
                          <CheckCircle2 size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800">Order Placed</p>
                          <p className="text-[10px] text-slate-400 font-medium">We've received your ritual.</p>
                        </div>
                      </div>
                      <div className="flex gap-4 relative">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center z-10 ${order.status === 'scheduled' ? 'bg-white border-2 border-primary text-primary animate-pulse' : 'bg-primary text-white'}`}>
                          {order.status === 'scheduled' ? <Clock size={16} /> : <CheckCircle2 size={16} />}
                        </div>
                        <div>
                          <p className={`text-sm font-black ${order.status === 'scheduled' ? 'text-primary' : 'text-slate-800'}`}>Pickup Scheduled</p>
                          <p className="text-[10px] text-slate-400 font-medium">{new Date(order.pickup_time).toLocaleDateString()} morning</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rider Contact (Mocked) */}
                  <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white border border-slate-200 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi" alt="Driver" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-800">Ravi (DhobiGuru Rider)</p>
                        <p className="text-[10px] text-slate-400 font-medium italic">Assigning soon...</p>
                      </div>
                    </div>
                    <button className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                      <Phone size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
               <div className="h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mx-auto">
                <Search size={40} />
              </div>
              <h3 className="font-black text-slate-800 text-lg">No active orders</h3>
              <p className="text-sm text-slate-400 max-w-[200px] mx-auto leading-relaxed">Book a pickup to start your first ritual today!</p>
              <button 
                onClick={() => router.push('/dashboard')}
                className="text-primary font-black uppercase tracking-widest text-xs border-b-2 border-primary pb-1"
              >
                Go to Home
              </button>
            </div>
          )}

          {/* Past Orders (Mocked) */}
          <section className="space-y-4 pt-4">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Past Rituals</h3>
             {[1, 2].map((i) => (
                <div key={i} className="bg-white p-5 rounded-[1.5rem] border border-slate-100 flex items-center justify-between opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-50 h-12 w-12 rounded-xl flex items-center justify-center text-slate-400">
                      <Package size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Wash & Fold</h4>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter italic">Delivered • 12 Mar</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300" />
                </div>
             ))}
          </section>

        </div>

        {/* Bottom Nav */}
        <nav className="bottom-nav">
          <button onClick={() => router.push('/dashboard')} className="flex flex-col items-center gap-1 text-slate-400">
            <Home size={22} />
            <span className="text-[10px] font-black uppercase tracking-tighter">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-primary">
            <Package size={22} className="stroke-[2.5px]" />
            <span className="text-[10px] font-black uppercase tracking-tighter">Orders</span>
          </button>
          <button onClick={() => router.push('/wallet')} className="flex flex-col items-center gap-1 text-slate-400">
            <Wallet size={22} />
            <span className="text-[10px] font-black uppercase tracking-tighter">Wallet</span>
          </button>
          <button onClick={() => router.push('/profile')} className="flex flex-col items-center gap-1 text-slate-400">
            <User size={22} />
            <span className="text-[10px] font-black uppercase tracking-tighter">Profile</span>
          </button>
        </nav>

      </div>
    </div>
  );
}
