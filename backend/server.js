// backend/server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

const messagesFile = path.resolve("./backend/messages.json");

// Utility: read messages
function readMessages() {
  if (!fs.existsSync(messagesFile)) return [];
  try {
    const raw = fs.readFileSync(messagesFile, "utf8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

// Utility: save message
function saveMessage(entry) {
  const arr = readMessages();
  arr.push(entry);
  fs.writeFileSync(messagesFile, JSON.stringify(arr, null, 2));
}

// Health
app.get("/", (req, res) => {
  res.send("✅ Backend do Viveiro Comurg rodando!");
});

// Send endpoint: saves locally and (optionally) attempts SendGrid if configured
app.post("/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Campos obrigatórios faltando." });
    }

    const entry = { name, email, message, date: new Date().toISOString() };
    saveMessage(entry);

    // Try SendGrid only if key & contact email provided
    const sgKey = process.env.SENDGRID_API_KEY;
    const contact = process.env.CONTACT_EMAIL;
    if (sgKey && contact) {
      try {
        const sgMail = await import("@sendgrid/mail");
        sgMail.default.setApiKey(sgKey);
        await sgMail.default.send({
          to: contact,
          from: contact,
          subject: `Mensagem do site - ${name}`,
          text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
          replyTo: email,
        });
        return res.json({ success: true, message: "Mensagem enviada e registrada!" });
      } catch (err) {
        console.error("SendGrid falhou:", err?.response?.body ?? err);
        // but still return success because message is saved locally
        return res.json({ success: true, message: "Mensagem registrada localmente (SendGrid falhou)." });
      }
    }

    // No sendgrid configured: return success (saved locally)
    return res.json({ success: true, message: "Mensagem registrada localmente." });
  } catch (err) {
    console.error("Erro /send:", err);
    return res.status(500).json({ success: false, error: "Erro interno do servidor." });
  }
});

// Admin login (simple static auth - tokenless)
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // STATIC CREDENTIALS (change in production)
  if (username === "admin" && password === "8865") {
    return res.json({ success: true });
  }
  return res.status(401).json({ success: false, error: "Credenciais inválidas." });
});

// Admin messages listing (no auth for simplicity - in prod add token)
app.get("/messages", (req, res) => {
  const msgs = readMessages();
  // newest first
  return res.json(msgs.slice().reverse());
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

