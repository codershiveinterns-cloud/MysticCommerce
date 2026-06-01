import { defaultCart, updateDb } from "@/lib/backend/db";
import { requireUser } from "@/lib/backend/auth";
import { badRequest, guarded, ok } from "@/lib/backend/responses";
import { getProductById } from "@/lib/store-data";

export const dynamic = "force-dynamic";

function normalizeItem(item) {
  const product = getProductById(item.productId);

  if (!product) {
    return null;
  }

  const variant = product.variants.find((candidate) => candidate.id === item.variantId) ?? product.variants[0];

  return {
    productId: product.id,
    variantId: variant.id,
    quantity: Math.max(1, Number(item.quantity || 1)),
  };
}

export async function GET() {
  return guarded(async () => {
    const user = await requireUser();
    const cart = await updateDb((db) => {
      db.carts[user.id] ||= defaultCart();
      return db.carts[user.id];
    });

    return ok({ cart });
  });
}

export async function PUT(request) {
  return guarded(async () => {
    const user = await requireUser();
    const payload = await request.json();
    const items = Array.isArray(payload.items) ? payload.items.map(normalizeItem).filter(Boolean) : null;

    if (!items) {
      return badRequest("Cart items are required.");
    }

    const cart = await updateDb((db) => {
      db.carts[user.id] = {
        items,
        updatedAt: new Date().toISOString(),
      };
      return db.carts[user.id];
    });

    return ok({ cart });
  });
}
