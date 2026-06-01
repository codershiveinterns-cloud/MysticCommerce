import { requireUser } from "@/lib/backend/auth";
import { createId } from "@/lib/backend/crypto";
import { readDb, updateDb } from "@/lib/backend/db";
import { badRequest, guarded, ok } from "@/lib/backend/responses";
import { getProductById } from "@/lib/store-data";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  const db = await readDb();
  const reviews = db.reviews
    .filter((review) => !productId || String(review.productId) === String(productId))
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());

  return ok({ reviews });
}

export async function POST(request) {
  return guarded(async () => {
    const user = await requireUser();
    const payload = await request.json();
    const product = getProductById(payload.productId);
    const rating = Number(payload.rating);

    if (!product || rating < 1 || rating > 5 || !payload.title?.trim() || !payload.comment?.trim()) {
      return badRequest("Product, rating, title, and review text are required.");
    }

    const review = await updateDb((db) => {
      const item = {
        id: createId("rev"),
        productId: String(product.id),
        userId: user.id,
        name: user.name,
        title: payload.title.trim(),
        comment: payload.comment.trim(),
        rating,
        status: "published",
        createdAt: new Date().toISOString(),
      };

      db.reviews.unshift(item);
      return item;
    });

    return ok({ review }, { status: 201 });
  });
}
