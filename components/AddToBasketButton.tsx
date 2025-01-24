"use client"

import type { Product } from "@/sanity.types"
import useBasketStore from "@/store/store"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Minus, Plus, Trash2 } from "lucide-react"

interface AddToBasketButtonProps {
  product: Product
  disabled?: boolean
  className?: string
  children?: React.ReactNode
  variant?: "default" | "minimal"
}

function AddToBasketButton({ 
  product, 
  disabled, 
  className, 
  children,
  variant = "default" 
}: AddToBasketButtonProps) {
  const { addItem, removeItem, removeFromBasket, getItemCount } = useBasketStore()
  const itemCount = getItemCount(product._id)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  if (variant === "minimal") {
    return (
      <div className="flex items-center gap-3">
        <Button
          onClick={() => removeItem(product._id)}
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          disabled={disabled || itemCount === 0}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center font-medium">{itemCount}</span>
        <Button
          onClick={() => addItem(product)}
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          disabled={disabled}
        >
          <Plus className="h-3 w-3" />
        </Button>
        {itemCount > 0 && (
          <Button
            onClick={() => removeFromBasket(product)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      {itemCount === 0 ? (
        <Button
          onClick={() => addItem(product)}
          disabled={disabled}
          className={cn("w-full", className)}
        >
          {children || "Add to Basket"}
        </Button>
      ) : (
        <>
          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={() => removeItem(product._id)}
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-medium text-lg">{itemCount}</span>
            <Button
              onClick={() => addItem(product)}
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            onClick={() => removeFromBasket(product)}
            variant="destructive"
            className={cn("w-full", className)}
          >
            Remove from Basket
          </Button>
        </>
      )}
    </div>
  )
}

export default AddToBasketButton