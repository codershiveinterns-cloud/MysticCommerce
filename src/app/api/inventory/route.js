import { requireAdmin } from "@/lib/backend/auth";
import { readDb, updateDb } from "@/lib/backend/db";
import { forbidden, guarded, ok } from "@/lib/backend/responses";
import { getAllProducts } from "@/lib/store-data";

export const dynamic = "force-dynamic";

function inventoryRows(db) {
  return getAllProducts().map((product) => ({
    ...db.inventory[String(product.id)],
    productId: String(product.id),
    name: product.name,
    category: product.category,
    price: product.price,
  }));
}

export async function GET() {
  return guarded(async () => {
    const user = await requireAdmin();

    if (user.role !== "admin") {
      return forbidden();
    }

    const db = await readDb();
    return ok({ inventory: inventoryRows(db) });
  }, { admin: true });
}

export async function PATCH(request) {
  return guarded(async () => {
    await requireAdmin();
    const payload = await request.json();
    const productId = String(payload.productId);
    const stock = Math.max(0, Number(payload.stock || 0));

    const inventory = await updateDb((db) => {
      db.inventory[productId] ||= { productId, sku: `MC-${productId}`, stock: 0, lowStockThreshold: 5 };
      db.inventory[productId].stock = stock;
      db.inventory[productId].updatedAt = new Date().toISOString();
      return inventoryRows(db);
    });

    return ok({ inventory });
  }, { admin: true });
}
