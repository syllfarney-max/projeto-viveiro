import React, { useState } from "react";

const AdminLogin = () => {
  const [email, setEmail] = useState("syllfarney@hotmail.com");
  const [senha, setSenha] = useState("123456");
  const [status, setStatus] = useState("");

  const API_ROOT = "https://viveiro-comurg-backend-yjsj.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Autenticando...");

    try {
      const response = await fetch(`${API_ROOT}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error("Erro de autenticação");
      }

      const data = await response.json();

      if (data && data.token) {
        localStorage.setItem("token", data.token);
        setStatus("✅ Login bem-sucedido!");
      } else {
        setStatus("Credenciais inválidas. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      setStatus("Erro de conexão com o servidor. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          required
        />
      </div>
      <button type="submit">Entrar</button>
      {status && <p className="status-message">{status}</p>}
    </form>
  );
};

export default AdminLogin;
