// frontend/src/components/AdminLogin.jsx
import React from "react";

export default function AdminLogin({ onLogin }) {
  return (
    <form onSubmit={onLogin} className="max-w-sm mx-auto">
      <input name="username" placeholder="Usuário" required />
      <input name="password" placeholder="Senha" type="password" required />
      <button type="submit">Entrar</button>
    </form>
  );
}
