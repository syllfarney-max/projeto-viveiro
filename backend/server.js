import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

// Banco simples de mensagens em JSON
const MESSAGES_FILE = "./backend/messages.json";

function saveMessage(message) {
  let messages = [];
  if (fs.existsSync(MESSAGES_FILE)) {
    messages = JSON.parse(fs.readFileSync(MESSAGES_FILE));
  }
  messages.push(message);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

// Envio de mensagem
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
    if (process.env.SENDGRID_API_KEY) {
      await sgMail.send(msg);
    }
    saveMessage({ name, email, message, date: new Date().toISOString() });
    res.json({ success: true, message: "Mensagem enviada com sucesso!" });
  } catch (err) {
    console.error("Erro SendGrid:", err.message);
    res.status(500).json({ success: false, error: "Erro ao enviar mensagem." });
  }
});

// Listar mensagens
app.get("/messages", (req, res) => {
  if (fs.existsSync(MESSAGES_FILE)) {
    res.json(JSON.parse(fs.readFileSync(MESSAGES_FILE)));
  } else {
    res.json([]);
  }
});

// Login simples (admin:8865)
app.post("/login", (req, res) => {
  const { user, password } = req.body;
  if (user === "admin" && password === "8865") {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: "Credenciais inválidas." });
  }
});

app.get("/", (req, res) => res.send("✅ Backend do Viveiro Comurg rodando!"));
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
