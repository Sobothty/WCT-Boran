"use client"

import { Product } from "@/sanity.types";
import { motion, AnimatePresence } from "framer-motion";
import ProductThumb from "./ProductThumb";

const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {products?.map((product) => (
          <motion.div
            key={product._id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-sm">
              <ProductThumb product={product} />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProductGrid;

