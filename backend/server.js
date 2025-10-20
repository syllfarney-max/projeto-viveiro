import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5000;

// 🟢 Middleware CORS configurado corretamente:
app.use(
  cors({
    origin: [
      "https://viveiro-comurg-frontend-56v2.onrender.com", // seu frontend no Render
      "http://localhost:5173", // para rodar localmente se quiser
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

// Rota simples de teste
app.get("/", (req, res) => {
  res.send("🌱 Backend do Viveiros Comurg rodando!");
});

// -----------------------------
// 📩 Rota de envio de mensagens
// -----------------------------
app.post("/api/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "viveirocomurg@gmail.com", // sua conta de envio
        pass: process.env.EMAIL_PASSWORD, // senha ou app password configurada
      },
    });

    await transporter.sendMail({
      from: email,
      to: "viveirocomurg@gmail.com",
      subject: `Nova mensagem de ${name}`,
      text: message,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    res.status(500).json({ error: "Erro ao enviar a mensagem." });
  }
});

// -----------------------------
// 🔐 Rota de login admin
// -----------------------------
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "syllfarney@hotmail.com" && password === "123456") {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ error: "Credenciais inválidas." });
  }
});

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
