import React, { useState } from "react";
import AdminPanel from "./AdminPanel";

export default function AdminLogin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const user = e.target.username.value.trim();
    const pass = e.target.password.value.trim();

    // Login fixo: admin / 8865
    if (user === "admin" && pass === "8865") {
      setLoggedIn(true);
    } else {
      setError("Usuário ou senha incorretos.");
    }
  };

  if (loggedIn) return <AdminPanel />;

  return (
    <div className="admin-login">
      <h2>Área Administrativa</h2>
      <form onSubmit={handleLogin}>
        <input type="text" name="username" placeholder="Usuário" required />
        <input type="password" name="password" placeholder="Senha" required />
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
