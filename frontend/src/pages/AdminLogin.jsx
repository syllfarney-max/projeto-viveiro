import React, { useState } from "react";

export default function AdminLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Validando...");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("✅ Login efetuado com sucesso!");
        localStorage.setItem("token", data.token);
        window.location.href = "/admin/dashboard";
      } else {
        setStatus("❌ Usuário ou senha inválidos.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="login-container">
      <h2>Área Administrativa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Usuário"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="button-link admin">Entrar</button>
      </form>

      {status && <p className="status">{status}</p>}
    </div>
  );
}
