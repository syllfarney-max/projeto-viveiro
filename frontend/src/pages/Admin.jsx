import React, { useState, useEffect } from "react";

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [messages, setMessages] = useState([]);

  const API_BASE = (import.meta.env.VITE_API_URL) || "https://viveiro-comurg-backend-yjsj.onrender.com";

  async function handleLogin(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        setAuth(true);
      } else {
        alert("Login inválido.");
      }
    } catch (err) {
      alert("Erro de conexão no login.");
    }
  }

  useEffect(() => {
    if (!auth) return;
    fetch(`${API_BASE}/messages`)
      .then(r => r.json())
      .then(setMessages)
      .catch(() => setMessages([]));
  }, [auth]);

  if (!auth) {
    return (
      <div style={{ maxWidth: 420, margin: '20px auto' }}>
        <h2>Área Administrativa</h2>
        <form onSubmit={handleLogin}>
          <input name="username" placeholder="Usuário" required />
          <input name="password" placeholder="Senha" type="password" required />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '20px auto' }}>
      <h2>Mensagens Recebidas</h2>
      {messages.length === 0 ? <p>Nenhuma mensagem.</p> : (
        <div>
          {messages.map((m,i)=>(
            <div key={i} style={{border:'1px solid #ddd', padding:12, marginBottom:8}}>
              <strong>{m.name}</strong> — <small>{m.email}</small>
              <p>{m.message}</p>
              <small>{m.date}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
