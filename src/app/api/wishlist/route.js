import { requireUser } from "@/lib/backend/auth";
import { guarded, ok } from "@/lib/backend/responses";
import { getDbProductById } from "@/lib/backend/products";
import { updateDb } from "@/lib/backend/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return guarded(async () => {
    const user = await requireUser();
    const wishlist = await updateDb((db) => {
      db.wishlists[user.id] ||= [];
      return db.wishlists[user.id];
    });

    return ok({ wishlist });
  });
}

export async function PUT(request) {
  return guarded(async () => {
    const user = await requireUser();
    const payload = await request.json();
    const ids = Array.isArray(payload.productIds) ? payload.productIds.map(String) : [];
    const validProducts = await Promise.all(ids.map((id) => getDbProductById(id)));
    const validIds = ids.filter((_, index) => validProducts[index]);

    const wishlist = await updateDb((db) => {
      db.wishlists[user.id] = [...new Set(validIds)];
      return db.wishlists[user.id];
    });

    return ok({ wishlist });
  });
}
