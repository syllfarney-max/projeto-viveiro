import React, { useState } from "react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Verificando credenciais...");

    try {
      const response = await fetch("https://viveiro-comurg-backend-yjsj.onrender.com/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        localStorage.setItem("adminLoggedIn", "true");
        setStatus("✅ Login realizado com sucesso!");
        window.location.href = "/admin";
      } else {
        setStatus("❌ Credenciais inválidas. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro de conexão com o servidor:", error);
      setStatus("❌ Erro de conexão com o servidor.");
    }
  };

  return (
    <section className="admin-login-section">
      <h2>Área Administrativa</h2>
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </section>
  );
};

export default AdminLogin;
