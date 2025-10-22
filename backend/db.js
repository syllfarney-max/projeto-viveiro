import fs from "fs";
import path from "path";

const dbPath = path.resolve("backend/messages.json");

export function saveMessage(message) {
  const data = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath)) : [];
  data.push({ id: Date.now(), ...message });
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export function getMessages() {
  return fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath)) : [];
}
