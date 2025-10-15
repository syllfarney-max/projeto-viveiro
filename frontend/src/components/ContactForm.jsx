import React, { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");
  // prefer env variable; fallback para seu backend público
  const API_BASE = (import.meta.env.VITE_API_URL) || "https://viveiro-comurg-backend-yjsj.onrender.com";

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Enviando...");
    const payload = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value
    };

    try {
      const res = await fetch(`${API_BASE}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const txt = await res.text().catch(()=>null);
        console.error("Resposta não ok:", res.status, txt);
        setStatus("❌ Erro ao enviar mensagem (ver console).");
        return;
      }

      const data = await res.json().catch(()=>null);
      setStatus(data?.message || "✅ Mensagem enviada com sucesso!");
      e.target.reset();
    } catch (err) {
      console.error("Fetch erro:", err);
      setStatus("⚠️ Erro de conexão com o servidor.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input type="text" name="name" placeholder="Seu nome" required />
      <input type="email" name="email" placeholder="Seu email" required />
      <textarea name="message" placeholder="Sua mensagem" required />
      <button type="submit">Enviar</button>
      {status && <p className="status">{status}</p>}
    </form>
  );
}

