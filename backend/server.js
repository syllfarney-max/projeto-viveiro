// server.js (diagnóstico CORS + logs)
// Cole esse arquivo no backend e faça deploy.
// NÃO altera rotas do frontend — só corrige CORS e adiciona /api/debug.

import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import db from "./db.js"; // seu módulo DB
dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Lista segura (adicione os seus domínios aqui)
const allowedOrigins = [
  "https://viveiro-comurg-frontend-56v2.onrender.com",
  "https://viveiro-comurg-frontend.onrender.com",
  "http://localhost:5173",
  "http://localhost:3000",
];

// Middleware CORS manual — deve ficar ANTES de app.use(express.json()) e rotas
app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log(">>> Request:", req.method, req.url, "Origin:", origin);

  // Se quiser testar liberando qualquer origem com risco, descomente a linha abaixo:
  // res.setHeader("Access-Control-Allow-Origin", "*");

  // Recomendo: permitir a origem se está na lista, caso contrário não permitir.
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (!origin) {
    // request direto pelo curl/postman (sem Origin header) — ok
  } else {
    // Origem não permitida — registrar e não setar header
    console.warn("Origem não permitida pelo CORS:", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    console.log(">>> Preflight (OPTIONS) atendido para", req.url);
    return res.sendStatus(200);
  }
  next();
});

// Agora o parser JSON
app.use(express.json());

// Health
app.get("/", (req, res) => res.send("🌱 Backend do Viveiros Comurg rodando!"));

// Debug endpoint — retorna informações pra garantir que você está falando com a instância correta
app.get("/api/debug", (req, res) => {
  res.json({
    ok: true,
    service: "viveiro-comurg-backend",
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

// Garante a tabela messages (de maneira simples)
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
    console.log("Tabela messages verificada/criada");
  } catch (err) {
    console.error("Erro ao criar/verificar tabela messages:", err);
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

    // envio de e-mail (opcional)
    if (process.env.SENDGRID_API_KEY && process.env.CONTACT_EMAIL) {
      try {
        const transporter = nodemailer.createTransport({
          service: "SendGrid",
          auth: {
            user: "apikey",
            pass: process.env.SENDGRID_API_KEY,
          },
        });

        await transporter.sendMail({
          from: process.env.SENDGRID_FROM || process.env.CONTACT_EMAIL,
          to: process.env.CONTACT_EMAIL,
          subject: `🌿 Nova mensagem - ${name}`,
          html: `<p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
        });
        console.log("E-mail enviado via SendGrid (tentativa).");
      } catch (mailErr) {
        console.error("Erro no envio de e-mail:", mailErr?.response ?? mailErr);
      }
    }

    return res.json({ success: true, message: "Mensagem enviada com sucesso!" });
  } catch (err) {
    console.error("Erro ao salvar/enviar mensagem:", err);
    return res.status(500).json({ success: false, error: "Erro interno no servidor." });
  }
});

// GET /api/messages
app.get("/api/messages", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM messages ORDER BY date DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar mensagens:", err);
    res.status(500).json({ success: false, error: "Erro ao buscar mensagens." });
  }
});

// POST /api/admin/login
app.post("/api/admin/login", (req, res) => {
  console.log(">>> /api/admin/login body:", req.body);
  const { email, password } = req.body;
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    console.error("Variáveis ADMIN_EMAIL/ADMIN_PASSWORD ausentes");
    return res.status(500).json({ success: false, error: "Configuração de admin ausente." });
  }
  if (email === process.env.ADMIN_EMAIL.trim() && password === process.env.ADMIN_PASSWORD.trim()) {
    return res.json({ success: true, token: "admin-placeholder-token", user: { email } });
  }
  return res.status(401).json({ success: false, error: "Credenciais inválidas." });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT} — PID:${process.pid}`);
});
