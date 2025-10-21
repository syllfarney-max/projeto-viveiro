import React, { useState } from "react";

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

    const apiUrl = import.meta.env.VITE_API_URL || "https://viveiro-comurg-backend-yjsj.onrender.com";

    try {
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let result = {};
      try { result = await res.json(); } catch (e) { result = { success: false }; }

      if (res.ok && result.success) {
        setStatus("✅ Mensagem enviada com sucesso!");
        e.target.reset();
      } else {
        setStatus("❌ Erro ao enviar mensagem.");
      }
    } catch (err) {
      console.error("Erro de conexão:", err);
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