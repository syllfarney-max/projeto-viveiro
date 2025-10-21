// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import { query, saveMessageToFile, readMessagesFromFile } from "./db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

// Allowed origins - inclua todas as variantes que usa
const allowedOrigins = [
  "https://viveiro-comurg-frontend-56v2.onrender.com",
  "https://viveiro-comurg-frontend.onrender.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // permitir requests sem origin (curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // também permitir wildcard if env says so
      if (process.env.ALLOW_ALL_ORIGINS === "true") return callback(null, true);
      return callback(new Error("CORS bloqueado para essa origem: " + origin));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// health
app.get("/", (req, res) => res.send("🌱 Backend do Viveiros Comurg rodando!"));

// ensure table if DB present
async function ensureTables() {
  try {
    if (process.env.DB_HOST) {
      await query(`
        CREATE TABLE IF NOT EXISTS messages (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          message TEXT NOT NULL,
          date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }
  } catch (err) {
    console.error("Erro ao criar tabela messages:", err);
  }
}
ensureTables();

// POST /api/send
app.post("/api/send", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Campos obrigatórios faltando." });
  }

  const newMessage = {
    name,
    email,
    message,
    date: new Date().toISOString(),
  };

  try {
    if (process.env.DB_HOST) {
      // try save to db
      await query("INSERT INTO messages (name, email, message) VALUES ($1,$2,$3)", [
        name,
        email,
        message,
      ]);
    } else {
      // fallback file
      saveMessageToFile({ id: Date.now(), ...newMessage });
    }

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
          text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
          html: `<p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
        });
      } catch (mailErr) {
        console.error("Erro no envio de e-mail:", mailErr);
        // não falhar por causa do e-mail
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
    if (process.env.DB_HOST) {
      const r = await query("SELECT * FROM messages ORDER BY date DESC");
      return res.json(r.rows);
    } else {
      const arr = readMessagesFromFile();
      return res.json(arr);
    }
  } catch (err) {
    console.error("Erro ao buscar mensagens:", err);
    return res.status(500).json({ success: false, error: "Erro ao buscar mensagens." });
  }
});

// POST /api/admin/login - login fixo (admin / 8865) OR ENV driven
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  // If ADMIN_MODE=fixed or no ADMIN_EMAIL in env, use fixed login
  const useFixed = process.env.ADMIN_MODE === "fixed" || !process.env.ADMIN_EMAIL;

  if (useFixed) {
    if (email === "admin" && password === "8865") {
      return res.json({ success: true, token: "admin-placeholder-token", user: { email } });
    } else {
      return res.status(401).json({ success: false, error: "Credenciais inválidas." });
    }
  }

  // ENV-based (if you set ADMIN_EMAIL/ADMIN_PASSWORD in Render)
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true, token: "admin-placeholder-token", user: { email } });
  }

  return res.status(401).json({ success: false, error: "Credenciais inválidas." });
});

app.listen(PORT, () => console.log(`🚀 Backend rodando na porta ${PORT}`));
