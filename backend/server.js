
// server.js (CommonJS)
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

app.get("/debug", (req, res) => {
  res.json({
    contactEmail: process.env.CONTACT_EMAIL || null,
    sendGridKeySet: !!process.env.SENDGRID_API_KEY,
  });
});

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Campos obrigatórios faltando." });
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
    console.error("Erro SendGrid:", err.response?.body ?? err);
    return res.status(500).json({ success: false, error: "Erro ao enviar mensagem." });
  }
});

app.get("/", (req, res) => res.send("✅ Backend do Viveiro Comurg rodando!"));

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
