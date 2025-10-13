import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;
const __dirname = path.resolve();

app.use(cors());
app.use(bodyParser.json());

// Caminho do arquivo de mensagens (armazenamento local temporário)
const messagesFile = path.join(__dirname, "backend", "messages.json");

// Garante que o arquivo existe
if (!fs.existsSync(messagesFile)) fs.writeFileSync(messagesFile, "[]");

// Endpoint de teste
app.get("/", (req, res) => res.send("✅ Backend do Viveiro Comurg rodando!"));

// Envio de mensagens do formulário
app.post("/send", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ success: false, error: "Campos obrigatórios faltando." });

  const newMessage = { id: Date.now(), name, email, message, date: new Date().toISOString() };
  const existing = JSON.parse(fs.readFileSync(messagesFile));
  existing.push(newMessage);
  fs.writeFileSync(messagesFile, JSON.stringify(existing, null, 2));

  return res.json({ success: true, message: "Mensagem recebida pelo backend (simulação)." });
});

// Endpoint administrativo: listar mensagens
app.get("/messages", (req, res) => {
  const data = JSON.parse(fs.readFileSync(messagesFile));
  res.json(data);
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
