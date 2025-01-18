import { Product } from "@/sanity.types";
import { Category } from "@/sanity.types";
import React from "react";
import ProductGrid from "./ProductGrid";

interface ProductViewProps {
  products: Product[];
  categories : Category[];
}

const ProductsView = ({ products, categories }: ProductViewProps) => {
  return (
    <div className="flex flex-col ">
      {/* category */}
      <div  className="w-full sm:w-[200]">
        {/* <CategorySelectorComponent categories={categories} /> */}
      </div>
      {/* product */}
      <div>
        <div><ProductGrid products={products} />
          <hr className="w-1/2 sm:w-3/4"/>
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
