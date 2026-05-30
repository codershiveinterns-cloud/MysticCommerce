import CatalogFilters from "@/components/storefront/CatalogFilters";
import ProductCard from "@/components/storefront/ProductCard";
import {
  filterProducts,
  getStoreCategories,
} from "@/lib/store-data";

export const metadata = {
  title: "MysticCommerce Catalog | Premium Tech Picks",
  description: "Browse premium electronics, smart gadgets, creator tools, gaming accessories, and lifestyle tech in the MysticCommerce catalog.",
};

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const categories = getStoreCategories();
  const products = filterProducts({
    category: params.category,
    collection: params.collection,
    query: params.q,
    sort: params.sort,
  });

  return (
    <div className="min-h-screen px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-[34px] border border-white/8 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-8 sm:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">Catalog</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Browse MysticCommerce products.</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
            Explore premium electronics, creator tools, gaming accessories, smart gadgets, and everyday tech essentials curated for modern setups.
          </p>
        </div>

        <CatalogFilters categories={categories} />

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-zinc-400">Showing <span className="font-semibold text-white">{products.length}</span> products</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 3} />
          ))}
        </div>
      </div>
    </div>
  );
}
