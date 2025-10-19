import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      const response = await fetch("https://viveiro-comurg-backend-yjsj.onrender.com/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("✅ Mensagem enviada com sucesso!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Erro ao enviar mensagem. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      setStatus("❌ Erro de conexão com o servidor.");
    }
  };

  return (
    <section id="contato" className="contact-section">
      <h2 className="contact-title">Entre em Contato</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
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
          placeholder="Escreva sua mensagem..."
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Enviar Mensagem</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </section>
  );
};

export default ContactForm;
