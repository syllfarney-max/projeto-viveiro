import React, { useState } from "react";
import axios from "axios";

const API_ROOT = import.meta.env.VITE_API_URL || "https://viveiro-comurg-backend-yjsj.onrender.com";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Enviando...");
    try {
      const res = await axios.post(`${API_ROOT}/api/send`, formData);
      if (res.data.success) {
        setStatus("✅ Mensagem enviada com sucesso!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Erro ao enviar mensagem.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Erro de conexão com o servidor.");
    }
  };

  return (
    <section className="contact-section">
      <h2>Entre em Contato</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="name" placeholder="Seu nome" value={formData.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Seu e-mail" value={formData.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Sua mensagem" value={formData.message} onChange={handleChange} required />
        <button type="submit" className="btn-send">Enviar</button>
      </form>
      {status && <p className="status">{status}</p>}
    </section>
  );
}
