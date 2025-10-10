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
      setStatus(result.message || "Erro ao enviar mensagem.");
    } catch (err) {
      setStatus("❌ Erro de conexão com o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="name" placeholder="Seu nome" required className="border p-2 w-full" />
      <input type="email" name="email" placeholder="Seu email" required className="border p-2 w-full" />
      <textarea name="message" placeholder="Sua mensagem" required className="border p-2 w-full" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2">Enviar</button>
      {status && <p>{status}</p>}
    </form>
  );
}
