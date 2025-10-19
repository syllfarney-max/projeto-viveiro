// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// health
app.get("/", (req, res) => res.send("🌱 Backend do Viveiros Comurg rodando!"));

// -- cria tabela simples messages se não existir (útil em deploy inicial)
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

// POST /api/send  -> recebe form e salva + opcional envia e-mail via SendGrid (nodemailer com SendGrid)
app.post("/api/send", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Campos obrigatórios faltando." });
  }

  try {
    const insert = await db.query(
      "INSERT INTO messages (name, email, message) VALUES ($1,$2,$3) RETURNING *",
      [name, email, message]
    );

    // Envio de e-mail (via Nodemailer + SendGrid SMTP or 'SendGrid' if configured)
    if (process.env.SENDGRID_API_KEY) {
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
          subject: `🌿 Nova mensagem do site - ${name}`,
          text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
          html: `<p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
        });
      } catch (mailErr) {
        console.error("Erro no envio de e-mail (continuando):", mailErr?.response ?? mailErr);
        // não falhar a requisição apenas por falha no e-mail
      }
    }

    res.json({ success: true, message: "Mensagem enviada com sucesso!" });
  } catch (err) {
    console.error("Erro ao salvar mensagem:", err);
    res.status(500).json({ success: false, error: "Erro interno no servidor." });
  }
});

// GET /api/messages -> retorna lista (admin)
app.get("/api/messages", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM messages ORDER BY date DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar mensagens:", err);
    res.status(500).json({ success: false, error: "Erro ao buscar mensagens." });
  }
});

// exemplo de rota admin login simples (pode ser trocada por JWT depois)
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  // credencial simples por env (produção: trocar para DB + hash)
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true, token: "admin-placeholder-token", user: { email } });
  }
  return res.status(401).json({ success: false, error: "Credenciais inválidas." });
});

app.listen(PORT, () => console.log(`🚀 Backend rodando na porta ${PORT}`));
