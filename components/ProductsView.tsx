import type { Product, Category } from "@/sanity.types"
import React from "react"
import ProductGrid from "./ProductGrid"
import { CategorySelectorComponent } from "./ui/category-selector"

interface ProductViewProps {
  products: Product[]
  categories: Category[]
}

const ProductsView = ({ products, categories }: ProductViewProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Category sidebar */}
      <aside className="w-full lg:w-72 mb-6 lg:mb-0">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 sticky top-24">
          <h2 className="text-2xl font-semibold mb-6 tracking-tight">Categories</h2>
          <CategorySelectorComponent categories={categories} />
        </div>
      </aside>

      {/* Products */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-8 tracking-tight">Our Products</h2>
        <ProductGrid products={products} />
      </div>
    </div>
  )
}

export default ProductsView