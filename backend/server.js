import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

const messagesFile = path.join(process.cwd(), "backend", "messages.json");
if (!fs.existsSync(messagesFile)) fs.writeFileSync(messagesFile, "[]");

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

// --- Rotas principais ---
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
    await sgMail.send(msg);
  } catch (err) {
    console.log("SendGrid falhou, salvando localmente...");
  }

  const existing = JSON.parse(fs.readFileSync(messagesFile));
  existing.push({ name, email, message, date: new Date().toISOString() });
  fs.writeFileSync(messagesFile, JSON.stringify(existing, null, 2));

  res.json({ success: true, message: "Mensagem recebida e salva com sucesso!" });
});

app.get("/messages", (req, res) => {
  const data = JSON.parse(fs.readFileSync(messagesFile));
  res.json(data);
});

app.get("/", (req, res) => res.send("✅ Backend do Viveiro Comurg rodando!"));
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

