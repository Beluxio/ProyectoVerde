"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Plant } from "./types";

interface CartStore {
  items: CartItem[];
  addItem: (plant: CartItem["plant"], quantity?: number) => void;
  removeItem: (plantId: string) => void;
  updateQuantity: (plantId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (plant, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.plant.id === plant.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.plant.id === plant.id
                  ? { ...i, quantity: Math.min(i.quantity + quantity, plant.stock) }
                  : i
              ),
            };
          }
          return { items: [...state.items, { plant, quantity }] };
        });
      },

      removeItem: (plantId) => {
        set((state) => ({
          items: state.items.filter((i) => i.plant.id !== plantId),
        }));
      },

      updateQuantity: (plantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(plantId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.plant.id === plantId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce(
          (sum, item) => sum + item.plant.price * item.quantity,
          0
        ),

      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: "proyectoverde-cart" }
  )
);
