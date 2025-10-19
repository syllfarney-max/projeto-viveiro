import React, { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "https://viveiro-comurg-backend-yjsj.onrender.com"}/send`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (data.success) {
        setStatus("✅ Mensagem enviada com sucesso!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Erro ao enviar mensagem: " + (data.error || "Falha desconhecida."));
      }
    } catch (error) {
      setStatus("⚠️ Erro de conexão com o servidor.");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Seu nome" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Seu e-mail" value={form.email} onChange={handleChange} required />
      <textarea name="message" placeholder="Sua mensagem" rows="4" value={form.message} onChange={handleChange} required />
      <button type="submit" className="btn-send">Enviar</button>
      {status && <p className="status">{status}</p>}
    </form>
  );
}
