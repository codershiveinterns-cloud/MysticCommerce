import { getDbProductById, getDbRelatedProducts } from "@/lib/backend/products";
import { guarded, ok } from "@/lib/backend/responses";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  return guarded(async () => {
    const { id } = await params;
    const product = await getDbProductById(id);

    if (!product) {
      return ok({ product: null, relatedProducts: [] }, { status: 404 });
    }

    const relatedProducts = await getDbRelatedProducts(product, 4);
    return ok({ product, relatedProducts });
  });
}
