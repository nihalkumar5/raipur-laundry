import { create } from 'zustand';
import { Profile, Order } from './supabase';

interface AppState {
  user: any | null;
  profile: Profile | null;
  activeOrders: Order[];
  isLoading: boolean;
  setUser: (user: any) => void;
  setProfile: (profile: Profile | null) => void;
  setActiveOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  profile: null,
  activeOrders: [],
  isLoading: true,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setActiveOrders: (orders) => set({ activeOrders: orders }),
  addOrder: (order) => set((state) => ({ activeOrders: [order, ...state.activeOrders] })),
  setLoading: (loading) => set({ isLoading: loading }),
}));
