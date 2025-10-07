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

app.get("/debug", (req, res) => {
  res.json({
    contactEmail: process.env.CONTACT_EMAIL || null,
    sendGridKeySet: !!process.env.SENDGRID_API_KEY,
  });
});

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
    res.json({ success: true, message: "Mensagem enviada com sucesso!" });
  } catch (err) {
    console.error("Erro SendGrid:", err.response?.body ?? err);
    res.status(500).json({ success: false, error: "Erro ao enviar mensagem." });
  }
});

app.get("/", (req, res) => res.send("✅ Backend do Viveiro Comurg rodando!"));
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
