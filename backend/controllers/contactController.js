import sgMail from "@sendgrid/mail";
import { pool } from "../server.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });

  try {
    await pool.query(
      "INSERT INTO messages (name, email, message, created_at) VALUES ($1, $2, $3, NOW())",
      [name, email, message]
    );

    const msg = {
      to: process.env.CONTACT_EMAIL,
      from: process.env.CONTACT_EMAIL,
      subject: `Nova mensagem de ${name}`,
      text: message,
      html: `<strong>Nome:</strong> ${name}<br><strong>Email:</strong> ${email}<br><br>${message}`,
    };

    await sgMail.send(msg);
    res.json({ success: true, message: "Mensagem enviada e salva com sucesso!" });
  } catch (err) {
    console.error("Erro ao enviar/salvar:", err);
    res.status(500).json({ error: "Erro no envio da mensagem." });
  }
};
