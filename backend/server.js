// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// ✅ Health check
app.get("/", (req, res) => res.send("🌱 Backend do Viveiros Comurg rodando! 🚀"));

// ✅ Garante que a tabela messages existe
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
    console.log("✅ Tabela 'messages' verificada/criada com sucesso.");
  } catch (err) {
    console.error("❌ Erro ao criar/verificar tabela messages:", err);
  }
}
ensureTables();

// ✅ Envio de mensagens (formulário de contato)
app.post("/api/send", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Campos obrigatórios faltando." });
  }

  try {
    await db.query(
      "INSERT INTO messages (name, email, message) VALUES ($1,$2,$3)",
      [name, email, message]
    );

    // 🔹 Envio de e-mail via SendGrid (opcional)
    if (process.env.SENDGRID_API_KEY && process.env.CONTACT_EMAIL) {
      try {
        const transporter = nodemailer.createTransport({
          service: "SendGrid",
          auth: { user: "apikey", pass: process.env.SENDGRID_API_KEY },
        });

        await transporter.sendMail({
          from: process.env.SENDGRID_FROM || process.env.CONTACT_EMAIL,
          to: process.env.CONTACT_EMAIL,
          subject: `🌿 Nova mensagem do site - ${name}`,
          text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
          html: `<p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
        });

        console.log("📧 E-mail enviado com sucesso via SendGrid.");
      } catch (mailErr) {
        console.error("⚠️ Falha ao enviar e-mail (não interrompe execução):", mailErr);
      }
    }

    res.json({ success: true, message: "Mensagem enviada com sucesso!" });
  } catch (err) {
    console.error("❌ Erro ao salvar mensagem:", err);
    res.status(500).json({ success: false, error: "Erro interno no servidor." });
  }
});

// ✅ Retorna mensagens (somente para admin logado)
app.get("/api/messages", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM messages ORDER BY date DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Erro ao buscar mensagens:", err);
    res.status(500).json({ success: false, error: "Erro ao buscar mensagens." });
  }
});

// ✅ Login administrativo simples
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return res.status(500).json({
      success: false,
      error: "Credenciais administrativas não configuradas no servidor.",
    });
  }

  if (email === adminEmail && password === adminPassword) {
    console.log(`🔐 Login admin bem-sucedido: ${email}`);
    return res.json({
      success: true,
      token: "admin-placeholder-token",
      user: { email },
      message: "Login realizado com sucesso!",
    });
  } else {
    return res.status(401).json({ success: false, error: "Credenciais inválidas." });
  }
});

// ✅ Inicializa servidor
app.listen(PORT, () => console.log(`🚀 Backend rodando na porta ${PORT}`));
