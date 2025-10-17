import React, { useEffect, useState } from "react";

export default function AdminPanel() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/messages`);
        if (!res.ok) throw new Error("Falha ao carregar mensagens");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        setError("Erro ao conectar com o backend ou nenhum dado disponível.");
      } finally {
        setLoading(false);
      }
    }
    fetchMessages();
  }, []);

  if (loading) return <p>Carregando mensagens...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-panel">
      <h2>Mensagens Recebidas</h2>
      {messages.length === 0 ? (
        <p>Nenhuma mensagem disponível.</p>
      ) : (
        <ul>
          {messages.map((msg, i) => (
            <li key={i}>
              <strong>{msg.name}</strong> — {msg.email}
              <p>{msg.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
