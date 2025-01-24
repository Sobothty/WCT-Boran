import { Product } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import { ShoppingCart, Heart } from 'lucide-react';
import useFavoriteStore from "@/store/favoriteStore";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const ProductThumb = ({ product }: { product: Product }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoriteStore();
  const isOutStock = product.stock != null && product.stock <= 0;
  const favorite = isFavorite(product._id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(product._id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full ${
        isOutStock ? "opacity-70" : ""
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        {product.image && (
          <Image
            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
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

        <Button
          variant="outline"
          size="icon"
          className={cn(
            "absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm",
            favorite && "text-red-500 hover:text-red-600"
          )}
          onClick={toggleFavorite}
        >
          <Heart className={cn("h-5 w-5", favorite && "fill-current")} />
        </Button>

        {isOutStock ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <span className="text-white font-bold text-xl px-6 py-3 bg-red-600 rounded-full shadow-lg">
              Out of Stock
            </span>
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="w-full bg-white text-black font-semibold py-3 px-6 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-100 duration-200 shadow-lg transform group-hover:translate-y-0 translate-y-2 transition-transform">
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1 tracking-tight">
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

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <p className="text-2xl font-bold text-primary tracking-tight">
            ${product.price?.toFixed(2)}
          </p>
          {!isOutStock && (
            <span className="text-sm text-green-600 font-semibold px-3 py-1 bg-green-50 rounded-full">
              In Stock
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductThumb;