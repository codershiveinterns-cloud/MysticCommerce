import { requireAdmin } from "@/lib/backend/auth";
import { getDbProducts, upsertDbProduct } from "@/lib/backend/products";
import { badRequest, guarded, ok } from "@/lib/backend/responses";

export const dynamic = "force-dynamic";

export async function GET() {
  return guarded(async () => {
    await requireAdmin();
    const products = await getDbProducts();
    return ok({ products });
  }, { admin: true });
}

export async function POST(request) {
  return guarded(async () => {
    await requireAdmin();
    const payload = await request.json();

    if (!payload.name?.trim() || !payload.category?.trim()) {
      return badRequest("Product name and category are required.");
    }

    const product = await upsertDbProduct(payload);
    return ok({ product }, { status: 201 });
  }, { admin: true });
}

export async function PATCH(request) {
  return guarded(async () => {
    await requireAdmin();
    const payload = await request.json();

    if (!payload.id) {
      return badRequest("Product id is required.");
    }

    const product = await upsertDbProduct(payload);
    return ok({ product });
  }, { admin: true });
}
