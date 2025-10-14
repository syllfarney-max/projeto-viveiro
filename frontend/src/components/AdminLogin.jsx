import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [user, setUser] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, password })
      });
      if (!res.ok) {
        setError('Credenciais inválidas');
        return;
      }
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        navigate('/panel');
      } else {
        setError('Credenciais inválidas');
      }
    } catch {
      setError('Erro de conexão');
    }
  };

  return (
    <div className="login-form">
      <h2>Área Administrativa</h2>
      <form onSubmit={handleLogin}>
        <input value={user} onChange={e=>setUser(e.target.value)} required placeholder="Usuário" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required placeholder="Senha" />
        <button type="submit">Entrar</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
