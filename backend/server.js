// server.js — diagnóstico CORS (libera tudo temporariamente) + logging completo
import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import db from "./db.js"; // mantenha seu módulo db atual

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

// --- CORS manual (libera tudo) e resposta a preflight (OPTIONS)
// Deve ficar ANTES do express.json() e das rotas.
app.use((req, res, next) => {
  const origin = req.headers.origin || "<no-origin>";
  console.log(">>> Incoming request:", req.method, req.url, "Origin:", origin);

  // LIBERA QUALQUER ORIGEM PARA DIAGNÓSTICO
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    console.log(">>> OPTIONS (preflight) handled for", req.url);
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// health
app.get("/", (req, res) => res.send("🌱 Backend do Viveiros Comurg rodando!"));

// debug endpoint — mostra envs e origin
app.get("/api/debug", (req, res) => {
  res.json({
    ok: true,
    env: {
      ADMIN_EMAIL: !!process.env.ADMIN_EMAIL,
      ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
      CONTACT_EMAIL: !!process.env.CONTACT_EMAIL,
      SENDGRID_API_KEY: !!process.env.SENDGRID_API_KEY,
      DB_HOST: process.env.DB_HOST || null,
    },
    requestOrigin: req.headers.origin || null,
    now: new Date().toISOString(),
  });
});

// cria tabela messages simples (se aplicável)
async function ensureTables() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Messages table OK");
  } catch (err) {
    console.error("Erro ensureTables:", err);
  }
}
ensureTables();

// POST /api/send
app.post("/api/send", async (req, res) => {
  console.log(">>> /api/send body:", req.body);
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Campos obrigatórios faltando." });
  }
  try {
    await db.query("INSERT INTO messages (name, email, message) VALUES ($1,$2,$3)", [name, email, message]);
    // opcional: enviar email (tentativa, não falha a requisição)
    if (process.env.SENDGRID_API_KEY && process.env.CONTACT_EMAIL) {
      try {
        const transporter = nodemailer.createTransport({
          service: "SendGrid",
          auth: { user: "apikey", pass: process.env.SENDGRID_API_KEY },
        });
        await transporter.sendMail({
          from: process.env.SENDGRID_FROM || process.env.CONTACT_EMAIL,
          to: process.env.CONTACT_EMAIL,
          subject: `Nova mensagem - ${name}`,
          html: `<p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
        });
        console.log("Tentativa de envio de e-mail realizada");
      } catch (mailErr) {
        console.error("Erro no envio de email (não fatal):", mailErr?.response ?? mailErr);
      }
    }
    return res.json({ success: true, message: "Mensagem enviada com sucesso!" });
  } catch (err) {
    console.error("Erro ao inserir message:", err);
    return res.status(500).json({ success: false, error: "Erro interno." });
  }
});

// GET /api/messages
app.get("/api/messages", async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM messages ORDER BY date DESC");
    res.json(r.rows);
  } catch (err) {
    console.error("Erro GET /api/messages:", err);
    res.status(500).json({ success: false, error: "Erro ao buscar mensagens." });
  }
});

// POST /api/admin/login
app.post("/api/admin/login", (req, res) => {
  console.log(">>> /api/admin/login body:", req.body);
  const { email, password } = req.body;
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    console.error("ADMIN_EMAIL/ADMIN_PASSWORD não configuradas");
    return res.status(500).json({ success: false, error: "Configuração de admin ausente." });
  }
  if (email === process.env.ADMIN_EMAIL.trim() && password === process.env.ADMIN_PASSWORD.trim()) {
    return res.json({ success: true, token: "admin-placeholder-token", user: { email } });
  }
  return res.status(401).json({ success: false, error: "Credenciais inválidas." });
});

app.listen(PORT, () => console.log(`🚀 Backend rodando na porta ${PORT}`));
