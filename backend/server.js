import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import nodemailer from 'nodemailer';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get('/api/status', (req, res) => res.json({ status: 'Servidor ativo e rodando!' }));

app.post('/api/contato', async (req, res) => {
  const { nome, email, mensagem } = req.body;
  if (!nome || !email || !mensagem) return res.status(400).json({ erro: 'Campos obrigatórios faltando.' });
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.CONTACT_EMAIL, pass: process.env.SENDGRID_API_KEY },
  });
  try {
    await transporter.sendMail({
      from: process.env.SENDGRID_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `Mensagem de ${nome}`,
      text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`,
    });
    res.json({ sucesso: true, mensagem: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha ao enviar o email.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
