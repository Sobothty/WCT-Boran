"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Product } from "@/sanity.types"

interface FavoriteStore {
  favorites: Product[]
  addToFavorites: (product: Product) => void
  removeFromFavorites: (productId: string) => void
  isFavorite: (productId: string) => boolean
}

const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addToFavorites: (product) => {
        const { favorites } = get()
        if (!favorites.find((p) => p._id === product._id)) {
          set({ favorites: [...favorites, product] })
        }
      },
      removeFromFavorites: (productId) => {
        const { favorites } = get()
        set({ favorites: favorites.filter((p) => p._id !== productId) })
      },
      isFavorite: (productId) => {
        const { favorites } = get()
        return favorites.some((p) => p._id === productId)
      },
    }),
    {
      name: "favorites-storage",
    }
  )
)

export default useFavoriteStore