import React, { useState } from 'react';
import AdminPanel from './AdminPanel';

export default function AdminLogin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const user = e.target.username.value.trim();
    const pass = e.target.password.value.trim();

    if (user === "admin" && pass === "8865") {
      setLoggedIn(true);
    } else {
      setError("Usuário ou senha incorretos.");
    }
  };

  if (loggedIn) return <AdminPanel />;

  return (
    <div style={{padding:'1rem', textAlign:'center'}}>
      <h2>Área Administrativa</h2>
      <form onSubmit={handleLogin} style={{display:'inline-block', marginTop:10}}>
        <input type="text" name="username" placeholder="Usuário" required style={{display:'block', marginBottom:6}} />
        <input type="password" name="password" placeholder="Senha" required style={{display:'block', marginBottom:6}} />
        <button type="submit" style={{padding:'0.4rem 0.8rem', background:'#2f7a4a', color:'#fff', border:'none', borderRadius:4}}>Entrar</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}
