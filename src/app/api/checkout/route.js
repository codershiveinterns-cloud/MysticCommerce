import { requireUser } from "@/lib/backend/auth";
import { createOrderNumber, defaultCart, updateDb } from "@/lib/backend/db";
import { createId } from "@/lib/backend/crypto";
import { createPayment } from "@/lib/backend/payments";
import { badRequest, guarded, ok } from "@/lib/backend/responses";
import { formatCurrency, getProductById } from "@/lib/store-data";

export const dynamic = "force-dynamic";

function money(value) {
  return Math.round(Number(value || 0) * 100) / 100;
}

function normalizePayloadItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => ({
      productId: String(item.productId),
      variantId: item.variantId,
      quantity: Math.max(1, Number(item.quantity || 1)),
    }))
    .filter((item) => getProductById(item.productId));
}

export async function POST(request) {
  return guarded(async () => {
    const user = await requireUser();
    const payload = await request.json();
    const dbOrder = await updateDb(async (db) => {
      const payloadItems = normalizePayloadItems(payload.items);
      const cart = payloadItems.length ? { items: payloadItems } : db.carts[user.id] || defaultCart();

      if (!cart.items.length) {
        return { error: "Your cart is empty." };
      }

      const lineItems = [];

      for (const item of cart.items) {
        const product = getProductById(item.productId);
        const inventory = db.inventory[String(item.productId)];

        if (!product || !inventory) {
          return { error: "A product in your cart is no longer available." };
        }

        if (inventory.stock < item.quantity) {
          return { error: `${product.name} only has ${inventory.stock} left in stock.` };
        }

        const variant = product.variants.find((candidate) => candidate.id === item.variantId) ?? product.variants[0];
        lineItems.push({
          productId: String(product.id),
          variantId: variant.id,
          name: product.name,
          variantName: variant.name,
          price: product.price,
          quantity: item.quantity,
          lineTotal: money(product.price * item.quantity),
        });
      }

      const subtotal = money(lineItems.reduce((total, item) => total + item.lineTotal, 0));
      const shipping = subtotal > 0 ? 18 : 0;
      const total = money(subtotal + shipping);
      const payment = await createPayment({ amount: total, currency: "USD", provider: payload.paymentMethod || "mock-card" });
      const now = new Date().toISOString();

      const order = {
        id: createId("order"),
        orderNumber: createOrderNumber(),
        userId: user.id,
        status: payment.status === "authorized" ? "confirmed" : "payment_pending",
        customer: {
          name: payload.name || user.name,
          email: payload.email || user.email,
          city: payload.city || "",
          address: payload.address || "",
        },
        items: lineItems,
        subtotal,
        shipping,
        total,
        paymentId: payment.id,
        createdAt: now,
        updatedAt: now,
      };

      for (const item of lineItems) {
        db.inventory[item.productId].stock -= item.quantity;
        db.inventory[item.productId].updatedAt = now;
      }

      db.payments.push({ ...payment, orderId: order.id, userId: user.id });
      db.orders.push(order);
      db.carts[user.id] = defaultCart();

      return { order, payment };
    });

    if (dbOrder.error) {
      return badRequest(dbOrder.error);
    }

    return ok({
      ...dbOrder,
      message: `Order ${dbOrder.order.orderNumber} created for ${formatCurrency(dbOrder.order.total)}.`,
    }, { status: 201 });
  });
}
