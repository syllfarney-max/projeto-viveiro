const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');

const app = express();
app.use(cors());
app.use(bodyParser.json());

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('SendGrid API key detected.');
} else {
  console.log('Warning: SENDGRID_API_KEY not set. Email sending will be disabled.');
}

app.get('/', (req, res) => res.json({ status: 'ok' }));

app.post('/send', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ success: false, error: 'Campos obrigatórios faltando.' });

  if (!process.env.SENDGRID_API_KEY || !process.env.CONTACT_EMAIL) {
    console.log('Simulação: recebida mensagem', { name, email, message });
    return res.json({ success: true, message: 'Mensagem recebida pelo backend (simulação).' });
  }

  const msg = {
    to: process.env.CONTACT_EMAIL,
    from: process.env.CONTACT_EMAIL,
    subject: `Mensagem do site - ${name}`,
    text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
    replyTo: email,
  };

  try {
    await sgMail.send(msg);
    return res.json({ success: true, message: 'Mensagem enviada com sucesso!' });
  } catch (err) {
    console.error('Erro SendGrid:', err && err.response ? err.response.body : err);
    return res.status(500).json({ success: false, error: 'Erro ao enviar mensagem.' });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
