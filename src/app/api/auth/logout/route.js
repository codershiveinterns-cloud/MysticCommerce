import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/backend/auth";
import { ok } from "@/lib/backend/responses";
import { updateDb } from "@/lib/backend/db";

export const dynamic = "force-dynamic";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await updateDb((db) => {
      db.sessions = db.sessions.filter((session) => session.token !== token);
    });
  }

  cookieStore.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return ok({ success: true });
}
