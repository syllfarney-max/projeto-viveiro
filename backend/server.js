import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

const messagesFile = path.resolve("messages.json");

const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || "";
const allowedOrigins = allowedOriginsEnv.split(",").map(s=>s.trim()).filter(Boolean);

app.use((req, res, next) => {
  if (!req.headers.origin) res.header("Access-Control-Allow-Origin", "*");
  else if (allowedOrigins.length === 0) res.header("Access-Control-Allow-Origin", "*");
  else if (allowedOrigins.includes(req.headers.origin)) res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Max-Age", "86400");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(express.json());

app.get("/", (req, res) => res.send("🌱 Backend do Viveiros Comurg rodando!"));

function ensureMessagesFile() {
  if (!fs.existsSync(messagesFile)) fs.writeFileSync(messagesFile, "[]", "utf8");
}
ensureMessagesFile();

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ success: false, error: "Campos obrigatórios faltando." });

    let data = [];
    try {
      const raw = fs.readFileSync(messagesFile, "utf8");
      data = raw.trim() ? JSON.parse(raw) : [];
    } catch (e) { data = []; }

    const newMessage = { id: Date.now(), name, email, message, created_at: new Date().toISOString() };
    data.unshift(newMessage);
    fs.writeFileSync(messagesFile, JSON.stringify(data, null, 2), "utf8");
    return res.json({ success: true, message: "Mensagem recebida com sucesso!" });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Erro interno no servidor." });
  }
});

app.get("/api/messages", (req, res) => {
  try {
    if (!fs.existsSync(messagesFile)) return res.json([]);
    const raw = fs.readFileSync(messagesFile, "utf8");
    const data = raw.trim() ? JSON.parse(raw) : [];
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ success: false, error: "Erro ao ler mensagens." });
  }
});

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ success: false, error: "Configuração de admin ausente." });
  }
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true, token: "admin-token-placeholder", user: { email } });
  } else {
    return res.status(401).json({ success: false, error: "Credenciais inválidas." });
  }
});

app.listen(PORT, () => console.log(`🚀 Backend rodando na porta ${PORT}`));