"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"
import ProductThumb from "@/components/ProductThumb"
import useFavoriteStore from "@/store/favoriteStore"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FavoritesPage() {
  const { favorites } = useFavoriteStore()
  const { user, isLoaded } = useUser()

  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (isLoaded && !user) {
      window.location.href = "/"
    }
  }, [isLoaded, user])

  if (!isLoaded || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
            My Favorites
            <Heart className="h-8 w-8 text-primary" />
          </h1>
          <Button asChild variant="outline">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <Heart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-8">
              Start adding products to your favorites list!
            </p>
            <Button asChild size="lg">
              <Link href="/products">Explore Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {favorites.map((product) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductThumb product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  )
}