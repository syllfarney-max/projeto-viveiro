import fs from "fs";
import path from "path";
import { pool } from "../server.js";

const messagesPath = path.resolve("./backend/messages.json");

export const getMessages = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Database fetch error:", err);
    const fallback = JSON.parse(fs.readFileSync(messagesPath, "utf8"));
    res.json(fallback);
  }
};
