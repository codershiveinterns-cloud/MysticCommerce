import { readDb, updateDb } from "@/lib/backend/db";
import {
  filterProducts as filterSeedProducts,
  getProductById as getSeedProductById,
  getRelatedProducts as getSeedRelatedProducts,
  getStoreCategories as getSeedStoreCategories,
} from "@/lib/store-data";

function normalizeProduct(product) {
  const seed = getSeedProductById(product?.id) ?? getSeedProductById(1);

  return {
    ...seed,
    ...product,
    id: Number(product.id),
    price: Number(product.price || seed.price || 0),
    compareAtPrice: Number(product.compareAtPrice || seed.compareAtPrice || product.price || 0),
    stock: Math.max(0, Number(product.stock ?? seed.stock ?? 0)),
    variants: Array.isArray(product.variants) && product.variants.length ? product.variants : seed.variants,
    collections: Array.isArray(product.collections) && product.collections.length ? product.collections : seed.collections,
    highlights: Array.isArray(product.highlights) && product.highlights.length ? product.highlights : seed.highlights,
    specs: product.specs && typeof product.specs === "object" ? product.specs : seed.specs,
    palette: product.palette || seed.palette,
    reviewsList: Array.isArray(product.reviewsList) ? product.reviewsList : [],
  };
}

function withInventory(product, inventory = {}) {
  const item = inventory[String(product.id)];
  return normalizeProduct({
    ...product,
    stock: item?.stock ?? product.stock,
    serialNumber: item?.sku ?? product.serialNumber,
  });
}

export async function getDbProducts() {
  const db = await readDb();
  return db.products.map((product) => withInventory(product, db.inventory));
}

export async function getDbProductById(id) {
  const products = await getDbProducts();
  return products.find((product) => String(product.id) === String(id)) ?? null;
}

export async function getDbStoreCategories() {
  const products = await getDbProducts();
  const fallback = Object.fromEntries(getSeedStoreCategories().map((category) => [category.name, category.description]));
  const names = [...new Set(products.map((product) => product.category))];

  return names.map((name) => ({
    name,
    description: fallback[name] || "Curated products managed from the MysticCommerce database.",
    productCount: products.filter((product) => product.category === name).length,
  }));
}

export async function filterDbProducts(options = {}) {
  const products = await getDbProducts();
  const seedOrder = filterSeedProducts(options).map((product) => String(product.id));
  const normalizedQuery = options.query?.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchesCategory = !options.category || options.category === "All" || product.category === options.category;
    const matchesCollection = !options.collection || options.collection === "all" || product.collections.includes(options.collection);
    const matchesQuery =
      !normalizedQuery ||
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery) ||
      product.tagline.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesCollection && matchesQuery;
  });

  return filtered.sort((left, right) => {
    switch (options.sort) {
      case "price-low":
        return left.price - right.price;
      case "price-high":
        return right.price - left.price;
      case "rating":
        return right.rating - left.rating;
      case "newest":
        return right.id - left.id;
      default:
        return seedOrder.indexOf(String(left.id)) - seedOrder.indexOf(String(right.id));
    }
  });
}

export async function getDbRelatedProducts(product, limit = 4) {
  const products = await getDbProducts();
  const fallbackOrder = getSeedRelatedProducts(product, limit).map((item) => String(item.id));

  return products
    .filter((candidate) => candidate.id !== product.id)
    .sort((left, right) => {
      const leftFallback = fallbackOrder.indexOf(String(left.id));
      const rightFallback = fallbackOrder.indexOf(String(right.id));
      const leftScore = Number(left.category === product.category) + left.collections.filter((tag) => product.collections.includes(tag)).length;
      const rightScore = Number(right.category === product.category) + right.collections.filter((tag) => product.collections.includes(tag)).length;
      return rightScore - leftScore || (leftFallback === -1 ? 999 : leftFallback) - (rightFallback === -1 ? 999 : rightFallback);
    })
    .slice(0, limit);
}

export async function upsertDbProduct(payload) {
  return updateDb((db) => {
    const id = payload.id ? Number(payload.id) : Math.max(...db.products.map((product) => Number(product.id)), 0) + 1;
    const existing = db.products.find((product) => Number(product.id) === id) || getSeedProductById(1);
    const product = normalizeProduct({
      ...existing,
      ...payload,
      id,
      variants: existing.variants,
      collections: String(payload.collections || existing.collections.join(","))
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      highlights: String(payload.highlights || existing.highlights.join("|"))
        .split("|")
        .map((item) => item.trim())
        .filter(Boolean),
    });

    const index = db.products.findIndex((candidate) => Number(candidate.id) === id);
    if (index >= 0) {
      db.products[index] = product;
    } else {
      db.products.push(product);
    }

    db.inventory[String(id)] = {
      productId: String(id),
      sku: product.serialNumber,
      stock: product.stock,
      lowStockThreshold: db.inventory[String(id)]?.lowStockThreshold ?? 5,
      updatedAt: new Date().toISOString(),
    };

    return withInventory(product, db.inventory);
  });
}
