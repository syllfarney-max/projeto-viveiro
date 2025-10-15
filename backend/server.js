import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

// Middlewares
app.use(cors());
app.use(express.json());

// Caminho do arquivo de mensagens
const messagesFile = path.resolve("messages.json");

// 🔹 Rota inicial
app.get("/", (req, res) => {
  res.send("✅ Backend do Viveiros Comurg rodando normalmente!");
});

// 🔹 Envio de mensagem (formulário)
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Campos obrigatórios faltando." });
  }

  try {
    let data = [];
    if (fs.existsSync(messagesFile)) {
      const raw = fs.readFileSync(messagesFile, "utf8");
      if (raw.trim()) data = JSON.parse(raw);
    }

    const newMessage = {
      id: Date.now(),
      name,
      email,
      message,
      date: new Date().toISOString(),
    };

    data.push(newMessage);
    fs.writeFileSync(messagesFile, JSON.stringify(data, null, 2));

    console.log("📩 Nova mensagem salva:", newMessage);
    res.json({ success: true, message: "Mensagem recebida e salva com sucesso!" });
  } catch (err) {
    console.error("❌ Erro ao salvar mensagem:", err);
    res.status(500).json({ success: false, error: "Erro interno no servidor." });
  }
});

// 🔹 Visualização administrativa
app.get("/messages", (req, res) => {
  try {
    if (!fs.existsSync(messagesFile)) return res.json([]);
    const data = JSON.parse(fs.readFileSync(messagesFile, "utf8"));
    res.json(data);
  } catch (err) {
    console.error("❌ Erro ao ler mensagens:", err);
    res.status(500).json({ success: false, error: "Erro ao ler mensagens." });
  }
});

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
