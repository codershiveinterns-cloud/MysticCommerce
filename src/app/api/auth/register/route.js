import { registerUser } from "@/lib/backend/auth";
import { badRequest, ok } from "@/lib/backend/responses";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const payload = await request.json();
  const result = await registerUser(payload);

  if (result.error) {
    return badRequest(result.error);
  }

  return ok({ user: result.user }, { status: 201 });
}
