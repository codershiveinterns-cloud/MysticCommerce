import { requireUser } from "@/lib/backend/auth";
import { guarded, ok } from "@/lib/backend/responses";
import { readDb } from "@/lib/backend/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return guarded(async () => {
    const user = await requireUser();
    const db = await readDb();
    const orders = db.orders
      .filter((order) => order.userId === user.id || user.role === "admin")
      .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());

    return ok({ orders });
  });
}
