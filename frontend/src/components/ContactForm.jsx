// frontend/src/components/ContactForm.jsx
import React, { useState } from "react";
import api from "../services/api";

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
      const res = await api.post("/api/send", data);
      if (res.data?.success) {
        setStatus("✅ Mensagem enviada com sucesso!");
        e.target.reset();
      } else {
        setStatus("❌ Erro ao enviar mensagem.");
        console.error("Resposta inesperada do backend:", res.data);
      }
    } catch (err) {
      console.error("Erro de conexão (ContactForm):", err);
      setStatus("❌ Erro de conexão com o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="name" placeholder="Seu nome" required />
      <input name="email" type="email" placeholder="Seu e-mail" required />
      <textarea name="message" placeholder="Sua mensagem" required />
      <button type="submit">Enviar</button>
      {status && <p className="status">{status}</p>}
    </form>
  );
}
