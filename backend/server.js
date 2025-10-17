import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;
app.use(cors());
app.use(express.json());
const messagesFile = path.resolve("messages.json");
app.get("/", (req, res) => res.send("✅ Backend do Viveiros Comurg rodando!"));
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ success:false, error:"Campos obrigatórios faltando."});
  try {
    let data = [];
    if (fs.existsSync(messagesFile)) {
      const raw = fs.readFileSync(messagesFile,"utf8");
      if (raw.trim()) data = JSON.parse(raw);
    }
    const newMessage = { id: Date.now(), name, email, message, date: new Date().toISOString() };
    data.push(newMessage);
    fs.writeFileSync(messagesFile, JSON.stringify(data,null,2));
    res.json({ success:true });
  } catch(err){ console.error(err); res.status(500).json({ success:false, error:"Erro interno" }) }
});
app.get("/messages",(req,res)=>{
  if (!fs.existsSync(messagesFile)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(messagesFile,"utf8"));
  res.json(data);
});
app.listen(PORT, ()=>console.log(`Servidor rodando na porta ${PORT}`));
