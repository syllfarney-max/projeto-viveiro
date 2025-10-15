import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/messages`)
      .then(res => {
        if (!res.ok) throw new Error('erro');
        return res.json();
      })
      .then(data => setMessages(data))
      .catch(() => setError('Erro ao conectar com o servidor ou nenhum dado disponível.'));
  }, []);

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="panel">
      <h2>Mensagens Recebidas</h2>
      {messages.length === 0 ? <p>Nenhuma mensagem.</p> : (
        <ul>{messages.map((m,i)=>(<li key={i}><strong>{m.name}</strong> ({m.email})<p>{m.message}</p><small>{m.date}</small></li>))}</ul>
      )}
    </div>
  );
}
