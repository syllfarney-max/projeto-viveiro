// backend/db.js
import { Pool } from "pg";
import fs from "fs";
import path from "path";

const messagesFile = path.resolve("backend", "messages.json");

// Build pool only if DATABASE envs present
const hasDb =
  !!process.env.DB_HOST &&
  !!process.env.DB_NAME &&
  !!process.env.DB_USER &&
  !!process.env.DB_PASSWORD;

let pool = null;
if (hasDb) {
  pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  });
}

export async function query(text, params) {
  if (!pool) throw new Error("DB_NOT_CONFIGURED");
  return pool.query(text, params);
}

// Simple helpers for fallback file storage
export function saveMessageToFile(msg) {
  let arr = [];
  if (fs.existsSync(messagesFile)) {
    const raw = fs.readFileSync(messagesFile, "utf8");
    if (raw.trim()) arr = JSON.parse(raw);
  }
  arr.unshift(msg);
  fs.writeFileSync(messagesFile, JSON.stringify(arr, null, 2));
  return msg;
}

export function readMessagesFromFile() {
  if (!fs.existsSync(messagesFile)) return [];
  const raw = fs.readFileSync(messagesFile, "utf8");
  if (!raw.trim()) return [];
  return JSON.parse(raw);
}
