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


