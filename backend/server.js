// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Domínios permitidos (corrigido: endereço do frontend exato)
const allowedOrigins = [
  "https://viveiro-comurg-frontend-56v2.onrender.com", // endereço certo do frontend Render
  "http://localhost:5173", // para desenvolvimento local
];

// ✅ Middleware CORS com OPTIONS liberado globalmente
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS bloqueado para essa origem"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Importante — garante que o preflight OPTIONS funcione
app.options("*", cors());

app.use(express.json());

// rota health check
app.get("/", (req, res) => res.send("🌱 Backend do Viveiros Comurg rodando!"));

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
  } catch (err) {
    console.error("Erro ao criar tabela messages:", err);
  }
}
ensureTables();

// POST /api/send -> formulário de contato
app.post("/api/send", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, error: "Campos obrigatórios faltando." });
  }

  try {
    await db.query(
      "INSERT INTO messages (name, email, message) VALUES ($1,$2,$3)",
      [name, email, message]
    );

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
      } catch (mailErr) {
        console.error("Erro no envio de e-mail:", mailErr);
      }
    }

    res.json({ success: true, message: "Mensagem enviada com sucesso!" });
  } catch (err) {
    console.error("Erro ao salvar/enviar mensagem:", err);
    res
      .status(500)
      .json({ success: false, error: "Erro interno no servidor." });
  }
});

// GET /api/messages -> área admin
app.get("/api/messages", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM messages ORDER BY date DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar mensagens:", err);
    res.status(500).json({ success: false, error: "Erro ao buscar mensagens." });
  }
});

// POST /api/admin/login -> autenticação
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    console.error("⚠️ Variáveis ADMIN_EMAIL/ADMIN_PASSWORD não configuradas!");
    return res
      .status(500)
      .json({ success: false, error: "Configuração de admin ausente." });
  }

  if (
    email === process.env.ADMIN_EMAIL.trim() &&
    password === process.env.ADMIN_PASSWORD.trim()
  ) {
    return res.json({
      success: true,
      token: "admin-placeholder-token",
      user: { email },
    });
  }

  return res.status(401).json({ success: false, error: "Credenciais inválidas." });
});

// 🚀 Inicializa o servidor
app.listen(PORT, () => console.log(`🚀 Backend rodando na porta ${PORT}`));

