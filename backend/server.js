import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Configura CORS de forma ampla ou restrita ao domínio do frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || "*", // Ex: https://viveiro-frontend.onrender.com
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Health
app.get("/", (req, res) => res.send("🌱 Backend do Viveiros Comurg rodando!"));

// Cria tabela de mensagens, se não existir
async function ensureTables() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}
ensureTables();

// Envio de mensagem
app.post("/api/send", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ success: false, error: "Campos obrigatórios faltando." });

  try {
    await db.query("INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)", [name, email, message]);

    // Envio de e-mail (opcional)
    if (process.env.SENDGRID_API_KEY && process.env.CONTACT_EMAIL) {
      const transporter = nodemailer.createTransport({
        service: "SendGrid",
        auth: { user: "apikey", pass: process.env.SENDGRID_API_KEY },
      });

      await transporter.sendMail({
        from: process.env.SENDGRID_FROM || process.env.CONTACT_EMAIL,
        to: process.env.CONTACT_EMAIL,
        subject: `🌿 Nova mensagem do site - ${name}`,
        text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
      });
    }

    res.json({ success: true, message: "Mensagem enviada com sucesso!" });
  } catch (err) {
    console.error("Erro ao salvar/enviar mensagem:", err);
    res.status(500).json({ success: false, error: "Erro interno no servidor." });
  }
});

// Login administrativo
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true, message: "Login realizado com sucesso!" });
  }
  return res.status(401).json({ success: false, error: "Credenciais inválidas." });
});

// Listagem de mensagens (admin)
app.get("/api/messages", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM messages ORDER BY date DESC");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar mensagens:", err);
    res.status(500).json({ success: false, error: "Erro ao buscar mensagens." });
  }
});

app.listen(PORT, () => console.log(`🚀 Backend rodando na porta ${PORT}`));
