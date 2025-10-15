import React, { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Enviando...");

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch("https://viveiro-comurg-backend-yjsj.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("✅ Mensagem enviada com sucesso!");
        e.target.reset();
      } else {
        setStatus("❌ Erro ao enviar mensagem.");
      }
    } catch (err) {
      console.error(err);
      setStatus("⚠️ Erro de conexão com o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Nome" required />
      <input type="email" name="email" placeholder="Email" required />
      <textarea name="message" placeholder="Mensagem" required></textarea>
      <button type="submit">Enviar</button>
      {status && <p className="status">{status}</p>}
    </form>
  );
}
