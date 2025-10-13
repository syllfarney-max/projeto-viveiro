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

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

// simple in-memory store for demo messages
const messages = [];

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Campos obrigatórios faltando." });
  }

  // store message (for /messages admin preview)
  messages.push({ name, email, message, date: new Date().toISOString() });

  if (!process.env.SENDGRID_API_KEY) {
    console.log(`Simulação: Mensagem recebida de ${name} <${email}>: ${message}`);
    return res.json({ success: true, message: "Mensagem recebida pelo backend (simulação)." });
  }

  const msg = {
    to: process.env.CONTACT_EMAIL,
    from: process.env.CONTACT_EMAIL,
    subject: `Mensagem do site - ${name}`,
    text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
    replyTo: email,
  };

  try {
    await sgMail.send(msg);
    return res.json({ success: true, message: "Mensagem enviada com sucesso!" });
  } catch (err) {
    console.error("Erro SendGrid:", err.response?.body || err);
    return res.status(500).json({ success: false, error: "Erro ao enviar mensagem." });
  }
});

app.get("/messages", (req, res) => {
  // basic auth simulation via query param ?key=ADMIN_KEY or real auth to be implemented
  res.json({ success: true, messages });
});

app.get("/debug", (req, res) => {
  res.json({
    contactEmail: process.env.CONTACT_EMAIL || null,
    sendGridKeySet: !!process.env.SENDGRID_API_KEY,
    messagesCount: messages.length
  });
});

app.get("/", (req, res) => res.send("Backend Viveiro Comurg OK"));

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
