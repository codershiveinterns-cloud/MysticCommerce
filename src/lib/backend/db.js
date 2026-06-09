import { mkdirSync } from "fs";
import path from "path";
import Database from "better-sqlite3";
import { getAllProducts } from "@/lib/store-data";
import { createId, hashPassword } from "@/lib/backend/crypto";

const DB_PATH = process.env.MYSTIC_DB_PATH || (process.env.NODE_ENV === "production" ? path.join("/tmp", "mysticcommerce.sqlite") : path.join(process.cwd(), ".data", "mysticcommerce.sqlite"));
let database = null;

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
    products: getAllProducts(),
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

function openDatabase() {
  if (database) {
    return database;
  }

  mkdirSync(path.dirname(DB_PATH), { recursive: true });
  database = new Database(DB_PATH);
  database.pragma("journal_mode = WAL");
  database.prepare(
    `CREATE TABLE IF NOT EXISTS state (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )`,
  ).run();

  const row = database.prepare("SELECT value FROM state WHERE key = ?").get("store");

  if (!row) {
    const initialState = createInitialDb();
    database.prepare("INSERT INTO state (key, value) VALUES (?, ?)").run("store", JSON.stringify(initialState, null, 2));
  }

  return database;
}

export async function readDb() {
  const db = openDatabase();
  const row = db.prepare("SELECT value FROM state WHERE key = ?").get("store");
  const result = row ? JSON.parse(row.value) : createInitialDb();

  result.inventory = { ...initialInventory(), ...(result.inventory || {}) };
  result.products = Array.isArray(result.products) && result.products.length ? result.products : getAllProducts();
  result.users ||= [];
  result.sessions ||= [];
  result.carts ||= {};
  result.wishlists ||= {};
  result.orders ||= [];
  result.payments ||= [];
  result.reviews ||= [];

  return result;
}

export async function writeDb(state) {
  const db = openDatabase();
  db.prepare("UPDATE state SET value = ? WHERE key = ?").run(JSON.stringify(state, null, 2), "store");
  return state;
}

export async function updateDb(mutator) {
  const state = await readDb();
  const result = await mutator(state);
  await writeDb(state);
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
