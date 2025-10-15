import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

const __dirname = path.resolve();
const messagesFile = path.join(__dirname, "backend/messages.json");

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

// salva localmente (mesmo se SendGrid falhar)
function saveMessageLocally(entry) {
  const all = fs.existsSync(messagesFile)
    ? JSON.parse(fs.readFileSync(messagesFile, "utf8"))
    : [];
  all.push(entry);
  fs.writeFileSync(messagesFile, JSON.stringify(all, null, 2));
}

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ success: false, error: "Campos obrigatórios faltando." });

  const entry = { name, email, message, date: new Date().toISOString() };
  saveMessageLocally(entry);

  const msg = {
    to: process.env.CONTACT_EMAIL,
    from: process.env.CONTACT_EMAIL,
    subject: `Mensagem do site - ${name}`,
    text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
    replyTo: email,
  };

  try {
    if (process.env.SENDGRID_API_KEY) await sgMail.send(msg);
    res.json({ success: true, message: "Mensagem enviada com sucesso!" });
  } catch (error) {
    console.error("Erro SendGrid:", error.response?.body ?? error);
    res.json({ success: true, message: "Mensagem registrada localmente (simulação ativa)." });
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "8865") {
    return res.json({ success: true, token: "ok-admin-token" });
  }
  return res.status(401).json({ success: false, error: "Credenciais inválidas." });
});

app.get("/messages", (req, res) => {
  if (!fs.existsSync(messagesFile)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(messagesFile, "utf8"));
  res.json(data.reverse());
});

app.get("/", (_, res) => res.send("✅ Backend do Viveiro Comurg rodando!"));
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

