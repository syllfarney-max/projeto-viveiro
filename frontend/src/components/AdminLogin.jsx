// frontend/src/pages/AdminLogin.jsx
import React, { useState } from "react";
import api from "../services/api";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Autenticando...");

    try {
      const res = await api.post("/api/admin/login", form);
      if (res.data?.success) {
        setStatus("✅ Acesso permitido");
        localStorage.setItem("admin_token", res.data.token || "token");
        window.location.href = "/admin/dashboard";
      } else {
        setStatus("❌ Credenciais inválidas");
      }
    } catch (err) {
      console.error("Erro ao autenticar (AdminLogin):", err);
      setStatus("❌ Erro de conexão com o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        name="email"
        placeholder="E-mail"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Senha"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Entrar</button>
      {status && <p className="status">{status}</p>}
    </form>
  );
}
