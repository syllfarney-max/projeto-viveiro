// frontend/src/pages/AdminLogin.jsx
import React, { useState } from "react";
import axios from "axios";

const API_ROOT = import.meta.env.VITE_API_URL || "https://viveiro-comurg-backend-yjsj.onrender.com";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Autenticando...");
    try {
      const res = await axios.post(`${API_ROOT}/api/admin/login`, form, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.data?.success) {
        setStatus("✅ Acesso permitido");
        localStorage.setItem("admin_token", res.data.token || "token");
        window.location.href = "/admin/dashboard";
      } else {
        setStatus("❌ Credenciais inválidas");
      }
    } catch (err) {
      console.error("Erro ao autenticar:", err);
      setStatus("❌ Erro de autenticação");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="email" placeholder="E-mail" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Senha" value={form.password} onChange={handleChange} required />
      <button type="submit">Entrar</button>
      {status && <p className="status">{status}</p>}
    </form>
  );
}
