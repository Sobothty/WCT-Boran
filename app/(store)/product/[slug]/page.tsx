import AddToBasketButton from "@/components/AddToBasketButton"
import { imageUrl } from "@/lib/imageUrl"
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug"
import { PortableText } from "next-sanity"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Package } from "lucide-react"

export const dynamic = "force-static"
export const revalidate = 60

async function ProductPage({
  params,
}: {
  params: Promise<{
    slug: string
  }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  console.log(crypto.randomUUID().slice(0, 5) + `>>> Rerendered the product page cache for ${slug}`)

  if (!product) {
    return notFound()
  }

  const isOutOfStock = product.stock != null && product.stock <= 0

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div
            className={`relative aspect-square overflow-hidden rounded-xl shadow-lg ${
              isOutOfStock ? "opacity-50" : ""
            }`}
          >
            {product.image && (
              <Image
                src={imageUrl(product.image).url() || "/placeholder.svg"}
                alt={product.name ?? "Product image"}
                fill
                className="object-contain transition-transform duration-300 hover:scale-105"
              />
            )}
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Badge variant="destructive" className="text-lg py-2 px-4">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <div className="text-2xl font-semibold text-primary">${product.price?.toFixed(2)}</div>
            </div>

            <Separator />

            <div className="prose max-w-none">
              {Array.isArray(product.description) && <PortableText value={product.description} />}
            </div>

            <Separator />

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{isOutOfStock ? "Out of Stock" : "In Stock"}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <AddToBasketButton product={product} disabled={isOutOfStock} className="w-full">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Basket
            </AddToBasketButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage

