import React, { useState } from "react";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.message || "Mensagem enviada!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <textarea name="message" placeholder="Mensagem" value={form.message} onChange={handleChange} required />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ContactForm;
