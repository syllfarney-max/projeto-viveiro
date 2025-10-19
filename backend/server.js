import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import nodemailer from "nodemailer";

dotenv.config();
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 10000;

// PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: { rejectUnauthorized: false },
});

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Rota principal
app.get("/", (req, res) => {
  res.send("🌱 Backend do Viveiros Comurg rodando normalmente!");
});

// ✅ Envio de mensagens
app.post("/api/send", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ success: false, error: "Campos obrigatórios faltando." });

  try {
    const result = await pool.query(
      "INSERT INTO messages (name, email, message, date) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [name, email, message]
    );

    // Envio de e-mail
    if (process.env.SENDGRID_API_KEY) {
      const transporter = nodemailer.createTransport({
        service: "SendGrid",
        auth: { user: "apikey", pass: process.env.SENDGRID_API_KEY },
      });

      await transporter.sendMail({
        from: process.env.SENDGRID_FROM || "noreply@viveirocomurg.com.br",
        to: process.env.CONTACT_EMAIL || "syllfarney@hotmail.com",
        subject: "🌿 Nova mensagem — Viveiros Comurg",
        text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
      });
    }

    res.json({ success: true, message: "Mensagem enviada com sucesso!" });
  } catch (err) {
    console.error("❌ Erro:", err);
    res.status(500).json({ success: false, error: "Erro interno no servidor." });
  }
});

// ✅ Lista de mensagens (admin)
app.get("/api/messages", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages ORDER BY date DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Erro ao buscar mensagens:", err);
    res.status(500).json({ success: false, error: "Erro ao buscar mensagens." });
  }
});

app.listen(PORT, () => console.log(`🚀 Backend rodando na porta ${PORT}`));
