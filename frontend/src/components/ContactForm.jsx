import { useState } from "react";

/**
 * ContactForm corrigido:
 * - Usa VITE_API_URL se definido, caso contrário usa fallback absoluto do backend.
 * - Normaliza a URL (remove barra final).
 * - Mostra erros detalhados no console para facilitar debug.
 */

const getBackendBase = () => {
  // 1) Prefere variável de build
  const fromEnv = import.meta.env.VITE_API_URL;
  if (fromEnv && fromEnv.trim() !== "") return fromEnv.replace(/\/+$/, "");
  // 2) Fallback absoluto conhecido (substitua se usar outro backend)
  return "https://viveiro-comurg-backend-yjsj.onrender.com".replace(/\/+$/, "");
};

export default function ContactForm() {
  const [status, setStatus] = useState(null);
  const backend = getBackendBase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const payload = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      message: e.target.message.value.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("❌ Preencha todos os campos.");
      return;
    }

    try {
      const url = `${backend}/send`;
      console.log("[ContactForm] Enviando para:", url, "payload:", payload);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Se não houver resposta JSON, lançar erro
      const text = await res.text();
      let result;
      try {
        result = text ? JSON.parse(text) : null;
      } catch (parseErr) {
        console.error("[ContactForm] JSON parse error:", parseErr, "raw:", text);
        throw new Error("Resposta inesperada do servidor.");
      }

      if (!res.ok) {
        console.error("[ContactForm] HTTP error:", res.status, result);
        setStatus("❌ Erro ao enviar mensagem. (Servidor)");
        return;
      }

      if (result && result.success) {
        setStatus("✅ Mensagem enviada com sucesso!");
        e.target.reset();
      } else {
        console.error("[ContactForm] Resposta sem success:", result);
        setStatus("❌ Erro ao enviar mensagem.");
      }
    } catch (err) {
      console.error("[ContactForm] Erro de conexão:", err);
      setStatus("❌ Erro de conexão com o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form" style={{display:'flex',flexDirection:'column',gap:8,maxWidth:600, margin: '0 auto'}}>
      <input type="text" name="name" placeholder="Seu nome" required style={{padding:8}} />
      <input type="email" name="email" placeholder="Seu email" required style={{padding:8}} />
      <textarea name="message" placeholder="Sua mensagem" required style={{padding:8}} />
      <button type="submit" style={{background:'#2f7a4a',color:'#fff',padding:'10px 14px',borderRadius:6}}>Enviar</button>
      {status && <div style={{marginTop:8}}>{status}</div>}
    </form>
  );
}
