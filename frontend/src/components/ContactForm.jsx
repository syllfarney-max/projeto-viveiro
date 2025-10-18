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

    // ✅ fallback seguro caso a variável de ambiente não esteja configurada
    const apiUrl =
      import.meta.env.VITE_API_URL ||
      "https://viveiro-comurg-backend-yjsj.onrender.com";

    try {
      const res = await fetch(`${apiUrl}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // se a resposta não for JSON válida, evita quebra
      let result = {};
      try {
        result = await res.json();
      } catch {
        result = { success: false };
      }

      if (res.ok && result.success !== false) {
        setStatus("✅ Mensagem enviada com sucesso!");
        e.target.reset();
      } else {
        setStatus("❌ Erro ao enviar mensagem.");
      }
    } catch (err) {
      console.error("Erro ao conectar:", err);
      setStatus("⚠️ Erro de conexão com o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input type="text" name="name" placeholder="Seu nome" required />
      <input type="email" name="email" placeholder="Seu email" required />
      <textarea name="message" placeholder="Sua mensagem" required />
      <button type="submit">Enviar</button>
      {status && <p className="status">{status}</p>}
    </form>
  );
}
