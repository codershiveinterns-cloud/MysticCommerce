import { getCurrentUser } from "@/lib/backend/auth";
import { ok } from "@/lib/backend/responses";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  return ok({ user });
}
