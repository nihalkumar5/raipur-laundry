"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  ShoppingBag, 
  CreditCard, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Search,
  Loader2,
  CheckCircle2,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllOrders, updateOrder, getAdminStats } from "@/lib/supabase";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState({ totalRevenue: 0, totalUsers: 0, pendingOrders: 0 });
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false });

  const triggerToast = (msg: string) => {
    setToast({ message: msg, show: true });
    setTimeout(() => setToast({ message: '', show: false }), 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersData, sData] = await Promise.all([
          getAllOrders(),
          getAdminStats()
        ]);
        setOrders(ordersData);
        setStatsData(sData);
      } catch (err) {
        console.error("Admin fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrder(orderId, { status: newStatus as any });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      // Refresh stats
      const sData = await getAdminStats();
      setStatsData(sData);
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const stats = [
    { label: "Total Revenue", value: `₹${statsData.totalRevenue.toLocaleString()}`, change: "Live", positive: true, icon: CreditCard },
    { label: "Total Users", value: statsData.totalUsers.toString(), change: "Live", positive: true, icon: Users },
    { label: "Pending Orders", value: statsData.pendingOrders.toString(), change: "Live", positive: true, icon: ShoppingBag },
    { label: "System Health", value: "Optimal", change: "100%", positive: true, icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Admin Insights</h1>
            <p className="text-slate-500">Managing SmartWash operations.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search orders, users..." 
                className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:bg-slate-900 dark:border-slate-800"
              />
            </div>
            <button 
              onClick={() => triggerToast("Admin Settings & Filters coming soon!")}
              className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center dark:bg-slate-900 dark:border-slate-800 hover:bg-slate-50 transition-all active:scale-90"
            >
              <MoreVertical size={20} />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  <stat.icon size={20} />
                </div>
                <div className={`flex items-center text-xs font-bold ${stat.positive ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.change}
                  {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                </div>
              </div>
              <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-800">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="font-bold">Live Order Management</h2>
            <button 
              onClick={() => triggerToast("Manage All feature coming soon! Showing active orders.")}
              className="text-sm text-primary font-bold hover:underline"
            >
              Manage All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-widest dark:bg-slate-800/50">
                  <th className="px-6 py-4 font-bold">Order ID</th>
                  <th className="px-6 py-4 font-bold">Customer</th>
                  <th className="px-6 py-4 font-bold">Type</th>
                  <th className="px-6 py-4 font-bold">Est. Weight</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <Loader2 className="mx-auto animate-spin text-slate-300" size={32} />
                    </td>
                  </tr>
                ) : orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4 font-medium text-xs text-slate-400">...{order.id.slice(-6)}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-sm">{order.profiles?.full_name || 'Guest'}</div>
                      <div className="text-[10px] text-slate-400">{order.profiles?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400`}>
                        {order.service}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{order.weight_kg || '-'} kg</td>
                    <td className="px-6 py-4">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        className="text-sm bg-white border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/10"
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="driver_assigned">Driver Assigned</option>
                        <option value="picked_up">Picked Up</option>
                        <option value="weighed">Weighed</option>
                        <option value="washing">Washing</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-primary cursor-pointer hover:underline">
                      {order.status === 'delivered' ? <CheckCircle2 className="text-emerald-500" size={18} /> : 'Manage'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Premium Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center text-white">
              <Zap size={14} />
            </div>
            <span className="text-sm font-bold tracking-tight">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
