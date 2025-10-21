import React, { useState } from "react";

export default function AdminLogin() {
  const [status, setStatus] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL || "https://viveiro-comurg-backend-yjsj.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Autenticando...");
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch(`${apiUrl}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setStatus("✅ Acesso permitido");
        localStorage.setItem("admin_token", result.token || "token");
        window.location.href = "/admin/dashboard";
      } else {
        setStatus("❌ Credenciais inválidas. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao autenticar:", err);
      setStatus("❌ Erro de conexão com o servidor.");
    }
  };

  return (
    <section className="admin-login">
      <h2>Área Administrativa</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="email" placeholder="E-mail" required />
        <input name="password" type="password" placeholder="Senha" required />
        <button type="submit" className="btn-send">Entrar</button>
      </form>
      {status && <p className="status">{status}</p>}
    </section>
  );
}