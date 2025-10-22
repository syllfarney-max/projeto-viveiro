import React, { useState } from "react";
import axios from "axios";

const API_ROOT =
  import.meta.env.VITE_API_URL || "https://viveiro-comurg-backend-yjsj.onrender.com";

export default function ContactForm() {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Enviando...");
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const res = await axios.post(`${API_ROOT}/api/send`, data, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.data?.success) {
        setStatus("✅ Mensagem enviada com sucesso!");
        e.target.reset();
      } else {
        setStatus("❌ Erro ao enviar mensagem.");
        console.error("Resposta do backend:", res.data);
      }
    } catch (err) {
      console.error("Erro ao enviar (frontend):", err);
      setStatus("❌ Erro de conexão com o servidor.");
    }
  };

  return (
    <section className="contact-section">
      <h2>Entre em Contato</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="name" placeholder="Seu nome" required />
        <input name="email" type="email" placeholder="Seu e-mail" required />
        <textarea name="message" placeholder="Sua mensagem" required />
        <button type="submit" className="btn-send">Enviar</button>
      </form>
      {status && <p className="status">{status}</p>}
    </section>
  );
}

