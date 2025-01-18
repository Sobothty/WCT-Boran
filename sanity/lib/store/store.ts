import { Product } from "@/sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BasketItem {
  product: Product;
  quantity: number;
}

interface BasketState {
  item: BasketItem[];
  addItem: (product: Product) => void;
  removeItem: (product: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (prodcutId: string) => number;
  getGroupedItem: () => BasketItem[];
}

const useBasketStore = create<BasketState>()(
  persist((set, get) => ({
    item: [],
    addItem: (product) =>
      set((state) => {
        const existingItem = state.item.find(
          (item) => item.product._id === product._id
        );
        if (existingItem) {
          return {
            item: state.item.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        } else {
          return {
            item: [...state.item, { product, quantity: 1 }],
          };
        }
      }),
    removeItem: (productId) =>
      set((state) => ({
        items: state.items.reduce((acc, item) => {
          if (item.prodcutId > 1) {
            if (item.quantity > 1) {
              acc.push({ ...item, quantity: item.quantity - 1 });
            }
          }
        }),
      })),
  }))
);
