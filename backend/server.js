import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = path.resolve();
const messagesFile = path.join(__dirname, "backend/messages.json");

app.use(cors());
app.use(express.json());

app.post("/send", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.json({ success: false, error: "Campos obrigatórios." });
  }

  const data = JSON.parse(fs.existsSync(messagesFile) ? fs.readFileSync(messagesFile) : "[]");
  data.push({ name, email, message, date: new Date().toISOString() });
  fs.writeFileSync(messagesFile, JSON.stringify(data, null, 2));

  res.json({ success: true });
});

app.get("/messages", (req, res) => {
  if (!fs.existsSync(messagesFile)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(messagesFile));
  res.json(data);
});

app.listen(PORT, () => console.log(`✅ Backend rodando na porta ${PORT}`));
