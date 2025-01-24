import ChineseNewYearBanner from "@/components/ChineseNewYearBanner";
import ProductsView from "@/components/ProductsView";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer"
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";


export const dynamic = "force-static";
export const revalidate = 60; // revalidate at every 60 seconds

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  // Get the latest 4 products based on creation date
  const latestProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
    )
    .slice(0, 4);

  // Get the 4 most popular products (assuming we have a views or sales field)
  // For now, we'll just show random products as an example
  const popularProducts = [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  console.log(
    crypto.randomUUID().slice(0, 5) +
      `>>> Rerendered the home page cache with ${products.length} 
    products and ${categories.length} categories`
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <ChineseNewYearBanner />
      <main className="container mx-auto px-6 py-12">
        {/* <h1 className="text-5xl font-bold text-center mb-16 tracking-tight">
          Welcome to BORAN
        </h1> */}

        {/* Featured Sections */}
        <div className="space-y-16 mb-20">
          {/* Latest Products */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight">
                Latest Arrivals
              </h2>
              <a
                href="/products?sort=latest"
                className="text-primary hover:underline font-medium"
              >
                View All
              </a>
            </div>
            <ProductGrid products={latestProducts} />
          </section>

          {/* Popular Products */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Popular Now</h2>
              <a
                href="/products?sort=popular"
                className="text-primary hover:underline font-medium"
              >
                View All
              </a>
            </div>
            <ProductGrid products={popularProducts} />
          </section>
        </div>

        {/* All Products with Categories */}
        <section>
          <h2 className="text-3xl font-bold mb-8 tracking-tight">
            All Products
          </h2>
          <ProductsView products={products} categories={categories} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
