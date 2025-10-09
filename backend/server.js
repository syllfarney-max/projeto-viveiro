const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');

const app = express();
app.use(cors());
app.use(bodyParser.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;
  const msg = {
    to: process.env.CONTACT_EMAIL,
    from: process.env.CONTACT_EMAIL,
    subject: `Mensagem do site Viveiro - ${name}`,
    text: `Email: ${email}\nMensagem: ${message}`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ success: false, message: 'Erro ao enviar mensagem.' });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
