// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js"; // seu módulo de DB (mantém como está)
import nodemailer from "nodemailer";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

// Allowed origins: defina em env (vírgula separada) ou adicione manualmente abaixo
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

// cors config
const corsOptions = {
  origin: function (origin, callback) {
    // permitir requests sem origem (curl, server-to-server) e permitir durante debug
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.length === 0) {
      // se não configurado, permitir o frontend do Render (útil: bloqueie em produção se desejar)
      return callback(null, true);
    }
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    console.warn("Bloqueado por CORS:", origin);
    return callback(new Error("CORS blocked"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // responder preflight

app.use(express.json());

// health
app.get("/", (req, res) => res.send("🌱 Backend do Viveiros Comurg rodando!"));

// ensure table (se for usar DB)
async function ensureTables() {
  try {
    if (!db) return;
    await db.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Tabela messages verificada/criada.");
  } catch (err) {
    console.error("Erro ao criar/verificar tabela messages:", err);
  }
}
ensureTables();

// POST /api/send
app.post("/api/send", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("POST /api/send - body:", { name, email, message });

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Campos obrigatórios faltando." });
  }

  try {
    // salvar no banco (assume db.query funciona)
    if (db && db.query) {
      await db.query("INSERT INTO messages (name, email, message) VALUES ($1,$2,$3)", [
        name,
        email,
        message,
      ]);
    } else {
      console.warn("DB não configurado - não salvando mensagem no DB.");
    }

    // opcional: envio de e-mail via SendGrid SMTP (nodemailer)
    if (process.env.SENDGRID_API_KEY && process.env.CONTACT_EMAIL) {
      try {
        const transporter = nodemailer.createTransport({
          service: "SendGrid",
          auth: { user: "apikey", pass: process.env.SENDGRID_API_KEY },
        });
        await transporter.sendMail({
          from: process.env.SENDGRID_FROM || process.env.CONTACT_EMAIL,
          to: process.env.CONTACT_EMAIL,
          subject: `🌿 Nova mensagem - ${name}`,
          text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
          html: `<p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
        });
      } catch (mailErr) {
        console.error("Erro no envio de e-mail:", mailErr);
        // não falhar toda a requisição por causa do e-mail
      }
    }

    return res.json({ success: true, message: "Mensagem enviada com sucesso!" });
  } catch (err) {
    console.error("Erro /api/send:", err);
    return res.status(500).json({ success: false, error: "Erro interno no servidor." });
  }
});

// GET /api/messages
app.get("/api/messages", async (req, res) => {
  try {
    if (db && db.query) {
      const result = await db.query("SELECT * FROM messages ORDER BY date DESC");
      return res.json(result.rows);
    } else {
      return res.json([]);
    }
  } catch (err) {
    console.error("Erro /api/messages:", err);
    return res.status(500).json({ success: false, error: "Erro ao buscar mensagens." });
  }
});

// POST /api/admin/login
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  console.log("POST /api/admin/login -", email);
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    console.error("ADMIN_EMAIL/ADMIN_PASSWORD não configurados!");
    return res.status(500).json({ success: false, error: "Configuração de admin ausente." });
  }
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true, token: "admin-token-placeholder", user: { email } });
  }
  return res.status(401).json({ success: false, error: "Credenciais inválidas." });
});

app.listen(PORT, () => console.log(`🚀 Backend rodando na porta ${PORT}`));
