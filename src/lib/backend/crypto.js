import crypto from "crypto";

const KEY_LENGTH = 64;

export function createId(prefix) {
  return `${prefix}_${crypto.randomBytes(10).toString("hex")}`;
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  const [salt, hash] = String(storedHash || "").split(":");

  if (!salt || !hash) {
    return false;
  }

  const expected = Buffer.from(hash, "hex");
  const actual = crypto.scryptSync(password, salt, KEY_LENGTH);
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}
