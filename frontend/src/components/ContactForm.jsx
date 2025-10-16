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
      if (result.success) {
        setStatus("✅ Mensagem enviada com sucesso!");
        e.target.reset();
      } else {
        setStatus("❌ Erro ao enviar mensagem.");
      }
    } catch (err) {
      setStatus("⚠️ Erro de conexão com o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" name="name" placeholder="Seu nome" required className="border p-2 w-full" />
      <input type="email" name="email" placeholder="Seu email" required className="border p-2 w-full" />
      <textarea name="message" placeholder="Sua mensagem" required className="border p-2 w-full" />
      <button type="submit" className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded">
        Enviar
      </button>
      {status && <p>{status}</p>}
    </form>
  );
}

