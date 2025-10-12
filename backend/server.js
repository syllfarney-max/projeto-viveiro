import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

const messages = [];

// Envio de mensagem
app.post("/send", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Campos obrigatórios faltando." });
  }
  const newMessage = { id: messages.length + 1, name, email, message, date: new Date() };
  messages.push(newMessage);
  return res.json({ success: true, message: "Mensagem recebida pelo backend (simulação)." });
});

// Visualizar mensagens
app.get("/messages", (req, res) => res.json(messages));

// Login simples do admin
app.post("/admin/login", (req, res) => {
  const { user, pass } = req.body;
  if (user === "admin" && pass === "1234") {
    return res.json({ success: true });
  }
  res.status(401).json({ success: false, error: "Credenciais inválidas." });
});

app.get("/", (req, res) => res.send("✅ Backend do Viveiro Comurg rodando!"));

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

