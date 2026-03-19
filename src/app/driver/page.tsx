"use client";

import React, { useState, useEffect } from 'react';
import { supabase, getAllOrders, updateOrder } from '@/lib/supabase';
import { Package, MapPin, CheckCircle2, Navigation, Loader2, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DriverDashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllOrders();
        // Drivers only care about active logistics
        const activeTasks = data.filter(o => 
          ['scheduled', 'driver_assigned', 'picked_up', 'out_for_delivery'].includes(o.status)
        );
        setTasks(activeTasks);
      } catch (err) {
        console.error("Driver fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleUpdateStatus = async (orderId: string, currentStatus: string) => {
    let nextStatus = '';
    if (currentStatus === 'scheduled' || currentStatus === 'driver_assigned') nextStatus = 'picked_up';
    else if (currentStatus === 'washing') nextStatus = 'out_for_delivery';
    else if (currentStatus === 'out_for_delivery') nextStatus = 'delivered';

    if (!nextStatus) return;

    try {
      await updateOrder(orderId, { status: nextStatus as any });
      setTasks(tasks.map(t => t.id === orderId ? { ...t, status: nextStatus } : t));
    } catch (err) {
      console.error("Task update error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] font-sans pb-24">
      <header className="bg-[#0F172A] text-white p-6 pt-12 rounded-b-[2rem] shadow-lg">
        <h1 className="text-2xl font-serif font-black">Driver Portal</h1>
        <p className="text-[#8BA88E] text-xs font-bold tracking-widest uppercase mt-1">Live Dispatch System</p>
      </header>

      <main className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-[#0F172A]">Active Tasks</h2>
          <span className="bg-white px-3 py-1 rounded-full text-[10px] font-black shadow-sm">{tasks.length} Pending</span>
        </div>

        {loading ? (
          <div className="flex justify-center p-20">
            <Loader2 className="animate-spin text-[#0F172A]" size={32} />
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl text-center shadow-sm border border-slate-100">
            <CheckCircle2 className="mx-auto text-[#8BA88E] mb-4" size={48} />
            <p className="font-bold text-[#0F172A]">No tasks assigned.</p>
            <p className="text-xs text-slate-400 mt-2">Enjoy your break!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <motion.div 
                layout
                key={task.id}
                className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black text-[#8BA88E] uppercase tracking-widest mb-1 block">
                      {task.status.replace('_', ' ')}
                    </span>
                    <h3 className="font-black text-[#0F172A]">{task.profiles?.full_name || 'Guest Member'}</h3>
                  </div>
                  <div className="h-10 w-10 bg-slate-50 rounded-full flex items-center justify-center text-[#0F172A]">
                    <Package size={20} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-3 items-center text-sm">
                    <MapPin className="text-slate-400" size={16} />
                    <p className="font-medium text-slate-600 line-clamp-1">Raipur City Center, Sector 4</p>
                  </div>
                  <div className="flex gap-3 items-center text-sm text-[#8BA88E]">
                    <Phone size={16} />
                    <p className="font-bold">Contact Member</p>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button className="flex-1 bg-slate-100 text-[#0F172A] py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2">
                    <Navigation size={14} />
                    Navigate
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(task.id, task.status)}
                    className="flex-[2] bg-[#0F172A] text-white py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
                  >
                    Mark Complete
                    <CheckCircle2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 py-6 px-10 flex justify-between items-center z-50">
         <div className="flex flex-col items-center gap-1 opacity-100">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0F172A] mb-1" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Tasks</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-30">
          <span className="text-[10px] font-black uppercase tracking-tighter">Wallet</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-30">
          <span className="text-[10px] font-black uppercase tracking-tighter">Profile</span>
        </div>
      </nav>
    </div>
  );
}
