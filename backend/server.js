import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

// Configura o SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

// Banco de dados temporário (em memória)
let messages = [];

// Middleware de autenticação simples para /admin
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "1234";

function checkAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Autenticação necessária" });

  const base64 = authHeader.split(" ")[1];
  const [user, pass] = Buffer.from(base64, "base64").toString().split(":");
  if (user === ADMIN_USER && pass === ADMIN_PASS) return next();

  return res.status(403).json({ error: "Credenciais inválidas" });
}

// Endpoint principal de envio de mensagens
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ success: false, error: "Campos obrigatórios faltando." });

  const msg = {
    to: process.env.CONTACT_EMAIL,
    from: process.env.CONTACT_EMAIL,
    subject: `Mensagem do site - ${name}`,
    text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
    replyTo: email,
  };

  try {
    // Armazena localmente a mensagem
    messages.push({
      name,
      email,
      message,
      date: new Date().toISOString(),
    });

    // Envia o e-mail
    if (process.env.SENDGRID_API_KEY && process.env.CONTACT_EMAIL) {
      await sgMail.send(msg);
      console.log("E-mail enviado com sucesso!");
    } else {
      console.warn("⚠️ Envio de e-mail desativado (sem chave SendGrid).");
    }

    res.json({ success: true, message: "Mensagem recebida pelo backend." });
  } catch (err) {
    console.error("Erro SendGrid:", err.response?.body || err);
    res.status(500).json({ success: false, error: "Erro ao enviar mensagem." });
  }
});

// 🔒 Painel administrativo de mensagens
app.get("/messages", checkAuth, (req, res) => {
  res.json({ success: true, total: messages.length, messages });
});

// Página inicial
app.get("/", (req, res) => res.send("✅ Backend do Viveiro Comurg rodando!"));

// Rota de debug
app.get("/debug", (req, res) => {
  res.json({
    contactEmail: process.env.CONTACT_EMAIL || null,
    sendGridKeySet: !!process.env.SENDGRID_API_KEY,
    storedMessages: messages.length,
  });
});

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
