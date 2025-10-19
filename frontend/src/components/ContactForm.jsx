import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("✅ Mensagem enviada com sucesso!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Erro ao enviar a mensagem.");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Erro de conexão com o servidor.");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Seu nome"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Seu e-mail"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <textarea
        name="message"
        placeholder="Sua mensagem"
        value={formData.message}
        onChange={handleChange}
        required
      />

      <button type="submit" className="button-link admin">Enviar Mensagem</button>
      {status && <p className="status">{status}</p>}
    </form>
  );
}
