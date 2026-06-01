import { createId } from "@/lib/backend/crypto";

export async function createPayment({ amount, currency = "USD", provider = "mock-card" }) {
  const isStripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);

  return {
    id: createId("pay"),
    provider: isStripeConfigured ? "stripe-ready" : provider,
    status: isStripeConfigured ? "requires_gateway_package" : "authorized",
    amount,
    currency,
    transactionReference: isStripeConfigured ? null : createId("txn"),
    message: isStripeConfigured
      ? "STRIPE_SECRET_KEY is configured. Install and wire the Stripe SDK to create live payment intents."
      : "Mock payment authorized for local development. Replace with Stripe/Razorpay keys before accepting live payments.",
    createdAt: new Date().toISOString(),
  };
}
