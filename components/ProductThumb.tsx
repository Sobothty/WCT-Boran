import { Product } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import { ShoppingCart } from 'lucide-react';

const ProductThumb = ({ product }: { product: Product }) => {
  const isOutStock = product.stock != null && product.stock <= 0;

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
        isOutStock ? "opacity-70" : ""
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        {product.image && (
          <Image
            className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
            src={
              product.image
                ? imageUrl(product.image).url()
                : "/placeholder-image.png"
            }
            alt={product.name || "Product Image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {isOutStock ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <span className="text-white font-bold text-xl px-4 py-2 bg-red-600 rounded-full">
              Out of Stock
            </span>
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="w-full bg-white text-black font-semibold py-2 px-4 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors duration-200">
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
          {product.name}
        </h2>

        <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">
          {product.description
            ?.map((block) =>
              block._type === "block"
                ? block.children?.map((child) => child.text).join("")
                : ""
            )
            .join(" ") || "No Description available"}
        </p>

        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-primary">
            ${product.price?.toFixed(2)}
          </p>
          {!isOutStock && (
            <span className="text-sm text-green-600 font-semibold">
              In Stock
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductThumb;

