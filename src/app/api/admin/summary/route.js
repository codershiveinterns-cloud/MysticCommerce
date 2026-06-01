import { requireAdmin } from "@/lib/backend/auth";
import { readDb } from "@/lib/backend/db";
import { guarded, ok } from "@/lib/backend/responses";

export const dynamic = "force-dynamic";

export async function GET() {
  return guarded(async () => {
    await requireAdmin();
    const db = await readDb();
    const revenue = db.orders.reduce((total, order) => total + Number(order.total || 0), 0);
    const lowStock = Object.values(db.inventory).filter((item) => item.stock <= item.lowStockThreshold).length;

    return ok({
      summary: {
        revenue,
        orders: db.orders.length,
        customers: db.users.filter((user) => user.role === "customer").length,
        lowStock,
        payments: db.payments.length,
        reviews: db.reviews.length,
      },
      recentOrders: db.orders.slice(-6).reverse(),
      payments: db.payments.slice(-6).reverse(),
    });
  }, { admin: true });
}
