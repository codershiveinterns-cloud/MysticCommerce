import { promises as fs } from "fs";
import path from "path";
import { getAllProducts } from "@/lib/store-data";
import { createId, hashPassword } from "@/lib/backend/crypto";

const DB_PATH = process.env.MYSTIC_DB_PATH || path.join(/*turbopackIgnore: true*/ process.cwd(), ".data", "mysticcommerce.json");

function initialInventory() {
  return Object.fromEntries(
    getAllProducts().map((product) => [
      String(product.id),
      {
        productId: String(product.id),
        sku: product.serialNumber,
        stock: product.stock,
        lowStockThreshold: 5,
        updatedAt: new Date().toISOString(),
      },
    ]),
  );
}

function createInitialDb() {
  const now = new Date().toISOString();

  return {
    meta: { version: 1, createdAt: now },
    users: [
      {
        id: "usr_admin",
        name: "MysticCommerce Admin",
        email: "admin@mysticcommerce.local",
        passwordHash: hashPassword("Admin@12345"),
        role: "admin",
        createdAt: now,
      },
    ],
    sessions: [],
    carts: {},
    wishlists: {},
    orders: [],
    payments: [],
    reviews: [],
    inventory: initialInventory(),
  };
}

async function ensureDbFile() {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });

  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify(createInitialDb(), null, 2));
  }
}

export async function readDb() {
  await ensureDbFile();
  const raw = await fs.readFile(DB_PATH, "utf8");
  const db = JSON.parse(raw);

  db.inventory = { ...initialInventory(), ...(db.inventory || {}) };
  db.users ||= [];
  db.sessions ||= [];
  db.carts ||= {};
  db.wishlists ||= {};
  db.orders ||= [];
  db.payments ||= [];
  db.reviews ||= [];

  return db;
}

export async function writeDb(db) {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
}

export async function updateDb(mutator) {
  const db = await readDb();
  const result = await mutator(db);
  await writeDb(db);
  return result;
}

export function publicUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export function publicOrder(order) {
  return {
    ...order,
    customerEmail: order.customer?.email,
  };
}

export function defaultCart() {
  return {
    items: [],
    updatedAt: new Date().toISOString(),
  };
}

export function createOrderNumber() {
  return `MC-${new Date().getFullYear()}-${createId("ord").slice(-8).toUpperCase()}`;
}
