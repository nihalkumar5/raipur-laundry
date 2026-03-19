"use client";

import React from "react";
import { 
  Users, 
  ShoppingBag, 
  CreditCard, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Search
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Revenue", value: "₹45,200", change: "+12.5%", positive: true, icon: CreditCard },
    { label: "Active Subs", value: "124", change: "+4.2%", positive: true, icon: Users },
    { label: "Pending Orders", value: "12", change: "-2", positive: false, icon: ShoppingBag },
    { label: "Avg. Turnaround", value: "22h", change: "-1.5h", positive: true, icon: Clock },
  ];

  const recentOrders = [
    { id: "#ORD-2045", customer: "Amara Singh", type: "Subscription", weight: "4.5kg", status: "Picked Up", price: "-" },
    { id: "#ORD-2044", customer: "Rahul Mehta", type: "One-time", weight: "2.0kg", status: "Washing", price: "₹140" },
    { id: "#ORD-2043", customer: "Sneha Kapur", type: "Subscription", weight: "6.1kg", status: "Scheduled", price: "-" },
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
            <button className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center dark:bg-slate-900 dark:border-slate-800">
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
            <button className="text-sm text-primary font-bold">Manage All</button>
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
                {recentOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4 font-medium text-sm">{order.id}</td>
                    <td className="px-6 py-4 font-semibold text-sm">{order.customer}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${order.type === 'Subscription' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                        {order.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{order.weight}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                        <span className="text-sm">{order.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-primary cursor-pointer hover:underline">Edit</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
