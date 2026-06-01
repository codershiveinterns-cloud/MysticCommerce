import { requireUser } from "@/lib/backend/auth";
import { guarded, ok } from "@/lib/backend/responses";
import { getProductById } from "@/lib/store-data";
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
    const ids = Array.isArray(payload.productIds)
      ? payload.productIds.map(String).filter((id) => getProductById(id))
      : [];

    const wishlist = await updateDb((db) => {
      db.wishlists[user.id] = [...new Set(ids)];
      return db.wishlists[user.id];
    });

    return ok({ wishlist });
  });
}
