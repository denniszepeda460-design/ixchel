import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  lastUpdated: number | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number, color?: string) => void;
  removeItem: (productId: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string) => void;
  clearCart: () => void;
  checkExpiration: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

const FORTY_EIGHT_HOURS_MS = 48 * 60 * 60 * 1000;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      lastUpdated: null,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      checkExpiration: () => {
        const { lastUpdated, items } = get();
        if (items.length > 0 && lastUpdated) {
          if (Date.now() - lastUpdated >= FORTY_EIGHT_HOURS_MS) {
            set({ items: [], lastUpdated: null });
          }
        }
      },

      addItem: (product, quantity = 1, color) => {
        // Al agregar al carrito NO se abre el panel lateral automáticamente
        const now = Date.now();
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.id === product.id && i.selectedColor === color
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id && i.selectedColor === color
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
              lastUpdated: now,
            };
          }
          return {
            items: [...state.items, { product, quantity, selectedColor: color }],
            lastUpdated: now,
          };
        });
      },

      removeItem: (productId, color) => {
        set((state) => {
          const remaining = state.items.filter(
            (i) => !(i.product.id === productId && i.selectedColor === color)
          );
          return {
            items: remaining,
            lastUpdated: remaining.length > 0 ? Date.now() : null,
          };
        });
      },

      updateQuantity: (productId, quantity, color) => {
        if (quantity <= 0) {
          get().removeItem(productId, color);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId && i.selectedColor === color
              ? { ...i, quantity }
              : i
          ),
          lastUpdated: Date.now(),
        }));
      },

      clearCart: () => set({ items: [], lastUpdated: null }),

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "ixchel-cart-v1",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : ({} as any)
      ),
      partialize: (state) => ({
        items: state.items,
        lastUpdated: state.lastUpdated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.checkExpiration();
        }
      },
    }
  )
);
