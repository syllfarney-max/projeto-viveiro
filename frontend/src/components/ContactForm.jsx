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
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) setStatus("✅ Mensagem enviada com sucesso!");
      else setStatus("❌ Erro ao enviar mensagem.");
    } catch (err) {
      setStatus("❌ Erro de conexão com o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:8,maxWidth:600}}>
      <input type="text" name="name" placeholder="Seu nome" required style={{padding:8}} />
      <input type="email" name="email" placeholder="Seu email" required style={{padding:8}} />
      <textarea name="message" placeholder="Sua mensagem" required style={{padding:8}} />
      <button type="submit" style={{background:'#2f7a4a',color:'#fff',padding:'10px 14px',borderRadius:6}}>Enviar</button>
      {status && <div style={{marginTop:8}}>{status}</div>}
    </form>
  );
}
