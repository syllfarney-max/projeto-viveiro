import { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });

    const result = await res.json();
    if (result.success) onLogin();
    else setError("Credenciais inválidas.");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Login Administrativo</h3>
      <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Usuário" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
      <button type="submit">Entrar</button>
      {error && <p>{error}</p>}
    </form>
  );
}
