import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 10000;

let messages = []; // armazenar temporariamente

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ success: false, error: "Campos obrigatórios faltando." });

  messages.push({ name, email, message, date: new Date() });
  return res.json({ success: true, message: "Mensagem enviada com sucesso!" });
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.get("/admin/messages", (req, res) => res.json(messages));

app.get("/", (req, res) => res.send("✅ Backend do Viveiro Comurg rodando com sucesso!"));

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
