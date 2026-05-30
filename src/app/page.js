import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/storefront/ProductCard";
import CategoryGrid from "@/components/storefront/CategoryGrid";
import NewsletterPanel from "@/components/storefront/NewsletterPanel";
import StoreSection from "@/components/storefront/StoreSection";
import StorefrontHero from "@/components/storefront/StorefrontHero";
import {
  brandPartners,
  collectionHighlights,
  customerStories,
  getBestSellers,
  getFlashDeals,
  getGamingWorkspaceProducts,
  getNewArrivals,
  getStoreCategories,
  getTrendingProducts,
} from "@/lib/store-data";

export default function Home() {
  const trendingProducts = getTrendingProducts(4);
  const bestSellers = getBestSellers();
  const flashDeals = getFlashDeals();
  const newArrivals = getNewArrivals();
  const gamingWorkspace = getGamingWorkspaceProducts();
  const categories = getStoreCategories();

  return (
    <div className="relative overflow-hidden pb-10">
      <div className="absolute left-[-10%] top-16 h-72 w-72 rounded-full bg-cyan-400/10 blur-[120px]" />
      <div className="absolute right-[-10%] top-56 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[120px]" />

      <StorefrontHero />

      <StoreSection
        id="collections"
        eyebrow="Curated collections"
        title="Trending collections built for modern setups"
        description="Shop curated groupings that blend gaming performance, creator workflows, and premium lifestyle tech into one responsive storefront experience."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {collectionHighlights.map((collection) => (
            <Link
              key={collection.title}
              href={collection.href}
              className="group rounded-[30px] border border-white/8 bg-white/[0.03] p-7 transition hover:border-white/16 hover:bg-white/[0.05]"
            >
              <div className="space-y-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">MysticCommerce pick</p>
                <h3 className="text-2xl font-semibold text-white">{collection.title}</h3>
                <p className="text-sm leading-7 text-zinc-400">{collection.description}</p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-200 transition group-hover:gap-3 group-hover:text-white">
                  Explore collection
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </StoreSection>

      <StoreSection
        eyebrow="Best sellers"
        title="Featured products customers keep coming back for"
        description="A premium mix of bestselling audio, creator tools, gaming gear, and everyday accessories selected for modern shoppers who expect performance and polish."
        actions={<SectionLink href="/products">Browse catalog</SectionLink>}
      >
        <ProductGrid products={bestSellers} />
      </StoreSection>

      <StoreSection
        eyebrow="Flash deals"
        title="Short-window offers on fast-moving gear"
        description="Highlighting mobile accessories, gaming essentials, and smart devices that help the storefront feel active and conversion-focused."
        actions={<SectionLink href="/products?collection=flash-deals">View deals</SectionLink>}
      >
        <ProductGrid products={flashDeals} />
      </StoreSection>

      <StoreSection
        eyebrow="New arrivals"
        title="Fresh drops across smart gadgets, creator gear, and lifestyle tech"
        description="Recently launched products are grouped for quick discovery across desk setups, creator workflows, mobile carry, and smart living."
        actions={<SectionLink href="/products?collection=new-arrivals">Shop new</SectionLink>}
      >
        <ProductGrid products={newArrivals} />
      </StoreSection>

      <StoreSection
        eyebrow="Categories"
        title="Shop by category, setup, and everyday routine"
        description="Explore clean product categories built around how customers actually shop for tech: by setup, use case, and everyday routine."
      >
        <CategoryGrid categories={categories} />
      </StoreSection>

      <StoreSection
        eyebrow="Gaming & workspace"
        title="A unified collection for performance and premium desk aesthetics"
        description="This section reflects the brand vision directly: hardware that feels just as strong in a gaming setup as it does in a professional workstation."
        actions={<SectionLink href="/products?collection=gaming-workspace">Explore setup gear</SectionLink>}
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-white/8 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-8 sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">Setup spotlight</p>
            <h3 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Build a setup that looks premium in motion and in stills.</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
              From wireless keyboards and creator docks to ergonomic stands and ambient lighting, the gaming and workspace collection is designed around complete setups rather than isolated products.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {brandPartners.slice(0, 3).map((partner) => (
                <div key={partner} className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4 text-center text-xs font-semibold uppercase tracking-[0.22em] text-zinc-200">
                  {partner}
                </div>
              ))}
            </div>
          </div>
          <ProductGrid products={gamingWorkspace.slice(0, 2)} columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2" />
        </div>
      </StoreSection>

      <StoreSection
        eyebrow="Trending now"
        title="Products gaining momentum right now"
        description="See the products trending across gaming desks, creator kits, mobile carry, and smart home upgrades."
        actions={<SectionLink href="/products?collection=trending">See more</SectionLink>}
      >
        <ProductGrid products={trendingProducts} />
      </StoreSection>

      <StoreSection
        id="reviews"
        eyebrow="Customer reviews"
        title="What MysticCommerce customers are saying"
        description="Realistic product-led feedback from shoppers building better work, gaming, and everyday tech setups."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {customerStories.map((story) => (
            <article key={story.name} className="rounded-[28px] border border-white/8 bg-white/[0.03] p-7">
              <p className="text-sm leading-7 text-zinc-300">&quot;{story.quote}&quot;</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold text-white">
                  {story.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{story.name}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{story.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </StoreSection>

      <StoreSection
        eyebrow="Brand partnerships"
        title="A curated ecosystem of modern tech brands"
        description="MysticCommerce brings together emerging hardware, creator gear, and lifestyle tech names in one premium catalog."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {brandPartners.map((partner) => (
            <div key={partner} className="rounded-[24px] border border-white/8 bg-white/[0.03] px-5 py-8 text-center text-sm font-semibold uppercase tracking-[0.26em] text-zinc-200">
              {partner}
            </div>
          ))}
        </div>
      </StoreSection>

      <section className="px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <NewsletterPanel />
        </div>
      </section>
    </div>
  );
}

function ProductGrid({ products, columns = "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4" }) {
  return (
    <div className={`grid gap-6 ${columns}`}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 2} />
      ))}
    </div>
  );
}

function SectionLink({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-200 transition hover:border-white/20 hover:text-white"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
