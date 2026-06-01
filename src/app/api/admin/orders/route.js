import { requireAdmin } from "@/lib/backend/auth";
import { readDb, updateDb } from "@/lib/backend/db";
import { badRequest, guarded, ok } from "@/lib/backend/responses";

export const dynamic = "force-dynamic";

const VALID_STATUSES = ["confirmed", "processing", "shipped", "delivered", "cancelled", "payment_pending"];

export async function GET() {
  return guarded(async () => {
    await requireAdmin();
    const db = await readDb();
    return ok({ orders: db.orders.slice().reverse() });
  }, { admin: true });
}

export async function PATCH(request) {
  return guarded(async () => {
    await requireAdmin();
    const payload = await request.json();

    if (!VALID_STATUSES.includes(payload.status)) {
      return badRequest("Invalid order status.");
    }

    const order = await updateDb((db) => {
      const target = db.orders.find((item) => item.id === payload.orderId);

      if (!target) {
        return null;
      }

      target.status = payload.status;
      target.updatedAt = new Date().toISOString();
      return target;
    });

    if (!order) {
      return badRequest("Order not found.", 404);
    }

    return ok({ order });
  }, { admin: true });
}
