import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const MESSAGES_FILE = "./backend/messages.json";

app.use(cors());
app.use(bodyParser.json());

// 📨 Envio de mensagens
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ success: false, error: "Campos obrigatórios faltando." });

  const newMessage = {
    id: Date.now(),
    name,
    email,
    message,
    date: new Date().toLocaleString(),
  };

  try {
    let messages = [];
    if (fs.existsSync(MESSAGES_FILE)) {
      messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf8"));
    }
    messages.push(newMessage);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    res.json({ success: true, message: "Mensagem recebida com sucesso!" });
  } catch (err) {
    console.error("Erro ao salvar mensagem:", err);
    res.status(500).json({ success: false, error: "Erro ao salvar mensagem." });
  }
});

// 🔐 Login administrativo
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "8865") {
    return res.json({ success: true });
  }
  res.status(401).json({ success: false, message: "Credenciais inválidas." });
});

// 📄 Listar mensagens
app.get("/messages", (req, res) => {
  if (!fs.existsSync(MESSAGES_FILE)) return res.json([]);
  const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf8"));
  res.json(messages);
});

app.get("/", (_, res) => res.send("✅ Backend do Viveiro Comurg rodando!"));

app.listen(PORT, () => console.log(`🚀 Backend rodando na porta ${PORT}`));
