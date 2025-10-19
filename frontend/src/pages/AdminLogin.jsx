import React, { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Verificando...");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "https://viveiro-comurg-backend-yjsj.onrender.com"}/admin/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setStatus("✅ Login realizado com sucesso!");
        setEmail("");
        setPassword("");
      } else {
        setStatus("❌ " + data.message);
      }
    } catch {
      setStatus("⚠️ Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="admin-login">
      <h2>Área Administrativa</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn-send">Entrar</button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
}
