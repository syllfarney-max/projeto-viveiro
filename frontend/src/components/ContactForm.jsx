// frontend/src/components/ContactForm.jsx
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  const apiBase = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Enviando...");
    const payload = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    const target = apiBase ? `${apiBase}/send` : "/send";
    try {
      const res = await fetch(target, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("Resposta não OK:", res.status, txt);
        setStatus("❌ Erro ao enviar mensagem. (ver console)");
        return;
      }

      const data = await res.json().catch(() => null);
      setStatus(data?.message || "✅ Mensagem enviada com sucesso!");
    } catch (err) {
      console.error("Falha no fetch para", target, err);
      setStatus("⚠️ Erro de conexão com o servidor.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="name" placeholder="Seu nome" required className="border p-2 w-full" />
      <input name="email" type="email" placeholder="Seu email" required className="border p-2 w-full" />
      <textarea name="message" placeholder="Sua mensagem" required className="border p-2 w-full" />
      <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">Enviar</button>
      {status && <p className="mt-2">{status}</p>}
    </form>
  );
}
