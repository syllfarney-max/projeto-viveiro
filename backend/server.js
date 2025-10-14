import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

const __dirname = path.resolve();
const messagesFile = path.join(__dirname, "backend", "messages.json");

function getMessages() {
  try {
    const data = fs.readFileSync(messagesFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

app.get("/", (req, res) => res.send("✅ Backend do Viveiro Comurg rodando!"));

app.post("/send", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ success: false, error: "Campos obrigatórios faltando." });

  const newMessage = {
    id: Date.now(),
    name,
    email,
    message,
    date: new Date().toLocaleString("pt-BR"),
  };

  const messages = getMessages();
  messages.push(newMessage);
  fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));

  res.json({ success: true, message: "Mensagem recebida pelo backend (simulação)." });
});

app.post("/login", (req, res) => {
  const { user, password } = req.body;
  if (user === "admin" && password === "8865") {
    res.json({ success: true, token: "autorizado" });
  } else {
    res.status(401).json({ success: false, message: "Credenciais inválidas" });
  }
});

app.get("/messages", (req, res) => {
  const messages = getMessages();
  res.json(messages);
});

app.listen(PORT, () => console.log(`🚀 Backend rodando na porta ${PORT}`));
