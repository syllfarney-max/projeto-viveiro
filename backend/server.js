import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Backend rodando corretamente!" }));

app.post("/send", (req, res) => {
  console.log("Mensagem recebida:", req.body);
  res.json({ success: true, message: "Mensagem recebida pelo backend (simulação)" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));