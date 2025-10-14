import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) setStatus("✅ Mensagem enviada com sucesso!");
      else setStatus("❌ Erro ao enviar mensagem.");
    } catch {
      setStatus("⚠️ Erro de conexão com servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" type="text" placeholder="Seu nome" required />
      <input name="email" type="email" placeholder="Seu e-mail" required />
      <textarea name="message" placeholder="Sua mensagem" required />
      <button type="submit">Enviar</button>
      {status && <p>{status}</p>}
    </form>
  );
}
