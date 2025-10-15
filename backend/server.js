import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

const __dirname = path.resolve();
const messagesFile = path.join(__dirname, "backend/messages.json");

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

// Simples persistência local
function readMessages() {
  if (!fs.existsSync(messagesFile)) return [];
  const data = fs.readFileSync(messagesFile, "utf8");
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveMessage(msg) {
  const all = readMessages();
  all.push(msg);
  fs.writeFileSync(messagesFile, JSON.stringify(all, null, 2));
}

// Rota de envio
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
    if (process.env.SENDGRID_API_KEY) await sgMail.send(msg);
    const entry = { name, email, message, date: new Date().toISOString() };
    saveMessage(entry);
    return res.json({ success: true, message: "Mensagem enviada e registrada!" });
  } catch (err) {
    console.error("Erro SendGrid:", err.response?.body ?? err);
    return res.status(500).json({ success: false, error: "Erro ao enviar mensagem." });
  }
});

// Login fixo
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "8865") {
    return res.json({ success: true, token: "ok-admin-token" });
  }
  return res.status(401).json({ success: false, error: "Credenciais inválidas." });
});

// Mensagens administrativas
app.get("/messages", (req, res) => {
  const messages = readMessages();
  res.json(messages.reverse());
});

app.get("/", (req, res) => res.send("✅ Backend do Viveiro Comurg rodando!"));
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

