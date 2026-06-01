import { cookies } from "next/headers";
import { authenticateUser, SESSION_COOKIE, sessionCookieOptions } from "@/lib/backend/auth";
import { badRequest, ok } from "@/lib/backend/responses";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const payload = await request.json();
  const result = await authenticateUser(payload);

  if (result.error) {
    return badRequest(result.error, 401);
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, result.token, sessionCookieOptions());

  return ok({ user: result.user });
}
