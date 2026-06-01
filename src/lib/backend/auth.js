import { cookies } from "next/headers";
import { createId, hashPassword, verifyPassword } from "@/lib/backend/crypto";
import { publicUser, readDb, updateDb } from "@/lib/backend/db";

export const SESSION_COOKIE = "mystic_session";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export async function registerUser({ name, email, password }) {
  const normalizedEmail = normalizeEmail(email);

  if (!name?.trim() || !normalizedEmail || String(password || "").length < 8) {
    return { error: "Name, valid email, and an 8+ character password are required." };
  }

  return updateDb((db) => {
    if (db.users.some((user) => user.email === normalizedEmail)) {
      return { error: "An account with this email already exists." };
    }

    const user = {
      id: createId("usr"),
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: hashPassword(password),
      role: "customer",
      createdAt: new Date().toISOString(),
    };

    db.users.push(user);
    return { user: publicUser(user) };
  });
}

export async function authenticateUser({ email, password }) {
  const normalizedEmail = normalizeEmail(email);
  const db = await readDb();
  const user = db.users.find((candidate) => candidate.email === normalizedEmail);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "Invalid email or password." };
  }

  return updateDb((mutableDb) => {
    const session = {
      token: createId("ses"),
      userId: user.id,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + SESSION_MAX_AGE * 1000).toISOString(),
    };

    mutableDb.sessions = mutableDb.sessions.filter((item) => new Date(item.expiresAt).getTime() > Date.now());
    mutableDb.sessions.push(session);
    return { user: publicUser(user), token: session.token };
  });
}

export async function getSessionUserFromToken(token) {
  if (!token) {
    return null;
  }

  const db = await readDb();
  const session = db.sessions.find((item) => item.token === token && new Date(item.expiresAt).getTime() > Date.now());
  const user = session ? db.users.find((candidate) => candidate.id === session.userId) : null;
  return user ? publicUser(user) : null;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  return getSessionUserFromToken(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireUser();

  if (user.role !== "admin") {
    throw new Error("Forbidden");
  }

  return user;
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}
