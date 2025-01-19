import { Product, Category } from "@/sanity.types";
import React from "react";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/category-selector";

interface ProductViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView = ({ products, categories }: ProductViewProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Category sidebar */}
        <div className="w-full md:w-64 mb-6 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          <CategorySelectorComponent categories={categories} />
        </div>
        
        {/* Products */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Our Products</h1>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductsView;

